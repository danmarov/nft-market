import { cn } from "@/lib/utils";

interface NFTBackgroundProps {
  className?: string;
  centerColor: string;
  edgeColor: string;
  patternImage?: string;
}

const patternPositions = [
  { x: 8, y: -1, scale: 0.22, opacity: 0.15 },
  { x: 90, y: -1, scale: 0.22, opacity: 0.15 },

  { x: 6, y: 75, scale: 0.22, opacity: 0.16 },
  { x: 94, y: 75, scale: 0.22, opacity: 0.16 },

  { x: 50, y: -6, scale: 0.25, opacity: 0.18 },
  { x: 50, y: 74, scale: 0.3, opacity: 0.18 },

  { x: 28, y: -1.5, scale: 0.3, opacity: 0.16 },
  { x: 70, y: -1.5, scale: 0.3, opacity: 0.16 },

  { x: 24, y: 68, scale: 0.3, opacity: 0.2 },
  { x: 75, y: 68, scale: 0.3, opacity: 0.2 },

  { x: 11, y: 38, scale: 0.35, opacity: 0.19 },
  { x: 90, y: 38, scale: 0.35, opacity: 0.19 },

  { x: 10, y: 55, scale: 0.22, opacity: 0.16 },
  { x: 90, y: 55, scale: 0.22, opacity: 0.16 },

  { x: 14, y: 18, scale: 0.28, opacity: 0.18 },
  { x: 88, y: 18, scale: 0.28, opacity: 0.18 },
];

const NFTBackground = ({
  patternImage = "",
  className = "",
  centerColor,
  edgeColor,
}: NFTBackgroundProps) => {
  return (
    <div
      className={cn(
        "w-full h-full relative overflow-hidden rounded-lg",
        className
      )}
      style={{
        background: `radial-gradient(69.65% 69.65% at 50% 50%, ${centerColor} 0%, ${edgeColor} 100%)`,
      }}
    >
      {patternImage &&
        patternPositions.map((pos, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `calc(${pos.y}% + 14%)`,
              width: `${pos.scale * 22}%`, // Используем проценты вместо фиксированного размера
              height: `${pos.scale * 22}%`,
              opacity: pos.opacity,
              filter: "brightness(0.3)",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src={patternImage}
              alt="pattern"
              className="w-full h-full object-contain"
            />
          </div>
        ))}
    </div>
  );
};

export default NFTBackground;
