import { Connection, NodeId, NodePosition, SDNode } from "@/types";

/**
 * Persisted node object
 * @property value - SDNode object
 * @property position - Node position
 * @property width - Node width
 * @property height - Node height
 * @property parentNode - Parent node ID
 */
export interface PersistedNode {
  value: SDNode;
  position: NodePosition;
  width?: number;
  height?: number;
  parentNode?: string;
}

/**
 * Persisted graph object
 * @property data - Node data
 * @property connections - Connection data
 */
export interface PersistedGraph {
  data: Record<NodeId, PersistedNode>;
  connections: Connection[];
}

/**
 * Local persisted graph object
 * @property title - Title
 * @property time - Timestamp
 * @property id - ID
 * @property graph - Persisted graph object
 */
export interface LocalPersistedGraphs {
  title: string;
  time: number;
  id: string;
  graph: PersistedGraph;
}
