import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "reset-0";
}

export function Container({ children, className = "", variant }: ContainerProps) {
  const paddingClasses = variant === "reset-0" ? "" : "px-[16px] @tablet:px-[80px]";
  
  return (
    <div
      className={`container max-w-containerLarge mx-auto ${paddingClasses} ${className}`}
    >
      {children}
    </div>
  );
}
