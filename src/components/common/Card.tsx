import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-100
        bg-white
        p-7
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        transition-all
        duration-300

        hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]

        ${className}
      `}
    >
      {children}
    </div>
  );
}