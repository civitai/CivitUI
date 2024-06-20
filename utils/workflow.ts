// Function to validate that the uploaded workflow is in NON-API format.

import { SDNode } from "@/types";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

interface ObjectInfo {
  [key: string]: {
    input?: {
      required?: {
        [key: string]: (string | number | boolean | object)[];
      };
      optional?: {
        [key: string]: (string | number | boolean | object)[];
      };
    };
    output?: (string | object)[];
    output_is_list?: boolean[];
    output_name?: string[];
    name?: string;
    display_name?: string;
    description?: string;
    category?: string;
    output_node?: boolean;
  };
}

// const objectInfoTyped: ObjectInfo = objectInfo;

const requiredTopLevelProperties = [
  "last_node_id",
  "last_link_id",
  "nodes",
  "links",
  "groups",
  "config",
  "extra",
  "version",
];

const requiredNodeProperties = [
  "id",
  "type",
  "pos",
  "size",
  "flags",
  "order",
  "mode",
  "outputs",
  "properties",
  "widgets_values",
];

export function validateNonAPIFormat(data: any) {
  // Check if the required top-level properties exist in the data
  for (const property of requiredTopLevelProperties) {
    if (!data.hasOwnProperty(property)) {
      return false;
    }
  }

  // Check if the nodes array exists and has the required properties
  if (!Array.isArray(data.nodes)) {
    return false;
  }

  for (const node of data.nodes) {
    for (const property of requiredNodeProperties) {
      if (!node.hasOwnProperty(property)) {
        return false;
      }
    }
  }

  // Check if the links array exists
  if (!Array.isArray(data.links)) {
    return false;
  }

  return true;
}

const control = ["fixed", "increment", "decrement", "randomize"];

export function transformData(inputJson: any, widgets: any): any {
  console.log("inputJson.links:", inputJson.links);

  const outputJson: any = { data: {}, connections: [] };
  // Map node IDs to their corresponding keys in the output JSON
  const nodeIdMap: Record<string, string> = {};
  const missingNodeTypes: string[] = [];

  // Process nodes
  inputJson.nodes.forEach((node: any) => {
    const nodeKey = `node-${node.id}`;
    nodeIdMap[node.id] = nodeKey;
    const nodeInfo = widgets[node.type];

    if (!nodeInfo) {
      console.log("missing node type: ", node.type);
      console.log(node);
      missingNodeTypes.push(node.type);
      return;
    } else {
      console.log("nodeInfo:", nodeInfo);
    }

    const nodeItem: SDNode = {
      widget: node.type,
      fields: {},
      modify: {},
    };

    if (node.properties && node.properties["Node name for S&R"]) {
      nodeItem.modify = { nickname: node.properties["Node name for S&R"] };
    }

    // Handling widgets_values as an array
    if (nodeInfo.input && node.widgets_values) {
      const inputs = { ...nodeInfo.input.required, ...nodeInfo.input.optional };
      const inputKeys = Object.keys(inputs);
      let widgetValueIndex = 0; // Index to track position in widgets_values
      let inputKeyIndex = 0; // Index to track position in inputKeys

      while (
        widgetValueIndex < node.widgets_values.length &&
        inputKeyIndex < inputKeys.length
      ) {
        const widgetValue = node.widgets_values[widgetValueIndex];

        // If the widgetValue is one of the control values, skip it and move to the next
        if (control.includes(widgetValue)) {
          widgetValueIndex++; // Skip this widget value
          continue; // Move to the next iteration without incrementing inputKeyIndex
        }

        const inputKey = inputKeys[inputKeyIndex];
        const inputDefinition = inputs[inputKey];
        // Check if the inputDefinition meets the criteria:
        // 1. It is an array with more than one item
        // 2. The single item in the array is itself an array
        const meetsCriteria =
          Array.isArray(inputDefinition) &&
          (inputDefinition.length > 1 ||
            (inputDefinition.length === 1 &&
              Array.isArray(inputDefinition[0])));

        if (meetsCriteria) {
          // Assign the widgetValue to the current inputKey
          nodeItem.fields[inputKey] = widgetValue;
          widgetValueIndex++; // Move to the next widget value
        }
        inputKeyIndex++; // Move to the next input definition regardless of whether the current one met the criteria
      }
    }

    outputJson.data[nodeKey] = {
      value: nodeItem,
      position: { x: node.pos[0], y: node.pos[1] },
      width: node.size[0],
      height: node.size[1],
    };

    if (node.parentNode) {
      outputJson.data[nodeKey].parentNode = `node-${node.parentNode}`;
    }
  });

  // Process links
  if (Array.isArray(inputJson.links)) {
    inputJson.links.forEach((link: any) => {
      const sourceNodeId = link[1];
      const targetNodeId = link[3];
      const sourceNodeKey = nodeIdMap[sourceNodeId];
      const targetNodeKey = nodeIdMap[targetNodeId];

      const sourceNode = inputJson.nodes.find(
        (node: any) => node.id === sourceNodeId
      );
      const targetNode = inputJson.nodes.find(
        (node: any) => node.id === targetNodeId
      );

      if (sourceNode && targetNode) {
        const sourceOutputIndex = link[2];
        const sourceOutput = sourceNode.outputs[sourceOutputIndex];

        const targetInputIndex = link[4];
        const targetInput = targetNode.inputs[targetInputIndex];

        if (sourceOutput && targetInput) {
          const connectionObj = {
            source: sourceNodeKey,
            sourceHandle: sourceOutput.name,
            target: targetNodeKey,
            targetHandle: targetInput.name,
          };
          outputJson.connections.push(connectionObj);
        }
      }
    });
  }

  if (missingNodeTypes.length > 0) {
    toast.error("The following node types are missing:", {
      description: `${missingNodeTypes.join(", ")}`,
    });
  } else {
    toast.success("Successfully loaded workflow.");
  }

  return outputJson;
}
