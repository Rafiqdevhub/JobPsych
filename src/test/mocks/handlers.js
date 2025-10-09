import { http, HttpResponse } from "msw";

const BASE_URL = "/api";

// Simple rate limiting simulation
globalThis.requestCount = 0;
const RATE_LIMIT_THRESHOLD = 3;

export const handlers = [
  // Health endpoints
  http.get(`${BASE_URL}/health`, () => {
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

  http.get(`${BASE_URL}/health/detailed`, () => {
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

  // AI endpoints
  http.post(`${BASE_URL}/ai/chat`, async ({ request }) => {
    const body = await request.json();

    // Simulate validation error for empty messages
    if (!body.message || body.message.trim() === "") {
      return new HttpResponse(
        JSON.stringify({ message: "Validation error: Message is required" }),
        { status: 400 }
      );
    }

    // Simulate rate limiting after a few requests
    globalThis.requestCount++;
    if (globalThis.requestCount > RATE_LIMIT_THRESHOLD) {
      return new HttpResponse(
        JSON.stringify({ message: "Rate limit exceeded" }),
        { status: 429 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: {
        response: "This is a helpful AI response for your career question.",
        timestamp: new Date().toISOString(),
        sessionId: "session-123",
        confidence: 0.95,
      },
    });
  }),

  // Also handle absolute URLs for custom base URL tests
  http.post("http://localhost:5000/api/ai/chat", async ({ request }) => {
    const body = await request.json();

    // Simulate validation error for empty messages
    if (!body.message || body.message.trim() === "") {
      return new HttpResponse(
        JSON.stringify({ message: "Validation error: Message is required" }),
        { status: 400 }
      );
    }

    // Simulate rate limiting after a few requests
    globalThis.requestCount++;
    if (globalThis.requestCount > RATE_LIMIT_THRESHOLD) {
      return new HttpResponse(
        JSON.stringify({ message: "Rate limit exceeded" }),
        { status: 429 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: {
        response: "This is a helpful AI response for your career question.",
        timestamp: new Date().toISOString(),
        sessionId: "session-123",
        confidence: 0.95,
      },
    });
  }),

  http.post(`${BASE_URL}/ai/coaching`, async ({ request }) => {
    const body = await request.json();
    const coachingType = body.sessionType || "general";

    return HttpResponse.json({
      success: true,
      data: {
        response:
          "Based on your situation, I recommend focusing on building specific skills and networking. Let's break this down into actionable steps...",
        coachingType,
        timestamp: new Date().toISOString(),
      },
    });
  }),

  http.post(`${BASE_URL}/ai/analyze-job`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        analysis: {
          type: "fit",
          score: 88,
          recommendations: [
            "Strong technical background matches the requirements",
            "Consider highlighting leadership experience",
            "Add more quantifiable achievements",
          ],
          skills: ["JavaScript", "React", "Node.js", "Python"],
          gaps: ["AWS experience could be beneficial"],
        },
        timestamp: new Date().toISOString(),
      },
    });
  }),

  http.post(`${BASE_URL}/ai/analyze`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        result: {
          type: "sentiment",
          result: {
            sentiment: "positive",
            scores: { positive: 0.92, negative: 0.05, neutral: 0.03 },
          },
          confidence: 0.95,
          insights: ["Positive content detected"],
          recommendations: [],
        },
        analysisType: "sentiment",
        timestamp: new Date().toISOString(),
      },
    });
  }),

  http.post(`${BASE_URL}/ai/career-path`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        recommendations:
          "Based on your current role as Junior Developer and your 2 years of web development experience, here are your recommended career paths: 1. Senior Software Engineer (6-12 months) - Focus on deepening technical skills and taking on more complex projects. 2. Technical Lead (2-3 years) - Develop leadership and mentoring skills while continuing to grow technically.",
        timestamp: new Date().toISOString(),
      },
    });
  }),

  http.post(`${BASE_URL}/ai/interview-prep`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        preparation: {
          type: "technical",
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
        interviewType: "technical",
        timestamp: new Date().toISOString(),
      },
    });
  }),

  http.post(`${BASE_URL}/ai/skill-gap`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        skillGapAnalysis: {
          type: "analysis",
          result: {
            gaps: [
              "TypeScript proficiency needed for senior roles",
              "AWS cloud experience required",
              "Docker containerization skills beneficial",
            ],
          },
          confidence: 0.7,
          insights: ["Need training in advanced technologies"],
          recommendations: [
            "Complete TypeScript certification course",
            "Get AWS Certified Developer certification",
            "Practice with Docker in personal projects",
          ],
        },
        timestamp: new Date().toISOString(),
      },
    });
  }),

  http.get(`${BASE_URL}/ai/models`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        models: ["gpt-4", "gpt-3.5-turbo"],
        default: "gpt-4",
      },
    });
  }),

  http.get(`${BASE_URL}/ai/status`, () => {
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

  // Error responses for testing
  http.post(`${BASE_URL}/ai/chat/error/429`, () => {
    return new HttpResponse(
      JSON.stringify({ message: "Rate limit exceeded" }),
      { status: 429 }
    );
  }),

  http.post(`${BASE_URL}/ai/chat/error/503`, () => {
    return new HttpResponse(
      JSON.stringify({ message: "Service unavailable" }),
      { status: 503 }
    );
  }),

  http.post(`${BASE_URL}/ai/chat/error/400`, () => {
    return new HttpResponse(JSON.stringify({ message: "Invalid input" }), {
      status: 400,
    });
  }),

  http.post(`${BASE_URL}/ai/chat/error/500`, () => {
    return new HttpResponse(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }),
];
