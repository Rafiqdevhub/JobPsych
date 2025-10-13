# JobPsych Frontend - Production Deployment Guide

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Build Process](#build-process)
4. [Deployment Steps](#deployment-steps)
   - [Deployment Flow Overview](#deployment-flow-overview)
   - [Staging Environment Setup](#staging-environment-setup)
   - [Staging Testing & Validation](#staging-testing--validation)
   - [Production Deployment (After Staging Approval)](#production-deployment-after-staging-approval)
5. [Monitoring & Health Checks](#monitoring--health-checks)
6. [Performance Optimization](#performance-optimization)
7. [Troubleshooting](#troubleshooting)

---

## 🔍 Pre-Deployment Checklist

### Code Quality & Testing

- [ ] All unit tests passing (`npm run test`)
- [ ] All integration tests passing (`npm run test:integration`)
- [ ] All E2E tests passing (`npm run test:e2e`)
- [ ] Code coverage >= 80%
- [ ] No ESLint errors (`npm run lint`)
- [ ] Load testing completed
- [ ] Stress testing completed
- [ ] Memory leak testing completed

### Security Audit

- [ ] Content Security Policy configured
- [ ] Security headers implemented
- [ ] Input validation active
- [ ] Rate limiting configured
- [ ] HTTPS enabled
- [ ] Cookie consent banner active
- [ ] Privacy policy accessible
- [ ] No exposed secrets or API keys

### Performance Checks

- [ ] Bundle size optimized (< 250KB gzipped)
- [ ] Images optimized
- [ ] Code splitting implemented
- [ ] Lazy loading configured
- [ ] Service worker ready (if applicable)
- [ ] CDN configured
- [ ] Cache headers set

### Documentation

- [ ] README.md updated
- [ ] API documentation current
- [ ] Environment variables documented
- [ ] Deployment procedures documented
- [ ] Rollback strategy documented
- [ ] Staging environment configured
- [ ] Staging deployment tested

### Staging Environment Requirements

- [ ] Staging environment identical to production
- [ ] Staging API endpoints configured
- [ ] Staging domain/URL established
- [ ] Staging monitoring set up
- [ ] Staging security policies applied
- [ ] Staging performance baselines established

---

## 🛠️ Environment Setup

### Required Software

```bash
# Node.js version
Node.js >= 20.x

# Package manager
npm >= 10.x

# Build tools
Vite 6.x
```

### Environment Variables

Create `.env.production` file:

```env
# API Endpoints
VITE_AI_API_URL=https://your-api-domain.com/api
VITE_RESUME_API_URL=https://your-resume-api.com/api

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SECURITY_MONITORING=true

# CDN Configuration
VITE_CDN_URL=https://cdn.yourdomain.com

# Application Settings
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=production
```

### Infrastructure Requirements

#### Hosting Platform Options

**Option 1: Vercel (Recommended)**

- Automatic deployments from Git
- Global CDN
- Serverless functions support
- Free SSL certificates

**Option 2: Netlify**

- Similar features to Vercel
- Built-in forms
- Split testing

**Option 3: AWS S3 + CloudFront**

- Maximum control
- Cost-effective for high traffic
- Requires more configuration

#### Minimum Server Requirements

```
CPU: 2 cores
RAM: 4GB
Storage: 20GB SSD
Network: 100Mbps
```

---

## 🏗️ Build Process

### Step 1: Install Dependencies

```bash
# Clean install
rm -rf node_modules package-lock.json
npm ci

# Or with clean cache
npm cache clean --force
npm ci
```

### Step 2: Run Pre-Build Checks

```bash
# Run linting
npm run lint

# Run tests
npm run test -- --run
npm run test:integration
```

### Step 3: Build for Production

```bash
# Standard production build
npm run build

# Build with source maps (for debugging)
npm run build -- --sourcemap

# Build with bundle analysis
npm run build -- --analyze
```

### Step 4: Verify Build

```bash
# Preview production build locally
npm run preview

# Check build output
ls -lh dist/
du -sh dist/

# Verify bundle sizes
npx vite-bundle-visualizer
```

### Expected Build Output

```
dist/
├── index.html (9-10 KB)
├── assets/
│   ├── index-[hash].css (210-220 KB, ~22 KB gzipped)
│   ├── index-[hash].js (220-230 KB, ~67 KB gzipped)
│   ├── react-vendor-[hash].js (90 KB, ~31 KB gzipped)
│   ├── [page]-[hash].js (various sizes, code-split)
│   └── ... (other chunked assets)
└── robots.txt
└── sitemap.xml
```

### Build Optimization Tips

```bash
# Enable compression
npm run build -- --minify terser

# Tree shaking verification
npx vite-bundle-visualizer

# Check for duplicate dependencies
npx depcheck
```

---

## 🚀 Deployment Steps

### Deployment Flow Overview

**All deployments must follow this mandatory flow:**

```
Development → Staging Environment → Production Environment
                    ↓                           ↓
              Automated Tests            User Acceptance
              Performance Tests          Final Approval
              Security Scans            Production Deploy
```

**Staging Environment Requirements:**

- Identical infrastructure to production
- Full test suite execution
- Performance monitoring
- Security scanning
- Manual QA approval required before production

---

### Staging Environment Setup

#### 1. Create Staging Environment

**Vercel Staging:**

```bash
# Create staging deployment
vercel --prod=false

# Or use Git branch deployment
git checkout -b staging
git push origin staging
```

**Netlify Staging:**

```bash
# Create staging site
netlify sites:create --name jobpsych-staging

# Deploy to staging
netlify deploy --dir=dist --prod=false
```

**AWS S3 Staging:**

```bash
# Create staging bucket
aws s3 mb s3://jobpsych-staging --region us-east-1

# Configure CloudFront distribution for staging
aws cloudfront create-distribution --distribution-config file://staging-distribution.json
```

#### 2. Staging Environment Variables

Create `.env.staging` file (use `.env.staging.example` as template):

```env
# Staging API Endpoints (use staging/test APIs)
VITE_AI_API_URL=https://staging-api.jobpsych.com/api
VITE_RESUME_API_URL=https://staging-resume-api.jobpsych.com/api

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_SECURITY_MONITORING=true

# Application Settings
VITE_APP_VERSION=1.0.0-staging
VITE_APP_ENVIRONMENT=staging
```

#### 3. Staging Deployment Commands

```bash
# Build for staging
npm run build

# Deploy to staging
# Vercel
vercel --prod=false

# Netlify
netlify deploy --dir=dist --prod=false

# AWS
aws s3 sync dist/ s3://jobpsych-staging --delete
aws cloudfront create-invalidation --distribution-id YOUR_STAGING_DISTRIBUTION_ID --paths "/*"
```

---

### Staging Testing & Validation

#### Automated Tests in Staging

```bash
# Run full QA suite against staging URL
npm run test:qa -- --base-url=https://jobpsych-staging.vercel.app

# Run E2E tests against staging
npm run test:e2e -- --base-url=https://jobpsych-staging.vercel.app

# Run load tests against staging
cd loadtest && npm run test:load -- --target=https://jobpsych-staging.vercel.app
```

#### Manual QA Checklist

- [ ] All pages load correctly
- [ ] File upload functionality works
- [ ] API integrations functional
- [ ] Rate limiting displays properly
- [ ] Error handling works
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility checked
- [ ] Performance acceptable (< 3s load time)

#### Security Validation

- [ ] Security audit dashboard accessible
- [ ] No console errors or warnings
- [ ] HTTPS certificate valid
- [ ] CSP headers active
- [ ] Rate limiting functional

#### Performance Validation

- [ ] Lighthouse score > 90
- [ ] Bundle size within limits
- [ ] Core Web Vitals passing
- [ ] Memory usage stable

---

### Production Deployment (After Staging Approval)

**Prerequisites:**

- ✅ Staging deployment successful
- ✅ All staging tests passed
- ✅ Manual QA approved
- ✅ Security validation complete
- ✅ Performance benchmarks met
- ✅ Stakeholder approval obtained

#### Approval Process

1. **Technical Lead Review:**

   - Code quality assessment
   - Security audit review
   - Performance metrics validation

2. **QA Team Approval:**

   - Test results verification
   - Manual testing completion
   - Bug-free confirmation

3. **Product Owner Approval:**
   - Feature completeness
   - User experience validation
   - Business requirements met

---

### Vercel Deployment

#### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Option 2: Git Integration

```bash
# Push to main branch
git add .
git commit -m "Production ready: v1.0.0"
git push origin main

# Vercel auto-deploys from main branch
```

#### Vercel Configuration (vercel.json)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### Netlify Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### Netlify Configuration (netlify.toml)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### AWS S3 + CloudFront Deployment

```bash
# Build application
npm run build

# Sync to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### Docker Deployment

```bash
# Build Docker image
docker build -t jobpsych-frontend:latest .

# Run container
docker run -p 3000:80 jobpsych-frontend:latest

# Push to registry
docker tag jobpsych-frontend:latest your-registry/jobpsych:latest
docker push your-registry/jobpsych:latest
```

---

## 📊 Monitoring & Health Checks

### Health Check Endpoints

```bash
# Homepage load check
curl -I https://yourdomain.com/

# Security audit check
curl -I https://yourdomain.com/security-audit

# Check security headers
curl -I https://yourdomain.com/ | grep -i "x-"
```

### Performance Monitoring

#### Google Lighthouse

```bash
# Install Lighthouse CI
npm i -g @lhci/cli

# Run Lighthouse audit
lhci autorun --config=lighthouserc.json
```

#### Web Vitals Monitoring

```javascript
// Add to production build
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

function sendToAnalytics(metric) {
  // Send to your analytics endpoint
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Error Monitoring

#### Sentry Integration

```bash
# Install Sentry
npm install @sentry/react @sentry/vite-plugin

# Add to main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
  tracesSampleRate: 1.0,
});
```

### Uptime Monitoring Services

- **UptimeRobot**: Free tier available
- **Pingdom**: Comprehensive monitoring
- **StatusCake**: Multiple check types
- **AWS CloudWatch**: For AWS deployments

---

## ⚡ Performance Optimization

### CDN Configuration

```javascript
// vite.config.js
export default {
  base: process.env.VITE_CDN_URL || "/",
  build: {
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
};
```

### Caching Strategy

```nginx
# nginx.conf
location /assets/ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

location / {
  try_files $uri $uri/ /index.html;
  add_header Cache-Control "no-cache";
}
```

### Compression

```bash
# Enable Gzip/Brotli compression
# Vercel/Netlify handle this automatically

# For custom servers
npm install compression
```

---

## 🔧 Troubleshooting

### Common Issues

#### Issue: Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist .cache
npm ci
npm run build
```

#### Issue: Environment Variables Not Working

```bash
# Verify .env.production exists
cat .env.production

# Check variable names start with VITE_
# Rebuild after changes
npm run build
```

#### Issue: Routes Return 404

```bash
# Verify redirect rules in vercel.json or netlify.toml
# Ensure SPA fallback to index.html is configured
```

#### Issue: High Bundle Size

```bash
# Analyze bundle
npx vite-bundle-visualizer

# Check for:
# - Duplicate dependencies
# - Large unused libraries
# - Missing code splitting
```

### Performance Issues

```bash
# Check Lighthouse scores
npx lighthouse https://yourdomain.com --view

# Monitor Core Web Vitals
# - LCP < 2.5s
# - FID < 100ms
# - CLS < 0.1
```

### Security Issues

```bash
# Verify security headers
curl -I https://yourdomain.com/ | grep -E "(X-|Content-Security)"

# Check CSP
# Look for Content-Security-Policy header

# Test XSS protection
# Use security-audit dashboard at /security-audit
```

---

## 📞 Support & Resources

### Documentation Links

- [Vite Production Build](https://vitejs.dev/guide/build.html)
- [React Production Mode](https://react.dev/learn/start-a-new-react-project)
- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Deployment](https://docs.netlify.com/)

### Monitoring Tools

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Security Headers](https://securityheaders.com/)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)

---

## 🎯 Deployment Checklist Summary

### Before Deployment

- [ ] Tests passing (unit, integration, E2E)
- [ ] Code coverage meets requirements
- [ ] Security audit completed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Environment variables configured

### During Deployment

- [ ] Build successful
- [ ] Assets uploaded correctly
- [ ] CDN cache cleared/updated
- [ ] DNS configured (if needed)
- [ ] SSL certificate active

### After Deployment

- [ ] Homepage loads correctly
- [ ] All routes accessible
- [ ] API connections working
- [ ] Security headers present
- [ ] Performance metrics acceptable
- [ ] Error monitoring active
- [ ] Uptime monitoring configured

---

**Production Deployment Status**: ✅ Ready for Production

**Last Updated**: October 12, 2025
**Version**: 1.0.0
**Deployment Platform**: Vercel/Netlify/AWS
