import { NodeId, PropertyKey, WidgetKey } from "@/types";

/**
 * Prompt request parameters
 */
export interface PromptRequest {
  /**
   * Client id
   */
  client_id?: string;
  /**
   * Mapping of node id to node information
   */
  prompt: Record<NodeId, Node>;
  /**
   * Additional data
   */
  extra_data?: ExtraData;
}

/**
 * Additional data
 */
export interface ExtraData {
  /**
   * PNG information
   */
  extra_pnginfo?: Record<string, any>;
}

/**
 * Prompt response parameters
 */
export interface PromptResponse {
  /**
   * Error message
   */
  error?: string;
}

/**
 * Node information
 */
export interface Node {
  /**
   * Type
   */
  class_type: WidgetKey;
  /**
   * Mapping of input properties to values
   */
  inputs: Record<PropertyKey, any>;
}

/**
 * Queue
 */
export interface Queue {
  /**
   * Running queue items
   */
  queue_running: QueueItem[];
  /**
   * Pending queue items
   */
  queue_pending: QueueItem[];
}

/**
 * Queue item
 */
export type QueueItem = [
  number,
  number,
  Record<NodeId, Node>,
  { client_id?: string }
];

/**
 * History
 */
export type History = Record<string, HistoryItem>;

/**
 * History item
 */
export interface HistoryItem {
  /**
   * Prompt request parameters
   */
  prompt: QueueItem;
  /**
   * Mapping of node id to output properties and their values
   */
  outputs: Record<NodeId, Record<PropertyKey, any>>;
}
