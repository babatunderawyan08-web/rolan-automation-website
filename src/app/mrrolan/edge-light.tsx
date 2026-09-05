"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./mrrolan.module.css";

function roundedRectPath(x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2);
  return [
    `M ${x + radius} ${y}`,
    `H ${x + w - radius}`,
    `Q ${x + w} ${y} ${x + w} ${y + radius}`,
    `V ${y + h - radius}`,
    `Q ${x + w} ${y + h} ${x + w - radius} ${y + h}`,
    `H ${x + radius}`,
    `Q ${x} ${y + h} ${x} ${y + h - radius}`,
    `V ${y + radius}`,
    `Q ${x} ${y} ${x + radius} ${y}`,
    "Z",
  ].join(" ");
}

export function EdgeLight() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const apply = () => {
      setBox({ w: host.clientWidth, h: host.clientHeight });
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const inset = 7;
  const radius = 28;
  const path =
    box.w > 0 && box.h > 0
      ? roundedRectPath(inset, inset, box.w - inset * 2, box.h - inset * 2, radius)
      : "";

  return (
    <div ref={hostRef} className={styles.frame} aria-hidden="true">
      {path ? (
        <svg
          className={styles.frameSvg}
          viewBox={`0 0 ${box.w} ${box.h}`}
          fill="none"
        >
          <path className={styles.lineTail} d={path} pathLength="100" />
          <path className={styles.lineMid} d={path} pathLength="100" />
          <path className={styles.lineHead} d={path} pathLength="100" />
        </svg>
      ) : null}
    </div>
  );
}
