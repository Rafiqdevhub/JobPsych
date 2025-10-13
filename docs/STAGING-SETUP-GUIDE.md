# Staging Environment Setup Guide

## Overview

The JobPsych frontend now requires all deployments to go through a staging environment before production. This ensures quality and stability of releases.

## Branch Protection Rules

### Staging Branch (`staging`)

- **Required status checks**: All CI must pass
- **Required reviews**: At least 1 reviewer
- **Include administrators**: Yes
- **Restrict pushes**: Only maintainers can push
- **Allow force pushes**: No
- **Allow deletions**: No

### Main Branch (`main`)

- **Required status checks**: All CI must pass
- **Required reviews**: At least 2 reviewers
- **Include administrators**: Yes
- **Restrict pushes**: Only maintainers can push
- **Allow force pushes**: No
- **Allow deletions**: No

## Required Secrets

Configure these secrets in your GitHub repository settings:

### Vercel Deployment

- `VERCEL_TOKEN`: Vercel API token for deployments
- `VERCEL_PROJECT_ID`: Project ID for staging deployment
- `VERCEL_ORG_ID`: Organization ID for Vercel

### Netlify Deployment (Alternative)

- `NETLIFY_AUTH_TOKEN`: Netlify authentication token
- `NETLIFY_SITE_ID`: Site ID for staging deployment

### AWS Deployment (Alternative)

- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `AWS_REGION`: AWS region (e.g., us-east-1)
- `S3_BUCKET_STAGING`: S3 bucket name for staging
- `CLOUDFRONT_DISTRIBUTION_ID_STAGING`: CloudFront distribution ID

### Testing

- `STAGING_URL`: Full URL of the staging environment (e.g., `https://jobpsych-staging.vercel.app`)

## Deployment Flow

1. **Feature Development**: Work on feature branches
2. **Pull Request**: Create PR to `staging` branch
3. **Staging Deployment**: Automatic deployment to staging environment
4. **Staging Testing**: Automated E2E tests run against staging
5. **Staging Validation**: Manual testing and approval
6. **Production PR**: Create PR from `staging` to `main`
7. **Production Deployment**: Automatic deployment to production

## Environment URLs

- **Development**: `http://localhost:3000`
- **Staging**: `https://jobpsych-staging.vercel.app` (configure in STAGING_URL secret)
- **Production**: `https://jobpsych.vercel.app`

## Testing Commands

```bash
# Test staging build locally
npm run build:staging

# Deploy to staging manually
npm run deploy:staging

# Run tests against staging
npm run test:e2e:staging
```

## Rollback Procedures

If staging deployment fails:

1. Check deployment logs in GitHub Actions
2. Fix issues in feature branch
3. Re-deploy to staging
4. Re-run tests

If production deployment fails after staging approval:

1. Immediate rollback to previous production version
2. Investigate issues
3. Fix and redeploy through staging again
