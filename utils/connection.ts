import { AppState } from "@/store";
import { Connection } from "@/types";
import { Connection as FlowConnection } from "reactflow";
import { addEdge } from "reactflow";

/**
 * @title Add Connection
 * @param state - Application state
 * @param connection - Flow connection
 * @returns Updated application state
 */
export const addConnection = (
  state: AppState,
  connection: FlowConnection
): AppState => {
  const { edges } = state;
  const { targetHandle, target } = connection;

  return {
    ...state,
    edges: addEdge(
      connection,
      edges.filter(
        (item) =>
          !(item.targetHandle === targetHandle && item.target === target)
      )
    ),
  };
};

/**
 * @title Get Valid Connections
 * @param state - Application state
 * @returns Array of valid connections
 */
export const getValidConnections = (state: AppState): Connection[] =>
  state.edges.flatMap(({ source, sourceHandle, target, targetHandle }) =>
    sourceHandle?.length && targetHandle?.length
      ? [{ source, sourceHandle, target, targetHandle }]
      : []
  );
