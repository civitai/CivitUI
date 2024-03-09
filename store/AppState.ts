import type {
  EdgeTypes,
  GalleryItem,
  ImageItem,
  NodeId,
  NodeInProgress,
  NodeItem,
  PersistedGraph,
  PropertyKey,
  QueueItem,
  SDNode,
  Widget,
  WidgetKey,
} from "@/types";
import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";

export type OnPropChange = (
  node: NodeId,
  property: PropertyKey,
  value: any
) => void;

export interface AppState {
  /******************************************************
   ******************* initialState **********************
   ******************************************************/

  /**
   * @title Page
   */
  page: string;

  /**
   * @title Counter
   */
  counter: number;

  /**
   * @title Widgets
   */
  widgets: Record<WidgetKey, Widget>;

  /**
   * @title Custom Widgets
   */
  customWidgets: string[];

  /**
   * @title Graph
   */
  graph: Record<NodeId, SDNode>;

  /**
   * @title Nodes
   */
  nodes: Node[];

  /**
   * @title Edges
   */
  edges: Edge[];

  /**
   * @title Queue
   */
  queue: QueueItem[];

  /**
   * @title Gallery
   */
  gallery: GalleryItem[];

  /**
   * @title Edge Types
   * @enum ['step', 'smoothstep', 'straight', 'flowchart', 'bezier']
   * @enumNames ['Step', 'Smoothstep', 'Straight', 'Flowchart', 'Bezier']
   */
  edgeType: EdgeTypes;

  /**
   * @title Node In Progress
   */
  nodeInProgress?: NodeInProgress;

  /**
   * @title Prompt Error
   * @ignore
   */
  promptError?: string;

  /**
   * @title Client ID
   * @ignore
   */
  clientId?: string;

  /******************************************************
   *********************** Base *************************
   ******************************************************/

  /**
   * @title Set Page
   * @param value - page
   */
  onSetPage: (value: string) => void;

  /**
   * @title Refresh
   */
  onRefresh: () => Promise<void>;

  /**
   * @title Initialize
   */
  onInit: () => Promise<void>;

  /**
   * @title Get New Client ID
   * @param id - Client ID
   */
  onNewClientId: (id: string) => void;

  /******************************************************
   *********************** Node *************************
   ******************************************************/

  /**
   * @title Create Group
   */
  onCreateGroup: () => void;

  /**
   * @title Set Node Group
   * @param childIds - Array of child node IDs
   * @param groupNode - Group node
   */
  onSetNodesGroup: (childIds: NodeId[], groupNode: Node) => void;

  /**
   * @title Detach Node Group
   * @param childIds - Array of child node IDs
   * @param groupNode - Group node
   */
  onDetachNodesGroup: (childIds: NodeId[], groupNode: Node) => void;

  /**
   * @title Detach Group
   * @param node - Node
   * @returns Node
   */
  onDetachGroup: (node: Node) => Node;

  /**
   * @title Node Change
   * @param nodes - Array of nodes
   */
  onNodesChange: OnNodesChange;

  /**
   * @title Update Node
   * @param id - Node ID
   * @param data - Node data
   */
  onUpdateNodes: (id: string, data: any) => void;

  /**
   * @title Add Node
   * @param nodeItem - Node item
   */
  onAddNode: (nodeItem: NodeItem) => void;

  /**
   * @title Delete Node
   * @param id - Node ID
   */
  onDeleteNode: (id: NodeId) => void;

  /**
   * @title Duplicate Node
   * @param id - Node ID
   */
  onDuplicateNode: (id: NodeId) => void;

  /**
   * @title Node In Progress
   * @param id - Node ID
   * @param progress - Progress
   */
  onNodeInProgress: (id: NodeId, progress: number) => void;

  /**
   * @title Property Change
   * @param node - Node ID
   * @param property - Property
   * @param value - Value
   */
  onPropChange: OnPropChange;

  /**
   * @title Modify Change
   * @param node - Node ID
   * @param property - Property
   * @param value - Value
   */
  onModifyChange: OnPropChange;

  /**
   * @title Get Node Field Data
   * @param id - Node ID
   * @param key - Field name
   * @returns Field data
   */
  onGetNodeFieldsData: (id: NodeId, key: string) => any;

  /**
   * @title Copy Node
   * @returns Persisted Graph
   */
  onCopyNode: () => PersistedGraph;

  /**
   * @title Paste Node
   * @param workflow - Workflow
   * @param position - Position
   */
  onPasteNode: (
    workflow: PersistedGraph,
    postion: { x: number; y: number }
  ) => void;

  /******************************************************
   *********************** Edges *************************
   ******************************************************/

  /**
   * @title Edge Change
   * @param edges - Array of edges
   */
  onEdgesChange: OnEdgesChange;

  /**
   * @title Edge Animation
   * @param animated - Whether to animate
   */
  onEdgesAnimate: (animated: boolean) => void;

  /**
   * @title Edge Type
   * @param type - Edge type
   */
  onEdgesType: (type: EdgeTypes) => void;

  /******************************************************
   ********************* Connection *********************
   ******************************************************/

  /**
   * @title Connect
   */
  onConnect: OnConnect;

  /******************************************************
   *********************** Image ************************
   ******************************************************/

  /**
   * @title Save Image
   * @param id - Node ID
   * @param images - Array of images
   */
  onImageSave: (id: NodeId, images: ImageItem[]) => void;

  /******************************************************
   *********************** Queue ************************
   ******************************************************/

  /**
   * @title Submit
   */
  onSubmit: () => Promise<void>;

  /**
   * @title Delete from Queue
   * @param id - Node ID
   */
  onDeleteFromQueue: (id: number) => Promise<void>;

  /**
   * @title Update Queue
   */
  onQueueUpdate: () => Promise<void>;

  /******************************************************
   *************** Workflow & Persist *******************
   ******************************************************/

  /**
   * @title Persist Temporarily
   */
  onPersistTemp: () => void;

  /**
   * @title Save Local Workflow
   * @param title - Title
   */
  onSaveLocalWorkFlow: (title?: string) => void;

  /**
   * @title Load Local Workflow
   * @param id - Workflow ID
   */
  onLoadLocalWorkflow: (id: string) => void;

  /**
   * @title Update Local Workflow Graph
   * @param id - Workflow ID
   */
  onUpdateLocalWorkFlowGraph: (id: string) => void;

  /**
   * @title Update Local Workflow Title
   * @param id - Workflow ID
   * @param title - Title
   */
  onUpdateLocalWorkFlowTitle: (id: string, title: string) => void;

  /**
   * @title Load Workflow
   * @param persisted - Persisted data
   */
  onLoadWorkflow: (persisted: PersistedGraph) => void;

  /**
   * @title Download Workflow
   */
  onDownloadWorkflow: () => void;
}
