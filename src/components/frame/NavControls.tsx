"use client";

import { useWorkMode } from "@/components/work/WorkModeContext";

export function NavControls() {
  const { toggleDark, cycleImage } = useWorkMode();

  return (
    <>
      {/* Sort factor rows — static structure; behaviour wired by A1-22 */}
      <div id="sort-rows">
        <div className="nav-row">
          <div className="nav-item sort-cell" data-pos="0">
            <span className="state-icon fill" />
            <span className="nav-label">Brand</span>
            <span className="drag-handle"><i /><i /><i /><i /></span>
            <span className="drag-zone" />
          </div>
          <div className="nav-item sort-cell right" data-pos="1">
            <span className="drag-handle"><i /><i /><i /><i /></span>
            <span className="nav-label">Project</span>
            <span className="state-icon fill" />
            <span className="drag-zone" />
          </div>
        </div>
        <div className="nav-row">
          <div className="nav-item sort-cell" data-pos="2">
            <span className="state-icon fill" />
            <span className="nav-label">Category</span>
            <span className="drag-handle"><i /><i /><i /><i /></span>
            <span className="drag-zone" />
          </div>
          <div className="nav-item sort-cell right" data-pos="3">
            <span className="drag-handle"><i /><i /><i /><i /></span>
            <span className="nav-label">Date</span>
            <span className="state-icon" />
            <span className="drag-zone" />
          </div>
        </div>
      </div>
      {/* Mode / Image toggle row */}
      <div className="nav-row">
        <div className="nav-item">
          <span className="toggle" onClick={toggleDark} style={{ cursor: "pointer" }}>
            <span className="bullet mode-icon" />
            <span className="nav-label">Mode</span>
          </span>
          <span className="toggle" onClick={cycleImage} style={{ cursor: "pointer" }}>
            <span className="nav-label" style={{ textAlign: "right" }}>
              Image
            </span>
            <span className="bullet image-icon" />
          </span>
        </div>
      </div>
    </>
  );
}
