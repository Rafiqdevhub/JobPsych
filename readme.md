# JobPsych Frontend

**AI-powered career development platform** helping candidates explore roles, optimize resumes, and prepare interviews. Production-ready with enterprise-grade security, comprehensive testing, and scalable architecture.

---

## Project Overview

| Aspect          | Details                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| **Status**      | Production Ready (v2.2.0)                                               |
| **Stack**       | React 19 + Vite 6 + React Router 7 + Tailwind CSS 4                     |
| **Testing**     | 520+ tests (99.6% pass), Vitest + Playwright + E2E/Stress/Memory suites |
| **Performance** | ~230 KB bundle (69 KB gzipped), <2s page load, <3s on 3G                |
| **Quality**     | >80% coverage, CSP + hardened headers, server-side rate limiting        |
| **Deployment**  | Vercel, Docker, AWS, GitHub Actions CI/CD                               |
| **Security**    | Data privacy-focused, rate limited (5 analyses/day), audit dashboard    |

---

## Quick Start

### Setup

```bash
# Install & develop
npm install
npm run dev                    # localhost:3000
npm run lint                   # Check code quality
npm run build                  # Production build
npm run preview               # Preview dist/ locally
```

### Environment Variables (.env)

```bash
VITE_API_URL=https://api.jobpsych.com
VITE_RESUME_API=https://resume-api.jobpsych.com
```

## Testing & Quality

### Test Commands

| Command                            | Purpose                                             |
| ---------------------------------- | --------------------------------------------------- |
| `npm run test`                     | Unit tests (Vitest + Testing Library)               |
| `npm run test:coverage`            | Coverage report (80.66% branches, 75.64% functions) |
| `npm run test:integration`         | Integration scenarios                               |
| `npm run test:e2e` / `test:e2e:ui` | Playwright E2E (CLI/UI)                             |
| `npm run test:stress`              | Stress test (`e2e/stress-test.spec.js`)             |
| `npm run test:memory`              | Memory profiling (`e2e/memory-leak-test.spec.js`)   |
| `npm run test:qa`                  | Full QA suite (PowerShell)                          |

**Load Testing**: `loadtest/` contains Artillery & K6 configs for performance validation.

**Results**: See `PHASE-6-FINAL-QA-COMPLETE.md` for QA reports.

---

## Security & Rate Limiting

- **Server-Side Rate Limiting**: 5 resume analyses/day per IP (enforced backend)
- **CSP & Headers**: Strict Content Security Policy, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection`
- **Error Handling**: Graceful 429 responses with user-friendly messages
- **Privacy**: No raw resume data stored; analytics + insights only
- **Compliance**: Privacy Policy, Terms of Service, Security Audit dashboard (`/security-audit`)

**Rate Limit Details**:

- Status: Server-side enforcement (client-side code removed Nov 2025)
- Response: HTTP 429 with countdown to reset (midnight UTC)
- UI: Toast notification with retry logic
- Support: Contact `rafkhan9323@gmail.com` for quota increases

---

## Deployment

### Vercel

```bash
npm run deploy:staging                # Staging
npm run deploy:production             # Production
```

### Docker

```bash
# Build & run
docker build -t jobpsych-frontend:latest .
docker run -d -p 8080:80 --name jobpsych jobpsych-frontend:latest

# With compose
docker-compose up -d
docker-compose logs -f
docker-compose down
```

### Other Platforms

See **PRODUCTION-DEPLOYMENT-GUIDE.md** for Netlify, AWS, DigitalOcean, self-hosted guides.

**Post-Deployment**: Verify pages load, test file uploads, check API connectivity, validate rate limiting, test mobile responsiveness. See deployment guide for full checklist.

---

## Browser & Device Support

- **Desktop**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: ES6+, Fetch API, FormData, File API
- **Responsive**: Mobile-first (sm/md/lg/xl/2xl breakpoints)

---

## Design System

**Colors**: Slate (bg), Indigo/Violet (primary), Cyan (secondary), Emerald (success), Amber (warning), Red (error)

**Effects**: Glassmorphism (`backdrop-blur-xl bg-white/10`), gradients, soft shadows, animations (pulse, bounce, fade, slide)

**Typography**: Tinos font (headers), system stack (body). See `FONT_FAMILY_DOCUMENTATION.md`.

---
