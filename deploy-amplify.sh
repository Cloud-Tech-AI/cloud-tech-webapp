#!/bin/bash

# Cloud Tech Webapp - Amplify Deployment Script
# This script prepares and validates the app for AWS Amplify deployment

set -e  # Exit on any error

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

print_header() {
    echo -e "\n${BLUE}================================${NC}"
    echo -e "${BLUE} $1${NC}"
    echo -e "${BLUE}================================${NC}\n"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_header "AWS Amplify Deployment Preparation"

# Step 1: Environment Check
print_status "Checking environment..."

# Check Node.js version
NODE_VERSION=$(node --version)
print_status "Node.js version: $NODE_VERSION"

if [[ "$NODE_VERSION" < "v18" ]]; then
    print_warning "Node.js version should be 18 or higher for optimal compatibility"
fi

# Check npm version
NPM_VERSION=$(npm --version)
print_status "npm version: $NPM_VERSION"

# Step 2: Clean previous builds
print_status "Cleaning previous builds..."
rm -rf .next out node_modules/.cache

# Step 3: Install dependencies
print_status "Installing dependencies..."
npm ci --legacy-peer-deps

# Step 4: Type checking
print_status "Running TypeScript type check..."
if npm run type-check; then
    print_success "TypeScript type check passed"
else
    print_error "TypeScript type check failed"
    exit 1
fi

# Step 5: Linting
print_status "Running ESLint..."
if npm run lint; then
    print_success "ESLint check passed"
else
    print_warning "ESLint found issues. Consider fixing them before deployment."
fi

# Step 6: Build the application
print_status "Building the application..."
if npm run build; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Step 7: Verify build output
print_status "Verifying build output..."

if [ ! -d "out" ]; then
    print_error "Build output directory 'out' not found"
    exit 1
fi

# Count files in output
FILE_COUNT=$(find out -type f | wc -l)
print_status "Build output contains $FILE_COUNT files"

# Check for essential files
ESSENTIAL_FILES=("out/index.html" "out/about/index.html" "out/contact/index.html")
for file in "${ESSENTIAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_success "✓ $file exists"
    else
        print_error "✗ $file missing"
        exit 1
    fi
done

# Step 8: Test the build locally (optional)
print_status "Testing build locally..."
print_status "Starting local server on port 3001..."

# Start server in background
npx serve out -s -p 3001 &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Test if server is responding
if curl -s http://localhost:3001 > /dev/null; then
    print_success "Local server is responding"
else
    print_warning "Local server test failed, but continuing..."
fi

# Kill the test server
kill $SERVER_PID 2>/dev/null || true

# Step 9: Git status check
print_status "Checking Git status..."

if [ -d ".git" ]; then
    # Check if there are uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        print_warning "You have uncommitted changes:"
        git status --short
        echo
        read -p "Do you want to commit these changes? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git add .
            read -p "Enter commit message: " commit_message
            git commit -m "$commit_message"
            print_success "Changes committed"
        else
            print_warning "Proceeding with uncommitted changes"
        fi
    else
        print_success "Git working directory is clean"
    fi

    # Check current branch
    CURRENT_BRANCH=$(git branch --show-current)
    print_status "Current branch: $CURRENT_BRANCH"

    # Push to remote
    read -p "Push to remote repository? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push origin $CURRENT_BRANCH
        print_success "Pushed to remote repository"
    fi
else
    print_warning "Not a Git repository"
fi

# Step 10: Environment variables check
print_status "Checking environment variables..."

ENV_FILE=".env.local"
if [ -f "$ENV_FILE" ]; then
    print_success "Environment file found: $ENV_FILE"
    print_status "Environment variables to set in Amplify Console:"
    echo
    grep "^NEXT_PUBLIC_" $ENV_FILE | while read line; do
        echo "  $line"
    done
    echo
else
    print_warning "No .env.local file found"
fi

# Step 11: Amplify configuration check
print_status "Checking Amplify configuration..."

if [ -f "amplify.yml" ]; then
    print_success "amplify.yml found"
    
    # Validate amplify.yml syntax
    if command -v yq &> /dev/null; then
        if yq eval . amplify.yml > /dev/null 2>&1; then
            print_success "amplify.yml syntax is valid"
        else
            print_error "amplify.yml syntax error"
            exit 1
        fi
    else
        print_warning "yq not installed, skipping amplify.yml validation"
    fi
else
    print_error "amplify.yml not found"
    exit 1
fi

# Step 12: Bundle size analysis
print_status "Analyzing bundle size..."
if command -v du &> /dev/null; then
    BUNDLE_SIZE=$(du -sh out | cut -f1)
    print_status "Total bundle size: $BUNDLE_SIZE"
    
    # Check if bundle is too large
    BUNDLE_SIZE_MB=$(du -sm out | cut -f1)
    if [ "$BUNDLE_SIZE_MB" -gt 100 ]; then
        print_warning "Bundle size is quite large ($BUNDLE_SIZE). Consider optimization."
    else
        print_success "Bundle size is reasonable ($BUNDLE_SIZE)"
    fi
fi

# Step 13: Security check
print_status "Running security checks..."

# Check for sensitive files
SENSITIVE_FILES=(".env" ".env.local" ".env.production" "*.key" "*.pem")
for pattern in "${SENSITIVE_FILES[@]}"; do
    if find out -name "$pattern" -type f | grep -q .; then
        print_error "Sensitive files found in build output: $pattern"
        exit 1
    fi
done

print_success "No sensitive files found in build output"

# Step 14: Final summary
print_header "Deployment Summary"

print_success "✅ All checks passed!"
print_status "Your app is ready for AWS Amplify deployment"
echo
print_status "Next steps:"
echo "1. Go to AWS Amplify Console"
echo "2. Connect your GitHub repository"
echo "3. Use the amplify.yml configuration"
echo "4. Set environment variables in Amplify Console"
echo "5. Deploy!"
echo

print_status "Environment variables to set in Amplify:"
if [ -f "$ENV_FILE" ]; then
    grep "^NEXT_PUBLIC_" $ENV_FILE | sed 's/^/  /'
else
    echo "  NEXT_PUBLIC_SITE_URL=https://your-app.amplifyapp.com"
    echo "  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX"
    echo "  (Add other variables as needed)"
fi

echo
print_status "Build artifacts location: ./out/"
print_status "Total files: $FILE_COUNT"
print_status "Bundle size: $BUNDLE_SIZE"

print_header "Deployment Ready! 🚀"

# Optional: Open Amplify Console
read -p "Open AWS Amplify Console in browser? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v xdg-open &> /dev/null; then
        xdg-open "https://console.aws.amazon.com/amplify/home"
    elif command -v open &> /dev/null; then
        open "https://console.aws.amazon.com/amplify/home"
    else
        print_status "Please visit: https://console.aws.amazon.com/amplify/home"
    fi
fi
