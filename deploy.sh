#!/bin/bash

# Exit on error
set -e

echo "🏗️  Building application..."
npm run build

echo "🚀 Deploying to App Engine..."
gcloud app deploy app.yaml --quiet

echo "✨ Deployment complete!"
echo "🌎 Your app will be available at: $(gcloud app browse --no-launch-browsere