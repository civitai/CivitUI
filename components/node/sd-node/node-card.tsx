"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NodeProps, NodeResizeControl, ResizeControlVariant } from "reactflow";
import React, { useState } from "react";
import { Widget } from "@/types";
import { useTheme } from "next-themes";
import { colorMap } from "../color-menu";

interface NodeCardProps {
  active: boolean;
  selected?: boolean;
  title?: React.ReactNode;
  className?: string;
  preview?: boolean;
  node?: NodeProps<Widget>;
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

const NodeCard = ({
  active,
  selected = false,
  title,
  preview = false,
  node,
  children,
}: NodeCardProps) => {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState<boolean>(true);
  const [direction, setDirection] = useState<Direction>("TOP");
  const activeClass = active ? "shadow-lg" : "";
  const selectedClass = selected ? "border-white" : "";

  const color = node?.data?.color || "";
  const bgColor = theme === "light" ? "white" : "black";

  return (
    <Card
      className={cn(
        `${activeClass} ${selectedClass} drag-handle relative hover:shadow-lg`,
        "rounded-xl transition duration-200 overflow-visible"
      )}
      onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
        setHovered(true);
      }}
      // onMouseLeave={() => setHovered(false)}
      style={{
        background: color
          ? `radial-gradient(circle at 0% -50%, ${colorMap[color]} 0%, ${bgColor} 50%, ${bgColor} 100%)`
          : bgColor,
      }}
    >
      <CardHeader
        style={{
          position: "relative",
          padding: "1rem 1.25rem",
          borderTopLeftRadius: "0.75rem",
          borderTopRightRadius: "0.75rem",
          zIndex: 10,
          transition: "all 200ms",
          overflow: "visible",
        }}
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

      <CardContent
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          paddingTop: "1.25rem",
          zIndex: 10,
          borderBottomLeftRadius: "0.75rem",
          borderBottomRightRadius: "0.75rem",
        }}
      >
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

export default React.memo(NodeCard);
