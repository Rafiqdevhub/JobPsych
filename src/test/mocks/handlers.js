import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/health", () => {
    return HttpResponse.json({
      success: true,
      data: {
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: 123.456,
        environment: "test",
        version: "1.0.0",
      },
    });
  }),

  http.post("/api/ai/chat", () => {
    return HttpResponse.json({
      success: true,
      data: {
        response: "This is a mock AI response",
        timestamp: new Date().toISOString(),
      },
    });
  }),

  // Add more API mocks as needed
];
