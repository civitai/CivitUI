import { NodeId } from "./base";

/**
 * Message type definitions
 */
export interface MessageType {
  /**
   * Status message
   * @property status - Status information
   * @property sid - Session ID
   */
  status: { status: { exec_info: { queue_remaining: number } }; sid?: string };
  /**
   * Executing message
   * @property node - The ID of the node being executed
   */
  executing: { node?: NodeId };
  /**
   * Progress message
   * @property value - Progress value
   * @property max - Maximum value
   */
  progress: { value: number; max: number };
  /**
   * Execution completed message
   * @property node - The ID of the node that has completed execution
   * @property output - Output value
   */
  executed: { node: NodeId; output: Record<string, any> };
}

/**
 * Message object
 * @typeparam K - Message type key
 */
export interface Message<K extends keyof MessageType> {
  /**
   * Message type
   */
  type: K;
  /**
   * Message data
   */
  data: MessageType[K];
}
