#!/bin/bash

# Cloud Tech Website Deployment Script

echo "🚀 Starting Cloud Tech Website Deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Export static files
echo "📤 Exporting static files..."
npm run export

echo "✅ Build complete! Files are ready in the 'out' directory."
echo ""
echo "📋 Next steps:"
echo "1. Upload the contents of the 'out' directory to your web server"
echo "2. Configure your web server to serve the files"
echo "3. Set up any necessary redirects"
echo ""
echo "🌐 For GitHub Pages deployment:"
echo "1. Push the 'out' directory contents to your gh-pages branch"
echo "2. Enable GitHub Pages in your repository settings"
echo ""
echo "🎉 Your Cloud Tech website is ready to go live!"
