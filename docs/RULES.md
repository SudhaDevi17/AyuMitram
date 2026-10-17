# Ayu Mitram – Deterministic Rule Specification (Rules Engine)

**Core Principle:** *Gemini extracts, structures, and explains. Deterministic Python rules evaluate, calculate rupee values, and assign statutory actions.*

---

## 1. Age-Tiered Entitlement Matrix

### Tier 1: Pre-Seniors (Age 50 to 59)

#### Rule T1.1: PMJJBY Insurance Window Expiry Warning
* **Condition:** `elder.age == 50` AND `elder.entitlements.pmjjby_enrolled == false`
* **Trigger Action:** `INSURANCE_EXPIRY_ALERT`
* **Value:** ₹2,00,000 term life cover (Premium: ₹436/year).
* **Instruction:** Age 50 is the final statutory entry window for PMJJBY. Generate immediate priority task for family to enroll at the bank branch.

#### Rule T1.2: EPS-95 Early Pension Audit
* **Condition:** `elder.age >= 50` AND `elder.age < 58` AND `elder.organized_work_years >= 10` AND `elder.pension_status == "NONE"`
* **Trigger Action:** `EARLY_PENSION_AUDIT`
* **Value:** Monthly early pension under EPFO EPS-95 (discounted by 4% per year prior to age 58).

#### Rule T1.3: NP-NCD Preventive Screening Protocol
* **Condition:** `elder.age >= 50` AND `elder.last_ncd_screening_days > 180`
* **Trigger Action:** `PREVENTIVE_SCREENING_TASK`
* **Value:** Free screening for hypertension, diabetes, and oral/breast/cervical cancer at the nearest Ayushman Arogya Mandir.

#### Rule T1.4: State-Specific Early Pensions (e.g., Jharkhand Sarvajan)
* **Condition:** `elder.state == "JHARKHAND"` AND `elder.age >= 50` AND (`elder.category in ["SC", "ST"]` OR `elder.gender == "FEMALE"`) AND `elder.pension_status == "NONE"`
* **Trigger Action:** `STATE_PENSION_ELIGIBILITY`
* **Value:** ₹1,000/month lifelong social security pension.

---

### Tier 2: Statutory Seniors (Age 60 to 69)

#### Rule T2.1: Central & State Old-Age Pension (IGNOAPS / State Schemes)
* **Condition:** `elder.age >= 60` AND `elder.bpl_status == true` AND `elder.pension_status == "NONE"`
* **Trigger Action:** `OLD_AGE_PENSION_ELIGIBILITY`
* **Value:** ₹1,000–₹3,000/month (varies by state: AP YSR Pension Kanuka, Tamil Nadu OAP, etc.).

#### Rule T2.2: Senior Citizen Protection & Savings Scheme (SCSS)
* **Condition:** `elder.age >= 60` (or `age >= 55` with VRS)
* **Trigger Action:** `FINANCIAL_SECURITY_ADVICE`
* **Value:** 8.2%+ guaranteed interest under government SCSS.

---

### Tier 3: Super Seniors (Age 70+)

#### Rule T3.1: Universal Ayushman Bharat Vaya Vandana Card
* **Condition:** `elder.age >= 70` AND `elder.entitlements.ayushman_vaya_vandana == false`
* **Trigger Action:** `UNIVERSAL_HEALTH_ASSURANCE`
* **Scheme Name:** Ayushman Bharat PM-JAY (Vaya Vandana Card)
* **Value:** **₹5,00,000 cashless hospitalization per year**.
* **Statutory Rule:** Universal eligibility. No income or economic cut-off. Pre-existing diseases covered from day one. Top-up of an additional ₹5L if family is already enrolled on standard PM-JAY.
* **Assigned To:** Family (Priority 1) $\rightarrow$ Sakhi assisted e-KYC.

---

## 2. Jan Aushadhi Generic Substitution & Savings Engine

* **Input:** Prescription extraction: `{ brand_name: string, salt: string, strength: string, unit_count: number }`
* **Rule Logic:**
  1. Search `pmbi_jan_aushadhi_catalog.csv` by `salt` + `strength`.
  2. If match found:
     $$\text{monthly\_branded\_cost} = (\text{branded\_price\_per\_unit}) \times (\text{monthly\_dosage\_count})$$
     $$\text{monthly\_jan\_aushadhi\_cost} = (\text{generic\_price\_per\_unit}) \times (\text{monthly\_dosage\_count})$$
     $$\text{monthly\_saving\_inr} = \text{monthly\_branded\_cost} - \text{monthly\_jan\_aushadhi\_cost}$$
  3. Action created with status `ESTIMATED`.
  4. Mandatory disclaimer: *"Substitution requires approval from the treating doctor or Jan Aushadhi certified pharmacist."*

---

## 3. Clinical Safety & eSanjeevani Escalation Rules

* **Rule SAFE-1 (Non-Diagnostic Invariant):** The system is prohibited from outputting clinical diagnoses (e.g., "The patient has stroke/angina"). It must classify symptoms under observational terms (e.g., "Persistent dizziness reported").
* **Rule SAFE-2 (eSanjeevani Escalation):**
  * **Trigger:** If `symptom.reported_count >= 2` within a 14-day sliding window, OR if `symptom.is_red_flag == true` (chest tightness, sudden unilateral weakness, fainting).
  * **Action:** Generate `TELECONSULT_BOOKING` task for free eSanjeevani doctor consultation.

---

## 4. SLA & Fraud-Proof Task Fallback Engine

* **Task Expiry SLA:** 72 hours (3 days).
* **Fallback Chain:**
  * **Day 0 to Day 3:** Assigned to Primary Helper / Family.
  * **Day 3 (if status == "OPEN"):** Auto-escalate to Trusted Contact (SMS / WhatsApp notification).
  * **Day 5 (if status == "OPEN"):** Auto-escalate to Programme Coordinator dashboard.
* **Visit Verification Formula:**
  A helper's visit hours are credited **only** if:
  $$\text{Verified} = (\text{GPS within 200m of registered village}) \land (\text{Audio consent valid}) \land (\text{Elder spoken confirmation} \lor \text{Trusted contact OTP})$$
