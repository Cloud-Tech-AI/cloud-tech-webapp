# Deployment Guide

This guide covers various deployment options for the Cloud Tech website.

## 🚀 Quick Deployment

### Option 1: Automated Script
```bash
./deploy.sh
```

### Option 2: Manual Steps
```bash
npm install
npm run build
npm run export
```

## 🌐 Deployment Platforms

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically
4. Custom domain setup available

**Pros**: Zero configuration, automatic deployments, great performance
**Cons**: None for static sites

### Netlify
1. Build: `npm run build && npm run export`
2. Upload `out/` folder to Netlify
3. Configure redirects in `netlify.toml` if needed

**Pros**: Easy drag-and-drop deployment, form handling
**Cons**: Build time limits on free plan

### GitHub Pages
1. Build the project locally
2. Push `out/` contents to `gh-pages` branch
3. Enable GitHub Pages in repository settings

**Pros**: Free hosting, integrated with GitHub
**Cons**: Static sites only, limited features

### AWS S3 + CloudFront
1. Build the project: `npm run build && npm run export`
2. Upload `out/` contents to S3 bucket
3. Configure CloudFront distribution
4. Set up custom domain

**Pros**: Highly scalable, CDN included, cost-effective
**Cons**: More complex setup

### Traditional Web Hosting
1. Build: `npm run build && npm run export`
2. Upload `out/` folder contents via FTP/SFTP
3. Configure web server (Apache/Nginx)

**Pros**: Full control, works with any hosting provider
**Cons**: Manual deployment process

## ⚙️ Configuration

### Environment Variables
Create `.env.local` for production:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Custom Domain
1. Update `NEXT_PUBLIC_SITE_URL` in environment variables
2. Configure DNS records
3. Set up SSL certificate

### CDN Configuration
For optimal performance, configure your CDN to:
- Cache static assets (JS, CSS, images) for 1 year
- Cache HTML files for 1 hour
- Enable gzip compression
- Set proper cache headers

## 🔧 Build Optimization

### Production Build
```bash
npm run build
```

### Static Export
```bash
npm run export
```

### Bundle Analysis
```bash
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

## 📊 Performance Monitoring

### Core Web Vitals
- Monitor LCP (Largest Contentful Paint)
- Track FID (First Input Delay)
- Measure CLS (Cumulative Layout Shift)

### Tools
- Google PageSpeed Insights
- Lighthouse
- WebPageTest
- GTmetrix

## 🔒 Security

### HTTPS
Always use HTTPS in production:
- Obtain SSL certificate
- Configure redirects from HTTP to HTTPS
- Update all internal links to use HTTPS

### Security Headers
Configure these headers on your web server:
```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## 🚨 Troubleshooting

### Common Issues

**Build Fails**
- Check Node.js version (18+ required)
- Clear node_modules and reinstall
- Check for TypeScript errors

**Images Not Loading**
- Verify image paths are correct
- Check Next.js Image configuration
- Ensure images are in public/ directory

**Routing Issues**
- Configure web server for SPA routing
- Set up proper redirects
- Check basePath configuration

**Performance Issues**
- Optimize images
- Enable compression
- Configure CDN
- Minimize bundle size

### Support
If you encounter issues:
1. Check the troubleshooting section
2. Review build logs
3. Test locally first
4. Contact support team

## 📈 Monitoring

### Analytics Setup
1. Add Google Analytics ID to environment variables
2. Configure tracking events
3. Set up conversion goals
4. Monitor user behavior

### Error Tracking
Consider adding error tracking:
- Sentry
- LogRocket
- Bugsnag

### Uptime Monitoring
Set up monitoring for:
- Website availability
- Performance metrics
- SSL certificate expiration
- Domain expiration

---

**Need Help?** Contact the development team or check the main README for additional support options.
