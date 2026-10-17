# Ayu Mitram – Product Requirements Document (PRD v2.2)
**Theme:** Universal AI Care Layer for 50+ Adults, Community Networks & Digital Public Infrastructure (ABDM & Ayushman)  
**Author:** @Sudha | **Date:** Oct 2026  
**Status:** Approved for Prototype Build

---

## 1. Executive Summary & Problem Statement

India is undergoing an unprecedented demographic transition. The country has over **26 crore citizens aged 50 and above** (with 15 crore aged 60+, rising to 34.7 crore by 2050) [1, 2]. 
* **7 in 10** live in rural and semi-urban areas with fragmented tertiary care.
* **Over 75%** live with one or more chronic conditions (hypertension, type-2 diabetes, osteoarthritis, cardiovascular ailments).
* **78%** of the aging workforce has no structured formal pension.
* **1 in 5** lives alone or with only a spouse.

Millions of these citizens receive informal visits from Self-Help Group (SHG) Sakhis, volunteer time-banks, NGO outreach teams, and family members. However, **these visits rarely lead to clinical or financial follow-through**:
1. Untrained helpers do not know what clinical or lifestyle red flags to observe.
2. High-value government entitlements go completely unclaimed:
   - **Ages 50–59 (Pre-Seniors):** Unclaimed EPS-95 early pensions, missed PMJJBY enrollment windows (cut-off at age 50), unutilized free NP-NCD non-communicable disease screenings, and paying 50–80% excess for branded chronic medications instead of Jan Aushadhi generics.
   - **Ages 60–69 (Statutory Seniors):** Unclaimed state pensions and IGNOAPS welfare grants.
   - **Ages 70+ (Super Seniors):** Unclaimed **Ayushman Bharat Vaya Vandana** universal ₹5 Lakh annual cashless healthcare coverage.
3. Health documentation is trapped on loose paper prescriptions and lost between visits, completely disconnected from the **Ayushman Bharat Digital Mission (ABDM / ABHA)**.

**Ayu Mitram** is the decentralized AI care intelligence layer that plugs into any existing helper network to turn every visit into verified health, emotional, and financial outcomes at zero cost to the elder.

---

## 2. PESTEL Analysis

| Dimension | Macro Trends & Impact on Ayu Mitram | Strategic Response |
| :--- | :--- | :--- |
| **Political** | Government push for digital public infrastructure (DPI), expansion of Ayushman Bharat (universal ₹5 Lakh cover for 70+), and decentralized Panchayati Raj senior welfare initiatives. | Ayu Mitram positions itself as the software rails unlocking government scheme saturation without requiring new government field staff. |
| **Economic** | Out-of-pocket healthcare expenditure (OOPE) accounts for nearly 48% of total health spending, driving vulnerable families into poverty; lack of formal retirement savings for 78% of the cohort [2]. | The platform prioritizes Jan Aushadhi generic substitution (saving ₹500–₹2,500/month) and links elders to social pensions and health covers. |
| **Social** | Nuclear family migration leaves rural elders isolated; rising incidence of geriatric loneliness and depression; social stigma around seeking mental health or medical help. | Voice-first mood and loneliness detection ("days since family contact") that alerts remote adult children to call without exposing private transcripts. |
| **Technological** | High smartphone penetration among frontline workers (4G/5G, low-cost Android), advancements in multimodal LLMs (audio & vision in Indic languages), and ABDM interoperability (FHIR). | Ayu Mitram operates voice-first (Telugu, Hindi, English), extracts data from photos of handwritten prescriptions, and syncs via ABDM M1/M2/M3. |
| **Environmental** | Heatwaves, floods, and geographic isolation restrict physical mobility for adults 50+ to travel to district hospitals or Jan Aushadhi stores. | Triages cases to free government telemedicine (**eSanjeevani**) and flags nearest Jan Aushadhi delivery points to prevent travel hardship. |
| **Legal** | Stringent compliance requirements under the **Digital Personal Data Protection (DPDP) Act, 2023**, UIDAI regulations prohibiting raw Aadhaar storage, and Clinical Establishments Act rules against unauthorized medical diagnosis. | Strict non-diagnostic guardrails, zero Aadhaar/biometric storage, audio consent artifacts in native languages, and tokenized ABHA integration. |

---

## 3. Blue Ocean Strategy Analysis

### 3.1 Four Actions Framework (ERRC)

```
       ELIMINATE                                REDUCE
┌──────────────────────────────────────┐ ┌──────────────────────────────────────┐
│ • Owning/employing a paid care force │ │ • Training requirements for helpers  │
│ • Requiring elders to use an app     │ │ • Cost per elder to near-zero        │
│ • One-off manual scheme consult fees │ │ • Administrative reporting burden    │
└──────────────────────────────────────┘ └──────────────────────────────────────┘
       RAISE                                    CREATE
┌──────────────────────────────────────┐ ┌──────────────────────────────────────┐
│ • Health & financial impact per visit│ │ • Universal AI care layer for any net│
│ • Trust via voice-verified visits    │ │ • Portable longitudinal care record  │
│ • Family transparency from afar      │ │ • Automated multi-tier scheme engine │
└──────────────────────────────────────┘ └──────────────────────────────────────┘
```

### 3.2 Strategy Canvas Comparison

| Factor | Premium Home Care (Emoha, Samarth) | Scheme Agents (Haqdarshak) | Volunteer Time Banks | **Ayu Mitram** |
| :--- | :--- | :--- | :--- | :--- |
| **Cost to the Citizen** | High (₹3,000–₹10,000/mo) | Low (Per application fee) | Free | **Completely Free** |
| **Workforce Ownership** | Owns & trains dedicated staff | Owns feet-on-street agents | Community volunteers | **Zero owned workforce** (software layer) |
| **Target Demographic** | Urban affluent 60+ | Rural all-age citizens | Local community seniors | **Universal 50+ (pre-senior to super-senior)** |
| **Health Follow-Through** | High (in-house nurses) | None | Low / Unstructured | **High (Automated via eSanjeevani & ABHA)** |
| **Entitlement Unlocking** | Low | High (One-off) | Low / None | **High & Continuous (50+, 60+, 70+ tiers)** |
| **Verification & Trust** | High | Low | Low (hours logged only) | **High (Voice-confirmed + Geo + 3-day SLA)** |

---

## 4. User Personas (50+ Age Cohort)

### Persona 1: Pre-Senior (Age 50–59)
* **Name:** Ramesh, 52, marginal farmer, Kurnool (AP).
* **Status:** Working informal labor, diagnosed with hypertension; son working in Hyderabad.
* **Pain Points:** Spends ₹800/month on branded Amlodipine; unaware of PMJJBY cut-off (age 50) or free NP-NCD diabetes/hypertension screenings at the local Ayushman Arogya Mandir.
* **Interaction:** Helper visits, records Ramesh’s medication; Ayu Mitram flags Jan Aushadhi substitution (saving ₹620/mo) and reminds son to verify his EPS-95 pension record.

### Persona 2: Statutory Senior (Age 60–69)
* **Name:** Lakshmi, 63, weaver’s widow, Anantapur.
* **Status:** Chronic knee pain, lives alone, receives no formal pension.
* **Pain Points:** Illiterate, cannot navigate government offices to apply for the state widow pension or central IGNOAPS.
* **Interaction:** Voice note triggers task for SHG Sakhi to route her application through the local village secretariat.

### Persona 3: Super Senior (Age 70+)
* **Name:** Venkatamma, 74, non-smartphone user.
* **Status:** Lives with an elderly spouse; suffers from dizziness and osteoarthritis.
* **Pain Points:** High risk of sudden catastrophic medical expenditure.
* **Interaction:** Care Planner immediately flags universal eligibility for the **Ayushman Bharat Vaya Vandana Card (₹5 Lakh cover)** and assigns an e-KYC assisted task to her family and Sakhi.

---

## 5. Functional Requirements & User Stories

### Epic 1: Multimodal Visit Capture & Consent (Visit Scribe)
* **US1:** As a helper, I want to record up to 2 minutes of spoken audio in Telugu, Hindi, or English, so that I can report an elder's condition without typing or administrative burden.
* **US2:** As a citizen aged 50+, I want to give spoken consent in my mother tongue before any health record is created, with the ability to revoke it at any time.

### Epic 2: Tiered 50+ Entitlements Engine (Care Planner)
* **US3 (Age 50–59):** The system must audit PMJJBY insurance status, EPS-95 early pension eligibility (if 10 years served), and NP-NCD free screening dates.
* **US4 (Age 60–69):** The system must evaluate state senior pensions (e.g., AP YSR Pension Kanuka / Jharkhand Sarvajan) and central IGNOAPS criteria.
* **US5 (Age 70+):** The system must instantly trigger the universal **Ayushman Bharat Vaya Vandana ₹5,00,000 cashless card** workflow.

### Epic 3: Clinical Continuity & Medicine Optimization
* **US6:** As an elder/family, I want branded medicines on prescription photos mapped to the official Jan Aushadhi generic catalog to see verified monthly rupee savings.
* **US7:** As a helper, if a symptom persists across 2 consecutive visits within 14 days, the system must trigger an eSanjeevani teleconsultation task without generating an AI diagnosis.

### Epic 4: Verification, Escalation & ABDM Integration
* **US8:** As a programme coordinator, I want any open health task unfulfilled after 3 days to automatically escalate (Helper $\rightarrow$ Trusted Contact $\rightarrow$ Coordinator).
* **US9:** As a citizen, I want my visit summaries structured as standard FHIR documents and linked to my ABHA address (`@abdm`).

---

## 6. Verifiable References & Research Citations
1. **UNFPA & IIPS (2023):** *India Ageing Report 2023* – Demographic transitions, 149M 60+ (2022) to 347M (2050), living arrangements, feminization of aging [1].
2. **NITI Aayog (2024):** *Senior Care Reforms in India – Thinking for the Future* – 75% chronic disease burden, 78% pensionless status, out-of-pocket health expenditure risks [2].
3. **EPFO (Employees' Provident Fund Organisation):** *EPS-95 Scheme Provisions (Para 12)* – Early pension option from age 50 with 4% reduction per annum.
4. **Ministry of Health & Family Welfare (MoHFW):** *National Programme for Prevention and Control of Non-Communicable Diseases (NP-NCD)* – Universal population screening guidelines for adults aged 30+.
5. **National Health Authority (NHA):** *Ayushman Bharat PM-JAY Senior Citizen 70+ (Vaya Vandana) Operational Guidelines (Sept 2024)* – Universal ₹5 Lakh health cover for all citizens aged 70 and above.
6. **Ministry of Law and Justice:** *Digital Personal Data Protection (DPDP) Act, 2023* – Sections 4, 6 (Notice and Verifiable Consent), and Section 9.
