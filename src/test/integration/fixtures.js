// src/test/integration/fixtures/userProfiles.js
export const mockUserProfiles = {
  basicUser: {
    id: "user-1",
    email: "test@example.com",
    name: "Test User",
    subscription: "free",
    preferences: {
      theme: "light",
      notifications: true,
    },
  },
  premiumUser: {
    id: "user-2",
    email: "premium@example.com",
    name: "Premium User",
    subscription: "premium",
    preferences: {
      theme: "dark",
      notifications: true,
    },
  },
  enterpriseUser: {
    id: "user-3",
    email: "enterprise@company.com",
    name: "Enterprise User",
    subscription: "enterprise",
    preferences: {
      theme: "light",
      notifications: false,
    },
  },
};

// src/test/integration/fixtures/resumeData.js
export const mockResumeData = {
  basic: {
    id: "resume-1",
    fileName: "john-doe-resume.pdf",
    fileSize: 245760, // 240KB
    content: "Mock resume content for John Doe...",
    uploadDate: new Date().toISOString(),
    status: "processed",
    analysis: {
      score: 85,
      recommendations: ["Strong technical background", "Good experience level"],
      skills: ["JavaScript", "React", "Node.js"],
    },
  },
  large: {
    id: "resume-2",
    fileName: "comprehensive-resume.pdf",
    fileSize: 5242880, // 5MB
    content: "Large comprehensive resume content...",
    uploadDate: new Date().toISOString(),
    status: "processed",
    analysis: {
      score: 92,
      recommendations: [
        "Excellent technical skills",
        "Strong leadership experience",
      ],
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
    },
  },
  corrupted: {
    id: "resume-3",
    fileName: "corrupted-resume.pdf",
    fileSize: 102400, // 100KB
    content: "Corrupted file content...",
    uploadDate: new Date().toISOString(),
    status: "failed",
    error: "File appears to be corrupted",
  },
};

// src/test/integration/fixtures/chatConversations.js
export const mockChatConversations = {
  basic: [
    {
      id: "msg-1",
      role: "user",
      content: "Hello, I need career advice",
      timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
    },
    {
      id: "msg-2",
      role: "assistant",
      content:
        "I'd be happy to help you with career advice. What specific area are you interested in?",
      timestamp: new Date(Date.now() - 240000).toISOString(), // 4 minutes ago
    },
    {
      id: "msg-3",
      role: "user",
      content: "I'm thinking about transitioning to tech",
      timestamp: new Date(Date.now() - 180000).toISOString(), // 3 minutes ago
    },
    {
      id: "msg-4",
      role: "assistant",
      content:
        "That's a great goal! Tech offers many exciting opportunities. What background do you have?",
      timestamp: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
    },
  ],
  coaching: [
    {
      id: "msg-1",
      role: "user",
      content: "I feel stuck in my current role",
      timestamp: new Date(Date.now() - 180000).toISOString(),
    },
    {
      id: "msg-2",
      role: "assistant",
      content:
        "Feeling stuck is common. Let's identify your goals and create a plan. What aspects of your current role do you enjoy?",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
  ],
  error: [
    {
      id: "msg-1",
      role: "user",
      content: "Test message",
      timestamp: new Date().toISOString(),
    },
    {
      id: "msg-2",
      role: "assistant",
      content: "Error: Unable to process your request at this time.",
      timestamp: new Date().toISOString(),
      error: true,
    },
  ],
};

// src/test/integration/fixtures/jobDescriptions.js
export const mockJobDescriptions = {
  softwareEngineer: {
    title: "Senior Software Engineer",
    company: "TechCorp",
    description: `We are looking for a Senior Software Engineer to join our dynamic team.

Requirements:
- 5+ years of experience in full-stack development
- Strong proficiency in React, Node.js, and TypeScript
- Experience with cloud platforms (AWS/Azure)
- Knowledge of CI/CD pipelines and DevOps practices

Responsibilities:
- Design and develop scalable web applications
- Collaborate with cross-functional teams
- Mentor junior developers
- Participate in code reviews and technical discussions`,
    requirements: ["React", "Node.js", "TypeScript", "AWS", "CI/CD"],
    location: "Remote",
    salary: "$120,000 - $160,000",
  },
  productManager: {
    title: "Product Manager",
    company: "InnovateLabs",
    description: `Join our product team as a Product Manager.

Key Responsibilities:
- Define product strategy and roadmap
- Work closely with engineering and design teams
- Conduct user research and analyze market trends
- Manage product launches and go-to-market strategies

Requirements:
- 3+ years of product management experience
- Strong analytical and communication skills
- Experience with Agile methodologies
- Technical background preferred`,
    requirements: ["Product Strategy", "Agile", "Analytics", "User Research"],
    location: "San Francisco, CA",
    salary: "$130,000 - $170,000",
  },
};

// src/test/integration/fixtures/apiResponses.js
export const mockApiResponses = {
  success: {
    chat: {
      success: true,
      data: {
        response: "This is a helpful AI response for your career question.",
        timestamp: new Date().toISOString(),
        sessionId: "session-123",
        confidence: 0.95,
      },
    },
    resumeAnalysis: {
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
    },
    careerPath: {
      success: true,
      data: {
        recommendations:
          "Based on your current role as Junior Developer and your 2 years of web development experience, here are your recommended career paths: 1. Senior Software Engineer (6-12 months) - Focus on deepening technical skills and taking on more complex projects. 2. Technical Lead (2-3 years) - Develop leadership and mentoring skills while continuing to grow technically.",
        timestamp: new Date().toISOString(),
      },
    },
    skillGapAnalysis: {
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
    },
  },
  errors: {
    rateLimit: {
      success: false,
      error: "Rate limit exceeded. Please try again later.",
      code: "RATE_LIMIT_EXCEEDED",
      retryAfter: 3600,
    },
    network: {
      success: false,
      error:
        "Network connection failed. Please check your internet connection.",
      code: "NETWORK_ERROR",
    },
    validation: {
      success: false,
      error: "Invalid file format. Please upload a PDF, DOC, or DOCX file.",
      code: "VALIDATION_ERROR",
      details: {
        allowedFormats: ["pdf", "doc", "docx"],
        maxSize: "10MB",
      },
    },
    server: {
      success: false,
      error: "Internal server error. Please try again later.",
      code: "INTERNAL_SERVER_ERROR",
    },
  },
};

// src/test/integration/fixtures/workflowScenarios.js
export const mockWorkflowScenarios = {
  completeResumeUploadFlow: {
    user: "basicUser",
    resume: "basic",
    expectedResults: {
      uploadSuccess: true,
      analysisComplete: true,
      recommendationsCount: 2,
      skillsIdentified: 3,
    },
  },
  chatConversationFlow: {
    user: "premiumUser",
    conversation: "basic",
    sessionType: "coaching",
    expectedResults: {
      messagesExchanged: 4,
      responseQuality: "high",
      contextPreserved: true,
    },
  },
  errorRecoveryFlow: {
    user: "basicUser",
    triggerError: "network",
    expectedResults: {
      errorDisplayed: true,
      retryOption: true,
      recoverySuccessful: true,
    },
  },
};
