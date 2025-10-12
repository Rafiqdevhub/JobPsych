/* eslint-env node */
// Load test processor for Artillery
// Provides custom functions and utilities for load testing

module.exports = {
  // Generate random string for testing
  generateRandomString: function (context, events, done) {
    context.vars.randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    return done();
  },

  // Generate random email
  generateRandomEmail: function (context, events, done) {
    const randomStr = Math.random().toString(36).substring(2, 10);
    context.vars.randomEmail = `test_${randomStr}@loadtest.com`;
    return done();
  },

  // Log response time
  logResponse: function (requestParams, response, context, ee, next) {
    if (response.timings) {
      console.warn(
        `Request to ${requestParams.url} took ${response.timings.phases.total}ms`
      );
    }
    return next();
  },

  // Simulate user think time
  simulateUserBehavior: function (context, events, done) {
    const thinkTime = Math.random() * 5000 + 1000; // 1-6 seconds
    context.vars.thinkTime = thinkTime;
    return done();
  },

  // Track errors
  trackErrors: function (requestParams, response, context, ee, next) {
    if (response.statusCode >= 400) {
      ee.emit("error", {
        url: requestParams.url,
        statusCode: response.statusCode,
        timestamp: new Date().toISOString(),
      });
    }
    return next();
  },

  // Before scenario hook
  beforeScenario: function (context, events, done) {
    context.vars.startTime = Date.now();
    return done();
  },

  // After scenario hook
  afterScenario: function (context, events, done) {
    const duration = Date.now() - context.vars.startTime;
    events.emit("counter", "scenario.duration", duration);
    return done();
  },

  // Generate realistic resume data
  generateResumeData: function (context, events, done) {
    const skills = [
      "JavaScript",
      "Python",
      "React",
      "Node.js",
      "TypeScript",
      "AWS",
    ];
    const randomSkills = skills
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .join(", ");

    context.vars.resumeData = {
      skills: randomSkills,
      experience: Math.floor(Math.random() * 10) + 1,
      education: "Bachelor's Degree",
    };
    return done();
  },

  // Generate chat message
  generateChatMessage: function (context, events, done) {
    const messages = [
      "What are good career paths in tech?",
      "How do I improve my resume?",
      "What skills should I learn for software engineering?",
      "Can you help me prepare for an interview?",
      "What are the best practices for job searching?",
    ];
    context.vars.chatMessage =
      messages[Math.floor(Math.random() * messages.length)];
    return done();
  },

  // Validate response
  validateResponse: function (requestParams, response, context, ee, next) {
    try {
      if (response.body) {
        const body =
          typeof response.body === "string"
            ? JSON.parse(response.body)
            : response.body;

        if (body.success === false && response.statusCode === 200) {
          ee.emit("error", {
            message: "Success false but status 200",
            url: requestParams.url,
          });
        }
      }
    } catch {
      // Ignore JSON parse errors for HTML responses
    }
    return next();
  },

  // Performance metrics collector
  collectMetrics: function (requestParams, response, context, ee, next) {
    if (response.timings && response.timings.phases) {
      const metrics = {
        url: requestParams.url,
        dns: response.timings.phases.dns || 0,
        tcp: response.timings.phases.tcp || 0,
        tls: response.timings.phases.tls || 0,
        firstByte: response.timings.phases.firstByte || 0,
        download: response.timings.phases.download || 0,
        total: response.timings.phases.total || 0,
      };

      // Emit custom metrics
      ee.emit("histogram", "response.dns", metrics.dns);
      ee.emit("histogram", "response.tcp", metrics.tcp);
      ee.emit("histogram", "response.firstByte", metrics.firstByte);
      ee.emit("histogram", "response.download", metrics.download);
    }
    return next();
  },
};
