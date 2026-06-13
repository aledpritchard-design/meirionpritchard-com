"use client";

import { useRef, useEffect } from "react";
import { useWorkMode } from "@/components/work/WorkModeContext";
import { useWorkOrder } from "@/components/work/WorkOrderContext";
import type { Factor } from "@/components/work/types";

function stateIconClass(state: Factor["state"]): string {
  if (state === "asc") return "state-icon star";
  if (state === "desc") return "state-icon fill";
  return "state-icon";
}

export function NavControls() {
  const { toggleDark, cycleImage } = useWorkMode();
  const { factors, cycleFactorState, reorderFactors } = useWorkOrder();
  const sortRowsRef = useRef<HTMLDivElement>(null);

  // DOM-direct drag — matches prototype pointer/drag behaviour exactly.
  // cycleFactorState and reorderFactors have stable identity (useCallback + empty deps).
  useEffect(() => {
    // sortRowsRef is attached to a rendered div — always non-null inside useEffect.
    const container = sortRowsRef.current as HTMLDivElement;
    if (!container) return;

    type DragState = {
      from: number;
      over: number | null;
      outer: HTMLDivElement;
      origin: DOMRect;
      dx: number;
      dy: number;
    };

    let drag: DragState | null = null;
    let pending: { cell: HTMLElement; sx: number; sy: number } | null = null;
    let suppressClick = false;

    function inDragHalf(cell: HTMLElement, clientX: number): boolean {
      const rect = cell.getBoundingClientRect();
      const inRightHalf = clientX - rect.left > rect.width / 2;
      // Left cell: drag zone is the right half; right cell: drag zone is the left half.
      return cell.classList.contains("right") ? !inRightHalf : inRightHalf;
    }

    function startDrag(cell: HTMLElement, e: PointerEvent) {
      const rect = cell.getBoundingClientRect();
      const outer = document.createElement("div");
      outer.className = "drag-ghost";
      outer.style.left = rect.left + "px";
      outer.style.top = rect.top + "px";
      outer.style.width = rect.width + "px";
      outer.style.height = rect.height + "px";
      const inner = cell.cloneNode(true) as HTMLElement;
      inner.classList.remove("vacated", "drop-target");
      inner.classList.add("inverted");
      outer.appendChild(inner);
      document.body.appendChild(outer);
      drag = {
        from: +(cell.dataset.pos ?? "0"),
        over: null,
        outer,
        origin: rect,
        dx: e.clientX - rect.left,
        dy: e.clientY - rect.top,
      };
      cell.classList.add("vacated");
    }

    function onPointerDown(e: PointerEvent) {
      const cell = (e.target as Element).closest(".sort-cell") as HTMLElement | null;
      if (!cell || !inDragHalf(cell, e.clientX)) return;
      pending = { cell, sx: e.clientX, sy: e.clientY };
      e.preventDefault();
    }

    function onPointerMove(e: PointerEvent) {
      if (pending && !drag) {
        if (Math.hypot(e.clientX - pending.sx, e.clientY - pending.sy) < 4) return;
        startDrag(pending.cell, e);
        pending = null;
      }
      if (!drag) return;
      drag.outer.style.left = e.clientX - drag.dx + "px";
      drag.outer.style.top = e.clientY - drag.dy + "px";
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const overCell = el && (el as Element).closest(".sort-cell") as HTMLElement | null;
      container.querySelectorAll<HTMLElement>(".drop-target").forEach((c) =>
        c.classList.remove("drop-target")
      );
      drag.over = null;
      if (overCell && +(overCell.dataset.pos ?? "-1") !== drag.from) {
        overCell.classList.add("drop-target");
        drag.over = +(overCell.dataset.pos ?? "-1");
      }
    }

    function onPointerUp() {
      pending = null;
      if (!drag) return;
      const { from, over, outer, origin } = drag;
      drag = null;
      suppressClick = true;

      const commit = over !== null && over !== from;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const finish = () => {
        outer.remove();
        if (commit) {
          reorderFactors(from, over!);
        } else {
          container
            .querySelectorAll<HTMLElement>(".vacated, .drop-target")
            .forEach((c) => c.classList.remove("vacated", "drop-target"));
        }
      };

      if (reducedMotion) {
        finish();
        return;
      }

      const destCell = commit
        ? (container.querySelector(`.sort-cell[data-pos="${over}"]`) as HTMLElement | null)
        : null;
      const dest = destCell ? destCell.getBoundingClientRect() : origin;
      outer.classList.add("flying");
      outer.style.left = dest.left + "px";
      outer.style.top = dest.top + "px";

      let done = false;
      const onEnd = () => {
        if (!done) {
          done = true;
          finish();
        }
      };
      outer.addEventListener("transitionend", onEnd, { once: true });
      setTimeout(onEnd, 300); // safety net
    }

    function onClick(e: MouseEvent) {
      if (suppressClick) {
        suppressClick = false;
        return;
      }
      const cell = (e.target as Element).closest(".sort-cell") as HTMLElement | null;
      if (!cell || inDragHalf(cell, e.clientX)) return;
      cycleFactorState(+(cell.dataset.pos ?? "0"));
    }

    container.addEventListener("pointerdown", onPointerDown as EventListener);
    window.addEventListener("pointermove", onPointerMove as EventListener);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("click", onClick);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown as EventListener);
      window.removeEventListener("pointermove", onPointerMove as EventListener);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("click", onClick);
    };
  }, [cycleFactorState, reorderFactors]);

  return (
    <>
      <div id="sort-rows" ref={sortRowsRef}>
        {[0, 1].map((row) => (
          <div key={row} className="nav-row">
            {[0, 1].map((col) => {
              const pos = row * 2 + col;
              const f = factors[pos];
              const isRight = col === 1;
              return (
                <div
                  key={pos}
                  className={`nav-item sort-cell${isRight ? " right" : ""}`}
                  data-pos={pos}
                >
                  {isRight ? (
                    <>
                      <span className="drag-handle">
                        <i /><i /><i /><i />
                      </span>
                      <span className="nav-label">{f.label}</span>
                      <span className={stateIconClass(f.state)}>
                        {f.state === "asc" ? "✱" : ""}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className={stateIconClass(f.state)}>
                        {f.state === "asc" ? "✱" : ""}
                      </span>
                      <span className="nav-label">{f.label}</span>
                      <span className="drag-handle">
                        <i /><i /><i /><i />
                      </span>
                    </>
                  )}
                  <span className="drag-zone" />
                </div>
              );
            })}
          </div>
        ))}
      </div>

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
