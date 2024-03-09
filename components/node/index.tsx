"use client";

import { Input } from "@/components/ui/input";
import { ColorMenu, colorList } from "@/components/node/color-menu";
import { useAppStore } from "@/store";
import { ImageItem, type Widget } from "@/types";
import { Play, Copy, Delete, Edit, Highlighter, Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "next-themes";
import { mix, rgba } from "polished";
import React, { useEffect, useRef, useState } from "react";
import { NodeResizeControl, type NodeProps } from "reactflow";
import { shallow } from "zustand/shallow";
import SdNode from "./sd-node";
import { GroupCard, NodeCard } from "./style";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const NODE_IDENTIFIER = "sdNode";

/**
 * @title Image Preview Parameters
 */
export interface ImagePreview {
  /**
   * @title The image object to preview
   */
  image: ImageItem;
  /**
   * @title The index of the image to preview
   */
  index: number;
}

/******************************************************
 ************************* Dom *************************
 ******************************************************/

/**
 * @interface Props
 * @description Component's props type
 * @generic T - Generic type for node data
 * @param node - Information related to the node
 */
const NodeComponent: React.FC<NodeProps<Widget>> = (node) => {
  const ref: any = useRef(null);

  const { progressBar, onDuplicateNode, onDeleteNode, onModifyChange } =
    useAppStore(
      (st) => ({
        ...st,
        progressBar:
          st.nodeInProgress?.id === node.id
            ? st.nodeInProgress.progress
            : undefined,
      }),
      shallow
    );

  const { theme } = useTheme();
  const [nicknameInput, setNicknameInput] = useState<boolean>(false);
  const isInProgress = progressBar !== undefined;
  const isSelected = node.selected;
  const name = node.data?.nickname || node.data.name;
  const isGroup = node.data.name === "Group";

  /**
   * @function handleNickname
   * @description Handle nickname modification
   * @param e - Event object
   */
  const handleNickname = (e: any) => {
    const nickname = e.target.value;
    onModifyChange(node.id, "nickname", nickname);
    setNicknameInput(false);
  };

  /**
   * @function handleNodeColor
   * @description Handle node color
   * @param key - Color key
   */
  const handleNodeColor = ({ key }: any) => {
    onModifyChange(node.id, "color", colorList[key]);
  };

  /**
   * @constant extraMenu
   * @description Extra menu for the node
   * @type {Array}
   */
  const extraMenu = [
    {
      icon: <Edit />,
      label: "Rename",
      key: "rename",
      onClick: () => setNicknameInput(true),
    },
    {
      icon: <Highlighter />,
      label: "Colors",
      key: "colors",
      children: ColorMenu,
      onClick: handleNodeColor,
    },
    {
      type: "divider",
    },
    {
      icon: <Copy />,
      label: "Copy",
      key: "copy",
      onClick: () => onDuplicateNode(node.id),
    },
    {
      icon: <Delete />,
      label: "Delete",
      key: "delete",
      onClick: () => onDeleteNode(node.id),
    },
  ];

  /**
   * @constant StyledCard
   * @description Styled card
   * @type {React.FC}
   */
  const StyledCard = isGroup ? GroupCard : NodeCard;
  let background;
  if (isGroup) {
    background = node.data?.color
      ? rgba(node.data.color, 0.2)
      : theme === "dark"
      ? "#2C3E50"
      : "#ECF0F1";
  } else {
    background = node.data?.color
      ? mix(0.8, theme === "dark" ? "#2C3E50" : "#ECF0F1", node.data.color)
      : theme === "dark"
      ? "#2C3E50"
      : "#ECF0F1";
  }

  useEffect(() => {
    const parenet = ref.current?.parentNode;
    parenet.setAttribute("type", node.data.name);
    ref.current.setAttribute("type", node.data.name);
  }, []);

  return (
    <Card
      ref={ref}
      style={{ background }}
      active={isInProgress || isSelected} // Correctly passing a boolean value
    >
      <CardHeader>
        <CardTitle>
          {nicknameInput ? (
            <Input
              autoFocus
              defaultValue={name}
              onBlur={handleNickname}
              style={{ margin: "4px 0", width: "100%" }}
            />
          ) : (
            name
          )}
        </CardTitle>
        <CardDescription>
          {isInProgress
            ? progressBar > 0 && (
                <Progress value={Math.floor(progressBar * 100)} />
              )
            : isSelected && (
                <DropdownMenu>
                  <DropdownMenuContent>
                    {extraMenu.map((item) => (
                      <Button
                        key={item.key}
                        onClick={item.onClick}
                        style={{ display: "block", width: "100%" }}
                      >
                        {item.icon}
                        {item.label}
                      </Button>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SdNode {...node} />
        {isSelected && <NodeResizeControl minWidth={80} minHeight={40} />}
      </CardContent>
    </Card>
  );
};

export default React.memo(NodeComponent);
