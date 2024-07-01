"use client";

import { useEffect, useState } from "react";
import { Widget } from "@/types";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { NodePicker } from "./node-picker";
import { PreviewNode } from "../node/sd-node/preview-node";

export const NodeContextMenu = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeItem, setActiveItem] = useState<Widget | null>(null);
  const [previewPosition, setPreviewPosition] = useState<{x: string, y: string}>({x: 'right', y: 'bottom'});

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (e.clientX > window.innerWidth * 2 / 3) setPreviewPosition({x: 'left', y: 'top'})
      else setPreviewPosition({x: 'right', y: 'bottom'})
    };

    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
  <>
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="overflow-auto">
        <NodePicker setActiveItem={setActiveItem}/>
      </ContextMenuContent>
    </ContextMenu>
    { activeItem !== null && 
      <div className={`fixed z-[60] ${previewPosition.x}-0 ${previewPosition.y}-0 text-accent-foreground bg-muted/50 p-8 rounded-lg border backdrop-blur-sm`}>
        <PreviewNode data={activeItem} />
      </div>
    }
  </>
  );
}
