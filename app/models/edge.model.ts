import { z } from "zod";

export class EdgeModel {
  id: string;
  animated: boolean;
  data: { label: "" } | string;
  style: React.CSSProperties;
  selected: boolean;
  source: string;
  target: string;
  sourceHandleId?: string | null;
  targetHandleId?: string | null;
  interactionWidth: number;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
  label?: string | React.ReactNode;
  labelStyle?: React.CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle?: React.CSSProperties;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  markerStart?: string;
  markerEnd?: string;
  pathOptions?: any;

  constructor(data?: any) {
    this.id = data?.id || "";
    this.animated = data?.animated || false;
    this.data = data?.data || null;
    this.style = data?.style || {};
    this.selected = data?.selected || false;
    this.source = data?.source || "";
    this.target = data?.target || "";
    this.sourceHandleId = data?.sourceHandleId || null;
    this.targetHandleId = data?.targetHandleId || null;
    this.interactionWidth = data?.interactionWidth || 10;
    this.sourceX = data?.sourceX || 0;
    this.sourceY = data?.sourceY || 0;
    this.targetX = data?.targetX || 0;
    this.targetY = data?.targetY || 0;
    this.sourcePosition = data?.sourcePosition || Position.Right;
    this.targetPosition = data?.targetPosition || Position.Left;
    this.label = data?.label || null;
    this.labelStyle = data?.labelStyle || {};
    this.labelShowBg = data?.labelShowBg || false;
    this.labelBgStyle = data?.labelBgStyle || {};
    this.labelBgPadding = data?.labelBgPadding || [2, 4];
    this.labelBgBorderRadius = data?.labelBgBorderRadius || 0;
    this.markerStart = data?.markerStart || "";
    this.markerEnd = data?.markerEnd || "";
    this.pathOptions = data?.pathOptions || {};
  }

  static validate(data: any): EdgeModel {
    return new EdgeModel(data);
  }

  toJson() {
    return {
      id: this.id,
      source: this.source,
      target: this.target,
    };
  }
}

export class RegisterEdgeModel {
  id: string;
  style?: React.CSSProperties;
  node_id: string;
  label?: string;
  source: string;
  target: string;

  constructor(data: any) {
    this.id = data.id;
    this.node_id = data.node_id;
    this.style = data?.style || {};
    this.source = data?.source;
    this.target = data?.target;
  }

  public static schema = z.object({
    style: z.object({}).optional(),
    node_id: z.string(),
    source: z.string(),
    target: z.string(),
    label: z.string().optional(),
  });
}

export class EdgeTableModel {
  id: string;
  label: string;
  source: string;
  target: string;

  constructor(data: any) {
    this.id = data.id;
    this.label = data.label;
    this.source = data.source;
    this.target = data.target;
  }
}

export enum Position {
  Left = "left",
  Top = "top",
  Right = "right",
  Bottom = "bottom",
}
