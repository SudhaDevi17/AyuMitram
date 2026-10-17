#!/usr/bin/env bash
# ==============================================================================
# Ayu Mitram - Automated 1-Command Google Cloud Run Deployment
# Usage:
#   export GCP_PROJECT_ID="your-project-id" && ./deploy-gcp.sh
#   OR
#   ./deploy-gcp.sh your-project-id
# ==============================================================================

set -euo pipefail

PROJECT_ID="${GCP_PROJECT_ID:-${1:-}}"
SERVICE_NAME="ayu-mitram"
REGION="${REGION:-asia-south1}"

if [ -z "${PROJECT_ID}" ]; then
    echo "❌ Error: Project ID is required."
    echo "Usage:"
    echo "  ./deploy-gcp.sh <YOUR_PROJECT_ID>"
    echo "  OR"
    echo "  export GCP_PROJECT_ID=<YOUR_PROJECT_ID> && ./deploy-gcp.sh"
    exit 1
fi

echo "=========================================================="
echo "🚀 Deploying Ayu Mitram to Google Cloud Run"
echo "Project ID: ${PROJECT_ID}"
echo "Service:    ${SERVICE_NAME}"
echo "Region:     ${REGION}"
echo "=========================================================="

# Check if gcloud CLI is available
if ! command -v gcloud &> /dev/null; then
    echo "⚠️  'gcloud' CLI is not found in PATH."
    echo "To deploy directly from your local terminal or Google Cloud Shell, run:"
    echo "   gcloud config set project ${PROJECT_ID}"
    echo "   gcloud run deploy ${SERVICE_NAME} --source . --region ${REGION} --allow-unauthenticated --port 8080 --project ${PROJECT_ID}"
    exit 1
fi

echo "Setting active GCP project to ${PROJECT_ID}..."
gcloud config set project "${PROJECT_ID}"

echo "Enabling necessary Google Cloud APIs..."
gcloud services enable \
    run.googleapis.com \
    cloudbuild.googleapis.com \
    artifactregistry.googleapis.com \
    --project "${PROJECT_ID}"

echo "Deploying container directly from source to Cloud Run..."
gcloud run deploy "${SERVICE_NAME}" \
    --source . \
    --region "${REGION}" \
    --platform managed \
    --allow-unauthenticated \
    --port 8080 \
    --memory 1Gi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 3 \
    --set-env-vars "NODE_ENV=production,PORT=8080" \
    --project "${PROJECT_ID}"

echo ""
echo "✅ Deployment successful! Service URL:"
gcloud run services describe "${SERVICE_NAME}" --region "${REGION}" --project "${PROJECT_ID}" --format='value(status.url)'
echo "=========================================================="
