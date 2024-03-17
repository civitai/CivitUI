// Function to validate that the uploaded workflow is in NON-API format.

import { NodeItem } from "@/types";
import { v4 as uuid } from "uuid";

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

export function transformData(inputJson: any): any {
  const outputJson: any = {
    data: {},
    connections: [],
  };

  // Map node IDs to their corresponding keys in the output JSON
  const nodeIdMap: Record<string, string> = {};

  // Process nodes
  inputJson.nodes.forEach((node: any) => {
    const nodeKey = `node-${node.id}`;
    nodeIdMap[node.id] = nodeKey;

    const nodeItem: NodeItem = {
      widget: node.type,
      node: {
        widget: node.type,
        fields: {},
      },
      position: {
        x: node.pos[0],
        y: node.pos[1],
      },
      width: node.size[0],
      height: node.size[1],
    };

    if (node.properties && node.properties["Node name for S&R"]) {
      nodeItem.node!.modify = {
        nickname: node.properties["Node name for S&R"],
      };
    }

    if (node.widgets_values) {
      nodeItem.node!.fields = node.widgets_values.reduce(
        (acc: any, value: any, index: number) => {
          acc[`field${index + 1}`] = value;
          return acc;
        },
        {}
      );
    }

    outputJson.data[nodeKey] = { value: nodeItem };
  });

  // Process links
  inputJson.links.forEach((link: any) => {
    const sourceNodeKey = nodeIdMap[link[1]];
    const targetNodeKey = nodeIdMap[link[3]];

    outputJson.connections.push({
      source: sourceNodeKey,
      sourceHandle: link[4],
      target: targetNodeKey,
      targetHandle: link[2],
    });
  });

  return outputJson;
}
