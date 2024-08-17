import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  disabled,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  type?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
  disabled?: boolean;
  onClick?: Function;
}) {
  return (
    <button
      disabled={disabled}
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
}

export default Button;
