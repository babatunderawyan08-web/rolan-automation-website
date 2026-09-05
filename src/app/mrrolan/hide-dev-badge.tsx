"use client";

import { useEffect } from "react";

export function HideDevBadge() {
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-mrrolan-hide-dev-badge", "");
    style.textContent = `
      nextjs-portal,
      [data-next-badge-root],
      [data-nextjs-dev-indicator] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return null;
}
