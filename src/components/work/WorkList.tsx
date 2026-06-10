"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { WorkProject } from "./types";
import { WorkRow } from "./WorkRow";
import { WorkPanel } from "./WorkPanel";

type Props = {
  projects: WorkProject[];
};

export function WorkList({ projects }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const panelInnerRefs = useRef<Array<HTMLDivElement | null>>([]);

  const openDuration = prefersReduced ? 0 : 1.2;
  const closeDuration = prefersReduced ? 0 : 0.6;

  const panelVariants = {
    initial: { height: 0 },
    animate: {
      height: "auto" as const,
      transition: { duration: openDuration, ease: "easeOut" },
    },
    exit: {
      height: 0,
      transition: { duration: closeDuration, ease: "easeOut" },
    },
  };

  const handleOpen = useCallback(
    (nextIndex: number) => {
      const prevIndex = openIndex;

      // Bottom-anchor: when closing a panel above the newly opened one,
      // set justify-content: flex-end on the closing panel's inner div
      // BEFORE state update, so the top content disappears during close.
      if (prevIndex !== null && nextIndex > prevIndex) {
        const innerEl = panelInnerRefs.current[prevIndex];
        if (innerEl) {
          innerEl.style.justifyContent = "flex-end";
        }
      }

      // Record the row's viewport position before the state update
      const rowEl = rowRefs.current[nextIndex];
      const pinTop = rowEl ? rowEl.getBoundingClientRect().top : null;

      setOpenIndex(nextIndex);

      // Viewport-pin RAF loop: compensate for layout shift while the new panel opens
      if (pinTop !== null && rowEl && !prefersReduced) {
        const startTime = performance.now();
        const totalDuration = openDuration * 1000;

        const raf = () => {
          if (performance.now() - startTime > totalDuration + 100) return;
          const currentTop = rowEl.getBoundingClientRect().top;
          const drift = currentTop - pinTop;
          if (Math.abs(drift) > 0.5) {
            window.scrollBy(0, drift);
          }
          requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);
      }
    },
    [openIndex, openDuration, prefersReduced]
  );

  const handleClose = useCallback(() => {
    setOpenIndex(null);
  }, []);

  const handleRowClick = useCallback(
    (index: number) => {
      if (openIndex === index) {
        handleClose();
      } else {
        handleOpen(index);
      }
    },
    [openIndex, handleOpen, handleClose]
  );

  return (
    <div>
      {projects.map((project, i) => (
        <div key={i}>
          <WorkRow
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            project={project}
            isOpen={openIndex === i}
            onClick={() => handleRowClick(i)}
          />
          <AnimatePresence mode="sync">
            {openIndex === i && project.blocks && project.blocks.length > 0 && (
              <motion.div
                key={`panel-${i}`}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={panelVariants}
                style={{ overflow: "clip" }}
              >
                <WorkPanel
                  ref={(el) => {
                    panelInnerRefs.current[i] = el;
                  }}
                  blocks={project.blocks}
                  onClose={handleClose}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
