import {
  BorderDashedIcon,
  BorderDottedIcon,
  BorderSolidIcon,
  CornerBottomRightIcon,
} from "@radix-ui/react-icons";

export type WidgetKey = string;
export type PropertyKey = string;
export type NodeId = string;

export type EdgeType = {
  icon: JSX.Element;
  name: string;
}

export const edgeTypeList: EdgeType[] = [
  {
    icon: <BorderDashedIcon />,
    name: "step",
  },
  {
    icon: <BorderSolidIcon />,
    name: "linear",
  },
  {
    icon: <CornerBottomRightIcon />,
    name: "spline",
  },
];
