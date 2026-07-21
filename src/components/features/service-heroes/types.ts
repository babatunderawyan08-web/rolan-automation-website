export type HeroLayout = "flow" | "hub" | "funnel" | "pipeline" | "dial" | "mesh" | "radar";

export type HeroAccent = "blue" | "cyan" | "emerald" | "violet" | "amber" | "rose" | "slate";

export type WorkflowNodeDef = {
  id: string;
  label: string;
  /** Lucide icon name key resolved in the canvas */
  icon: string;
  status?: "idle" | "active" | "done" | "alert";
};

export type WorkflowEdgeDef = {
  from: string;
  to: string;
};

export type ActivityCardDef = {
  title: string;
  meta: string;
  tone?: "ok" | "info" | "warn";
};

export type ServiceWorkflowDef = {
  layout: HeroLayout;
  accent: HeroAccent;
  caption: string;
  nodes: WorkflowNodeDef[];
  edges: WorkflowEdgeDef[];
  activities: ActivityCardDef[];
  metric?: { label: string; value: string; delta?: string };
};
