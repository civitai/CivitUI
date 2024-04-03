"use client";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useAppStore } from "@/store";
import { EdgeTypeList } from "@/types";
import { useShallow } from "zustand/react/shallow";

export default function CanvasContextMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const { edgeType, onEdgesType } = useAppStore(
    useShallow((state) => ({
      edgeType: state.edgeType,
      onEdgesType: state.onEdgesType,
    }))
  );

  const { onExpand, expanded } = useAppStore((state) => ({
    onExpand: state.onExpand,
    expanded: state.expanded,
  }));

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Undo
          <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Redo
          <ContextMenuShortcut>⌘ShiftZ</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>Export worfklow</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Change edge type</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {EdgeTypeList({ onEdgesType }).map(
              ({ icon, label, key, onClick }: any) => (
                <ContextMenuCheckboxItem
                  key={key}
                  onSelect={onClick}
                  checked={edgeType === key}
                >
                  {icon}
                  <span className="ml-2">{label}</span>
                </ContextMenuCheckboxItem>
              )
            )}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked={expanded.length > 0}
          onCheckedChange={() => onExpand()}
        >
          Show parameters
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
