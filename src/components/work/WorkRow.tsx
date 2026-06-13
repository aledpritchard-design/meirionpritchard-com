"use client";

import { Fragment, forwardRef } from "react";
import type { WorkProject, Factor } from "./types";

type Props = {
  project: WorkProject;
  activeFactors: Factor[];
  isOpen: boolean;
  rowSolid: string;
  onClick: () => void;
};

export const WorkRow = forwardRef<HTMLDivElement, Props>(function WorkRow(
  { project, activeFactors, isOpen, rowSolid, onClick },
  ref
) {
  const hasBlocks = Boolean(project.blocks && project.blocks.length > 0);
  const lefts = activeFactors.slice(0, -1);
  const last = activeFactors.length > 0 ? activeFactors[activeFactors.length - 1] : null;

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
      {lefts.map((f, idx) => (
        <Fragment key={f.key}>
          <span className="label">{project[f.key]}</span>
          {idx < lefts.length - 1 && <span className="divider" />}
        </Fragment>
      ))}
      {last && <span className="value">{project[last.key]}</span>}
    </div>
  );
});
