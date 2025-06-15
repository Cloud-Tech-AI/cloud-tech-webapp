#!/bin/bash

# Cloud Tech Website Build Script
# This script provides better error handling and logging for the build process

set -e  # Exit on any error

echo "🚀 Starting Cloud Tech Website Build Process..."
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ to continue."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_warning "Node.js version is $NODE_VERSION. Recommended version is 18+."
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm to continue."
    exit 1
fi

# Clean previous build
print_status "Cleaning previous build artifacts..."
rm -rf .next out
print_success "Cleaned previous build artifacts"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed"
else
    print_status "Dependencies already installed"
fi

# Type checking
print_status "Running TypeScript type checking..."
if npm run type-check; then
    print_success "TypeScript type checking passed"
else
    print_error "TypeScript type checking failed"
    exit 1
fi

# Linting
print_status "Running ESLint..."
if npm run lint; then
    print_success "Linting passed"
else
    print_warning "Linting issues found, but continuing with build..."
fi

# Build the application
print_status "Building the application..."
if npm run build; then
    print_success "Build completed successfully!"
else
    print_error "Build failed!"
    exit 1
fi

# Check if out directory was created
if [ -d "out" ]; then
    print_success "Static export created in 'out' directory"
    
    # Show build statistics
    print_status "Build Statistics:"
    echo "  - Total files: $(find out -type f | wc -l)"
    echo "  - Total size: $(du -sh out | cut -f1)"
    echo "  - HTML files: $(find out -name "*.html" | wc -l)"
    echo "  - JS files: $(find out -name "*.js" | wc -l)"
    echo "  - CSS files: $(find out -name "*.css" | wc -l)"
else
    print_error "Static export directory 'out' was not created"
    exit 1
fi

echo ""
echo "================================================"
print_success "Build process completed successfully! 🎉"
echo ""
print_status "Next steps:"
echo "  1. Test locally: npm run serve"
echo "  2. Deploy the 'out' directory to your hosting provider"
echo "  3. Or use: npm run start (to serve with npx serve)"
echo ""
