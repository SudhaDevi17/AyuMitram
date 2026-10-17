# Ayu Mitram – Project Memory & Invariant Constraints

## 1. System Invariants (Non-Negotiable Rules)
1. **The 50+ Invariant:** Ayu Mitram serves all adults aged 50 and above. Any age $\ge 50$ is a first-class citizen in the platform, triggering specific pre-senior benefits.
2. **Never Generate Medical Diagnoses:** Gemini must NEVER make a diagnostic assertion (e.g., *"Patient has type-2 diabetes"*). All clinical signals must be classified as observational symptoms that route to government medical professionals (**eSanjeevani OPD**).
3. **Zero Aadhaar / Biometric Persistence:** Storing 12-digit Aadhaar numbers or raw fingerprint/iris data in Firestore or logs is an architectural violation. Identity is anchored on tokenized **ABHA IDs** and verified mobile numbers.
4. **Spoken-First Native Consent:** Every visit and data extraction requires recorded spoken consent from the elder in their native dialect before records are committed.
5. **Deterministic Rupee Values:** AI does not invent or estimate financial savings. Financial figures must stem from hardcoded tables: Jan Aushadhi PMBI price sheets or statutory scheme guidelines (₹5,00,000 for Ayushman Vaya Vandana).

---

## 2. Age-Tiered Statutory Reference Cheat Sheet

| Age Cohort | Legal Classification | Key Schemes & Strategic Interventions |
| :--- | :--- | :--- |
| **50–59** | *Pre-Seniors / Early Retirees* | • **PMJJBY:** Life insurance entry window closes at age 50.<br>• **EPS-95:** Option for early reduced pension if 10 years served.<br>• **NP-NCD:** Free preventive screenings (Arogya Mandirs).<br>• **SCSS (VRS):** Government savings scheme open at 55.<br>• **State Pensions:** Jharkhand Sarvajan pension (₹1,000/mo) open at 50 for women and SC/ST. |
| **60–69** | *Statutory Senior Citizens* | • Central IGNOAPS and State Old Age Pensions.<br>• Maintenance and Welfare of Parents and Senior Citizens Act legal protections.<br>• High-interest bank FD & SCSS accounts. |
| **70+** | *Super Seniors* | • **Ayushman Bharat Vaya Vandana:** Universal ₹5,00,000 annual cashless hospital coverage, regardless of socio-economic status. |

---

## 3. Technology Stack Decisions
* **Frontend:** React 18, Vite, Tailwind CSS, Workbox (PWA with offline IndexedDB).
* **AI & Orchestration:** Google Cloud Run, Python 3.11, Google GenAI SDK (Gemini 1.5 Pro / Flash).
* **Database & Auth:** Google Cloud Firestore (multi-region, offline cache), Firebase Auth.
* **Storage:** Cloud Storage (with 30-day lifecycle auto-deletion for raw temporary audio).
* **Events & Schedulers:** Cloud Pub/Sub + Cloud Scheduler (SLA escalation timers).
* **Compliance Standards:** DPDP Act 2023, ABDM Milestone M1/M2/M3, HL7 FHIR Release 4.
