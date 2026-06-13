"use client";

import { forwardRef } from "react";
import type { WorkProject } from "./types";

type Props = {
  project: WorkProject;
  isOpen: boolean;
  rowSolid: string;
  onClick: () => void;
};

export const WorkRow = forwardRef<HTMLDivElement, Props>(function WorkRow(
  { project, isOpen, rowSolid, onClick },
  ref
) {
  const hasBlocks = Boolean(project.blocks && project.blocks.length > 0);

  return (
    <div
      ref={ref}
      className={`row${isOpen ? " is-open" : ""}`}
      style={{
        ...({ "--row-solid": rowSolid } as React.CSSProperties),
        ...(hasBlocks ? undefined : { cursor: "default", pointerEvents: "none" }),
      }}
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
      <span className="label">{project.brand}</span>
      <span className="divider" />
      <span className="label">{project.project}</span>
      <span className="value">{project.category}</span>
    </div>
  );
});
