import { StringifiableRecord } from "query-string";
import { XYPosition } from "reactflow";
import { NodeId, PropertyKey, WidgetKey } from "./base";
import { Widget } from "./widget";

/**
 * Node position
 */
export interface NodePosition {
  x: number;
  y: number;
}

/**
 * SDNode modify properties
 * @property color - Color
 * @property nickname - Nickname
 */
export interface SDNodeModify {
  color?: string;
  nickname?: string;
}

/**
 * SDNode object
 * @property widget - Widget key
 * @property fields - Property fields
 * @property images - Image list
 * @property modify - Modify properties
 */
export interface SDNode {
  widget: WidgetKey;
  fields: Record<PropertyKey, any>;
  images?: ImageItem[];
  modify?: SDNodeModify;
}

/**
 * Node object
 * @property widget - Widget object
 * @property node - SDNode object
 * @property position - Node position
 * @property key - Node key
 * @property width - Node width
 * @property height - Node height
 * @property parentNode - Parent node ID
 */
export interface NodeItem {
  widget: Widget;
  node?: SDNode;
  position?: XYPosition;
  key?: string;
  width?: number;
  height?: number;
  parentNode?: string;
}

/**
 * Image object
 * @property filename - Filename
 * @property subfolder - Subfolder name
 * @property type - File type
 */
export interface ImageItem extends StringifiableRecord {
  filename: string;
  subfolder?: string;
  type?: string;
}

/**
 * Node execution progress object
 * @property id - Node ID
 * @property progress - Progress value
 */
export interface NodeInProgress {
  id: NodeId;
  progress: number;
}

/**
 * Gallery Item object
 * @property prompt - Prompt message
 * @property image - Image object
 */
export interface GalleryItem {
  prompt?: string;
  image: ImageItem;
}
