import { AppState } from "@/store";
import {
  LocalPersistedGraphs,
  NodeId,
  PersistedGraph,
  PersistedNode,
} from "@/types";
import { getValidConnections } from "@/utils/connection";
import defaultWorkflow from "@/app/defaultWorkflow";

const TEMP_KEY = "civitui-flow-temp";
const LOCAL_KEY = "civitui-flow-local";

/**
 * Convert application state to persisted state
 * @param state - Application state
 * @returns Persisted state
 */
export const toPersisted = (state: AppState): PersistedGraph => {
  const data: Record<NodeId, PersistedNode> = {};
  state.nodes.forEach((node) => {
    const value = state.graph[node.id];
    if (value !== undefined) {
      data[node.id] = { value, position: node.position };
      if (node.width) data[node.id].width = node.width;
      if (node.height) data[node.id].height = node.height;
      if (node.parentNode) data[node.id].parentNode = node.parentNode;
    }
  });
  return {
    data,
    connections: getValidConnections(state),
  };
};

/**
 * Clear temporary workflow
 */
export const cleanTempWorkflow = (): void => {
  try {
    localStorage.removeItem(TEMP_KEY);
  } catch (e) {
    console.log("[cleanTempWorkflow]", e);
  }
};

/**
 * Retrieve temporary workflow from localStorage
 * @returns Persisted state or null
 */
export const retrieveTempWorkflow = (): PersistedGraph | null => {
  const item = localStorage.getItem(TEMP_KEY);
  return item ? JSON.parse(item) : defaultWorkflow;
};

/**
 * Save temporary workflow to localStorage
 * @param graph - Persisted state
 */
export const saveTempWorkflow = (graph: PersistedGraph): void => {
  try {
    localStorage.setItem(TEMP_KEY, JSON.stringify(graph));
  } catch (e) {
    console.log("[saveTempWorkflow]", e);
  }
};

/**
 * Clear local workflows
 */
export const cleanLocalWorkflows = (): void => {
  try {
    localStorage.removeItem(LOCAL_KEY);
  } catch (e) {
    console.log("[cleanLocalWorkflows]", e);
  }
};

/**
 * Retrieve local workflows from localStorage
 * @returns Array of persisted states
 */
export const retrieveLocalWorkflows = (): LocalPersistedGraphs[] => {
  try {
    const item = localStorage.getItem(LOCAL_KEY);
    return item ? JSON.parse(item) : [];
  } catch (e) {
    console.log("[retrieveLocalWorkflows]", e);
    return [];
  }
};

/**
 * Get the workflow with the specified ID from the local workflow
 * @param id - Workflow ID
 * @returns Persisted state or null
 */
export const getLocalWorkflowFromId = (id: string): PersistedGraph | null => {
  const workflows = retrieveLocalWorkflows();
  const workflow = workflows.find((item) => item.id === id);
  return workflow ? workflow.graph : null;
};

/**
 * Delete the workflow with the specified ID from the local workflow
 * @param id - Workflow ID
 */
export const deleteLocalWorkflowFromId = (id: string) => {
  try {
    const localWorkflows = retrieveLocalWorkflows()
      .map((workflow) => {
        if (workflow.id !== id) return workflow;
        return false;
      })
      .filter(Boolean);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(localWorkflows));
  } catch (e) {
    console.log("[deleteLocalWorkflowFromId]", e);
  }
};

/**
 * Save the workflow to the local workflow
 * @param graph - Persisted state
 * @param title - Workflow title
 */
export const saveLocalWorkflow = (
  graph: PersistedGraph,
  title?: string
): void => {
  try {
    const localWorkflows = retrieveLocalWorkflows();
    const time = new Date().getTime();
    localWorkflows.push({
      title: title ? title : `Local-${time}`,
      time: time,
      id: `civitui-${time}-${Math.floor(Math.random() * 1000000)}`,
      graph,
    });
    localStorage.setItem(LOCAL_KEY, JSON.stringify(localWorkflows));
  } catch (e) {
    console.log("[saveLocalWorkflow]", e);
  }
};

/**
 * Update the workflow with the specified ID in the local workflow
 * @param id - Workflow ID
 * @param modifyData - Modified data
 */
export const updateLocalWorkflow = (
  id: string,
  modifyData: { title?: string; graph?: PersistedGraph }
): void => {
  try {
    const localWorkflows = retrieveLocalWorkflows().map((workflow) => {
      if (workflow.id !== id) return workflow;
      return {
        ...workflow,
        ...modifyData,
        time: new Date().getTime(),
      };
    });
    localStorage.setItem(LOCAL_KEY, JSON.stringify(localWorkflows));
  } catch (e) {
    console.log("[updateLocalWorkflow]", e);
  }
};

/**
 * Read workflow from file
 * @param file - File
 * @param callback - Callback function after reading is completed
 */
export const readWorkflowFromFile = (
  file: File,
  callback: (workflow: PersistedGraph) => void
): void => {
  try {
    const reader = new FileReader();
    if (file) {
      console.log("[readWorkflowFromFile] Reading workflow file:", file.name);

      reader.readAsText(file);
      reader.addEventListener("load", (event) => {
        const result = event.target?.result;
        if (typeof result === "string") {
          try {
            console.log("[readWorkflowFromFile] File content:", result);
            const workflow = JSON.parse(result);
            console.log(
              "[readWorkflowFromFile] Parsed workflow:",
              JSON.stringify(workflow, null, 2)
            );
            try {
              callback(workflow);
            } catch (callbackError) {
              console.error(
                "[readWorkflowFromFile] Error in callback:",
                callbackError
              );
            }
          } catch (parseError) {
            console.error(
              "[readWorkflowFromFile] Error parsing workflow JSON:",
              parseError
            );
            // Handle the error, e.g., show an error message to the user
          }
        } else {
          console.warn("[readWorkflowFromFile] File content is not a string");
          // Handle the case when the file content is not a string
        }
      });
    }
  } catch (e) {
    console.log("[readWorkflowFromFile]", e);
  }
};

/**
 * Write the workflow to a file
 * @param workflow - Persisted state
 * @param title - Workflow title
 */
export const writeWorkflowToFile = (
  workflow: PersistedGraph,
  title?: string
): void => {
  const blob = new Blob([JSON.stringify(workflow)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = title ? `${title}.json` : "workflow.json";
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
};
