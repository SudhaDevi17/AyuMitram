# Ayu Mitram – Technical Architecture Specification

## 1. High-Level Architecture Diagram

```
                 [Frontline Client]                       [Remote Family & Coordinator]
              PWA (React 18 + Vite + PWA)                     Desktop / Mobile Browser
             (Offline IndexedDB + Storage)                   (Tailwind CSS + Chart.js)
                         │                                               │
                         ▼                                               ▼
       ┌────────────────────────────────────────────────────────────────────────┐
       │             Firebase Hosting + Firebase Authentication (Auth)           │
       │           (Phone OTP / Role-Based Custom Claims: Helper, Family, Admin) │
       └───────────────────────────────────┬────────────────────────────────────┘
                                           │ HTTPS / WebSocket
                                           ▼
       ┌────────────────────────────────────────────────────────────────────────┐
       │                Cloud Run: Multi-Agent ADK Orchestrator                 │
       │                   (Python 3.11 + FastAPI + Google GenAI)               │
       │                                                                        │
       │  ┌───────────────────────┐  ┌───────────────────┐  ┌────────────────┐  │
       │  │  Agent 1: VisitScribe │  │ Agent 2: CarePlan │  │ Agent 3: Router│  │
       │  │ (Gemini 1.5 Multimodal│  │ (Rules Engine     │  │ (SLA Escalation│  │
       │  │  Speech & OCR Parser) │  │  + Jan Aushadhi)  │  │  & Geo-Verify) │  │
       │  └──────────┬────────────┘  └─────────┬─────────┘  └───────┬────────┘  │
       └─────────────┼─────────────────────────┼────────────────────┼───────────┘
                     │                         │                    │
                     ▼                         ▼                    ▼
       ┌────────────────────────────────────────────────────────────────────────┐
       │                           Data & State Layer                           │
       │                                                                        │
       │  [Firestore] (NoSQL)        [Cloud Storage]       [Pub/Sub + Scheduler]│
       │  • /elders (Profile, ABHA)  • Encrypted Audio     • 24h/72h SLA timers │
       │  • /visits (Geo, Transcripts) • Prescription PNGs • Cron Escalations   │
       │  • /tasks (State, Assignee) • State Rules Packs                        │
       │  • /audit_logs (DPDP)       • PMBI Generic CSV   [BigQuery]            │
       │                                                   • Program Impact Reps│
       └───────────────────────────────────┬────────────────────────────────────┘
                                           │
                                           ▼
       ┌────────────────────────────────────────────────────────────────────────┐
       │                     External DPI / Government Rails                    │
       │                                                                        │
       │  ┌────────────────────────┐  ┌────────────────┐  ┌──────────────────┐  │
       │  │ ABDM Sandbox Gateway   │  │ Ayushman PM-JAY│  │ eSanjeevani Free │  │
       │  │ • M1: ABHA Verification│  │ Vaya Vandana   │  │ Teleconsultation │  │
       │  │ • M2/M3: FHIR Records  │  │ e-KYC Referral │  │ OPD Dispatch API │  │
       │  └────────────────────────┘  └────────────────┘  └──────────────────┘  │
       └────────────────────────────────────────────────────────────────────────┘
```

---

## 2. ABDM Integration Blueprint (Milestones M1, M2, M3)

Ayu Mitram complies with National Health Authority (NHA) ABDM architectural standards:

```
[Ayu Mitram Cloud Run]
        │
        ├── M1: /v3/or/register (Assisted ABHA Generation / Linking via OTP or QR)
        │       └── Returns: tokenized `abha_id`, `abha_address` (e.g. 91-xxxx-xxxx-xxxx)
        │
        ├── M2: HIP (Health Information Provider) Service
        │       └── Packages visit summary + extracted prescription into FHIR Bundle
        │       └── Pushes notification to ABDM Gateway for patient's PHR app
        │
        └── M3: HIU (Health Information User) Bridge
                └── Dispatches user-consented longitudinal FHIR profile to eSanjeevani
```

### FHIR Composition Contract (JSON)
When a visit is finalized, Ayu Mitram transforms the record into an HL7 FHIR standard bundle:
* `ResourceType`: `Bundle` (Type: `document`)
* `Entries`:
  1. `Patient`: Identifies elder via `abha_id`.
  2. `Encounter`: Logs helper ID, timestamp, and geo-coordinates.
  3. `Condition`: Symptoms detected (e.g., SNOMED-CT code for hypertension).
  4. `MedicationStatement`: Active medications mapped to generic salts.

---

## 3. DPDP Act (2023) Compliance Architecture

1. **Consent Manager Subsystem:**
   * Before any processing, the helper must trigger the audio consent recording.
   * Audio is hashed (`SHA-256`) and stored in Cloud Storage with an immutable reference in `/consent_artifacts/{consentId}`.
   * Withdrawal: If an elder or trusted contact revokes consent, a Cloud Function automatically marks the Firestore elder record as `status: "SUSPENDED"`, blinding all personal identifiable information (PII) from helper views.
2. **UIDAI Compliance Guardrail (Zero-Aadhaar Rule):**
   * The app **never** stores Aadhaar numbers, fingerprints, or IRIS scans.
   * If a helper snaps a photo of an Aadhaar card during an assisted scheme registration, an on-device/Cloud Run preprocessing filter scans for 12-digit patterns and redacts the first 8 digits before storing.
3. **Data Localization:**
   * All Google Cloud infrastructure (Cloud Run, Firestore, Storage) is provisioned exclusively in the `asia-south1` (Mumbai) or `asia-south2` (Delhi) regions.

---

## 4. Offline-First PWA Synchronization

In rural villages with patchy 2G/4G connectivity:
1. The Helper PWA uses **Workbox Service Workers** and **IndexedDB**.
2. Spoken audio recordings are captured via `MediaRecorder` API, compressed using the `Opus` codec (16 kHz mono, ~12 kbps), and queued locally in IndexedDB along with GPS tags.
3. Once network connectivity is restored, the client executes a background sync against Cloud Storage signed URLs, after which the Cloud Run agent triggers automatically.
