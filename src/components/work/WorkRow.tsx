"use client";

import { forwardRef } from "react";
import type { WorkProject } from "./types";

type Props = {
  project: WorkProject;
  isOpen: boolean;
  onClick: () => void;
};

export const WorkRow = forwardRef<HTMLDivElement, Props>(function WorkRow(
  { project, isOpen, onClick },
  ref
) {
  const hasBlocks = Boolean(project.blocks && project.blocks.length > 0);

  return (
    <div
      ref={ref}
      className={`row${isOpen ? " is-open" : ""}`}
      style={hasBlocks ? undefined : { cursor: "default", pointerEvents: "none" }}
      onClick={hasBlocks ? onClick : undefined}
      role={hasBlocks ? "button" : undefined}
      tabIndex={hasBlocks ? 0 : undefined}
      onKeyDown={
        hasBlocks
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <span className="label">{project.title}</span>
      <span className="divider" />
      <span className="label">{project.category}</span>
      <span className="value">{project.value}</span>
    </div>
  );
});
