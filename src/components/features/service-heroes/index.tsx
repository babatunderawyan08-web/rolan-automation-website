"use client";

import { WorkflowHeroCanvas } from "./workflow-canvas";
import { getServiceWorkflow } from "./workflows";

export function ServiceHeroMedia({ serviceId }: { serviceId: string }) {
  const workflow = getServiceWorkflow(serviceId);
  return <WorkflowHeroCanvas workflow={workflow} />;
}

export { getServiceWorkflow } from "./workflows";
export type { ServiceWorkflowDef } from "./types";
