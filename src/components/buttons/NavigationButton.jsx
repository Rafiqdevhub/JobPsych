import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationButton = ({
  to,
  className = "",
  children,
  useHref = false,
  type = "button",
  onClick,
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();

    if (onClick) {
      onClick(e);
    }

    if (e.defaultPrevented) return;

    try {
      if (useHref) {
        window.location.href = to;
      } else {
        navigate(to);

        setTimeout(() => {
          if (window.location.pathname !== to) {
            window.location.href = to;
          }
        }, 300);
      }
    } catch {
      window.location.href = to;
    }
  };

  return (
    <button
      type={type}
      className={className}
      onClick={handleClick}
      role="link"
      tabIndex={0}
      aria-label={`Navigate to ${to}`}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick(e);
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default NavigationButton;
