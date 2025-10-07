import { expect, test, vi, describe, beforeEach, afterEach } from "vitest";
import { server } from "../../test/mocks/server";
import { http, HttpResponse } from "msw";
import {
  chat,
  coaching,
  analyzeJob,
  analyzeText,
  getCareerPath,
  prepareInterview,
  analyzeSkillGap,
  getModels,
  getStatus,
  getHealth,
  getDetailedHealth,
} from "../aiApi";

const BASE_URL = "https://evaai-seven.vercel.app/api";

describe("AI API Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("chat", () => {
    test("makes correct request with required parameters", async () => {
      const result = await chat("Hello AI");

      expect(result).toEqual({
        success: true,
        data: {
          response: "This is a mock AI response",
          timestamp: expect.any(String),
        },
      });
    });

    test("handles custom base URL", async () => {
      // Mock a different base URL
      server.use(
        http.post("http://localhost:5000/api/ai/chat", () => {
          return HttpResponse.json({
            success: true,
            data: {
              response: "Custom URL response",
              timestamp: new Date().toISOString(),
            },
          });
        })
      );

      const result = await chat(
        "Hello AI",
        null,
        "general",
        null,
        "http://localhost:5000/api"
      );

      expect(result).toEqual({
        success: true,
        data: {
          response: "Custom URL response",
          timestamp: expect.any(String),
        },
      });
    });
  });

  describe("coaching", () => {
    test("makes correct request with required parameters", async () => {
      const result = await coaching("How to improve?");

      expect(result).toEqual({
        success: true,
        data: {
          response: "This is coaching advice",
          coachingType: "general",
          timestamp: expect.any(String),
        },
      });
    });
  });

  describe("analyzeJob", () => {
    test("makes correct request with required parameters", async () => {
      const result = await analyzeJob(null, null, "fit");

      expect(result).toEqual({
        success: true,
        data: {
          analysis: {
            type: "fit",
            result: { score: 85 },
            confidence: 0.9,
            insights: ["Good fit"],
            recommendations: ["Apply"],
          },
          timestamp: expect.any(String),
        },
      });
    });
  });

  describe("analyzeText", () => {
    test("makes correct request", async () => {
      const result = await analyzeText("Sample text", "sentiment");

      expect(result).toEqual({
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
          timestamp: expect.any(String),
        },
      });
    });
  });

  describe("getCareerPath", () => {
    test("makes correct request", async () => {
      const result = await getCareerPath(
        "Developer",
        "5 years",
        "Tech",
        "Senior role"
      );

      expect(result).toEqual({
        success: true,
        data: {
          recommendations: "Consider senior roles",
          timestamp: expect.any(String),
        },
      });
    });
  });

  describe("prepareInterview", () => {
    test("makes correct request", async () => {
      const result = await prepareInterview("Job desc", "Profile");

      expect(result).toEqual({
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
          timestamp: expect.any(String),
        },
      });
    });
  });

  describe("analyzeSkillGap", () => {
    test("makes correct request", async () => {
      const result = await analyzeSkillGap(
        "Senior Dev",
        "JavaScript",
        "React, Node.js"
      );

      expect(result).toEqual({
        success: true,
        data: {
          skillGapAnalysis: {
            type: "analysis",
            result: { gaps: ["Skill1"] },
            confidence: 0.7,
            insights: ["Need training"],
            recommendations: ["Take course"],
          },
          timestamp: expect.any(String),
        },
      });
    });
  });

  describe("getModels", () => {
    test("makes correct request", async () => {
      const result = await getModels();

      expect(result).toEqual({
        success: true,
        data: {
          models: ["gpt-4", "gpt-3.5-turbo"],
          default: "gpt-4",
        },
      });
    });
  });

  describe("getStatus", () => {
    test("makes correct request", async () => {
      const result = await getStatus();

      expect(result).toEqual({
        success: true,
        data: {
          status: "OK",
          models: ["gpt-4", "gpt-3.5-turbo"],
          provider: "OpenAI",
          features: ["chat", "analysis"],
          lastCheck: expect.any(String),
        },
      });
    });
  });

  describe("Health endpoints", () => {
    test("getHealth makes correct request", async () => {
      const result = await getHealth();

      expect(result).toEqual({
        success: true,
        data: {
          status: "OK",
          timestamp: expect.any(String),
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
    });

    test("getDetailedHealth makes correct request", async () => {
      const result = await getDetailedHealth();

      expect(result).toEqual({
        success: true,
        data: {
          status: "OK",
          timestamp: expect.any(String),
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
    });
  });

  describe("Error handling", () => {
    test("handles rate limit error (429)", async () => {
      server.use(
        http.post(`${BASE_URL}/ai/chat`, () => {
          return new HttpResponse(
            JSON.stringify({ message: "Rate limit exceeded" }),
            { status: 429 }
          );
        })
      );

      await expect(chat("Test")).rejects.toThrow(
        "Rate limit exceeded. Please try again later."
      );
    });

    test("handles service unavailable error (503)", async () => {
      server.use(
        http.post(`${BASE_URL}/ai/chat`, () => {
          return new HttpResponse(
            JSON.stringify({ message: "Service unavailable" }),
            { status: 503 }
          );
        })
      );

      await expect(chat("Test")).rejects.toThrow(
        "AI service is temporarily unavailable. Please try again later."
      );
    });

    test("handles validation error (400)", async () => {
      server.use(
        http.post(`${BASE_URL}/ai/chat`, () => {
          return new HttpResponse(
            JSON.stringify({ message: "Invalid input" }),
            { status: 400 }
          );
        })
      );

      await expect(chat("Test")).rejects.toThrow("Invalid input");
    });

    test("handles generic server error", async () => {
      server.use(
        http.post(`${BASE_URL}/ai/chat`, () => {
          return new HttpResponse(JSON.stringify({ message: "Server error" }), {
            status: 500,
          });
        })
      );

      await expect(chat("Test")).rejects.toThrow("Server error");
    });

    test("handles network error", async () => {
      // Simulate network error by rejecting the request
      server.use(
        http.post(`${BASE_URL}/ai/chat`, () => {
          throw new Error("Network error");
        })
      );

      await expect(chat("Test")).rejects.toThrow("Network error");
    });
  });
});
