import { http, HttpResponse } from "msw";

const BASE_URL = "https://evaai-seven.vercel.app/api";

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
  http.post(`${BASE_URL}/ai/chat`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        response: "This is a mock AI response",
        timestamp: new Date().toISOString(),
      },
    });
  }),

  http.post(`${BASE_URL}/ai/coaching`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        response: "This is coaching advice",
        coachingType: "general",
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
          result: { score: 85 },
          confidence: 0.9,
          insights: ["Good fit"],
          recommendations: ["Apply"],
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
          result: { sentiment: "positive" },
          confidence: 0.95,
          insights: ["Positive content"],
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
        recommendations: "Consider senior roles",
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
          result: { questions: ["Q1", "Q2"] },
          confidence: 0.8,
          insights: ["Prepare well"],
          recommendations: ["Practice"],
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
          result: { gaps: ["Skill1"] },
          confidence: 0.7,
          insights: ["Need training"],
          recommendations: ["Take course"],
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
