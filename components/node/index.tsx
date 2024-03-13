"use client";

import React, { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTheme } from "next-themes";
import { mix, rgba } from "polished";
import { NodeResizeControl, type NodeProps } from "reactflow";

import { useAppStore } from "@/store";
import { type Widget, ImageItem } from "@/types";
import { Input } from "@/components/ui/input";
import { ColorMenu, colorList } from "@/components/node/color-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SdNode from "./sd-node";
import { GroupCard } from "./style";
import { NodeCard } from "./sd-node/node-card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuSeparator,
} from "../ui/context-menu";
import {
  CopyIcon,
  Pencil1Icon,
  ShadowIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

export const NODE_IDENTIFIER = "sdNode";

export interface ImagePreview {
  image: ImageItem;
  index: number;
}

const NodeComponent = (node: NodeProps<Widget>) => {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [nicknameInput, setNicknameInput] = useState(false);

  const { progressBar, onDuplicateNode, onDeleteNode, onModifyChange } =
    useAppStore(
      useShallow((st) => ({
        ...st,
        progressBar:
          st.nodeInProgress?.id === node.id
            ? st.nodeInProgress.progress
            : undefined,
      }))
    );

  const isInProgress = progressBar !== undefined;
  const isSelected = node.selected;
  const name = node.data?.nickname || node.data.name;
  const isGroup = node.data.name === "Group";

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    onModifyChange(node.id, "nickname", nickname);
    setNicknameInput(false);
  };

  const handleNodeColor = (key: string) => {
    onModifyChange(node.id, "color", colorList[key as keyof typeof colorList]);
  };

  const background = isGroup
    ? node.data?.color
      ? rgba(node.data.color, 0.2)
      : theme === "dark"
      ? "#2C3E50"
      : "#ECF0F1"
    : node.data?.color
    ? mix(0.8, theme === "dark" ? "#2C3E50" : "#ECF0F1", node.data.color)
    : theme === "dark"
    ? "#2C3E50"
    : "#ECF0F1";

  useEffect(() => {
    if (ref.current) {
      const parent = ref.current.parentNode as HTMLElement;
      parent.setAttribute("type", node.data.name);
      ref.current.setAttribute("type", node.data.name);
    }
  }, [node.data.name]);

  const Title = () => {
    return (
      <div className="flex gap-2">
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

        {isInProgress
          ? progressBar > 0 && (
              <Progress value={Math.floor(progressBar * 100)} />
            )
          : null}
      </div>
    );
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <NodeCard
          ref={ref}
          active={isInProgress || isSelected ? 1 : 0}
          title={<Title />}
        >
          <SdNode {...node} />
          {isSelected && <NodeResizeControl minWidth={80} minHeight={40} />}
        </NodeCard>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem
          key="rename"
          onClick={() => setNicknameInput(true)}
          className="gap-2"
        >
          <Pencil1Icon />
          Rename
        </ContextMenuItem>

        <ContextMenuSub key="colors">
          <ContextMenuSubTrigger className="gap-2">
            <ShadowIcon />
            Colors
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {ColorMenu.map((child, index) => (
              <ContextMenuItem
                key={index}
                className="gap-2"
                onClick={() => handleNodeColor(colorList[child.key])}
              >
                {child.label}
              </ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />

        <ContextMenuItem
          key="copy"
          onClick={() => onDuplicateNode(node.id)}
          className="gap-2"
        >
          <CopyIcon />
          Copy
        </ContextMenuItem>

        <ContextMenuItem
          key="delete"
          onClick={() => onDeleteNode(node.id)}
          className="gap-2"
        >
          <TrashIcon />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default React.memo(NodeComponent);
