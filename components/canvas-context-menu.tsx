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
import useUndoRedo from "@/hooks/use-undo-redo";
import { useAppStore } from "@/store";
import { EdgeTypeList } from "@/types";
import { useShallow } from "zustand/react/shallow";

export default function CanvasContextMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const { undo, redo, canUndo, canRedo } = useUndoRedo();
  const { edgeType, onEdgesType } = useAppStore(
    useShallow((state) => ({
      edgeType: state.edgeType,
      onEdgesType: state.onEdgesType,
    }))
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={undo} disabled={!canUndo}>
          Undo
          <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset onClick={redo} disabled={!canRedo}>
          Redo
          <ContextMenuShortcut>⌘ShiftZ</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>Export worfklow</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
