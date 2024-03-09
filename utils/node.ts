import { NODE_IDENTIFIER } from "@/components/node";
import { AppState } from "@/store";
import { NodeItem, NodePosition, PersistedGraph } from "@/types";
import { Node, applyNodeChanges } from "reactflow";
import { v4 as uuid } from "uuid";
import { fromWidget } from "./widget";

/**
 * @title Add Node
 * @param state - Application state object
 * @param widget - Component
 * @param node - Node
 * @param position - Node position
 * @param width - Node width
 * @param height - Node height
 * @param key - Node unique identifier
 * @param parentNode - Parent node
 * @returns Updated application state object
 */
export const addNode = (
  state: AppState,
  {
    widget,
    node,
    position = { x: 0, y: 0 },
    width,
    height,
    key,
    parentNode,
  }: NodeItem
): AppState => {
  // Generate the node's unique identifier
  const id = String(key ?? uuid());
  // Calculate the node's zIndex
  const zIndex =
    state.nodes
      .map((n) => n.zIndex ?? 0)
      .concat([0])
      .reduce((a, b) => Math.max(a, b)) + 1;

  // Construct the node object
  const item: Node = {
    id,
    type: NODE_IDENTIFIER,
    data: { ...widget, ...(node?.modify ?? {}) },
    dragHandle: ".ant-card-head",
    position,
    zIndex,
    width,
    height,
    parentNode,
    style: { width, height },
  };

  // Update the application state object
  return {
    ...state,
    nodes: applyNodeChanges([{ type: "add", item }], state.nodes),
    graph: { ...state.graph, [id]: node ?? fromWidget(widget) },
  };
};

/**
 * @title Update Node
 * @param id - Node unique identifier
 * @param data - Updated data
 * @param nodes - List of nodes
 * @returns Updated list of nodes
 */
export const updateNode = (id: string, data: any, nodes: Node[]) =>
  nodes.map((n) => {
    if (n.id === id) n.data = { ...n.data, ...data };
    return n;
  });

/**
 * @title Get Node Position
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param reactFlowRef - Reference to reactflow
 * @param reactFlowInstance - Instance of reactflow
 * @returns Node position
 */
export const getPostion = (
  x: number,
  y: number,
  reactFlowRef: any,
  reactFlowInstance: any
) => {
  const reactFlowBounds = reactFlowRef.current.getBoundingClientRect();
  return reactFlowInstance.project({
    x: x - reactFlowBounds.left,
    y: y - reactFlowBounds.top,
  });
};

/**
 * @title Get Center Position
 * @param reactFlowRef - Reference to reactflow
 * @param reactFlowInstance - Instance of reactflow
 * @returns Center position
 */
export const getPostionCenter = (reactFlowRef: any, reactFlowInstance: any) => {
  const { x, y, zoom } = reactFlowInstance.getViewport();
  const width = reactFlowRef.current.offsetWidth;
  const height = reactFlowRef.current.offsetHeight;
  return {
    x: Math.floor((width / 2 - x) / zoom),
    y: Math.floor((height / 2 - y) / zoom),
  };
};

/**
 * @title Get Top Left Position
 * @param points - List of node positions
 * @returns Top left position
 */
export const getTopLeftPoint = (points: NodePosition[]): NodePosition => {
  let topLeftPoint = points[0];
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    if (
      point.x < topLeftPoint.x ||
      (point.x === topLeftPoint.x && point.y < topLeftPoint.y)
    ) {
      topLeftPoint = point;
    }
  }
  return topLeftPoint;
};

/**
 * @title Copy Node
 * @param node - Node
 * @param basePosition - Base position
 * @param position - New position
 * @returns Copied node
 */
export const copyNode = (
  node: Node,
  basePositon: NodePosition,
  position: NodePosition
) => ({
  ...node,
  position: {
    x: Math.floor(node.position.x - basePositon.x + position.x),
    y: Math.floor(node.position.y - basePositon.y + position.y),
  },
  key: uuid(),
});

/**
 * @title Copy Multiple Nodes
 * @param workflow - Workflow
 * @param basePosition - Base position
 * @param position - New position
 * @returns Copied nodes and id mapping
 */
export const copyNodes = (
  workflow: PersistedGraph,
  basePositon: NodePosition,
  position: NodePosition
) =>
  Object.entries(workflow.data).reduce<{
    data: { [id: string]: any };
    idMap: { [id: string]: string };
  }>(
    (acc, [id, node]: any) => {
      const newNode = copyNode(node, basePositon, position);
      return {
        data: {
          ...acc.data,
          [newNode.key]: newNode,
        },
        idMap: {
          ...acc.idMap,
          [id]: newNode.key,
        },
      };
    },
    { data: {}, idMap: {} }
  );

/**
 * @title Copy Multiple Connections
 * @param workflow - Workflow
 * @param idMap - ID mapping
 * @returns Copied connections
 */
export const copyConnections = (
  workflow: PersistedGraph,
  idMap: { [id: string]: string }
) => ({
  connections: workflow.connections.map((conn) => ({
    ...conn,
    source: idMap[conn.source],
    target: idMap[conn.target],
  })),
});
