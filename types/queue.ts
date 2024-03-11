/**
 * Queue item object
 * @property id - Queue item ID
 * @property prompts - List of prompts
 * @property model - Model name
 */
export interface QueueItem {
  id: number;
  prompts: string[];
  model?: string;
}
