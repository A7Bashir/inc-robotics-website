#!/bin/bash

# INC Robotics Backend - Cloud Run Deployment Script
# This script deploys the backend to Google Cloud Run

echo "🚀 Deploying INC Robotics Backend to Cloud Run..."

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud CLI is not installed. Please install it first:"
    echo "   https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if user is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "❌ Please authenticate with Google Cloud first:"
    echo "   gcloud auth login"
    exit 1
fi

# Set project ID (replace with your actual project ID)
PROJECT_ID="inc-robotics-ai-agent"
REGION="us-central1"
SERVICE_NAME="ali-backend"

echo "📋 Project: $PROJECT_ID"
echo "🌍 Region: $REGION"
echo "🔧 Service: $SERVICE_NAME"

# Set the project
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "🔌 Enabling required APIs..."
gcloud services enable run.googleapis.com
gcloud services enable aiplatform.googleapis.com

# Build and deploy to Cloud Run
echo "🏗️ Building and deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --source . \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 8080 \
  --memory 1Gi \
  --cpu 1 \
  --max-instances 10 \
  --min-instances 0 \
  --timeout 300

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")

echo "✅ Deployment successful!"
echo "🌐 Service URL: $SERVICE_URL"
echo "🔗 Health Check: $SERVICE_URL/api/health"
echo "🤖 Ali AI Endpoint: $SERVICE_URL/api/chat"

# Test the deployment
echo "🧪 Testing the deployment..."
curl -s "$SERVICE_URL/api/health" | jq '.' || echo "Health check failed"

echo ""
echo "🎉 Ali is now live on Google Cloud Run!"
echo "📝 Don't forget to update your frontend to use: $SERVICE_URL"
