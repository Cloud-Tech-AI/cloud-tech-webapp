# AWS Amplify Deployment Guide

## 🚨 Common Issues & Solutions

### 1. Build Failures

**Issue**: Build fails with dependency errors
**Solution**:
```yaml
# In amplify.yml
preBuild:
  commands:
    - echo "Node version:" && node --version
    - echo "NPM version:" && npm --version
    - npm ci --legacy-peer-deps  # Use this instead of npm ci
```

**Issue**: Build fails with "Module not found" errors
**Solution**:
- Ensure all dependencies are in `package.json`
- Use `npm install` instead of `npm ci` if needed
- Check for case-sensitive file imports

### 2. Static Export Issues

**Issue**: Pages not found after deployment
**Solution**:
```javascript
// next.config.js
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/contact': { page: '/contact' },
      '/blog': { page: '/blog' },
      '/podcast': { page: '/podcast' },
      '/speaking': { page: '/speaking' },
    }
  },
}
```

### 3. Environment Variables

**Issue**: Environment variables not working
**Solution**:
1. Add variables in Amplify Console:
   - Go to App Settings > Environment variables
   - Add all `NEXT_PUBLIC_*` variables
   - Redeploy the app

2. For build-time variables:
```yaml
# amplify.yml
frontend:
  phases:
    preBuild:
      commands:
        - echo "NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL" >> .env.production
```

### 4. Routing Issues

**Issue**: Client-side routing not working
**Solution**:
```yaml
# amplify.yml - Add custom headers for SPA
customHeaders:
  - pattern: '**/*'
    headers:
      - key: 'X-Frame-Options'
        value: 'DENY'
  - pattern: '**/*.html'
    headers:
      - key: 'Cache-Control'
        value: 'public, max-age=3600'
```

## 🔧 Step-by-Step Deployment

### 1. Prepare Your Repository

```bash
# Ensure your code is committed
git add .
git commit -m "Prepare for Amplify deployment"
git push origin main
```

### 2. Connect to Amplify

1. Go to AWS Amplify Console
2. Click "New app" > "Host web app"
3. Connect your GitHub repository
4. Select the branch (usually `main`)

### 3. Configure Build Settings

Use this `amplify.yml`:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - echo "Node version:" && node --version
        - echo "NPM version:" && npm --version
        - npm ci --legacy-peer-deps
    build:
      commands:
        - echo "Starting build process..."
        - npm run build
        - echo "Build completed successfully"
        - ls -la out/
  artifacts:
    baseDirectory: out
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### 4. Set Environment Variables

In Amplify Console > App Settings > Environment variables:
```
NEXT_PUBLIC_SITE_URL=https://your-app.amplifyapp.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your-space-id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your-token
```

### 5. Deploy

Click "Save and deploy" - Amplify will:
1. Clone your repository
2. Install dependencies
3. Build your app
4. Deploy to CDN

## 🐛 Debugging Build Issues

### Check Build Logs

1. Go to Amplify Console
2. Click on your app
3. Go to the failed build
4. Check each phase for errors

### Common Error Messages

**"Module not found: Can't resolve"**
```bash
# Solution: Check import paths and case sensitivity
# Ensure all files exist and are properly imported
```

**"Command failed with exit code 1"**
```bash
# Solution: Check the specific command that failed
# Often related to TypeScript errors or missing dependencies
```

**"ENOENT: no such file or directory"**
```bash
# Solution: File path issues
# Check that all referenced files exist
```

### Local Testing

Before deploying, test locally:
```bash
# Clean build
npm run clean
npm install
npm run build

# Test the built files
npm run serve
# Visit http://localhost:3000
```

## 🚀 Performance Optimization

### 1. Enable Compression

Amplify automatically enables gzip compression, but you can optimize further:

```yaml
# amplify.yml
customHeaders:
  - pattern: '**/*.js'
    headers:
      - key: 'Cache-Control'
        value: 'public, max-age=31536000, immutable'
  - pattern: '**/*.css'
    headers:
      - key: 'Cache-Control'
        value: 'public, max-age=31536000, immutable'
```

### 2. Image Optimization

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['images.unsplash.com', 'your-cdn.com'],
    unoptimized: true, // Required for static export
  },
}
```

### 3. Bundle Analysis

```bash
npm run build:analyze
```

## 🔒 Security Headers

```yaml
# amplify.yml
customHeaders:
  - pattern: '**/*'
    headers:
      - key: 'X-Frame-Options'
        value: 'DENY'
      - key: 'X-XSS-Protection'
        value: '1; mode=block'
      - key: 'X-Content-Type-Options'
        value: 'nosniff'
      - key: 'Referrer-Policy'
        value: 'strict-origin-when-cross-origin'
      - key: 'Content-Security-Policy'
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:;"
```

## 📊 Monitoring

### 1. Enable Access Logs

In Amplify Console:
1. Go to Monitoring
2. Enable access logs
3. View in CloudWatch

### 2. Set Up Alarms

Create CloudWatch alarms for:
- Build failures
- High error rates
- Performance issues

## 🔄 Continuous Deployment

### Auto-Deploy on Push

Amplify automatically deploys when you push to the connected branch.

### Branch-Based Deployments

1. Create feature branches
2. Amplify can create preview deployments
3. Merge to main for production deployment

## 📝 Troubleshooting Checklist

- [ ] All dependencies in package.json
- [ ] No TypeScript errors
- [ ] Environment variables set
- [ ] Build succeeds locally
- [ ] Static export configured
- [ ] Routing configured for SPA
- [ ] Images optimized
- [ ] Security headers configured

## 🆘 Getting Help

If you're still having issues:

1. Check AWS Amplify documentation
2. Review build logs carefully
3. Test locally first
4. Check GitHub issues for similar problems
5. Contact AWS support if needed

## 📋 Pre-Deployment Checklist

Before deploying to Amplify:

- [ ] Code committed and pushed to GitHub
- [ ] Build succeeds locally (`npm run build`)
- [ ] All environment variables documented
- [ ] Static export working (`npm run serve`)
- [ ] No console errors in browser
- [ ] All pages accessible
- [ ] Images loading correctly
- [ ] Forms working (if applicable)
- [ ] Analytics configured
- [ ] SEO meta tags in place

---

**Ready to deploy!** Follow this guide step by step, and your Cloud Tech webapp should deploy successfully to AWS Amplify.
