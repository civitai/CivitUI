"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  NodeDragHandler,
} from "reactflow";
import { debounce } from "lodash-es";
import { useShallow } from "zustand/react/shallow";
import { useTheme } from "next-themes";

import NodeComponent, { NODE_IDENTIFIER } from "@/components/node";
import { getPostion, getPostionCenter } from "@/utils";
import useUndoRedo from "@/hooks/use-undo-redo";
import { useAppStore } from "@/store";

import "reactflow/dist/style.css";
import useForceLayout from "@/hooks/use-force-layout";

const FlowEditor = ({ strength = -1000, distance = 1000 }) => {
  const nodeTypes = useMemo(() => ({ [NODE_IDENTIFIER]: NodeComponent }), []);
  const { theme } = useTheme();
  const reactFlowRef = useRef<HTMLDivElement>(null);
  const edgeUpdateSuccessful = useRef(true);
  const { takeSnapshot } = useUndoRedo();
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  // useForceLayout({ strength, distance });

  const {
    nodes,
    edges,
    onInit,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onAddNode,
    onCopyNode,
    onPasteNode,
    onSetNodesGroup,
    onDeleteNode,
    onCreateGroup,
  } = useAppStore(
    useShallow((st) => ({
      nodes: st.nodes,
      edges: st.edges,
      onInit: st.onInit,
      onNodesChange: debounce(st.onNodesChange, 1),
      onEdgesChange: debounce(st.onEdgesChange, 1),
      onConnect: st.onConnect,
      onAddNode: st.onAddNode,
      onCopyNode: st.onCopyNode,
      onPasteNode: st.onPasteNode,
      onSetNodesGroup: st.onSetNodesGroup,
      onDeleteNode: st.onDeleteNode,
      onCreateGroup: st.onCreateGroup,
    }))
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      // 👇 make adding edges undoable
      takeSnapshot();
      edgeUpdateSuccessful.current = true;
      onEdgesChange([{ id: oldEdge.id, type: "remove" }]);
      onConnect(newConnection);
    },
    [onEdgesChange, onConnect, takeSnapshot]
  );

  const onEdgeUpdateEnd = useCallback(
    (_: any, edge: Edge) => {
      if (!edgeUpdateSuccessful.current) {
        onEdgesChange([{ id: edge.id, type: "remove" }]);
      }
      edgeUpdateSuccessful.current = true;
    },
    [onEdgesChange]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const widget = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );
      if (!widget) return;
      const position = getPostion(
        event.clientX,
        event.clientY,
        reactFlowRef,
        reactFlowInstance
      );
      // 👇 make adding nodes undoable
      takeSnapshot();
      onAddNode({ widget, position });
    },
    [reactFlowInstance, onAddNode, takeSnapshot]
  );

  const onNodeDrag: NodeDragHandler = useCallback(
    (_, node, nodes) => {
      // 👇 make dragging nodes undoable
      takeSnapshot();

      if (nodes.length > 2 || node.data.name !== "Group") return;
      const intersections = reactFlowInstance
        .getIntersectingNodes(node)
        .filter(
          (n: any) =>
            n.data.name !== "Group" &&
            (n.parentNode === node.id || !n.parentNode)
        )
        .map((n: any) => n.id);
    },
    [reactFlowInstance, takeSnapshot]
  );

  const handleCopy = useCallback(() => {
    const copyData = onCopyNode();
    navigator.clipboard.writeText(JSON.stringify(copyData));
    console.log("[Copy]", copyData);
  }, [onCopyNode]);

  const handlePaste = useCallback(async () => {
    try {
      const clipboardData = await navigator.clipboard.readText();
      const pasteData = JSON.parse(clipboardData);
      const position = getPostionCenter(reactFlowRef, reactFlowInstance);
      if (pasteData) onPasteNode(pasteData, position);
      console.log("[Paste]", pasteData, position);
    } catch (e) {
      console.log("[Paste]", e);
    }
  }, [reactFlowInstance, onPasteNode]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const ctrlKey = event.metaKey || (event.ctrlKey && !event.altKey);
      const ctrlAction: Record<string, () => void> = {
        KeyC: handleCopy,
        KeyV: handlePaste,
        KeyG: onCreateGroup,
      };
      if (ctrlKey) {
        const action = ctrlAction[event.code];
        if (action) action();
      }
    },
    [reactFlowInstance, handleCopy, handlePaste, onCreateGroup, onDeleteNode]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      ref={reactFlowRef}
      fitView
      snapGrid={[20, 20]}
      minZoom={0.05}
      multiSelectionKeyCode={["Shift"]}
      deleteKeyCode={["Delete", "Backspace"]}
      disableKeyboardA11y
      onNodesChange={onNodesChange}
      onNodesDelete={n => n.forEach((node: any) => onDeleteNode(node.id))}
      onEdgesChange={onEdgesChange}
      onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateStart={onEdgeUpdateStart}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
      onConnect={onConnect}
      onNodeDragStart={onNodeDrag}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onInit={(e: any) => {
        setReactFlowInstance(e);
        void onInit();
      }}
    >
      <Background variant={BackgroundVariant.Dots} />
      <Controls showZoom={false} />
      <MiniMap
        position="bottom-left"
        nodeColor={(n) =>
          n.data.color || (theme === "light" ? "#ECF0F1" : "#2C3E50")
        }
        style={{ width: 150, height: 100 }}
      />
    </ReactFlow>
  );
};

export default FlowEditor;
