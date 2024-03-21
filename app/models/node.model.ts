import { z } from "zod";

export type XYPosition = {
  x: number;
  y: number;
};

export type CoordinateExtent = [[number, number], [number, number]];

export enum Position {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}

export class NodeModel {
  id: string;
  position: XYPosition;
  data: string;
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
  extent?: 'parent' | CoordinateExtent;
  expandParent?: boolean;
  positionAbsolute?: XYPosition;
  ariaLabel?: string;
  focusable?: boolean;
  style?: React.CSSProperties;
  className?: string;

  constructor(data?: any) {
    this.id = data?.id || '';
    this.position = data?.position || { x: 0, y: 0 };
    this.data = data?.data || '';
    this.type = data?.type || undefined;
    this.sourcePosition = data?.sourcePosition || Position.Right;
    this.targetPosition = data?.targetPosition || Position.Left;
    this.hidden = data?.hidden || false;
    this.selected = data?.selected || false;
    this.dragging = data?.dragging || false;
    this.draggable = data?.draggable || true;
    this.selectable = data?.selectable || true;
    this.connectable = data?.connectable || true;
    this.resizing = data?.resizing || false;
    this.deletable = data?.deletable || true;
    this.dragHandle = data?.dragHandle || undefined;
    this.width = data?.width || null;
    this.height = data?.height || null;
    this.parentNode = data?.parentNode || undefined;
    this.zIndex = data?.zIndex || 0;
    this.extent = data?.extent || 'parent';
    this.expandParent = data?.expandParent || false;
    this.positionAbsolute = data?.positionAbsolute || undefined;
    this.ariaLabel = data?.ariaLabel || undefined;
    this.focusable = data?.focusable || true;
    this.style = data?.style || {};
    this.className = data?.className || '';
  }
}

export enum TypesNode {
  Input = 'input',
  Output = 'output',
  Group = 'group',
}

export class RegisterNodeModel {
  type: TypesNode;
  position: XYPosition;
  data: any;
  style?: React.CSSProperties;
  parentNode?: string;

  constructor(data: any) {
    this.type = data.type;
    this.position = data.position;
    this.data = data.data;
    this.style = data?.style || {};
    this.parentNode = data?.parentNode;
  }

  public static schema = z
    .object({
      type: z.nativeEnum(TypesNode),
      position: z.object({ x: z.number(), y: z.number() }),
      data: z.any(),
      style: z.object({}).optional(),
      parentNode: z.string().optional(),
    })
}