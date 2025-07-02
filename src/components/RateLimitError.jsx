import React, { useEffect, useState } from "react";

const RateLimitError = ({ rateLimitData, onClose }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    let resetTimeMs = null;

    if (rateLimitData?.retry_after) {
      resetTimeMs = Date.now() + rateLimitData.retry_after * 1000;
    } else if (rateLimitData?.reset_in) {
      const resetInStr = rateLimitData.reset_in;
      const hoursMatch = resetInStr.match(/(\d+)h/);
      const minutesMatch = resetInStr.match(/(\d+)m/);

      const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
      const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

      resetTimeMs = Date.now() + hours * 60 * 60 * 1000 + minutes * 60 * 1000;
    } else if (rateLimitData?.reset_time) {
      resetTimeMs = new Date(rateLimitData.reset_time).getTime();
    }

    if (!resetTimeMs) return;

    const updateTimer = () => {
      const now = Date.now();
      const remaining = resetTimeMs - now;

      if (remaining <= 0) {
        setTimeRemaining(null);
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      setTimeRemaining({ hours, minutes });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);

    return () => clearInterval(interval);
  }, [rateLimitData]);

  const formatTimeRemaining = () => {
    if (!timeRemaining) return rateLimitData?.reset_in || "soon";

    if (timeRemaining.hours > 0) {
      return `${timeRemaining.hours}h ${timeRemaining.minutes}m`;
    }
    return `${timeRemaining.minutes}m`;
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "16px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "500px",
          width: "100%",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏱️</div>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "12px",
            }}
          >
            Rate Limit Exceeded
          </h3>
          <p style={{ color: "#6b7280", marginBottom: "16px" }}>
            {rateLimitData?.message ||
              "You've reached the maximum number of resume analyses allowed (2 per 24 hours)."}
          </p>
          <div
            style={{
              backgroundColor: "#f0f9ff",
              border: "1px solid #bae6fd",
              borderRadius: "6px",
              padding: "12px",
              marginTop: "12px",
            }}
          >
            <p style={{ color: "#0c4a6e", fontSize: "14px", margin: "0" }}>
              💼 <strong>Need more resume analyses?</strong>
              <br />
              Contact us at{" "}
              <a
                href="mailto:rafkhan9323@gmail.com"
                style={{
                  color: "#0369a1",
                  textDecoration: "underline",
                  fontWeight: "500",
                }}
              >
                rafkhan9323@gmail.com
              </a>{" "}
              for additional quota or premium access.
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#eff6ff",
            border: "1px solid #dbeafe",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          <p
            style={{ color: "#1e3a8a", marginBottom: "4px", fontWeight: "600" }}
          >
            You can try again in: <strong>{formatTimeRemaining()}</strong>
          </p>
          <div style={{ fontSize: "12px", color: "#1e40af", opacity: 0.75 }}>
            Your upload limit will reset in approximately{" "}
            {formatTimeRemaining()}
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h4
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "8px",
            }}
          >
            💡 Tips while you wait:
          </h4>
          <ul
            style={{
              paddingLeft: "20px",
              fontSize: "14px",
              color: "#6b7280",
              lineHeight: "1.5",
            }}
          >
            <li style={{ marginBottom: "4px" }}>
              Review and refine your resume based on previous feedback
            </li>
            <li style={{ marginBottom: "4px" }}>
              Research the company and position you're applying for
            </li>
            <li style={{ marginBottom: "4px" }}>
              Prepare thoughtful answers to common interview questions
            </li>
            <li style={{ marginBottom: "4px" }}>
              Practice your elevator pitch and professional summary
            </li>
          </ul>
        </div>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px 16px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

export default RateLimitError;
