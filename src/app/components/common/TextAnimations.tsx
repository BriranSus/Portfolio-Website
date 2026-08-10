import React from "react";
import { useReveal } from "../../hooks/useReveal";

export function SplitChars({
  text,
  style,
  delay = 0,
  active,
}: {
  text: string;
  style?: React.CSSProperties;
  delay?: number;
  active: boolean;
}) {
  return (
    <span style={{ display: "inline", ...style }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            transform: active ? "translateY(0)" : "translateY(115%)",
            transition: `transform .9s cubic-bezier(0.16,1,0.3,1) ${delay + i * 0.032}s`,
            whiteSpace: ch === " " ? "pre" : "normal",
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export function SplitWords({
  text,
  className,
  style,
  delay = 0,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={className} style={style}>
      {text.split(" ").map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}>
          <span
            style={{
              display: "inline-block",
              transform: vis ? "translateY(0)" : "translateY(115%)",
              transition: `transform .9s cubic-bezier(0.16,1,0.3,1) ${delay + i * 0.06}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}
