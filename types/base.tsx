import {
  BorderDashedIcon,
  BorderDottedIcon,
  BorderSolidIcon,
  CornerBottomRightIcon,
} from "@radix-ui/react-icons";

export type WidgetKey = string;
export type PropertyKey = string;
export type NodeId = string;
/**
 * Types of connections
 * - 'default' Default type
 * - 'step' Polyline
 * - 'smoothstep' Smooth polyline
 * - 'straight' Straight line
 */
export type EdgeTypes = "default" | "step" | "straight";

export const edgeTypeIcon = {
  default: <CornerBottomRightIcon />,
  straight: <BorderSolidIcon />,
  step: <BorderDashedIcon />,
  smoothstep: <BorderDottedIcon />,
};

export const EdgeTypeList = ({ onEdgesType }: any) => [
  {
    icon: edgeTypeIcon.default,
    label: "Bezier",
    key: "default",
    onClick: () => onEdgesType("default"),
  },
  {
    icon: edgeTypeIcon.straight,
    label: "Straight",
    key: "straight",
    onClick: () => onEdgesType("straight"),
  },
  {
    icon: edgeTypeIcon.step,
    label: "Step",
    key: "step",
    onClick: () => onEdgesType("step"),
  },
];
