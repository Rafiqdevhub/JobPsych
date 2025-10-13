# JobPsych Frontend

JobPsych is a production-ready, AI-powered career development platform that helps candidates explore roles, tune resumes, and prepare for interviews while giving hiring teams collaboration tools. The project ships with hardened security, comprehensive QA coverage, and detailed operational playbooks.

---

## Project Snapshot

- **Status**: Production ready (Oct 12 2025)
- **Core Features**: Role Suggestions, ATS Analyzer, InterviewPrep AI, HireDisk Pro, AI Chat Assistant, Security Audit Dashboard
- **Performance**: 229 KB bundle (69 KB gzipped), ~5 s production build, ~2 s page load
- **Quality**: 625+ automated tests, >80 % coverage, dedicated load/stress/memory suites
- **Docs**: Full deployment & rollback guides, QA completion report, security operations manual

---

## Architecture Overview

- **Framework**: React 19 + Vite 6 + React Router 7
- **Styling**: Tailwind CSS 4 with design tokens, glassmorphism accents, responsive layout
- **State & UX**: Context providers for auth/toasts, custom hooks, modular feature folders
- **Testing Stack**: Vitest, Testing Library, Playwright (E2E, stress, memory), Artillery, K6
- **Security & Monitoring**: CSP, hardened headers, rate limiting, security dashboard (`/security-audit`), performance monitor utilities

> See `PROJECT-SUMMARY.md` for a phase-by-phase breakdown, metrics, and deliverables.

---

## Feature Modules

| Route               | Description                                                   | Key Components                                                        |
| ------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------- |
| `/`                 | Landing experience, feature overview, testimonials, FAQ       | `HeroSection`, `FeaturesSection`, `FAQSection`, `TestimonialsSection` |
| `/role-suggestions` | Resume-driven role matching with rate limits and insights     | `ResumeUpload`, `ResumeRateLimitInfo`, `RoleRecommendations`          |
| `/ats-analyzer`     | Multi-platform ATS compatibility report with actionable fixes | `ATSAnalyzerResults`, `KeywordDensityChart`                           |
| `/interview-prepai` | Question library, practice flow, progress tracking            | `InterviewPracticeBoard`, `ProgressSummary`                           |
| `/hiredisk`         | Recruiter workspace with candidate tools (premium)            | `HireDiskDashboard`, `QuestionGenerator`                              |
| `/security-audit`   | Real-time security posture, threat/event log                  | `SecurityAuditDashboard`                                              |

Static data lives in `src/data`, reusable UI in `src/components`, and feature routes in `src/pages`.

---

## Getting Started

### Prerequisites

- Node.js ≥ 20, npm ≥ 10
- Modern browser for local testing

### Installation & Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run lint      # ESLint
npm run build     # Production build
npm run preview   # Serve dist/ locally
```

Environment overrides go in `.env` (e.g. `VITE_AI_API_URL`, `VITE_RESUME_API_URL`). Refer to `PRODUCTION-DEPLOYMENT-GUIDE.md` for the full variable matrix.

---

## Testing & Quality Assurance

| Command                                    | Purpose                                                     |
| ------------------------------------------ | ----------------------------------------------------------- |
| `npm run test`                             | Unit suite (Vitest + Testing Library)                       |
| `npm run test:integration`                 | Integration scenarios                                       |
| `npm run test:e2e` / `npm run test:e2e:ui` | Playwright journeys (CLI/UI mode)                           |
| `npm run test:stress`                      | Playwright stress scenarios (`e2e/stress-test.spec.js`)     |
| `npm run test:memory`                      | Long-haul memory profiling (`e2e/memory-leak-test.spec.js`) |
| `npm run test:qa`                          | PowerShell orchestrated QA suite (`run-qa-suite.ps1`)       |

Additional tooling lives in `loadtest/`:

- `artillery-config.yml` + `load-test-processor.js`
- `k6-load-test.js`

Run these against a live dev server. Results roll up into the QA reports captured in `PHASE-6-FINAL-QA-COMPLETE.md`.

---

## Deployment & Operations

Use the dedicated manuals for end-to-end instructions:

- `PRODUCTION-DEPLOYMENT-GUIDE.md` – preflight checklist, environment setup, mandatory staging deployment, platform-specific deploys (Vercel, Netlify, AWS, Docker)
- `ROLLBACK-STRATEGY.md` – incident response runbooks, platform rollback recipes, post-mortem templates
- `PROJECT-SUMMARY.md` – release readiness snapshot, KPIs, acceptance criteria

Key commands:

```bash
npm run build    # Creates dist/

```

Docker support (`Dockerfile`, `docker-compose.yml`, `nginx.conf`) enables containerized rollouts; GitHub Actions under `.github/workflows/` provide CI hooks.

---

## Security & Compliance

- Strict Content Security Policy and hardened headers (see `nginx.conf`)
- Client and server-side rate limiting with rich UX feedback (`resumeRateLimitService.js`)
- Toast-driven error UX, error boundaries, and fallback components for resilience
- Privacy & legal surfaces: `PrivacyPolicy.jsx`, `TermsOfService.jsx`, cookie consent banner
- Monitoring entry point: `/security-audit` dashboard + `@utils/performanceMonitor`

`SECURITY-AUDIT-GUIDE.md` and `SECURITY-DASHBOARD-QUICKSTART.md` document day-two operations.

---

## Documentation Index

| Doc                              | Focus                                          |
| -------------------------------- | ---------------------------------------------- |
| `PROJECT-SUMMARY.md`             | High-level status, metrics, phase deliverables |
| `PRODUCTION-DEPLOYMENT-GUIDE.md` | Deployment procedures & checklists             |
| `STAGING-SETUP-GUIDE.md`         | Staging environment configuration & workflows  |
| `ROLLBACK-STRATEGY.md`           | Incident management, rollback playbook         |
| `PHASE-6-FINAL-QA-COMPLETE.md`   | Final QA evidence & reporting                  |
| `DOCKER.md`                      | Container build/run notes                      |
| `WORKFLOW.md`                    | API catalogue, feature integration workflows   |
| `test-docs/…`                    | E2E planning, execution reports                |

---

## Support

- **Email**: `rafkhan9323@gmail.com`
- **Issue Template**: See “Report an Issue” section in `WORKFLOW.md`
- **Rate Limit Extensions**: Contact support with intended usage and SLA needs

---

## License

Private & proprietary. All rights reserved.

#### 2. **Layout Components** (`src/components/layout/`)

**Header.jsx**

```jsx
Features:
- Sticky navigation
- Mobile responsive menu
- Authentication status
- Feature quick links
- Dropdown navigation

Structure:
<Header>
  <Logo />
  <DesktopNav>
    <FeatureLinks />
    <AuthSection />
  </DesktopNav>
  <MobileNav>
    <HamburgerMenu />
    <Dropdown />
  </MobileNav>
</Header>
```

**Footer.jsx**

```jsx
Features:
- Quick feature access
- Contact information
- Legal links
- Social proof (rating)
- Newsletter signup

Structure:
<Footer>
  <BrandSection />
  <QuickLinks />
  <FeaturesGrid />
  <ContactInfo />
  <LegalLinks />
</Footer>
```

---

#### 3. **Feature Components**

**ResumeUpload.jsx**

```jsx
Props:
- onFileUpload: (file) => void
- isLoading: boolean
- onError: (error) => void

Features:
- Drag & drop zone
- File type validation (PDF, DOC, DOCX)
- File size checking
- Visual feedback
- Error handling
- Upload progress

Implementation:
const ResumeUpload = ({ onFileUpload, isLoading, onError }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    // Validate file
    if (!isValidFile(file)) {
      onError({ message: 'Invalid file type' });
      return;
    }

    onFileUpload(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={dragActive ? 'border-blue-500' : ''}
    >
      {/* Upload UI */}
    </div>
  );
};
```

**ResumeRateLimitInfo.jsx**

```jsx
Props:
- remaining: number (0-5)
- total: number (default: 5)
- resetTime: timestamp

Features:
- Visual progress bar
- Color-coded status (green/amber/red)
- Countdown timer to reset
- Usage statistics
- Upgrade prompt when low

Status Colors:
- Green (>60%): 4-5 remaining
- Amber (20-60%): 1-3 remaining
- Red (<20%): 0 remaining
```

**ResumeRateLimitError.jsx**

```jsx
Props:
- onClose: () => void
- resetTime: timestamp

Features:
- Modal overlay with glassmorphism
- Countdown timer display
- Upgrade call-to-action
- Contact support link
- Close button

Usage:
Shows when user exceeds 5 daily analyses
Displays time until midnight UTC reset
Provides upgrade options
```

---

#### 4. **Utility Components**

**NavigationButton.jsx**

```jsx
Props:
- to: string (route path)
- className: string (optional)
- children: ReactNode

Features:
- React Router Link wrapper
- Custom styling support
- Hover effects
- Active state styling

Usage:
<NavigationButton to="/role-suggestions">
  Analyze Resume
</NavigationButton>
```

**ErrorBoundary.jsx**

```jsx
Features:
- Catches React component errors
- Displays fallback UI
- Logs errors to console
- Provides recovery options
- Prevents full app crash

Implementation:
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Error caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallbackUI />;
    }
    return this.props.children;
  }
}
```

**Toast.jsx / ToastManager.jsx**

```jsx
Features:
- Global notification system
- Success/error/warning types
- Auto-dismiss with timer
- Stack management
- Custom positioning
- Animation support

Usage:
const { showToast } = useToast();
showToast('Analysis complete!', 'success');
```

**Chatbot.jsx**

```jsx
Features:
- Floating chat widget
- Context-aware responses
- Quick action buttons
- Expandable/collapsible
- Message history
- Support escalation

Implementation:
<Chatbot
  position="bottom-right"
  greeting="How can I help?"
/>
```

---

### State Management

#### Context Providers

**AuthContext**

```javascript
Provides:
- user: User object or null
- accessToken: JWT string
- refreshToken: JWT string
- login: (credentials) => Promise
- logout: () => void
- checkLocalStorage: () => void

Usage:
const { user, login, logout } = useAuth();
```

**ToastProvider**

```javascript
Provides:
- showToast: (message, type) => void
- hideToast: (id) => void
- toasts: Toast[]

Types: 'success' | 'error' | 'warning' | 'info'
```

---

### Custom Hooks

**useToast**

```javascript
Returns:
- showToast: (message, type, duration?) => void

Features:
- Auto-dismiss after duration
- Multiple toasts support
- Type-based styling
```

**useUserManager**

```javascript
Returns:
- user: User | null
- updateUser: (data) => void
- clearUser: () => void

Features:
- localStorage persistence
- Automatic serialization
```

---

### Utility Services

#### Rate Limiting Service (`resumeRateLimitService.js`)

```javascript
API:
- getResumeAnalysisRateLimit(): RateLimit
  Returns current limit status

- canMakeResumeAnalysisRequest(): boolean
  Checks if requests remaining

- incrementResumeAnalysisCount(): RateLimit
  Increments counter and returns new status

- handleRateLimitHeaders(response): void
  Syncs with server-side rate limits

- getTimeUntilReset(): string | null
  Returns formatted time (e.g., "2h 15m")

Data Structure:
{
  count: number,          // Requests made today
  resetTime: timestamp,   // Midnight UTC
  remaining: number       // Requests left (5 - count)
}

Storage: localStorage['resume_analysis_rate_limit']
```

#### Error Handler (`errorHandler.js`)

```javascript
Functions:
- classifyError(error): ErrorType
  Categorizes error types

- getErrorMessage(error): string
  Returns user-friendly message

- handleAPIError(error, fallback): void
  Processes API errors

Error Types:
- NETWORK_ERROR: Connection issues
- RATE_LIMIT: Too many requests
- VALIDATION_ERROR: Invalid input
- AUTH_ERROR: Authentication failure
- SERVER_ERROR: Backend issues
```

#### API Configuration (`api.js`)

```javascript
Endpoints:
- AI_API_BASE_URL: Career AI backend
  https://evaai-seven.vercel.app/api

- ANALYZE_RESUME: Resume analysis endpoint
  https://hr-resume-analyzer-backend.vercel.app/api/analyze-resume

Usage:
import { ANALYZE_RESUME } from '@utils/api.js';

const response = await fetch(ANALYZE_RESUME, {
  method: 'POST',
  body: formData
});
```

---

### Styling Architecture

#### Tailwind CSS Configuration

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo
        secondary: "#06B6D4", // Cyan
        success: "#10B981", // Emerald
        warning: "#F59E0B", // Amber
        danger: "#EF4444", // Red
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
```

#### Design System

**Colors:**

- Slate: Background, cards, borders
- Indigo/Violet: Primary actions
- Cyan: Secondary accents
- Emerald: Success states
- Amber: Warning states
- Red: Error states

**Effects:**

- Glassmorphism: `backdrop-blur-xl bg-white/10`
- Gradients: Multi-color diagonal gradients
- Shadows: Soft shadows with color tints
- Animations: Pulse, bounce, fade, slide

**Responsive Breakpoints:**

- sm: 640px (mobile)
- md: 768px (tablet)
- lg: 1024px (desktop)
- xl: 1280px (large desktop)
- 2xl: 1536px (extra large)

---

### Routing Structure

```javascript
// main.jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "role-suggestions", element: <RoleSuggestion /> },
      { path: "interview-prepai", element: <InterviewPrepAI /> },
      { path: "ats-analyzer", element: <ATSAnalyzer /> },
      { path: "hiredisk", element: <HireDisk /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// App.jsx wrapper provides:
// - Global background effects
// - Outlet for child routes
// - Chatbot component
// - Error boundaries
```

## 🔧 Configuration

### Environment Variables

The app uses Clerk for authentication and connects to multiple backend APIs. Configure the following in your environment:

```javascript
// Clerk Authentication (src/utils/api.js or environment file)
const CLERK_PUBLISHABLE_KEY = "your-clerk-publishable-key";

// API Endpoints
const API_BASE_URL = "https://your-backend-url.com";
const ATS_API_URL = "https://ats-analyzer-api.com";
const INTERVIEW_API_URL = "https://interview-prep-api.com";
```

### Authentication System

- **Clerk Integration**: Secure authentication with social login options
- **Token Management**: Automatic storage of access and refresh tokens in localStorage
- **Session Persistence**: Maintains user sessions across browser refreshes
- **Protected Routes**: Role-based access control for different features

### Rate Limiting

- **Free Plan**: 2 analyses per 24 hours across all features
- **Pro Plan**: 20 analyses per 24 hours with priority processing
- **Premium Plan**: Unlimited usage with advanced features
- **Reset Time**: Daily at midnight UTC
- **Behavior**: Smart notifications with countdown timers and upgrade prompts

### Caching Policy

- Service worker disabled for fresh content
- Browser caching disabled via meta tags
- Local storage cleared on app initialization
- Vite caching disabled in development

## API Integration

### Core Endpoints

#### Resume Analysis

```http
POST /api/analyze-resume
Content-Type: multipart/form-data
Body: FormData with 'resume' file field
Authorization: Bearer <token>
```

#### ATS Compatibility Check

```http
POST /api/ats-analyze
Content-Type: multipart/form-data
Body: FormData with 'resume' file field and 'jobDescription' text
Authorization: Bearer <token>
```

#### Interview Preparation

```http
POST /api/generate-questions
Content-Type: application/json
Body: {
  "resumeData": {...},
  "jobRole": "Software Engineer",
  "experience": "3 years"
}
Authorization: Bearer <token>
```

#### Career Suggestions

```http
POST /api/career-suggestions
Content-Type: application/json
Body: {
  "skills": [...],
  "interests": [...],
  "experience": "3 years"
}
Authorization: Bearer <token>
```

### Response Formats

**Success Response**:

```json
{
  "success": true,
  "data": {
    "analysis": "Detailed analysis text...",
    "score": 85,
    "recommendations": [...],
    "questions": [...]
  },
  "usage": {
    "remaining": 15,
    "resetTime": "2025-09-11T00:00:00Z"
  }
}
```

**Rate Limit Response**:

```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "message": "Daily limit reached. Resets in 14 hours.",
  "retryAfter": 50400
}
```

**Authentication Error**:

```json
{
  "success": false,
  "error": "Authentication required",
  "message": "Please log in to continue"
}
```

## Error Handling

### Rate Limit Errors

- Displays modal with countdown timer until next midnight UTC
- Shows contact information for additional quota requests
- Provides helpful tips while waiting
- Auto-calculates time remaining with live updates

### File Upload Errors

- Validates file types (PDF, DOC, DOCX only)
- Shows file size and format requirements
- Handles network errors gracefully
- Provides retry options

### Fallback Components

- `SimpleResumeUpload`: Basic file upload if main component fails
- `SimpleToast`: Basic notifications if main toast fails
- `ErrorBoundary`: Catches and handles React component errors

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: ES6+, Fetch API, FormData, File API

## Security Features

- Client-side file type validation
- File size limits enforced
- No sensitive data stored in localStorage
- CORS-compliant API requests
- Input sanitization for file names

## Troubleshooting

### Common Issues

**Upload Fails**:

- Check file format (PDF, DOC, DOCX only)
- Verify internet connection
- Check if rate limit exceeded

**Rate Limit Reached**:

- Wait until countdown expires (resets at midnight UTC)
- Contact <mailto:rafkhan9323@gmail.com> for additional quota

**App Won't Load**:

- Clear browser cache and cookies
- Check JavaScript is enabled
- Try incognito/private browsing mode

### Debug Mode

In development, check browser console for detailed error messages and network request logs.

## 💻 Development Guide

### Setting Up Development Environment

#### Prerequisites

```bash
# Required
Node.js >= 18.0.0
npm >= 7.0.0

# Recommended
VS Code with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
```

#### Initial Setup

```bash
# 1. Clone repository
git clone
cd

# 2. Install dependencies
npm install

# 3. Configure environment (optional)
# Create .env file for custom API endpoints
echo "VITE_API_URL=http://localhost:5000" > .env

# 4. Start development server
npm run dev

# Access at http://localhost:3000
```

### Development Workflow

#### Feature Development

```bash
# 1. Create feature branch
git checkout -b feature/new-feature-name

# 2. Make changes and test
npm run dev

# 3. Run linter
npm run lint

# 4. Build for production test
npm run build
npm run preview

# 5. Commit changes
git add .
git commit -m "feat: add new feature"

# 6. Push and create PR
git push origin feature/new-feature-name
```

#### Code Style Guide

**Component Structure:**

```jsx
// 1. Imports
import React, { useState, useEffect } from "react";
import ComponentA from "@components/ComponentA";
import { utilityFunction } from "@utils/helpers";

// 2. Component Definition
const MyComponent = ({ prop1, prop2 }) => {
  // 3. State Declarations
  const [state1, setState1] = useState(initialValue);

  // 4. Effects
  useEffect(() => {
    // effect logic
  }, [dependencies]);

  // 5. Event Handlers
  const handleClick = () => {
    // handler logic
  };

  // 6. Render Logic
  return <div className="container">{/* JSX */}</div>;
};

// 7. Export
export default MyComponent;
```

**Naming Conventions:**

- Components: PascalCase (`UserProfile.jsx`)
- Functions: camelCase (`getUserData`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- Files: Match component name (`UserProfile.jsx`)
- CSS Classes: Tailwind utilities

**Import Aliases:**

```javascript
@/         → src/
@components → src/components/
@pages     → src/pages/
@utils     → src/utils/
@data      → src/data/
@hooks     → src/hooks/
```

#### Testing Strategy

**Manual Testing Checklist:**

- [ ] Desktop responsiveness (1920px, 1366px, 1024px)
- [ ] Tablet responsiveness (768px)
- [ ] Mobile responsiveness (375px, 414px)
- [ ] File upload functionality
- [ ] Rate limiting behavior
- [ ] Error handling
- [ ] Navigation flow
- [ ] API integration
- [ ] Loading states
- [ ] Toast notifications

**Browser Testing:**

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

#### Test Coverage

**Current Coverage Report (October 2025):**

```text
 % Coverage report from v8
-----------------------------|---------|----------|---------|---------|-------------------------------------------
File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------------|---------|----------|---------|---------|-------------------------------------------
All files                    |   38.97 |    83.92 |      68 |   38.97 |
 src                         |       0 |        0 |       0 |       0 |
  App.jsx                    |       0 |        0 |       0 |       0 | 1-20
  main.jsx                   |       0 |        0 |       0 |       0 | 1-60
 src/components              |   90.63 |    85.36 |   81.81 |   90.63 |
  Chatbot.jsx                |   98.36 |     87.5 |      90 |   98.36 | 51-52,67,214,224
  TypewriterText.jsx         |       0 |        0 |       0 |       0 | 1-26
 src/components/buttons      |   80.39 |       40 |   66.66 |   80.39 |
  NavigationButton.jsx       |   80.39 |       40 |   66.66 |   80.39 | 26,31-33,37-38,50-53
 src/components/error        |   97.82 |    85.71 |     100 |   97.82 |
  ErrorBoundary.jsx          |   98.71 |     92.3 |     100 |   98.71 | 27-28
  LoadingError.jsx           |     100 |      100 |     100 |     100 |
  NetworkError.jsx           |   95.55 |    57.14 |     100 |   95.55 | 22,24,33,35,44,46
  RateLimitError.jsx         |   95.33 |    86.66 |     100 |   95.33 | 24-26,49-52
  ResumeRateLimitError.jsx   |     100 |      100 |     100 |     100 |
 src/components/faq          |     100 |    96.66 |     100 |     100 |
  FAQDropdown.jsx            |     100 |      100 |     100 |     100 |
  FAQSection.jsx             |     100 |    66.66 |     100 |     100 | 46
 src/components/features     |     100 |      100 |     100 |     100 |
  FeaturesSection.jsx        |     100 |      100 |     100 |     100 |
 src/components/hero         |       0 |        0 |       0 |       0 |
  HeroSection.jsx            |       0 |        0 |       0 |       0 | 1-283
 src/components/layout       |    51.6 |    93.54 |   72.72 |    51.6 |
  Header.jsx                 |     100 |    96.66 |      80 |     100 | 77
 src/components/resume       |   60.21 |     87.5 |      90 |   60.21 |
  ResumeRateLimitInfo.jsx    |       0 |        0 |       0 |       0 | 1-111
  ResumeUpload.jsx           |     100 |    90.32 |     100 |     100 | 48,93,102
 src/components/testimonials |     100 |      100 |     100 |     100 |
  TestimonialsSection.jsx    |     100 |      100 |     100 |     100 |
 src/components/toast        |   27.64 |    66.66 |   11.11 |   27.64 |
  SimpleToast.jsx            |       0 |        0 |       0 |       0 | 1-113
  Toast.jsx                  |   31.55 |      100 |       0 |   31.55 | ...23-136,140-153,157-170,174-187,338-587
  ToastManager.jsx           |   34.54 |      100 |      50 |   34.54 | ...03-114,141-144,150-165,172-187,190-195
 src/hooks                   |   98.27 |    97.43 |     100 |   98.27 |
  useAIChat.js               |   98.14 |    97.29 |     100 |   98.14 | 81-83
  useToast.js                |     100 |      100 |     100 |     100 |
 src/pages                   |       0 |        0 |       0 |       0 |
  ATSAnalyzer.jsx            |       0 |        0 |       0 |       0 | 1-415
  HireDisk.jsx               |       0 |        0 |       0 |       0 | 1-381
  InterviewPrepAI.jsx        |       0 |        0 |       0 |       0 | 1-378
  LandingPage.jsx            |       0 |        0 |       0 |       0 | 1-40
  NotFound.jsx               |       0 |        0 |       0 |       0 | 1-54
  RoleSuggestion.jsx         |       0 |        0 |       0 |       0 | 1-1432
 src/utils                   |   98.87 |    85.43 |     100 |    98.87 |
  aiApi.js                   |   98.74 |    67.74 |     100 |   98.74 | 32,59-60
  api.js                     |     100 |      100 |     100 |     100 |
  env.js                     |     100 |      100 |     100 |     100 |
  errorHandler.js            |   99.18 |    93.61 |     100 |    99.18 | 59
  resumeRateLimitService.js  |    98.7 |    90.47 |     100 |    98.7 | 91-92
-----------------------------|---------|----------|---------|---------|-------------------------------------------
```

**Coverage Summary:**

- **Overall Coverage**: 38.97% (Statements), 83.92% (Branches), 68% (Functions), 38.97% (Lines)
- **Components Coverage**: 90.63% (High coverage for reusable components)
- **Error Components**: 97.82% (Excellent coverage for error handling)
- **Hooks Coverage**: 98.27% (Well-tested custom hooks)
- **Utils Coverage**: 98.87% (Comprehensive utility testing)
- **Test Files**: 19 test files, 360 passed tests, 1 skipped

**Key Coverage Highlights:**

- **Error Boundary Components**: 97.82% coverage (ErrorBoundary: 98.71%, RateLimitError: 95.33%)
- **Core Components**: Chatbot (98.36%), NavigationButton (80.39%)
- **Utility Functions**: 98.87% coverage across all utility modules
- **Custom Hooks**: 98.27% coverage with comprehensive testing

### Common Development Tasks

#### Adding a New Page

```bash
# 1. Create page component
touch src/pages/NewPage.jsx

# 2. Implement component
cat > src/pages/NewPage.jsx << 'EOF'
import React from 'react';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';

const NewPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto py-12">
        {/* Page content */}
      </main>
      <Footer />
    </div>
  );
};

export default NewPage;
EOF

# 3. Add route in main.jsx
# Add to router children array:
# { path: 'new-page', element: <NewPage /> }

# 4. Add navigation link
# Update Header.jsx or Footer.jsx with:
# <NavigationButton to="/new-page">New Page</NavigationButton>
```

#### Adding a New API Endpoint

```javascript
// 1. Define in src/utils/api.js
export const NEW_ENDPOINT = "https://api.example.com/new-endpoint";

// 2. Create service function (optional)
// src/utils/newService.js
export const callNewEndpoint = async (data) => {
  const response = await fetch(NEW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("API call failed");
  }

  return response.json();
};

// 3. Use in component
import { callNewEndpoint } from "@utils/newService";

const result = await callNewEndpoint({ param: "value" });
```

#### Adding Rate Limiting to New Feature

```javascript
// 1. Create rate limit service
// src/utils/featureRateLimitService.js

const STORAGE_KEY = "feature_rate_limit";
const DAILY_LIMIT = 10;
const RESET_INTERVAL = 24 * 60 * 60 * 1000;

export const getFeatureRateLimit = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      count: 0,
      resetTime: Date.now() + RESET_INTERVAL,
      remaining: DAILY_LIMIT,
    };
  }

  const data = JSON.parse(stored);
  const now = Date.now();

  if (now >= data.resetTime) {
    const resetData = {
      count: 0,
      resetTime: now + RESET_INTERVAL,
      remaining: DAILY_LIMIT,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resetData));
    return resetData;
  }

  return {
    ...data,
    remaining: Math.max(0, DAILY_LIMIT - data.count),
  };
};

export const incrementFeatureCount = () => {
  const rateLimit = getFeatureRateLimit();
  if (rateLimit.remaining <= 0) {
    throw new Error("Rate limit exceeded");
  }

  const newData = {
    ...rateLimit,
    count: rateLimit.count + 1,
    remaining: rateLimit.remaining - 1,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  return newData;
};

// 2. Use in component
import {
  getFeatureRateLimit,
  incrementFeatureCount,
} from "@utils/featureRateLimitService";

const [rateLimitInfo, setRateLimitInfo] = useState(null);

useEffect(() => {
  setRateLimitInfo(getFeatureRateLimit());
}, []);

const handleAction = async () => {
  if (rateLimitInfo.remaining <= 0) {
    alert("Daily limit reached");
    return;
  }

  try {
    incrementFeatureCount();
    // Perform action
    setRateLimitInfo(getFeatureRateLimit());
  } catch (error) {
    console.error(error);
  }
};
```

### Performance Optimization

#### Build Optimization

```bash
# Analyze bundle size
npm run build -- --mode production

# Check dist/ folder
ls -lh dist/

# Typical sizes:
# - index.html: ~5KB
# - CSS: 50-100KB (with Tailwind purge)
# - JS: 200-500KB (with code splitting)
```

#### Code Splitting

```javascript
// Lazy load heavy components
const HeavyComponent = lazy(() => import("./HeavyComponent"));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>;
```

#### Image Optimization

```jsx
// Use lazy loading
<img
  src="/image.jpg"
  loading="lazy"
  alt="Description"
/>

// Provide multiple sizes
<img
  srcSet="/image-320.jpg 320w,
          /image-640.jpg 640w,
          /image-1280.jpg 1280w"
  sizes="(max-width: 320px) 280px,
         (max-width: 640px) 600px,
         1200px"
  src="/image-640.jpg"
  alt="Description"
/>
```

---

### Docker Deployment

#### Build Docker Image

```bash
# Basic build
docker build -t jobpsych-frontend:latest .

# With build args
docker build \
  --build-arg VITE_API_URL=https://api.jobpsych.com \
  --build-arg VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx \
  -t jobpsych-frontend:latest .
```

#### Run Container

```bash
# Run on port 8080
docker run -d \
  -p 8080:80 \
  --name jobpsych \
  jobpsych-frontend:latest

# Access at http://localhost:8080
```

#### Docker Compose

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild
docker-compose build --no-cache
```

#### Docker Configuration

**Dockerfile:**

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

---

### CI/CD Pipeline

#### GitHub Actions (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          VITE_STRIPE_PUBLISHABLE_KEY: ${{ secrets.VITE_STRIPE_PUBLISHABLE_KEY }}
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

---

### Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test file upload functionality
- [ ] Check API connectivity
- [ ] Verify rate limiting works
- [ ] Test authentication flow
- [ ] Check mobile responsiveness
- [ ] Validate SSL certificate
- [ ] Test external links
- [ ] Check error pages (404, 500)
- [ ] Verify analytics tracking
- [ ] Test payment integration (if applicable)
- [ ] Check SEO meta tags
- [ ] Validate structured data
- [ ] Test chatbot functionality
- [ ] Monitor error logs

---

## 📞 Support & Contact

### Getting Help

**Email Support:**

- **Email**: rafkhan9323@gmail.com
- **Response Time**: 24-48 hours
- **Issues**: Technical support, feature requests, rate limit increases

**Self-Service Resources:**

- FAQ Section: In-app help for common questions
- Chatbot: Real-time assistance for basic queries
- Error Messages: Detailed error information with solutions

**Report an Issue:**

```markdown
**Issue Type:** [Bug/Feature Request/Question]
**Page/Feature:** [Which part of the app]
**Description:** [Detailed description]
**Steps to Reproduce:** [If bug]
**Expected Behavior:** [What should happen]
**Actual Behavior:** [What actually happens]
**Browser/Device:** [Your environment]
**Screenshots:** [If applicable]
```

**Feature Requests:**

- Submit via email with detailed use case
- Include mockups or examples if possible
- Explain problem it solves
- Estimated user impact

**Rate Limit Increases:**

- Contact via email
- Provide use case and requirements
- May require verification
- Typically processed within 48 hours

## 🆕 Recent Features

### v2.2.0 - ATS Analyzer (September 2025)

- **Resume Optimization**: AI-powered ATS compatibility analysis
- **Keyword Matching**: Automatic keyword suggestions for job applications
- **Compatibility Scoring**: Detailed ATS compatibility reports
- **Industry Insights**: Job market trends and requirements analysis

### v2.1.0 - InterviewPrep AI (September 2025)

- **AI Interview Practice**: Personalized interview question generation
- **Progress Tracking**: Monitor interview preparation progress
- **Custom Scenarios**: Industry-specific interview simulations
- **Feedback System**: Detailed performance analysis and tips

### v2.0.0 - Major Platform Enhancement (August 2025)

- **Multi-Feature Architecture**: Unified platform for all career tools
- **Advanced Authentication**: Clerk-powered secure authentication
- **Responsive Design**: Mobile-first approach with modern UI
- **Comprehensive FAQ**: Categorized help system for all features

## 🏛️ Architecture Overview

### Technology Stack

- **Frontend**: React 18 with Hooks, Vite build system
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: Clerk authentication service
- **State Management**: React Context API
- **Routing**: React Router for client-side navigation
- **API Communication**: Axios with custom error handling

### Component Architecture

- **Feature-based Organization**: Components grouped by functionality
- **Reusable Components**: Shared UI elements across features
- **Error Boundaries**: Graceful error handling at component level
- **Progressive Enhancement**: Core functionality works without JavaScript

### Data Management

- **Static Data**: JSON files for FAQs, testimonials, and pricing
- **API Integration**: RESTful APIs for dynamic content
- **Local Storage**: Token persistence and user preferences
- **Caching Strategy**: Optimized for performance and offline use

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 📊 Application Summary

### Key Metrics

**Application Stats:**

- **Pages**: 6 main pages + 1 error page
- **Components**: 30+ reusable components
- **Routes**: 5 feature routes + landing
- **API Endpoints**: 2 main backend services
- **Rate Limits**: 5 resume analyses per day (free tier)
- **Supported Files**: PDF, DOC, DOCX
- **Max File Size**: 10MB
- **Build Size**: ~500KB (gzipped)
- **Load Time**: <3s on 3G

**Technology Stack:**

```
Frontend:        React 18.x
Build Tool:      Vite 5.x
Styling:         Tailwind CSS 3.x
Routing:         React Router 6.x
State:           React Context API
Authentication:  Clerk (optional)
Notifications:   Custom Toast System
Deployment:      Vercel / Docker
```

### Feature Comparison Matrix

| Feature              | Free       | Pro               | Premium            |
| -------------------- | ---------- | ----------------- | ------------------ |
| **Role Suggestions** | ✅ 5/day   | ✅ 20/day         | ✅ Unlimited       |
| **Resume Upload**    | ✅ PDF/DOC | ✅ All formats    | ✅ All formats     |
| **AI Analysis**      | ✅ Basic   | ✅ Advanced       | ✅ Premium AI      |
| **InterviewPrep AI** | ✅ Samples | ✅ Custom         | ✅ Mock interviews |
| **ATS Analyzer**     | ✅ Basic   | ✅ Multi-platform | ✅ Full reports    |
| **HireDisk Access**  | ❌         | ❌                | ✅ Full access     |
| **Priority Support** | ❌         | ✅ Email/Chat     | ✅ 24/7 Support    |
| **Team Features**    | ❌         | ❌                | ✅ Collaboration   |
| **API Access**       | ❌         | ❌                | ✅ Full API        |
| **Export Reports**   | ❌         | ✅ PDF            | ✅ PDF/Excel       |

### Quick Reference

**Common Commands:**

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build           # Production build
npm run preview         # Preview build locally
npm run lint            # Check code quality

# Docker
docker build -t jobpsych .                    # Build image
docker run -p 8080:80 jobpsych               # Run container
docker-compose up -d                          # Start with compose

# Deployment
vercel                                        # Deploy to Vercel
vercel --prod                                 # Production deploy
```

**File Paths:**

```
API Config:       src/utils/api.js
Rate Limiting:    src/utils/resumeRateLimitService.js
Error Handling:   src/utils/errorHandler.js
Authentication:   src/context/AuthContext.jsx
Routes:           src/main.jsx
Global Styles:    src/index.css
Vite Config:      vite.config.js
Tailwind Config:  tailwind.config.js
```

**Environment Variables:**

```bash
# Optional - defaults to hosted services
VITE_API_URL=https://evaai-seven.vercel.app/api
VITE_RESUME_API=https://hr-resume-analyzer-backend.vercel.app/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx  # If using payments
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxx   # If using auth
```

### API Endpoints Reference

**Resume Analysis:**

```
POST https://hr-resume-analyzer-backend.vercel.app/api/analyze-resume
Content-Type: multipart/form-data

Request:
- resume: File (PDF/DOC/DOCX)
- targetRole: string (optional)
- jobDescription: string (optional)

Response:
{
  "success": true,
  "data": {
    "recommendations": [...],
    "skills": {...},
    "analysis": "..."
  }
}

Rate Limit: 5 requests per day per IP
Reset: Daily at midnight UTC
```

**Career AI:**

```
POST https://evaai-seven.vercel.app/api/chat
Content-Type: application/json

Request:
{
  "message": "string",
  "context": "string",
  "sessionType": "coaching|analysis|general"
}

Response:
{
  "success": true,
  "data": {
    "response": "AI response text",
    "timestamp": "2025-10-05T..."
  }
}
```

### Rate Limiting Details

**Implementation:**

```javascript
// Client-Side Tracking
Storage: localStorage['resume_analysis_rate_limit']
Structure: { count: number, resetTime: timestamp, remaining: number }
Reset: 24 hours (midnight UTC)
Limit: 5 per day

// Server-Side Headers
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 1728086400
Retry-After: 43200  // seconds

// Synchronization
Client checks remaining before request
Server validates and returns headers
Client updates from server response
Modal shown when limit exceeded
```

**User Experience:**

- Visual quota in header (always visible)
- Color-coded status (green/amber/red)
- Hover tooltip with details
- Modal notification at limit
- Countdown timer to reset
- Upgrade prompts and CTAs

### Error Handling Matrix

| Error Type     | User Message                           | Recovery Action   |
| -------------- | -------------------------------------- | ----------------- |
| **Rate Limit** | "Daily limit reached. Resets in Xh Xm" | Wait or upgrade   |
| **Network**    | "Connection failed. Please try again"  | Retry button      |
| **File Type**  | "Only PDF, DOC, DOCX supported"        | Choose valid file |
| **File Size**  | "File too large. Max 10MB"             | Compress file     |
| **API Error**  | "Analysis failed. Please retry"        | Retry button      |
| **Timeout**    | "Request timed out. Try again"         | Retry button      |
| **Auth Error** | "Please log in to continue"            | Login redirect    |
| **Server 500** | "Service temporarily unavailable"      | Contact support   |

### Security Measures

**Client-Side:**

- File type validation
- File size checking
- Input sanitization
- XSS prevention
- CORS headers

**API Communication:**

- HTTPS only
- Request validation
- Error message sanitization
- Rate limiting
- Token-based auth (optional)

**Data Privacy:**

- No sensitive data in localStorage
- No permanent file storage
- Analysis data not retained
- GDPR compliant
- Privacy policy available

### Browser Support

| Browser           | Minimum Version | Features        |
| ----------------- | --------------- | --------------- |
| **Chrome**        | 90+             | ✅ Full support |
| **Firefox**       | 88+             | ✅ Full support |
| **Safari**        | 14+             | ✅ Full support |
| **Edge**          | 90+             | ✅ Full support |
| **Mobile Safari** | iOS 14+         | ✅ Full support |
| **Chrome Mobile** | 90+             | ✅ Full support |

**Required APIs:**

- Fetch API
- FormData API
- File API
- LocalStorage API
- ES6+ JavaScript

### Performance Benchmarks

**Load Performance:**

```
First Contentful Paint:    < 1.5s
Largest Contentful Paint:  < 2.5s
Time to Interactive:       < 3.5s
Cumulative Layout Shift:   < 0.1
Total Blocking Time:       < 300ms
```

**Build Performance:**

```
Build Time:     15-30 seconds
Bundle Size:    ~450KB (gzipped)
CSS Size:       ~80KB (purged)
Image Assets:   ~50KB
Total Size:     ~600KB
```

-
