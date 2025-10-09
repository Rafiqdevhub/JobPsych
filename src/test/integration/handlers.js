import { http, HttpResponse } from "msw";
import { mockApiResponses } from "./fixtures.js";

// Integration test API handlers with more comprehensive mocking
export const integrationHandlers = [
  // Health check endpoints
  http.get("/api/health", () => {
    return HttpResponse.json({
      success: true,
      data: {
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: 123.456,
        environment: "test",
        version: "1.0.0",
        memory: {
          rss: 1000000,
          heapTotal: 2000000,
          heapUsed: 1500000,
          external: 500000,
        },
      },
    });
  }),

  http.get("/api/health/detailed", () => {
    return HttpResponse.json({
      success: true,
      data: {
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: 123.456,
        environment: "test",
        version: "1.0.0",
        memory: {
          rss: 1000000,
          heapTotal: 2000000,
          heapUsed: 1500000,
          external: 500000,
        },
        system: {
          platform: "test",
          nodeVersion: "20.0.0",
          arch: "x64",
        },
        services: {
          ai: "OK",
          database: "OK",
        },
      },
    });
  }),

  // Custom base URL handler for testing
  http.post("http://localhost:5000/api/ai/chat", () => {
    return HttpResponse.json({
      success: true,
      data: {
        response: "Custom URL response",
        timestamp: new Date().toISOString(),
      },
    });
  }),

  // AI Chat endpoints
  http.post("/api/ai/chat", async ({ request }) => {
    const {
      message,
      context: _context,
      sessionType: _sessionType,
    } = await request.json();

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check for validation errors
    if (!message || message.trim().length === 0) {
      return HttpResponse.json(
        {
          success: false,
          message: "Validation error: Message is required and cannot be empty",
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // Check for error scenarios
    if (message?.includes("error")) {
      return HttpResponse.json(mockApiResponses.errors.server, { status: 500 });
    }

    if (message?.includes("rate limit")) {
      return HttpResponse.json(mockApiResponses.errors.rateLimit, {
        status: 429,
      });
    }

    return HttpResponse.json(mockApiResponses.success.chat);
  }),

  // Resume analysis endpoints
  http.post("/api/ai/analyze-job", async ({ request }) => {
    const {
      jobDescription,
      userProfile: _userProfile,
      analysisType: _analysisType,
    } = await request.json();

    // Simulate processing delay for analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Check for validation errors
    if (!jobDescription || jobDescription.length < 10) {
      return HttpResponse.json(
        {
          success: false,
          error:
            "Job description is required and must be at least 10 characters",
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(mockApiResponses.success.resumeAnalysis);
  }),

  // Career path endpoints
  http.post("/api/ai/career-path", async ({ request }) => {
    const { currentRole, experience, interests, goals } = await request.json();

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Validate required fields
    if (!currentRole || !experience || !interests || !goals) {
      return HttpResponse.json(
        {
          success: false,
          error: "All fields are required",
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(mockApiResponses.success.careerPath);
  }),

  // Interview preparation endpoints
  http.post("/api/ai/interview-prep", async ({ request }) => {
    const { jobDescription, userProfile, interviewType } = await request.json();

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1800));

    if (!jobDescription || !userProfile) {
      return HttpResponse.json(
        {
          success: false,
          error: "Job description and user profile are required",
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: {
        preparation: {
          type: interviewType || "technical",
          result: {
            questions: [
              "Tell me about yourself",
              "What are your strengths and weaknesses?",
              "Why do you want to work here?",
              "Where do you see yourself in 5 years?",
            ],
          },
          confidence: 0.8,
          insights: ["Prepare well for behavioral questions"],
          recommendations: ["Practice common interview questions"],
        },
        interviewType: interviewType || "technical",
        timestamp: new Date().toISOString(),
      },
    });
  }),

  // Skill gap analysis endpoints
  http.post("/api/ai/skill-gap", async ({ request }) => {
    const { targetRole, currentSkills, desiredSkills } = await request.json();

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (!targetRole || !currentSkills || !desiredSkills) {
      return HttpResponse.json(
        {
          success: false,
          error: "All fields are required",
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(mockApiResponses.success.skillGapAnalysis);
  }),

  // Text analysis endpoints
  http.post("/api/ai/analyze", async ({ request }) => {
    const { text, analysisType } = await request.json();

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!text || text.length < 10) {
      return HttpResponse.json(
        {
          success: false,
          error: "Text must be at least 10 characters long",
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    let result;
    switch (analysisType) {
      case "sentiment":
        result = {
          type: "sentiment",
          result: {
            sentiment: "positive",
            scores: { positive: 0.92, negative: 0.05, neutral: 0.03 },
          },
          confidence: 0.95,
          insights: ["Positive content detected"],
          recommendations: [],
        };
        break;
      case "summary":
        result = {
          type: "summary",
          result: {
            summary:
              "The text discusses career development and skill improvement strategies.",
            keyPoints: [
              "Continuous learning is essential",
              "Skill development leads to career growth",
              "Networking plays important role",
            ],
          },
          confidence: 0.88,
          insights: ["Career-focused content", "Emphasis on skill development"],
          recommendations: ["Consider expanding on networking strategies"],
        };
        break;
      case "keywords":
        result = {
          type: "keywords",
          result: {
            keywords: ["career", "development", "skills", "learning", "growth"],
            relevance: [0.95, 0.89, 0.87, 0.82, 0.78],
          },
          confidence: 0.91,
          insights: ["Technical and professional keywords identified"],
          recommendations: ["Focus on emerging technologies"],
        };
        break;
      default:
        result = {
          type: "general",
          result: { analysis: "General analysis completed" },
          confidence: 0.5,
          insights: ["General content analysis"],
          recommendations: [],
        };
    }

    return HttpResponse.json({
      success: true,
      data: {
        result,
        analysisType,
        timestamp: new Date().toISOString(),
      },
    });
  }),

  // Coaching endpoints
  http.post("/api/ai/coaching", async ({ request }) => {
    const {
      query,
      sessionType,
      userContext: _userContext,
    } = await request.json();

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!query) {
      return HttpResponse.json(
        {
          success: false,
          error: "Coaching query is required",
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: {
        response:
          "Based on your situation, I recommend focusing on building specific skills and networking. Let's break this down into actionable steps...",
        coachingType: sessionType || "general",
        timestamp: new Date().toISOString(),
      },
    });
  }),

  // File upload simulation
  http.post("/api/upload", async ({ request }) => {
    // Simulate file upload delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Check for file size limits
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      // 10MB
      return HttpResponse.json(
        {
          success: false,
          error: "File too large. Maximum size is 10MB.",
          code: "FILE_TOO_LARGE",
        },
        { status: 413 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: {
        fileId: `file-${Date.now()}`,
        fileName: "uploaded-resume.pdf",
        fileSize: 245760,
        uploadId: `upload-${Date.now()}`,
        status: "uploaded",
        timestamp: new Date().toISOString(),
      },
    });
  }),

  // User preferences endpoints
  http.get("/api/user/preferences", () => {
    return HttpResponse.json({
      success: true,
      data: {
        theme: "light",
        notifications: true,
        language: "en",
        timezone: "UTC",
      },
    });
  }),

  http.put("/api/user/preferences", async ({ request }) => {
    const preferences = await request.json();

    return HttpResponse.json({
      success: true,
      data: {
        ...preferences,
        updatedAt: new Date().toISOString(),
      },
    });
  }),

  // AI models endpoint
  http.get("/api/ai/models", () => {
    return HttpResponse.json({
      success: true,
      data: {
        models: ["gpt-4", "gpt-3.5-turbo"],
        default: "gpt-4",
      },
    });
  }),

  // AI status endpoint
  http.get("/api/ai/status", () => {
    return HttpResponse.json({
      success: true,
      data: {
        status: "OK",
        models: ["gpt-4", "gpt-3.5-turbo"],
        provider: "OpenAI",
        features: ["chat", "analysis"],
        lastCheck: new Date().toISOString(),
      },
    });
  }),
];
