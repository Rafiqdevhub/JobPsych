import React from "react";

const PricingModal = ({ isOpen, onClose, onSelectPlan }) => {
  if (!isOpen) return null;

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out our service",
      features: [
        "2 resume analyses per day",
        "Basic interview questions",
        "Standard processing time",
        "Email support",
      ],
      limitations: ["Limited daily uploads", "Basic features only"],
      popular: false,
      current: true,
      buttonText: "Current Plan",
      buttonDisabled: true,
    },
    {
      id: "pro",
      name: "Pro",
      price: "$29.99",
      period: "month",
      description: "Great for job seekers and recruiters",
      features: [
        "20 resume analyses per day",
        "Advanced interview questions",
        "Priority processing",
        "Detailed candidate insights",
        "Email & chat support",
        "Export to PDF/Excel",
      ],
      popular: true,
      current: false,
      buttonText: "Upgrade to Pro",
      buttonDisabled: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$49.99",
      period: "month",
      description: "Perfect for HR teams and agencies",
      features: [
        "Unlimited resume analyses",
        "AI-powered insights",
        "Custom question templates",
        "Team collaboration tools",
        "Priority support",
        "API access",
        "White-label options",
      ],
      popular: false,
      current: false,
      buttonText: "Upgrade to Premium",
      buttonDisabled: false,
    },
  ];

  const handlePlanSelect = (planId) => {
    if (onSelectPlan) {
      onSelectPlan(planId);
    }
    // Here you would typically redirect to payment processing
    // Payment integration will be added when backend is ready
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
          borderRadius: "16px",
          padding: "0",
          maxWidth: "1200px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "32px 32px 40px 32px",
            borderRadius: "16px 16px 0 0",
            textAlign: "center",
            position: "relative",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "rgba(255, 255, 255, 0.3)")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "rgba(255, 255, 255, 0.2)")
            }
          >
            ×
          </button>

          <h2
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "8px",
            }}
          >
            Choose Your Plan
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.9)",
              marginBottom: "0",
            }}
          >
            Unlock the full potential of AI-powered resume analysis
          </p>
        </div>

        <div
          style={{
            padding: "40px 32px",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {plans.map((plan) => (
              <div
                key={plan.id}
                style={{
                  background: plan.popular
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "white",
                  borderRadius: "16px",
                  padding: "32px 24px",
                  textAlign: "center",
                  position: "relative",
                  border: plan.current
                    ? "3px solid #10b981"
                    : plan.popular
                    ? "none"
                    : "2px solid #e5e7eb",
                  boxShadow: plan.popular
                    ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  transform: plan.popular ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.3s ease",
                }}
              >
                {plan.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background:
                        "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "white",
                      padding: "6px 24px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Most Popular
                  </div>
                )}

                {plan.current && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background:
                        "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "white",
                      padding: "6px 24px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Current Plan
                  </div>
                )}

                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: plan.popular ? "white" : "#1f2937",
                    marginBottom: "8px",
                  }}
                >
                  {plan.name}
                </h3>

                <div style={{ marginBottom: "16px" }}>
                  <span
                    style={{
                      fontSize: "48px",
                      fontWeight: "bold",
                      color: plan.popular ? "white" : "#1f2937",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                      color: plan.popular
                        ? "rgba(255, 255, 255, 0.8)"
                        : "#6b7280",
                      marginLeft: "4px",
                    }}
                  >
                    /{plan.period}
                  </span>
                </div>

                <p
                  style={{
                    color: plan.popular
                      ? "rgba(255, 255, 255, 0.9)"
                      : "#6b7280",
                    marginBottom: "24px",
                    fontSize: "16px",
                  }}
                >
                  {plan.description}
                </p>

                <div style={{ marginBottom: "32px", textAlign: "left" }}>
                  <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "12px",
                          fontSize: "14px",
                          color: plan.popular
                            ? "rgba(255, 255, 255, 0.9)"
                            : "#374151",
                        }}
                      >
                        <svg
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "12px",
                            color: plan.popular ? "#10b981" : "#10b981",
                            flexShrink: 0,
                          }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {plan.limitations && (
                    <div
                      style={{
                        marginTop: "16px",
                        paddingTop: "16px",
                        borderTop: `1px solid ${
                          plan.popular ? "rgba(255, 255, 255, 0.2)" : "#e5e7eb"
                        }`,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "12px",
                          color: plan.popular
                            ? "rgba(255, 255, 255, 0.7)"
                            : "#9ca3af",
                          marginBottom: "8px",
                        }}
                      >
                        Limitations:
                      </p>
                      <ul
                        style={{ listStyle: "none", padding: "0", margin: "0" }}
                      >
                        {plan.limitations.map((limitation, index) => (
                          <li
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "8px",
                              fontSize: "12px",
                              color: plan.popular
                                ? "rgba(255, 255, 255, 0.7)"
                                : "#9ca3af",
                            }}
                          >
                            <svg
                              style={{
                                width: "16px",
                                height: "16px",
                                marginRight: "8px",
                                color: "#ef4444",
                                flexShrink: 0,
                              }}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  disabled={plan.buttonDisabled}
                  style={{
                    width: "100%",
                    padding: "16px 24px",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: plan.buttonDisabled ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    background: plan.buttonDisabled
                      ? "#9ca3af"
                      : plan.popular
                      ? "white"
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: plan.buttonDisabled
                      ? "white"
                      : plan.popular
                      ? "#667eea"
                      : "white",
                    opacity: plan.buttonDisabled ? 0.6 : 1,
                  }}
                  onMouseOver={(e) => {
                    if (!plan.buttonDisabled) {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 10px 25px rgba(0, 0, 0, 0.15)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!plan.buttonDisabled) {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: "32px",
              padding: "24px",
              background: "rgba(255, 255, 255, 0.8)",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
            }}
          >
            <p
              style={{
                color: "#6b7280",
                fontSize: "14px",
                margin: "0 0 8px 0",
              }}
            >
              🔒 <strong>Secure Payment</strong> • 30-day money-back guarantee •
              Cancel anytime
            </p>
            <p style={{ color: "#9ca3af", fontSize: "12px", margin: "0" }}>
              All plans include enterprise-grade security and privacy protection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
