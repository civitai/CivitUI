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
import { useAppStore } from "@/store";
import { getPostion, getPostionCenter } from "@/utils";

import "reactflow/dist/style.css";

const FlowEditor = () => {
  const nodeTypes = useMemo(() => ({ [NODE_IDENTIFIER]: NodeComponent }), []);

  const { theme } = useTheme();
  const reactFlowRef = useRef<HTMLDivElement>(null);
  const isWindows =
    typeof navigator !== "undefined" &&
    navigator.userAgent.toLowerCase().includes("win");
  const edgeUpdateSuccessful = useRef(true);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

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
      edgeUpdateSuccessful.current = true;
      onEdgesChange([{ id: oldEdge.id, type: "remove" }]);
      onConnect(newConnection);
    },
    [onEdgesChange, onConnect]
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
      onAddNode({ widget, position });
    },
    [reactFlowInstance, onAddNode]
  );

  const onNodeDrag: NodeDragHandler = useCallback(
    (_, node, nodes) => {
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
    [reactFlowInstance]
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
      } else if (event.code === "Delete" || event.code === "Backspace") {
        reactFlowInstance
          .getNodes()
          .forEach((n: any) => n.selected && onDeleteNode(n.id));
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
      deleteKeyCode={[]}
      disableKeyboardA11y
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateStart={onEdgeUpdateStart}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
      onConnect={onConnect}
      onNodeDragStop={onNodeDrag}
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
          n.data.color || (theme === "dark" ? "#2C3E50" : "#ECF0F1")
        }
        style={{ width: 150, height: 100 }}
      />
    </ReactFlow>
  );
};

export default React.memo(FlowEditor);
