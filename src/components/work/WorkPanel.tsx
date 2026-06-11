"use client";

import { forwardRef } from "react";
import type { Block } from "./types";
import { renderBlock } from "./blocks";

type Props = {
  blocks: Block[];
  onClose: () => void;
};

export const WorkPanel = forwardRef<HTMLDivElement, Props>(function WorkPanel(
  { blocks, onClose },
  ref
) {
  return (
    <div ref={ref} className="panel">
      {blocks.map((block, i) => renderBlock(block, i))}
      <div className="close-bar" onClick={onClose} role="button" tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClose();
          }
        }}
      >
        <span className="close-label">Close</span>
        <span className="close-icon">✕</span>
      </div>
    </div>
  );
});
