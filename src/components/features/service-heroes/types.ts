export type OrbitNodeDef = {
  id: string;
  /** Official brand name for BrandLogo (OpenAI, n8n, etc.). Omit for step chips. */
  brand?: string;
  label: string;
  /** Short story shown when this node is active / hovered */
  story: string;
};

export type ServiceWorkflowDef = {
  caption: string;
  nodes: OrbitNodeDef[];
  /** Ordered path of node ids that activate as the “story” sequence */
  paths: string[][];
  metric?: { label: string; value: string; delta?: string };
  /** Optional secondary activity lines that cycle */
  activities: { title: string; meta: string }[];
};
