"use client";

import NodeComponent, { NODE_IDENTIFIER } from "@/components/node";
import { useAppStore } from "@/store";
import { getPostion, getPostionCenter } from "@/utils";
import { useTheme } from "next-themes";
import { debounce } from "lodash-es";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  NodeDragHandler,
} from "reactflow";
import "reactflow/dist/style.css";
import { shallow } from "zustand/shallow";

const nodeTypes = { [NODE_IDENTIFIER]: NodeComponent };

/**
 * @title FlowEditor
 * @visibleName Flow Chart Editor
 */
const FlowEditor: React.FC = () => {
  const { theme } = useTheme();
  const reactFlowRef = useRef<any>(null);
  // System environment
  const isWindows = navigator.platform.includes("Win");
  // Record the edge update status
  const edgeUpdateSuccessful = useRef(true);
  // react-flow instance
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
    (st) => ({
      ...st,
      onEdgesChange: debounce(st.onEdgesChange, 20),
      onNodesChange: debounce(st.onNodesChange, 20),
    }),
    shallow
  );

  /**
   * Edge update start callback function
   */
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  /**
   * Edge update callback function
   * @param oldEdge - Old edge information
   * @param newConnection - New connection information
   */
  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;
      onEdgesChange([
        {
          id: oldEdge.id,
          type: "remove",
        },
      ]);
      onConnect(newConnection);
    },
    []
  );

  /**
   * Edge update end callback function
   * @param _ - Unused parameter
   * @param edge - Edge information
   */
  const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      onEdgesChange([
        {
          id: edge.id,
          type: "remove",
        },
      ]);
    }
    edgeUpdateSuccessful.current = true;
  }, []);

  /**
   * Drag over container callback function
   * @param event - Event object
   */
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  /**
   * Drag end callback function
   * @param event - Event object
   */
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
      onAddNode({
        widget,
        position,
      });
    },
    [reactFlowInstance]
  );

  /**
   * Node drag callback function
   * @param event - Event object
   * @param node - Current dragged node information
   * @param nodes - All node information
   */
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
      onSetNodesGroup(intersections, node);
    },
    [reactFlowInstance]
  );

  /**
   * Copy callback function
   */
  const handleCopy = useCallback(() => {
    const copyData = onCopyNode();
    navigator.clipboard.writeText(JSON.stringify(copyData));
    console.log("[Copy]", copyData);
  }, []);

  /**
   * Paste callback function
   * @param instance - react-flow instance
   */
  const handlePaste = useCallback(async (instance: any) => {
    try {
      const clipboardData = await navigator.clipboard.readText();
      const pasteData = JSON.parse(clipboardData);
      const position = getPostionCenter(reactFlowRef, instance);
      if (pasteData) onPasteNode(pasteData, position);
      console.log("[Paste]", pasteData, position);
    } catch (e) {
      console.log("[Paste]", e);
    }
  }, []);

  /**
   * Keyboard key callback function
   * @param event - Event object
   */
  const handleKeyDown = useCallback(
    (event: any) => {
      const ctrlKey = event.metaKey || (event.ctrlKey && !event.altKey);
      const ctrlAction: any = {
        KeyC: () => handleCopy(),
        KeyV: () => handlePaste(reactFlowInstance),
        KeyG: () => onCreateGroup(),
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
    [reactFlowInstance]
  );

  /**
   * Listen for keyboard key events
   */
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [reactFlowInstance]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      ref={reactFlowRef}
      fitView
      snapToGrid
      snapGrid={[20, 20]}
      minZoom={0.05}
      multiSelectionKeyCode={["Shift"]}
      deleteKeyCode={[]}
      panOnScroll={!isWindows}
      zoomOnScroll={isWindows}
      disableKeyboardA11y={true}
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
      <Controls />
      <MiniMap
        nodeColor={(n) => {
          if (n.data.color) return n.data.color;
          return theme === "dark" ? "#2C3E50" : "#ECF0F1";
        }}
      />
    </ReactFlow>
  );
};

export default React.memo(FlowEditor);
