import React, { CSSProperties } from "react";

interface RippleProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 5,
}: RippleProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]">
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.01;
        const animationDelay = `${i / 0.5 * 0.09}s`;
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={i}
            className={`absolute animate-ripple rounded-2xl bg-blue-300 backdrop-blur shadow-xl border [--i:${i}]`}
            style={
              {
                width: `${size + 20}px`,
                height: `${size + 105}px`,
                opacity,
                animationDelay,
                borderStyle,
                borderWidth: "1px",
                borderColor: `hsl(var(--foreground), ${borderOpacity / 200})`,
                top: "55%",
                left: "50%",
                transition: `transform ${i * 20}s, opacity 3s`,
                transform: "translate(-52%, -52%) scale(.1)",
                backdropFilter: i === 0 ? "blur(10px)" : "none", // Blur only for the smallest circle
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";

export default Ripple;
