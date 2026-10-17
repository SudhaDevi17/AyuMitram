# Ayu Mitram – Prototype Implementation Backlog

Following **Spec-Driven Development (SDD)**, tasks must strictly satisfy acceptance criteria before checking off.

---

## Sprint 1: Architecture, Schemas & Reference Datasets
- [x] **TASK-101:** Establish project repository with complete `docs/` specifications.
- [ ] **TASK-102:** Provision Google Cloud Platform project (`asia-south1`) with Firestore, Cloud Storage, and Cloud Run services.
- [ ] **TASK-103:** Create Firestore collections with schema validators (`elders`, `tasks`, `visits`, `consent_artifacts`).
- [ ] **TASK-104:** Clean and ingest the **PMBI Jan Aushadhi Drug Price Index** (CSV containing 1,800+ generic medicines and price deltas).
- [ ] **TASK-105:** Setup mock ABDM Gateway API endpoint (`/v3/or/register` and FHIR bundle validator).

---

## Sprint 2: Cloud Run Multi-Agent Engine (Gemini 1.5 + Python Rules)
- [ ] **TASK-201:** Build `Visit Scribe` agent in Python with Google GenAI SDK:
  - Audio transcription across Telugu, Hindi, and Indian English.
  - Multimodal OCR for prescription images.
  - Enforce strict JSON schema validation.
- [ ] **TASK-202:** Implement `Care Planner` deterministic rules engine (`RULES.md`):
  - Tier 1: Age 50–59 PMJJBY cut-off and EPS-95 pension auditing.
  - Tier 2: Age 60–69 State Old Age Pension qualification.
  - Tier 3: Age 70+ Universal Ayushman Vaya Vandana ₹5 Lakh unlock.
  - Generic drug price delta matching.
  - Safe, non-diagnostic eSanjeevani teleconsultation triggers.
- [ ] **TASK-203:** Implement `Task Router` with automated 3-day SLA fallback logic and Firestore write pipelines.

---

## Sprint 3: Client Interfaces (PWA & Offline Pipeline)
- [ ] **TASK-301:** Develop Frontline Helper PWA in React 18 + Vite:
  - Opus audio recording component with native visualizer.
  - Offline-first IndexedDB queue with background sync.
  - Native language switcher (Telugu, Hindi, English).
- [ ] **TASK-302:** Develop Remote Family View:
  - Emotional wellness card ("Call Amma" prompt).
  - 1-click approvals for scheme applications and Jan Aushadhi generic swaps.
- [ ] **TASK-303:** Develop Programme Coordinator Dashboard:
  - Village-level aggregate metrics: verified helper hours, unclaimed entitlements unlocked in INR (₹).

---

## Sprint 4: Technical Evaluation & Submission Deliverables
- [ ] **TASK-401:** Run Test Set 1: 20 scripted multimodal visits across Telugu, Hindi, English.
  - **Target:** $\ge 85\%$ accuracy on entity extraction; 0 hallucinated medicines.
- [ ] **TASK-402:** Run Test Set 2: 25 boundary profiles for 50+, 60+, and 70+ entitlement rules.
  - **Target:** 100% precision on Ayushman Vaya Vandana and PMJJBY flags.
- [ ] **TASK-403:** Produce 3-minute hackathon demo video covering the five-stage narrative:
  1. Problem (20s)
  2. Frontline Helper Visit (50s)
  3. AI Rule Unlocking (50s)
  4. Coordinator Verified Outcomes (30s)
  5. Architecture & Blue Ocean Moat (30s).
