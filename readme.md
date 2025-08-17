# JobPsych Frontend

A modern React-based web application for analyzing resumes and generating tailored interview questions. Built with Vite, Tailwind CSS, and React 18.

## ✨ Features

### Core Functionality

- **Resume Upload**: Support for PDF, DOC, and DOCX files with drag-and-drop interface
- **AI-Powered Analysis**: Get detailed resume analysis and improvement suggestions
- **Interview Questions**: Generate custom interview questions based on your resume
- **Real-time Feedback**: Instant analysis with loading states and progress indicators
- **Subscription Plans**: Three-tier pricing system (Free, Pro, Premium) with upgrade options

### User Experience

- **Mobile-Responsive**: Optimized for all device sizes
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Rate Limit Management**: Clear notifications about usage limits with countdown timers and upgrade options
- **Progressive Web App**: Works offline with service worker support
- **No Caching**: Always fresh content with disabled browser caching

### Security & Performance

- **File Type Validation**: Client-side and server-side file type verification
- **Rate Limiting**: 2 uploads per 24 hours (resets daily at midnight UTC)
- **Error Boundaries**: Graceful error handling to prevent app crashes
- **Optimized Bundle**: Fast loading with Vite's optimized build process

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
├── components/          # React components
│   ├── ResumeUpload.jsx        # Main file upload component
│   ├── ResumeDetails.jsx       # Resume analysis display
│   ├── GeneratedQuestions.jsx  # Interview questions display
│   ├── RateLimitError.jsx      # Rate limit notification modal
│   ├── PricingModal.jsx        # Subscription pricing plans modal
│   ├── Toast.jsx               # Success/error notifications
│   ├── SimpleToast.jsx         # Fallback toast component
│   ├── SimpleResumeUpload.jsx  # Fallback upload component
│   └── ErrorBoundary.jsx       # Error boundary wrapper
├── utils/               # Utility functions
│   ├── errorHandler.js         # Error classification and handling
│   ├── pwaUtils.js            # PWA and cache management
│   ├── reactSafety.js         # React safety hooks
│   ├── api.js                 # API communication
│   └── SafeComponentWrapper.jsx # Component error wrapper
├── App.jsx              # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🔧 Configuration

### Environment Variables

The app connects to the backend API. Update the API URL in `src/utils/api.js` if needed:

```javascript
const API_BASE_URL = "https://your-backend-url.com";
```

### Rate Limiting

- **Free Plan**: 2 resume uploads per 24 hours
- **Pro Plan**: 20 resume uploads per 24 hours
- **Premium Plan**: Unlimited resume uploads
- **Reset Time**: Daily at midnight UTC
- **Behavior**: Shows countdown timer and upgrade options when limit reached

### Subscription Plans

#### 🆓 Free Plan ($0/forever)

- 2 resume analyses per day
- Basic interview questions
- Standard processing time
- Email support

#### 🚀 Pro Plan ($9.99/month)

- 20 resume analyses per day
- Advanced interview questions
- Priority processing
- Detailed candidate insights
- Email & chat support
- Export to PDF/Excel

#### ⭐ Premium Plan ($19.99/month)

- Unlimited resume analyses
- AI-powered insights
- Custom question templates
- Team collaboration tools
- Priority support
- API access
- White-label options

### Caching Policy

- Service worker disabled for fresh content
- Browser caching disabled via meta tags
- Local storage cleared on app initialization
- Vite caching disabled in development

## 🌐 API Integration

### Upload Endpoint

```http
POST /upload-resume
Content-Type: multipart/form-data
Body: FormData with 'resume' file field
```

### Response Format

**Success (200)**:

```json
{
  "analysis": "Detailed resume analysis...",
  "questions": ["Question 1", "Question 2", ...]
}
```

**Rate Limit (429)**:

```json
{
  "detail": {
    "error": "Rate limit exceeded",
    "message": "You have exceeded the daily limit...",
    "retry_after": 85995
  }
}
```

**Error (400/500)**:

```json
{
  "detail": {
    "error": "Error type",
    "message": "Error description"
  }
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

## 🛠️ Development

### Adding New Features

1. Create components in `src/components/`
2. Add utilities in `src/utils/`
3. Update error handling in `errorHandler.js`
4. Add appropriate error boundaries
5. Test error scenarios thoroughly

### Code Style

- Use functional components with hooks
- Follow React best practices
- Include comprehensive error handling
- Add fallback components for critical features
- Use Tailwind CSS for styling

## 📄 License

This project is private and proprietary. All rights reserved.

---

**Last Updated**: December 2024
**Version**: 1.0.0

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
