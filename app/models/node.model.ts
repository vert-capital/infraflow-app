import { z } from "zod";

export type XYPosition = {
  x: number;
  y: number;
};

export type CoordinateExtent = [[number, number], [number, number]];

export enum Position {
  Left = "left",
  Top = "top",
  Right = "right",
  Bottom = "bottom",
}

export class NodeModel {
  id: string;
  application_id: string;
  position: XYPosition;
  data: { label: "" | string } | string;
  type?: any;
  sourcePosition?: Position;
  targetPosition?: Position;
  hidden?: boolean;
  selected?: boolean;
  dragging?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  resizing?: boolean;
  deletable?: boolean;
  dragHandle?: string;
  width?: number | null;
  height?: number | null;
  parentNode?: string;
  zIndex?: number;
  extent?: "parent" | CoordinateExtent;
  expandParent?: boolean;
  positionAbsolute?: XYPosition;
  ariaLabel?: string;
  focusable?: boolean;
  style?: React.CSSProperties;
  className?: string;
  label?: string;

  constructor(data?: any) {
    this.id = data?.id || "";
    this.application_id = data?.application_id || "";
    this.position = data?.position || { x: 0, y: 0 };
    this.data = data?.data || { label: data?.label || "" };
    this.type = data?.type || undefined;
    this.sourcePosition = data?.source_position || Position.Right;
    this.targetPosition = data?.target_position || Position.Left;
    this.hidden = data?.hidden || false;
    this.selected = data?.selected || false;
    this.dragging = data?.dragging || false;
    this.draggable = data?.draggable || true;
    this.selectable = data?.selectable || true;
    this.connectable = data?.connectable || false;
    this.resizing = data?.resizing || false;
    this.deletable = data?.deletable || true;
    this.dragHandle = data?.drag_handle || undefined;
    this.width = data?.width || null;
    this.height = data?.height || null;
    this.parentNode = data?.parent_node_id || undefined;
    this.zIndex = data?.z_index || 0;
    this.extent = data?.extent || "parent";
    this.expandParent = data?.expand_parent || false;
    this.positionAbsolute = data?.position_absolute || undefined;
    this.ariaLabel = data?.aria_label || undefined;
    this.focusable = data?.focusable || true;
    this.style = data?.style || {};
    this.className = data?.class_name || "";
    this.label = data?.label || "";
  }
}

export enum TypesNode {
  Input = "input",
  Output = "output",
  Group = "group",
  IO = "undefined",
}

export function getTypesNodesOptions() {
  return Object.keys(TypesNode).map((key) => {
    return {
      value: key.toLocaleLowerCase() as "Input" | "Output" | "Group" | "IO",
      label: key,
    };
  });
}

export class RegisterNodeModel {
  id: string;
  type: "input" | "output" | "group" | "undefined";
  position: XYPosition;
  style?: React.CSSProperties;
  parent_node_id?: string;
  application_id: string;
  label?: string;

  constructor(data: any) {
    this.id = data.id;
    this.type = data.type;
    this.position = data.position;
    this.style = data?.style || {};
    this.parent_node_id = data?.parent_node_id;
    this.application_id = data?.application_id;
    this.label = data?.label;
  }

  public static schema = z.object({
    type: z.nativeEnum(TypesNode),
    position: z.object({ x: z.number(), y: z.number() }),
    style: z.object({}).optional(),
    parent_node_id: z.string().optional(),
    application_id: z.string(),
    label: z.string().optional(),
  });
}

export class NodeTableModel {
  id: string;
  name: string;
  type: string;

  constructor(data: any) {
    this.id = data?.id || "";
    this.name = data?.data?.label || "";
    this.type = data?.type || "";
  }
}
