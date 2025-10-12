/* global __ENV */
import http from "k6/http";
import { check, sleep, group } from "k6";
import { Rate, Trend, Counter } from "k6/metrics";

// Custom metrics
const errorRate = new Rate("errors");
const pageLoadTime = new Trend("page_load_time");
const apiResponseTime = new Trend("api_response_time");
const requestCounter = new Counter("requests_total");

// Test configuration
export const options = {
  stages: [
    { duration: "1m", target: 10 }, // Warm up
    { duration: "3m", target: 50 }, // Ramp up to 50 users
    { duration: "5m", target: 50 }, // Stay at 50 users
    { duration: "2m", target: 100 }, // Spike to 100 users
    { duration: "3m", target: 100 }, // Stay at 100 users
    { duration: "2m", target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000", "p(99)<5000"], // 95% under 2s, 99% under 5s
    http_req_failed: ["rate<0.05"], // Error rate under 5%
    errors: ["rate<0.05"],
    page_load_time: ["p(95)<3000"],
    api_response_time: ["p(95)<1000"],
  },
};

const BASE_URL =
  typeof __ENV !== "undefined" && __ENV.BASE_URL
    ? __ENV.BASE_URL
    : "http://localhost:3000";

// Utility function to check response
function checkResponse(response, checkName) {
  const result = check(response, {
    [`${checkName}: status 200`]: (r) => r.status === 200,
    [`${checkName}: response time < 2s`]: (r) => r.timings.duration < 2000,
  });

  errorRate.add(!result);
  requestCounter.add(1);
  return result;
}

// Test scenarios
export default function () {
  // Randomly select a user journey
  const scenario = Math.random();

  if (scenario < 0.3) {
    landingPageJourney();
  } else if (scenario < 0.5) {
    roleSuggestionsJourney();
  } else if (scenario < 0.7) {
    atsAnalyzerJourney();
  } else if (scenario < 0.85) {
    interviewPrepJourney();
  } else {
    securityAuditJourney();
  }

  sleep(Math.random() * 3 + 1); // Think time: 1-4 seconds
}

function landingPageJourney() {
  group("Landing Page Journey", () => {
    // Load landing page
    const startTime = Date.now();
    const response = http.get(`${BASE_URL}/`);
    const loadTime = Date.now() - startTime;

    checkResponse(response, "Landing Page");
    pageLoadTime.add(loadTime);

    check(response, {
      "Landing: has title": (r) => r.body.includes("JobPsych"),
      "Landing: has CSP header": (r) =>
        r.headers["Content-Security-Policy"] !== undefined,
    });

    sleep(2);

    // Load static assets
    const assets = ["index.css"];
    assets.forEach((asset) => {
      http.get(`${BASE_URL}/assets/${asset}`);
    });

    sleep(1);
  });
}

function roleSuggestionsJourney() {
  group("Role Suggestions Journey", () => {
    // Navigate to role suggestions
    const pageResponse = http.get(`${BASE_URL}/role-suggestions`);
    checkResponse(pageResponse, "Role Suggestions Page");
    pageLoadTime.add(pageResponse.timings.duration);

    sleep(3);

    // Simulate resume upload
    const apiStartTime = Date.now();
    const apiResponse = http.post(
      `${BASE_URL}/api/analyze-resume`,
      JSON.stringify({
        file: "test_resume_content",
        analysis_type: "role_suggestions",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const apiTime = Date.now() - apiStartTime;

    apiResponseTime.add(apiTime);

    check(apiResponse, {
      "API: status is 200 or 429": (r) => r.status === 200 || r.status === 429, // Allow rate limiting
      "API: response time < 5s": (r) => r.timings.duration < 5000,
    });

    sleep(2);
  });
}

function atsAnalyzerJourney() {
  group("ATS Analyzer Journey", () => {
    // Navigate to ATS analyzer
    const pageResponse = http.get(`${BASE_URL}/ats-analyzer`);
    checkResponse(pageResponse, "ATS Analyzer Page");
    pageLoadTime.add(pageResponse.timings.duration);

    sleep(4);

    // Simulate analysis request
    const apiStartTime = Date.now();
    const apiResponse = http.post(
      `${BASE_URL}/api/analyze-resume`,
      JSON.stringify({
        file: "test_resume_content",
        analysis_type: "ats_score",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const apiTime = Date.now() - apiStartTime;

    apiResponseTime.add(apiTime);

    check(apiResponse, {
      "ATS API: status OK or rate limited": (r) =>
        r.status === 200 || r.status === 429,
    });

    sleep(3);
  });
}

function interviewPrepJourney() {
  group("Interview Prep Journey", () => {
    // Navigate to interview prep
    const pageResponse = http.get(`${BASE_URL}/interview-prepai`);
    checkResponse(pageResponse, "Interview Prep Page");
    pageLoadTime.add(pageResponse.timings.duration);

    sleep(2);

    // Test AI chat
    const chatMessages = [
      "What are common interview questions?",
      "How do I prepare for technical interviews?",
      "Can you help me with behavioral questions?",
    ];

    const message =
      chatMessages[Math.floor(Math.random() * chatMessages.length)];

    const apiStartTime = Date.now();
    const chatResponse = http.post(
      `${BASE_URL}/api/ai/chat`,
      JSON.stringify({
        message: message,
        sessionType: "coaching",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const apiTime = Date.now() - apiStartTime;

    apiResponseTime.add(apiTime);

    check(chatResponse, {
      "Chat API: status OK or rate limited": (r) =>
        r.status === 200 || r.status === 429,
    });

    sleep(3);
  });
}

function securityAuditJourney() {
  group("Security Audit Journey", () => {
    // Navigate to security audit
    const pageResponse = http.get(`${BASE_URL}/security-audit`);
    checkResponse(pageResponse, "Security Audit Page");
    pageLoadTime.add(pageResponse.timings.duration);

    check(pageResponse, {
      "Security: has dashboard": (r) =>
        r.body.includes("Security Audit Dashboard"),
    });

    sleep(2);
  });
}

// Setup function - runs once at the start
export function setup() {
  console.warn(`Starting load test against ${BASE_URL}`);
  console.warn(
    `Test will simulate ${options.stages.reduce(
      (max, stage) => Math.max(max, stage.target),
      0
    )} concurrent users`
  );
}

// Teardown function - runs once at the end
export function teardown(_data) {
  console.warn("Load test completed");
}
