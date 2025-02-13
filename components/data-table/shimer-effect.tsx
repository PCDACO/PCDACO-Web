import type React from "react";

export const ShimmerEffect: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${className}`}
    />
  );
};
