import React, { useState, useRef } from "react";

export function MagBtn({
  children,
  onClick,
  className,
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 10,
      y: ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 8,
    });
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className={className}
      style={{
        ...style,
        transform: `translate(${pos.x}px,${pos.y}px)`,
        transition: pos.x === 0 ? "transform .5s cubic-bezier(0.34,1.56,0.64,1)" : "transform .1s ease",
      }}
    >
      {children}
    </button>
  );
}
