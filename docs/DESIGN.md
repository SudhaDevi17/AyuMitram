# Ayu Mitram – Data Contracts, API Specs & UI Design

## 1. Firestore Data Models

### 1.1 Collection: `elders`
```typescript
interface Elder {
  id: string; // "eld_7721"
  name: string; // "Venkatamma"
  age: number; // 72 (Evaluated across 50+, 60+, 70+ rule tiers)
  gender: "male" | "female" | "other";
  language: "te" | "hi" | "en" | "kn" | "ta";
  village: string;
  district: string;
  state: string; // "Andhra Pradesh"
  geo_coordinates: { latitude: number; longitude: number };
  bpl_card: boolean;
  social_category: "GENERAL" | "OBC" | "SC" | "ST";
  abha_id?: string; // "91-8842-1923-0012"
  abha_address?: string; // "venkatamma72@abdm"
  entitlements: {
    ayushman_vaya_vandana: boolean; // True if enrolled in 70+ card
    pmjjby_enrolled: boolean; // Age 50 cut-off check
    pension_status: "NONE" | "EPS95" | "STATE_OAP" | "CENTRAL_IGNOAPS";
    state_scheme_name?: string;
  };
  chronic_conditions: string[]; // ["Hypertension", "Osteoarthritis"]
  active_medications: Array<{
    brand_name: string;
    salt: string;
    dosage: string;
    refill_due_date: string; // ISO-8601
    estimated_monthly_saving_inr: number;
  }>;
  trusted_contact: {
    name: string;
    relationship: "son" | "daughter" | "neighbor" | "self";
    phone: string;
    role: "FAMILY" | "LOCAL_GUARDIAN";
  };
  programme_id: string; // "prog_kerala_kdisc" | "prog_ap_shg"
  status: "ACTIVE" | "SUSPENDED";
}
```

### 1.2 Collection: `tasks`
```typescript
interface CareTask {
  id: string; // "tsk_9921"
  elder_id: string;
  action_type: 
    | "AYUSHMAN_70_ENROL"
    | "PMJJBY_50_URGENT"
    | "EPS95_AUDIT"
    | "JAN_AUSHADHI_SWITCH"
    | "ESANJEEVANI_CONSULT"
    | "MEDICINE_REFILL"
    | "CALL_AMMA";
  title: string;
  reason: string;
  rule_citation: string; // e.g. "Rule T3.1 - NHA Vaya Vandana Guidelines"
  potential_value_inr: number; // 500000 for Ayushman, 620 for Jan Aushadhi
  owner_role: "helper" | "family" | "coordinator";
  owner_id: string;
  created_at: string;
  due_date: string;
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "ESCALATED";
  escalation_level: 1 | 2 | 3; // 1: Helper, 2: Family, 3: Coordinator
}
```

---

## 2. Gemini Visit Scribe Structured Output Schema

The Cloud Run agent prompts Gemini with audio input (Opus) and prescription scans, demanding this exact JSON schema:

```json
{
  "type": "OBJECT",
  "properties": {
    "audio_transcript": { "type": "STRING" },
    "detected_language": { "type": "STRING", "enum": ["te", "hi", "en"] },
    "observed_health_entities": {
      "reported_symptoms": { "type": "ARRAY", "items": { "type": "STRING" } },
      "pain_severity": { "type": "STRING", "enum": ["NONE", "MILD", "MODERATE", "SEVERE"] },
      "prescriptions_detected": {
        "type": "ARRAY",
        "items": {
          "type": "OBJECT",
          "properties": {
            "brand_name": { "type": "STRING" },
            "generic_salt": { "type": "STRING" },
            "dosage_frequency": { "type": "STRING" },
            "runs_out_in_days": { "type": "INTEGER" }
          },
          "required": ["brand_name", "generic_salt"]
        }
      }
    },
    "wellbeing_indicators": {
      "mood_state": { "type": "STRING", "enum": ["CHEERFUL", "NEUTRAL", "LOW_SAD", "LONELY", "CRITICAL_DISTRESS"] },
      "days_since_family_contact": { "type": "INTEGER" },
      "mobility_status": { "type": "STRING", "enum": ["INDEPENDENT", "ASSISTED", "BEDBOUND"] }
    },
    "elder_consent_spoken": { "type": "BOOLEAN" },
    "emergency_red_flag": { "type": "BOOLEAN" }
  },
  "required": [
    "audio_transcript",
    "observed_health_entities",
    "wellbeing_indicators",
    "elder_consent_spoken",
    "emergency_red_flag"
  ]
}
```

---

## 3. User Interface Blueprints

### 3.1 Frontline Helper View (Mobile PWA)
```
┌────────────────────────────────────────────────────────┐
│  AYU MITRAM                                    🌐 Telugu│
│  Helper: Lakshmi (SHG Sakhi)                           │
├────────────────────────────────────────────────────────┤
│  Current Visit: Venkatamma (Age 72, Kanaganapalle)     │
│  [Status: Spoken Consent Recorded 🟢]                   │
├────────────────────────────────────────────────────────┤
│  [ 🎙️ Hold to Record Spoken Visit (Max 2 mins) ]       │
│  [ 📷 Capture Prescription / Medicine Strips ]         │
├────────────────────────────────────────────────────────┤
│  AI Care Intelligence Output:                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 🌟 Universal 70+ Entitlement Detected!           │  │
│  │ Ayushman Vaya Vandana Card: ₹5,00,000 Cover      │  │
│  │ Action: Task generated for son Ravi to verify.   │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ 💊 Jan Aushadhi Savings Opportunity              │  │
│  │ Branded Amlong 5mg -> Generic Amlodipine 5mg     │  │
│  │ Monthly Savings: ₹85 / month                     │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ ⚠️ Dizziness Reported in 2 Visits                │  │
│  │ Action: Free eSanjeevani OPD Consult booked.     │  │
│  └──────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────┤
│  [ ✅ Confirm & Log Visit (Elder Voice Sign-off) ]     │
└────────────────────────────────────────────────────────┘
```

### 3.2 Remote Family View (Responsive Web)
```
┌────────────────────────────────────────────────────────┐
│  AYU MITRAM FAMILY CARE                                │
│  Elder: Venkatamma (Mother) • Anantapur, AP            │
├────────────────────────────────────────────────────────┤
│  WELLNESS SNAPSHOT:                                    │
│  • Mood: Low (Hasn't spoken to family in 8 days)       │
│  • [ 📞 Tap to Call Mother Now ]                       │
├────────────────────────────────────────────────────────┤
│  FINANCIAL UNLOCKS (Pending Approval):                 │
│  1. [APPLY] Ayushman Bharat 70+ (₹5 Lakh Cover)       │
│     Aadhaar e-KYC link ready. Tap to authorize.        │
│  2. [APPROVE] Jan Aushadhi Switch                      │
│     Saves ₹85/mo on Blood Pressure medications.       │
└────────────────────────────────────────────────────────┘
```
