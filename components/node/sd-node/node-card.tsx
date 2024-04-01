"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NodeResizeControl, ResizeControlVariant } from "reactflow";
import { useEffect, useState } from "react";

interface NodeCardProps {
  active: boolean;
  title?: React.ReactNode;
  className?: string;
  preview?: boolean;
  color: string;
  children: React.ReactNode;
}

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const rotateDirection = (currentDirection: Direction): Direction => {
  const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
  const currentIndex = directions.indexOf(currentDirection);
  const nextIndex = (currentIndex - 1 + directions.length) % directions.length;
  return directions[nextIndex];
};

const duration = 1;

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  BOTTOM:
    "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  RIGHT:
    "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
};

const highlight =
  "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

export const NodeCard = ({
  active,
  title,
  preview = false,
  color,
  children,
}: NodeCardProps) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");
  const activeClass = active ? "shadow-lg" : "";

  console.log("color", color);

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered]);

  return (
    <Card
      className={cn(
        `${activeClass} drag-handle relative hover:shadow-lg`,
        "rounded-xl transition duration-200 overflow-visible bg-background dark:bg-[#101015]"
      )}
      onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <CardHeader
        className={cn(
          "relative py-4 px-5 rounded-t-xl z-10 bg-transparent",
          `bg-gradient-to-br from-${color}-300 via-transparent to-transparent dark:from-${color}-900 dark:via-transparent dark:to-transparent`
        )}
      >
        {title}
        {!preview && (
          <NodeResizeControl
            position="right"
            variant={"line" as ResizeControlVariant}
            style={{ borderWidth: "5px", borderColor: "transparent" }}
          />
        )}
      </CardHeader>

      <CardContent className="relative h-full w-full pt-5 bg-transparent z-10 rounded-b-xl">
        {children}
      </CardContent>

      {active && (
        <motion.div
          className={cn(
            "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
          )}
          style={{
            filter: "blur(2px)",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          initial={{ background: movingMap[direction] }}
          animate={{
            background: hovered
              ? [movingMap[direction], highlight]
              : movingMap[direction],
          }}
          transition={{ ease: "linear", duration: duration ?? 1 }}
        />
      )}
    </Card>
  );
};
