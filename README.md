# AyuMitram (आयु मित्रम्)

> **Ayu Mitram is the AI that turns every caring visit to an elder into a health, emotional and money outcome, for any community care network, at no cost to the elder.**

---

## 🌟 Overview

**Ayu Mitram** is an AI-powered Care & Welfare Navigator engineered specifically for India's 140M+ senior citizens (50+ elders), their family caregivers, and grassroots community health workers (ASHAs / Anganwadi / volunteers).

Elderly healthcare in India faces three systemic chasms:
1. **Financial Drain:** Elders spend exorbitant amounts on branded chronic illness medications when verified WHO-GMP certified generic equivalents (Pradhan Mantri Jan Aushadhi Kendras) cost 50% to 90% less.
2. **Entitlement Friction:** Senior welfare schemes like **Ayushman Bharat - PM-JAY Senior Citizen (Vaya Vandana Card - ₹5 Lakh free hospital cover for age 70+)** have complex paperwork and digital divides.
3. **Isolation & Routine Adherence:** Seniors struggle with small-font apps, complex interfaces, and medical jargon.

Ayu Mitram bridges these gaps with **voice-first multilingual vernacular interactions, high-contrast accessible typography, smart prescription scanning, generic medication cost calculators, and 1-tap welfare entitlement eligibility checks**.

---

## 🚀 Key Capabilities & Modules

### 1. 💊 Jan Aushadhi Generic Medicine Optimizer
- Scans or matches prescribed branded medicines to **Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)** equivalents.
- Instantly computes **monthly and annual rupee savings** (typically ₹2,000 to ₹12,000+ per year).
- Provides composition breakdowns and nearby Jan Aushadhi Kendra locator assistance.

### 2. 🏛️ Ayushman Bharat & Welfare Navigator
- Guided eligibility assessment for:
  - **Ayushman Bharat Vaya Vandana Card (PM-JAY 70+)**: Dedicated ₹5 Lakh top-up cover regardless of income.
  - **National Programme for Health Care of the Elderly (NPHCE)**.
  - **Indira Gandhi National Old Age Pension Scheme (IGNOAPS)**.
  - **Rashtriya Vayoshri Yojana (RVY)** for assisted living devices (hearing aids, wheelchairs, spectacles).
- Step-by-step document checklist and local CSC / e-Seva center preparation.

### 3. 🎙️ Multilingual Vernacular Voice Companion
- High-contrast UI with large touch targets and text sizes designed for 50+ seniors.
- Supports **Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, and English**.
- Text-to-speech reading for dosage schedules and safety advisories.

### 4. 🚨 Emergency SOS & Family Caregiver Sync
- One-tap emergency distress dispatch with automated GPS coordinate sharing.
- Daily check-in log and medication adherence trackers shared with family caregivers via WhatsApp-ready summaries.

### 5. 🛡️ Evaluation Safeguards & Anti-Abuse Rate Limiting
- Built-in **sliding window rate limiter** and **global quota controller**.
- Allows judges, evaluators, and test users to experience live AI interactions without quota exhaustion or denial-of-service abuse.
- Real-time evaluation status indicator and remaining quota telemetry.

---

## 🧪 Judge & Evaluator Quick Start

Ayu Mitram features pre-configured **1-Click Demo Profiles** on the login screen for instant evaluation:

| Role | Profile | Key Evaluation Flow |
| :--- | :--- | :--- |
| **Elderly Citizen** | **Ramesh Chandra (Age 72, Jaipur)** | Evaluates PM-JAY Vaya Vandana eligibility & Jan Aushadhi BP/Diabetes medicine cost reduction |
| **Family Caregiver** | **Pooja Sharma (Daughter, Bengaluru)** | Evaluates remote elder vital logs, WhatsApp caregiver updates & SOS alert triggers |
| **Community Health Worker** | **Sunita Devi (ASHA Worker, Gorakhpur)** | Evaluates multi-senior village roster, offline visit logging & welfare entitlement filing |

---

## 🏗️ Architecture & Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                       Ayu Mitram UI                         │
│   React 19 • TypeScript • Tailwind CSS • Motion • Lucide    │
│   High-Contrast A11y UI • Audio Synthesizer • Camera Scan   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                REST & Streaming Proxy Endpoints
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    Express Backend Layer                    │
│   Rate Limiting Middleware • Quota Guard • Session Guard    │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                 Google Gemini 2.5 API Layer                 │
│   Multimodal Document & Prescription Extraction Engine      │
│   Vernacular Clinical Simplification & Scheme Reasoning     │
└─────────────────────────────────────────────────────────────┘
```

- **Frontend:** React 19 SPA, TypeScript, Tailwind CSS v4, Lucide React, Framer Motion.
- **Server:** Node.js Express proxy with built-in security rate limiters and quota metrics (`/api/quota-status`).
- **AI Engine:** Google `@google/genai` TypeScript SDK (Gemini 2.5 Flash / Flash Lite).
- **Containerization:** Production Docker image running Node 22 Alpine, non-root security user, optimized multi-stage build.

---

## 💻 Local Development Setup

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# 1. Clone repository
git clone https://github.com/SudhaDevi17/AyuMitram.git
cd AyuMitram

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Set your GEMINI_API_KEY in .env

# 4. Start local development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## ☁️ Google Cloud Deployment (Cloud Run / Cloud Build)

Ayu Mitram includes pre-packaged production deployment tooling:

### 1-Command Cloud Run Deployment:
```bash
export GCP_PROJECT_ID="your-gcp-project-id"
export REGION="asia-south1" # or us-central1
./deploy-gcp.sh
```

### Google Cloud Build Pipeline:
```bash
gcloud builds submit --config=cloudbuild.yaml --project="your-gcp-project-id"
```

Refer to [`docs/DEPLOYMENT_GCP.md`](docs/DEPLOYMENT_GCP.md) for detailed deployment configurations, IAM bindings, and Cloud Run scaling options.

---

## 📂 Project Structure

```
├── docs/                      # Architectural, clinical & business documentation
│   ├── ARCHITECTURE.md        # Technical design & data pipeline
│   ├── DEPLOYMENT_GCP.md      # Cloud deployment & judge evaluation guide
│   ├── PRD.md                 # Product requirements document
│   └── OPERATIONAL_MODES.md   # Caretaker, elder & field worker operational flows
├── src/                       # Application source code
│   ├── App.tsx                # Main application component & evaluation shell
│   ├── main.tsx               # Client React entrypoint
│   └── index.css              # Global styling & accessibility themes
├── cloudbuild.yaml            # Google Cloud Build CI/CD pipeline
├── Dockerfile                 # Production multi-stage container
├── deploy-gcp.sh              # 1-command deployment script
├── server.ts                  # Production Express server & rate limiting proxy
└── package.json               # Application dependencies & scripts
```

---

## 🔒 Security & Privacy Posture

- **Zero Secrets in Repository:** All API keys and cloud identifiers are read from environment variables or Google Secret Manager at runtime.
- **Client Sanitization:** Browser clients never hold or access master AI API keys; all calls route through the secured backend proxy.
- **Evaluator Quota Guard:** Prevents denial-of-service and runaway inference consumption via strict token bucket rate limiting.
- **Data Minimization:** No personal health information (PHI) is permanently persisted without elder consent.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
