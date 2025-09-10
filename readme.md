# JobPsych Frontend

A comprehensive AI-powered career development platform offering smart career guidance, resume optimization, interview preparation, and recruitment tools. Built with React 18, Vite, Tailwind CSS, and modern web technologies.

## ✨ Features

### 🤖 AI-Powered Career Tools

- **Role Suggestions**: AI-driven career matching based on skills, personality, and market trends
- **ATS Analyzer**: Resume optimization tool that ensures compatibility with Applicant Tracking Systems
- **InterviewPrep AI**: Generate personalized interview questions and practice scenarios
- **HireDisk Pro**: Advanced recruitment platform for HR professionals and hiring managers

### Core Functionality

- **Resume Upload & Analysis**: Support for PDF, DOC, and DOCX files with drag-and-drop interface
- **Real-time AI Analysis**: Instant feedback with detailed insights and improvement suggestions
- **Custom Interview Questions**: Generate tailored questions based on resume content and job requirements
- **Progress Tracking**: Monitor career development and interview preparation progress
- **Multi-tier Subscription**: Flexible pricing plans (Free, Pro, Premium) with upgrade options

### User Experience

- **Mobile-Responsive Design**: Optimized for all device sizes and screen resolutions
- **Intuitive Navigation**: Clean, modern interface with smooth transitions
- **Real-time Feedback**: Loading states, progress indicators, and instant results
- **Comprehensive FAQ System**: Categorized help sections for all features
- **Success Stories**: Testimonials showcasing real user experiences
- **Progressive Web App**: Offline functionality with service worker support

### Security & Performance

- **Secure Authentication**: Clerk-powered authentication with token management
- **File Type Validation**: Client-side and server-side verification for uploaded files
- **Rate Limiting**: Intelligent usage limits with clear notifications and upgrade paths
- **Error Boundaries**: Graceful error handling to prevent application crashes
- **Optimized Performance**: Fast loading with Vite's optimized build process

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Modern web browser with JavaScript enabled

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd jobpsych-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server (usually http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint code analysis
```

## 🏗️ Project Structure

```text
src/
├── components/              # React components organized by feature
│   ├── auth/               # Authentication components
│   │   ├── AuthContext.jsx
│   │   ├── CustomAuthModal.jsx
│   │   └── Header.jsx
│   ├── buttons/            # Reusable button components
│   │   └── NavigationButton.jsx
│   ├── faq/                # FAQ system components
│   │   ├── FAQDropdown.jsx
│   │   └── FAQSection.jsx
│   ├── features/           # Feature showcase components
│   │   └── FeaturesSection.jsx
│   ├── layout/             # Layout and navigation components
│   │   ├── Footer.jsx
│   │   └── HeroSection.jsx
│   ├── pricing/            # Pricing and subscription components
│   │   └── PricingSection.jsx
│   ├── testimonials/       # User testimonials components
│   │   └── TestimonialsSection.jsx
│   ├── ats/                # ATS Analyzer components
│   │   └── ATSAnalyzer.jsx
│   ├── ResumeUpload.jsx    # Resume upload component
│   ├── ResumeDetails.jsx   # Resume analysis display
│   ├── GeneratedQuestions.jsx # Interview questions display
│   ├── Toast.jsx           # Success/error notifications
│   └── ErrorBoundary.jsx   # Error boundary wrapper
├── data/                   # Static data files
│   ├── faqs.js            # FAQ content organized by category
│   ├── testimonials.js    # User testimonials data
│   └── enhancePlan.js     # Pricing plan configurations
├── utils/                  # Utility functions and helpers
│   ├── errorHandler.js    # Error classification and handling
│   ├── pwaUtils.js        # PWA and cache management
│   ├── api.js             # API communication utilities
│   └── SafeComponentWrapper.jsx # Component error wrapper
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
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

### Subscription Plans

#### 🆓 Free Plan ($0/forever)

- 2 AI analyses per day across all tools
- Basic career suggestions and role matching
- Standard ATS compatibility check
- Essential interview questions
- Community support via email

#### 🚀 Pro Plan ($9.99/month)

- 20 AI analyses per day with priority processing
- Advanced career guidance with market insights
- Comprehensive ATS optimization with keyword suggestions
- Personalized interview preparation scenarios
- Detailed progress tracking and analytics
- Email & chat support
- Export capabilities (PDF/Excel)

#### ⭐ Premium Plan ($19.99/month)

- Unlimited AI analyses across all features
- Premium career counseling with industry experts
- Advanced ATS analysis with competitor insights
- AI-powered mock interviews with feedback
- Team collaboration tools for HR teams
- HireDisk Pro access for recruitment
- Priority customer support
- API access for integrations
- White-label options for enterprises

### Caching Policy

- Service worker disabled for fresh content
- Browser caching disabled via meta tags
- Local storage cleared on app initialization
- Vite caching disabled in development

## 🌐 API Integration

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

## 🚨 Error Handling

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

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: ES6+, Fetch API, FormData, File API

## 🔒 Security Features

- Client-side file type validation
- File size limits enforced
- No sensitive data stored in localStorage
- CORS-compliant API requests
- Input sanitization for file names

## 🐛 Troubleshooting

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

## 📞 Support & Contact

- **Email**: <mailto:rafkhan9323@gmail.com>
- **Issue**: Rate limit increases, technical support, feature requests
- **Response Time**: Usually within 24-48 hours

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

**Last Updated**: September 2025
**Version**: 2.2.0
**Platform**: JobPsych - Complete AI Career Development Suite

## 🐳 Docker

Build a production image and serve the app via Nginx.

Prerequisites

- Docker (Desktop) 4.x+

Build

- Optional: set build-time envs used by Vite (e.g. VITE_STRIPE_PUBLISHABLE_KEY)
- Build the image using the provided Dockerfile.

Run

- Run the image mapping port 8080->80. The app will be available at <http://localhost:8080>.

Compose

- A docker-compose.yml is included. It forwards VITE\_\* envs at build time when present.

Notes

- SPA routing: Nginx config mirrors `vercel.json` and falls back to `index.html`.
- Caching: Asset filenames are not hashed in the current Vite config; Nginx sets modest caching for `/assets/` and no-store for HTML.
- Backend: API URLs are configured in `src/utils/api.js` and point to hosted backends by default.
