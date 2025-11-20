#!/bin/bash

# Test script for Docker build and nginx configuration

set -e

IMAGE_NAME="astro-page-test"
CONTAINER_NAME="astro-page-test-container"

echo "🔨 Building Docker image..."
docker build -t $IMAGE_NAME .

echo ""
echo "✅ Build complete! Testing configuration..."
echo ""

echo "📁 Checking if files are in the container:"
docker run --rm $IMAGE_NAME ls -la /usr/share/nginx/html/partners_and_supporters_page/

echo ""
echo "🔍 Testing nginx configuration:"
docker run --rm $IMAGE_NAME nginx -t

echo ""
echo "📄 Checking nginx config file:"
docker run --rm $IMAGE_NAME cat /etc/nginx/conf.d/default.conf

echo ""
echo "🌐 Starting container to test routing..."
docker run -d --name $CONTAINER_NAME -p 8080:80 $IMAGE_NAME

echo "Waiting for nginx to start..."
sleep 2

echo ""
echo "🧪 Testing routes:"
echo ""

echo "1. Testing /partners_and_supporters_page (should return 200):"
curl -I http://localhost:8080/partners_and_supporters_page 2>/dev/null | head -1

echo ""
echo "2. Testing /partners_and_supporters_page/ (with trailing slash):"
curl -I http://localhost:8080/partners_and_supporters_page/ 2>/dev/null | head -1

echo ""
echo "3. Testing /partners_and_supporters_page/index.html (direct):"
curl -I http://localhost:8080/partners_and_supporters_page/index.html 2>/dev/null | head -1

echo ""
echo "4. Checking page title (should contain 'Partners & Supporters'):"
curl -s http://localhost:8080/partners_and_supporters_page | grep -i "<title>" | head -1

echo ""
echo "5. Checking page content (should contain 'POWERING'):"
curl -s http://localhost:8080/partners_and_supporters_page | grep -i "POWERING" | head -1

echo ""
echo "🧹 Cleaning up..."
docker stop $CONTAINER_NAME > /dev/null 2>&1
docker rm $CONTAINER_NAME > /dev/null 2>&1

echo ""
echo "✅ Tests complete!"

