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
  page?: string;
  counter: number;
  widgets: Record<WidgetKey, Widget>;
  customWidgets: string[];
  graph: Record<NodeId, SDNode>;
  nodes: Node[];
  edges: Edge[];
  queue: QueueItem[];
  gallery: GalleryItem[];
  edgeType: EdgeTypes;
  nodeInProgress?: NodeInProgress;
  promptError?: string;
  clientId?: string;

  onSetPage: (value: string) => void;
  onRefresh: () => Promise<void>;
  onInit: () => Promise<void>;
  onNewClientId: (id: string) => void;

  onCreateGroup: () => void;
  onSetNodesGroup: (childIds: NodeId[], groupNode: Node) => void;
  onDetachNodesGroup: (childIds: NodeId[], groupNode: Node) => void;
  onDetachGroup: (node: Node) => Node;
  onNodesChange: OnNodesChange;
  onUpdateNodes: (id: string, data: any) => void;
  onAddNode: (nodeItem: NodeItem) => void;
  onDeleteNode: (id: NodeId) => void;
  onDuplicateNode: (id: NodeId) => void;
  onNodeInProgress: (id: NodeId, progress: number) => void;
  onPropChange: OnPropChange;
  onModifyChange: OnPropChange;
  onGetNodeFieldsData: (id: NodeId, key: string) => any;
  onCopyNode: () => PersistedGraph;
  onPasteNode: (
    workflow: PersistedGraph,
    position: { x: number; y: number }
  ) => void;
  expanded: string[];
  onExpand: (id?: string) => void;

  onEdgesChange: OnEdgesChange;
  onEdgesAnimate: (animated: boolean) => void;
  onEdgesType: (type: EdgeTypes) => void;

  onConnect: OnConnect;

  onImageSave: (id: NodeId, images: ImageItem[]) => void;

  onSubmit: () => Promise<void>;
  onDeleteFromQueue: (id: number) => Promise<void>;
  onQueueUpdate: () => Promise<void>;

  onPersistTemp: () => void;
  onSaveLocalWorkFlow: (title?: string) => void;
  onLoadLocalWorkflow: (id: string) => void;
  onUpdateLocalWorkFlowGraph: (id: string) => void;
  onUpdateLocalWorkFlowTitle: (id: string, title: string) => void;
  onLoadWorkflow: (persisted: PersistedGraph) => void;
  onDownloadWorkflow: () => void;
}
