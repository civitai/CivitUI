import { getQueue } from "@/app/client";
import { QueueItem } from "@/types";

/**
 * Function to determine if a node is of type CLIPTextEncode
 * @param node - The node to be evaluated
 * @returns Returns a boolean indicating whether the node is of type CLIPTextEncode
 */
const isCLIPTextEncodeNode = (node: any): boolean =>
  node.class_type === "CLIPTextEncode" && node.inputs.text !== undefined;

/**
 * Function to get the prompts of a node
 * @param node - The node from which to get prompts
 * @returns Returns an array of strings representing the node's prompts
 */
const getNodePrompts = (node: any): string[] =>
  isCLIPTextEncodeNode(node) ? [node.inputs.text] : [];

/**
 * Function to determine if a queue item belongs to a specified client
 * @param item - The queue item to be evaluated
 * @param clientId - The client ID to be evaluated against
 * @returns Returns a boolean indicating whether the queue item belongs to the specified client
 */
const isQueueItemBelongsToClient = (
  item: any,
  clientId: string | undefined
): boolean => item[3].client_id === clientId;

/**
 * Function to get queue items
 * @param clientId - Optional, the client ID for which to get queue items
 * @returns Returns a Promise that resolves to an array of QueueItem, representing the retrieved queue items
 */
export const getQueueItems = async (
  clientId?: string
): Promise<QueueItem[]> => {
  // Get history
  const history = await getQueue();

  // Retrieve queue items from history
  return history.queue_running
    .concat(history.queue_pending)
    .filter((item) => isQueueItemBelongsToClient(item, clientId))
    .map((item) => {
      const id = item[1];
      const graph = item[2];
      const nodes = Object.values(graph);
      const prompts = nodes.flatMap(getNodePrompts);
      const checkpoint = nodes.find((node) =>
        node.class_type.startsWith("CheckpointLoader")
      );
      const model = checkpoint?.inputs?.ckpt_name;

      return { id, prompts, model };
    });
};
