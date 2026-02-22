import { AI_API_BASE_URL } from "./api.js";


const makeRequest = async (endpoint, options = {}, baseURL = AI_API_BASE_URL) => {
  const url = `${baseURL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP ${response.status}: ${response.statusText}`,
      }));

      // Handle specific error types
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else if (response.status === 503) {
        throw new Error(
          "AI service is temporarily unavailable. Please try again later."
        );
      } else if (response.status === 400) {
        throw new Error(
          errorData.message || "Invalid request. Please check your input."
        );
      } else {
        throw new Error(
          errorData.message || `Request failed: ${response.statusText}`
        );
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error occurred. Please check your connection.");
  }
}

// Health check endpoints
export const getHealth = async (baseURL) => {
  return makeRequest("/health", {}, baseURL);
};

export const getDetailedHealth = async (baseURL) => {
  return makeRequest("/health/detailed", {}, baseURL);
};

// AI endpoints
export const chat = async (
  message,
  context = null,
  sessionType = "general",
  model = null,
  baseURL
) => {
  const payload = {
    message: message.trim(),
    ...(context && { context: context.trim() }),
    ...(sessionType && { sessionType }),
    ...(model && { model }),
  };

  return makeRequest(
    "/ai/chat",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    baseURL
  );
}

export const coaching = async (
  query,
  sessionType = null,
  userContext = null,
  baseURL
) => {
  const payload = {
    query: query.trim(),
    ...(sessionType && { sessionType }),
    ...(userContext && { userContext: userContext.trim() }),
  };

  return makeRequest(
    "/ai/coaching",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    baseURL
  );
}

export const analyzeJob = async (
  jobDescription,
  userProfile,
  analysisType,
  baseURL
) => {
  const payload = {
    analysisType,
    ...(jobDescription && { jobDescription: jobDescription.trim() }),
    ...(userProfile && { userProfile: userProfile.trim() }),
  };

  return makeRequest(
    "/ai/analyze-job",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    baseURL
  );
}

export const analyzeText = async (text, analysisType, baseURL) => {
  return makeRequest(
    "/ai/analyze",
    {
      method: "POST",
      body: JSON.stringify({
        text: text.trim(),
        analysisType,
      }),
    },
    baseURL
  );
}

export const getCareerPath = async (
  currentRole,
  experience,
  interests,
  goals,
  baseURL
) => {
  return makeRequest(
    "/ai/career-path",
    {
      method: "POST",
      body: JSON.stringify({
        currentRole: currentRole.trim(),
        experience: experience.trim(),
        interests: interests.trim(),
        goals: goals.trim(),
      }),
    },
    baseURL
  );
}

export const prepareInterview = async (
  jobDescription,
  userProfile,
  interviewType = null,
  baseURL
) => {
  const payload = {
    jobDescription: jobDescription.trim(),
    userProfile: userProfile.trim(),
    ...(interviewType && { interviewType }),
  };

  return makeRequest(
    "/ai/interview-prep",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    baseURL
  );
}

export const analyzeSkillGap = async (
  targetRole,
  currentSkills,
  desiredSkills,
  baseURL
) => {
  return makeRequest(
    "/ai/skill-gap",
    {
      method: "POST",
      body: JSON.stringify({
        targetRole: targetRole.trim(),
        currentSkills: currentSkills.trim(),
        desiredSkills: desiredSkills.trim(),
      }),
    },
    baseURL
  );
}

export const getModels = async (baseURL) => {
  return makeRequest("/ai/models", {}, baseURL);
};

export const getStatus = async (baseURL) => {
  return makeRequest("/ai/status", {}, baseURL);
};

export default {
  getHealth,
  getDetailedHealth,
  chat,
  coaching,
  analyzeJob,
  analyzeText,
  getCareerPath,
  prepareInterview,
  analyzeSkillGap,
  getModels,
  getStatus,
};
