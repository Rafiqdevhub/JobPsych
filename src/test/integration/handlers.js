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
        environment: "integration-test",
        version: "1.0.0",
        services: {
          ai: "operational",
          database: "operational",
          storage: "operational",
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
        uptime: 456.789,
        environment: "integration-test",
        version: "1.0.0",
        memory: {
          rss: 104857600, // 100MB
          heapTotal: 67108864, // 64MB
          heapUsed: 33554432, // 32MB
          external: 2097152, // 2MB
        },
        system: {
          platform: "linux",
          nodeVersion: "20.10.0",
          arch: "x64",
        },
        services: {
          ai: "operational",
          database: "operational",
          storage: "operational",
          cache: "operational",
        },
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
          type: interviewType || "general",
          questions: [
            "Tell me about yourself",
            "What are your strengths and weaknesses?",
            "Why do you want to work here?",
            "Where do you see yourself in 5 years?",
          ],
          tips: [
            "Research the company thoroughly",
            "Prepare specific examples from your experience",
            "Practice your answers out loud",
            "Prepare thoughtful questions for the interviewer",
          ],
          confidence: 0.88,
        },
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
          sentiment: "positive",
          confidence: 0.92,
          scores: { positive: 0.92, negative: 0.05, neutral: 0.03 },
        };
        break;
      case "summary":
        result = {
          summary:
            "The text discusses career development and skill improvement strategies.",
          keyPoints: [
            "Continuous learning is essential",
            "Skill development leads to career growth",
            "Networking plays important role",
          ],
        };
        break;
      case "keywords":
        result = {
          keywords: ["career", "development", "skills", "learning", "growth"],
          relevance: [0.95, 0.89, 0.87, 0.82, 0.78],
        };
        break;
      default:
        result = { analysis: "General analysis completed" };
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
        models: ["gpt-4", "gpt-3.5-turbo", "claude-3", "gemini-pro"],
        default: "gpt-4",
      },
    });
  }),

  // AI status endpoint
  http.get("/api/ai/status", () => {
    return HttpResponse.json({
      success: true,
      data: {
        status: "operational",
        models: ["gpt-4", "gpt-3.5-turbo", "claude-3", "gemini-pro"],
        provider: "google",
        features: ["chat", "analysis", "coaching", "interview_prep"],
        lastCheck: new Date().toISOString(),
      },
    });
  }),
];
