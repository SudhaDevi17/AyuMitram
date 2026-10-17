# Deployment & Evaluation Security Guide

## 🌐 Live URLs

- **Live Preview Application:** `https://ais-pre-k5enfldhp4hwqm5nmmtf6w-207093956075.asia-east1.run.app`
- **Development App:** `https://ais-dev-k5enfldhp4hwqm5nmmtf6w-207093956075.asia-east1.run.app`

---

## 🚀 1-Command Deployment to Google Cloud Run

You can deploy directly to Google Cloud Run using either Google Cloud Shell or your local machine with `gcloud`. Replace `<YOUR_GCP_PROJECT_ID>` with your project ID/number:

### Option A: Using the Included Script
```bash
# Pass your project ID as argument or environment variable:
./deploy-gcp.sh <YOUR_GCP_PROJECT_ID>

# Or:
export GCP_PROJECT_ID="<YOUR_GCP_PROJECT_ID>"
./deploy-gcp.sh
```

### Option B: Direct Cloud Run Deployment from Source
```bash
gcloud run deploy ayu-mitram \
  --source . \
  --region asia-south1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 3 \
  --project <YOUR_GCP_PROJECT_ID>
```

### Option C: Cloud Build Automation
```bash
gcloud builds submit --config cloudbuild.yaml --project <YOUR_GCP_PROJECT_ID>
```

---

## 🛡️ Judge Evaluation Security & Anti-Misuse Architecture

To allow hackathon judges and evaluators to thoroughly test all features while strictly preventing automated abuse, payload stuffing, and Gemini API quota exhaustion, the following multi-tier safeguards are active:

1. **Sliding-Window Rate Limiting (`server.ts`):**
   - **Burst Protection:** Max 15 requests/minute per client IP.
   - **Session Allocation:** 80 requests per 30-minute rolling evaluation session.
   - **Global Circuit Breaker:** Hourly cap to protect underlying API tokens.
   - **HTTP 429 Status:** Clear, friendly JSON response with retry headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`).

2. **Input Payload Sanitization:**
   - Text inputs capped at 2,000 characters to prevent prompt injection or context stuffing.
   - Voice audio inputs verified before pipeline dispatch.

3. **Quota Observability:**
   - Live endpoint: `GET /api/quota-status`
   - Real-time **Judge Quota Badge** displayed in the app header showing remaining evaluation tokens (e.g., `80/80`).
   - Dismissible warning banner displayed if rate limits are approached.

4. **Role-Based Demo Logins (RBAC):**
   - **Smt. Sunita Devi (Asha / Sakhi Volunteer):** Field care intake, voice-first visits, offline sync.
   - **Venkatamma (72yo Elder Beneficiary):** Voice companion, large typography, vernacular language toggle.
   - **Ramesh (Remote Family Member in Bengaluru):** Care timeline, push alerts, ABHA card access.
   - **Dr. Ashok Kulkarni (District Health Officer):** Public health dashboard, Ayushman Bharat coverage analytics.
   - **Judge Evaluation Fast Pass:** 1-click bypass on the login screen for instant evaluator switching between all 4 personas.
