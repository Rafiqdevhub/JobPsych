// Security and Privacy Audit Utilities for JobPsych Frontend
// Implements security monitoring, input validation, and privacy controls

const isDevelopment = import.meta.env.DEV;

// Security configuration
const SECURITY_CONFIG = {
  maxInputLength: 10000,
  allowedFileTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  maxFileSize: 5 * 1024 * 1024, // 5MB
  rateLimitWindow: 60000, // 1 minute
  rateLimitMaxRequests: 100,
};

// Rate limiting storage
const rateLimitStore = new Map();

/**
 * Input validation and sanitization utilities
 */
export const InputValidator = {
  /**
   * Sanitize text input to prevent XSS
   */
  sanitizeText(input) {
    if (typeof input !== "string") return "";

    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;")
      .trim();
  },

  /**
   * Validate email format
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  },

  /**
   * Validate URL format
   */
  isValidUrl(url) {
    try {
      const parsedUrl = new URL(url);
      return ["http:", "https:"].includes(parsedUrl.protocol);
    } catch {
      return false;
    }
  },

  /**
   * Validate file upload
   */
  validateFile(file) {
    if (!file) return { valid: false, error: "No file provided" };

    // Check file size
    if (file.size > SECURITY_CONFIG.maxFileSize) {
      return { valid: false, error: "File size exceeds 5MB limit" };
    }

    // Check file type
    if (!SECURITY_CONFIG.allowedFileTypes.includes(file.type)) {
      return {
        valid: false,
        error: "Invalid file type. Only PDF and Word documents are allowed.",
      };
    }

    // Check filename for suspicious patterns
    const suspiciousPatterns = /(\.\.|\/|\\|\||<|>|:|\*|\?|"|\||\0)/;
    if (suspiciousPatterns.test(file.name)) {
      return { valid: false, error: "Invalid filename" };
    }

    return { valid: true };
  },

  /**
   * Validate text input length and content
   */
  validateTextInput(text, maxLength = SECURITY_CONFIG.maxInputLength) {
    if (typeof text !== "string")
      return { valid: false, error: "Input must be a string" };

    if (text.length > maxLength) {
      return {
        valid: false,
        error: `Input exceeds maximum length of ${maxLength} characters`,
      };
    }

    // Check for potentially malicious patterns
    const maliciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
    ];

    for (const pattern of maliciousPatterns) {
      if (pattern.test(text)) {
        return {
          valid: false,
          error: "Input contains potentially malicious content",
        };
      }
    }

    return { valid: true };
  },

  /**
   * Sanitize HTML content (basic)
   */
  sanitizeHtml(html) {
    if (typeof html !== "string") return "";

    // Remove script tags and their content
    html = html.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );
    // Remove other potentially dangerous tags
    html = html.replace(
      /<(iframe|object|embed|form|input|button)\b[^>]*>.*?<\/\1>/gi,
      ""
    );
    // Remove event handlers
    html = html.replace(/\s+on\w+="[^"]*"/gi, "");

    return html;
  },
};

/**
 * Rate limiting utilities
 */
export const RateLimiter = {
  /**
   * Check if request should be rate limited
   */
  checkLimit(
    identifier,
    windowMs = SECURITY_CONFIG.rateLimitWindow,
    maxRequests = SECURITY_CONFIG.rateLimitMaxRequests
  ) {
    const now = Date.now();
    const key = identifier;

    if (!rateLimitStore.has(key)) {
      rateLimitStore.set(key, { requests: [], windowStart: now });
    }

    const userData = rateLimitStore.get(key);

    // Clean old requests outside the window
    userData.requests = userData.requests.filter(
      (time) => now - time < windowMs
    );

    if (userData.requests.length >= maxRequests) {
      return { allowed: false, resetTime: userData.requests[0] + windowMs };
    }

    userData.requests.push(now);
    return { allowed: true };
  },

  /**
   * Clean up old rate limit data
   */
  cleanup() {
    const now = Date.now();
    for (const [key, data] of rateLimitStore.entries()) {
      data.requests = data.requests.filter(
        (time) => now - time < SECURITY_CONFIG.rateLimitWindow
      );
      if (data.requests.length === 0) {
        rateLimitStore.delete(key);
      }
    }
  },
};

/**
 * Privacy and consent utilities
 */
export const PrivacyManager = {
  /**
   * Check if user has consented to cookies
   */
  hasCookieConsent() {
    return localStorage.getItem("jobpsych_cookie_consent") === "accepted";
  },

  /**
   * Set cookie consent
   */
  setCookieConsent(accepted) {
    localStorage.setItem(
      "jobpsych_cookie_consent",
      accepted ? "accepted" : "declined"
    );
    if (accepted) {
      this.enableAnalytics();
    } else {
      this.disableAnalytics();
    }
  },

  /**
   * Enable analytics (placeholder for actual analytics implementation)
   */
  enableAnalytics() {
    // Enable analytics tracking
    if (isDevelopment) {
      console.warn("Analytics enabled");
    }
  },

  /**
   * Disable analytics
   */
  disableAnalytics() {
    // Disable analytics tracking
    if (isDevelopment) {
      console.warn("Analytics disabled");
    }
  },

  /**
   * Anonymize data for privacy
   */
  anonymizeData(data) {
    if (typeof data === "object" && data !== null) {
      const anonymized = { ...data };

      // Remove or hash personal information
      const personalFields = ["email", "name", "phone", "address", "ssn"];
      personalFields.forEach((field) => {
        if (anonymized[field]) {
          anonymized[field] = this.hashString(anonymized[field]);
        }
      });

      return anonymized;
    }

    return data;
  },

  /**
   * Simple hash function for anonymization
   */
  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  },
};

/**
 * Security monitoring and logging
 */
export const SecurityMonitor = {
  securityEvents: [],

  /**
   * Log security event
   */
  logSecurityEvent(event) {
    const securityEvent = {
      timestamp: new Date().toISOString(),
      type: event.type,
      severity: event.severity || "medium",
      message: event.message,
      details: event.details || {},
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    this.securityEvents.push(securityEvent);

    // Log to console in development
    if (isDevelopment) {
      console.warn("🔒 Security Event:", securityEvent);
    }

    // In production, this would send to a security monitoring service
    // this.reportSecurityEvent(securityEvent);

    // Keep only last 100 events
    if (this.securityEvents.length > 100) {
      this.securityEvents.shift();
    }
  },

  /**
   * Detect potential XSS attempts
   */
  detectXSS(input) {
    const xssPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
      /eval\(/i,
      /document\./i,
      /window\./i,
    ];

    for (const pattern of xssPatterns) {
      if (pattern.test(input)) {
        this.logSecurityEvent({
          type: "xss_attempt",
          severity: "high",
          message: "Potential XSS attempt detected",
          details: { input: input.substring(0, 100) + "..." },
        });
        return true;
      }
    }
    return false;
  },

  /**
   * Monitor for suspicious file uploads
   */
  monitorFileUpload(file) {
    if (file.size > SECURITY_CONFIG.maxFileSize * 2) {
      // Double the limit for monitoring
      this.logSecurityEvent({
        type: "large_file_upload",
        severity: "medium",
        message: "Unusually large file uploaded",
        details: { fileSize: file.size, fileName: file.name },
      });
    }
  },

  /**
   * Check for HTTPS
   */
  checkHTTPS() {
    if (
      window.location.protocol !== "https:" &&
      window.location.hostname !== "localhost"
    ) {
      this.logSecurityEvent({
        type: "insecure_connection",
        severity: "high",
        message: "Application accessed over insecure connection",
        details: { protocol: window.location.protocol },
      });
      return false;
    }
    return true;
  },

  /**
   * Get security report
   */
  getSecurityReport() {
    return {
      totalEvents: this.securityEvents.length,
      eventsByType: this.securityEvents.reduce((acc, event) => {
        acc[event.type] = (acc[event.type] || 0) + 1;
        return acc;
      }, {}),
      eventsBySeverity: this.securityEvents.reduce((acc, event) => {
        acc[event.severity] = (acc[event.severity] || 0) + 1;
        return acc;
      }, {}),
      recentEvents: this.securityEvents.slice(-10),
    };
  },
};

/**
 * HTTPS and secure connection utilities
 */
export const HTTPSManager = {
  /**
   * Force HTTPS redirect
   */
  enforceHTTPS() {
    if (
      window.location.protocol === "http:" &&
      window.location.hostname !== "localhost"
    ) {
      window.location.href = window.location.href.replace("http:", "https:");
    }
  },

  /**
   * Check if connection is secure
   */
  isSecureConnection() {
    return (
      window.location.protocol === "https:" ||
      window.location.hostname === "localhost"
    );
  },

  /**
   * Get security status
   */
  getSecurityStatus() {
    return {
      https: this.isSecureConnection(),
      csp: this.checkCSP(),
      securityHeaders: this.checkSecurityHeaders(),
    };
  },

  /**
   * Check if CSP is properly configured
   */
  checkCSP() {
    // This would check if CSP headers are present
    // For now, return true as we set it in index.html
    return true;
  },

  /**
   * Check security headers
   */
  checkSecurityHeaders() {
    // This would check for security headers
    // For now, return status based on our meta tags
    return {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "X-XSS-Protection": "1; mode=block",
      "Content-Security-Policy": "configured",
    };
  },
};

// Initialize security monitoring
if (typeof window !== "undefined") {
  // Check HTTPS on load
  HTTPSManager.enforceHTTPS();

  // Clean up rate limiting data periodically
  setInterval(() => {
    RateLimiter.cleanup();
  }, 60000); // Clean every minute
}

export { SECURITY_CONFIG };
