"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { HslColor, WorkProject } from "./types";
import { WorkRow } from "./WorkRow";
import { WorkPanel } from "./WorkPanel";
import { useWorkMode } from "./WorkModeContext";

type Props = {
  projects: WorkProject[];
  rampStart: HslColor;
  rampEnd: HslColor;
};

const SCROLL_ARM = 100;
const ACTIVE_LINE_FRAC = 0.27;

function solidColor(i: number, n: number, start: HslColor, end: HslColor): string {
  const t = n > 1 ? i / (n - 1) : 0;
  const h = start.h + t * (end.h - start.h);
  const s = start.s + t * (end.s - start.s);
  const l = start.l + t * (end.l - start.l);
  return `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`;
}

export function WorkList({ projects, rampStart, rampEnd }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();
  const { isDark, imageMode } = useWorkMode();

  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const panelInnerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const bgRef0 = useRef<HTMLDivElement>(null);
  const bgRef1 = useRef<HTMLDivElement>(null);

  // Mutable refs — avoid stale closures in stable callbacks
  const bgFrontRef = useRef<HTMLDivElement | null>(null);
  const activeIndexRef = useRef<number | null>(null);
  const openIndexRef = useRef<number | null>(null);
  const pointerXRef = useRef(-1);
  const pointerYRef = useRef(-1);
  const projectsRef = useRef(projects);

  // Sync latest values into refs on every render
  projectsRef.current = projects;
  openIndexRef.current = openIndex;

  const openDuration = prefersReduced ? 0 : 1.2;
  const closeDuration = prefersReduced ? 0 : 0.6;

  // Apply dark / image mode body classes
  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    document.body.classList.remove("image", "solid");
    if (imageMode === "image") document.body.classList.add("image");
    else if (imageMode === "solid") document.body.classList.add("solid");
  }, [imageMode]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("dark", "image", "solid", "backdrop-on");
    };
  }, []);

  // ---- backdrop management (all DOM-direct, no React state) -----------

  const setBackdropImage = useCallback((src: string) => {
    const layer0 = bgRef0.current;
    const layer1 = bgRef1.current;
    if (!layer0 || !layer1) return;
    if (bgFrontRef.current?.dataset.src === src) return;
    const next = bgFrontRef.current === layer0 ? layer1 : layer0;
    next.style.backgroundImage = `url("${src}")`;
    next.dataset.src = src;
    next.classList.add("front");
    bgFrontRef.current?.classList.remove("front");
    bgFrontRef.current = next;
  }, []);

  const setBackdropFromIndex = useCallback(
    (idx: number) => {
      const rowEl = rowRefs.current[idx];
      if (!rowEl) return;
      const rowSolid = rowEl.style.getPropertyValue("--row-solid");
      document.body.style.setProperty("--hover-solid", rowSolid);
      const src = projectsRef.current[idx]?.image;
      if (src) setBackdropImage(src);
      document.body.classList.add("backdrop-on");
    },
    [setBackdropImage]
  );

  const clearBackdrop = useCallback(() => {
    document.body.classList.remove("backdrop-on");
  }, []);

  // Set the active row (DOM-direct; avoids React re-renders on every hover)
  const setActiveRow = useCallback(
    (idx: number | null) => {
      if (idx === activeIndexRef.current) return;
      const prev = activeIndexRef.current;
      if (prev !== null) rowRefs.current[prev]?.classList.remove("is-active");
      activeIndexRef.current = idx;
      if (idx !== null) {
        rowRefs.current[idx]?.classList.add("is-active");
        setBackdropFromIndex(idx);
      }
    },
    [setBackdropFromIndex]
  );

  // While a project is open, hold the backdrop if the cursor is in list bounds
  const updateDesktopBackdrop = useCallback(() => {
    if (activeIndexRef.current !== null) return; // hover already driving it
    const openIdx = openIndexRef.current;
    if (openIdx !== null && pointerYRef.current >= 0) {
      const listEl = listRef.current;
      const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
      if (listEl && rows.length > 0) {
        const top = rows[0].getBoundingClientRect().top;
        const bottom = listEl.getBoundingClientRect().bottom;
        if (pointerYRef.current >= top && pointerYRef.current <= bottom) {
          setBackdropFromIndex(openIdx);
          return;
        }
      }
    }
    clearBackdrop();
  }, [setBackdropFromIndex, clearBackdrop]);

  // Desktop pointer hit-test (re-aims on scroll so a stationary cursor still highlights)
  const hitTestHover = useCallback(() => {
    if (pointerXRef.current < 0) return;
    const el = document.elementFromPoint(pointerXRef.current, pointerYRef.current);
    let targetIdx: number | null = null;
    if (el) {
      for (let i = 0; i < rowRefs.current.length; i++) {
        const r = rowRefs.current[i];
        if (r && (r === el || r.contains(el as Node))) {
          targetIdx = i;
          break;
        }
      }
    }
    setActiveRow(targetIdx);
    if (targetIdx === null) updateDesktopBackdrop();
  }, [setActiveRow, updateDesktopBackdrop]);

  // Mobile: whichever row sits on the active line (27% down) gets the treatment
  const updateMobileActiveRow = useCallback(() => {
    if (window.scrollY < SCROLL_ARM) {
      setActiveRow(null);
      clearBackdrop();
      return;
    }
    const lineY = window.innerHeight * ACTIVE_LINE_FRAC;
    let hit: number | null = null;
    for (let i = 0; i < rowRefs.current.length; i++) {
      const r = rowRefs.current[i];
      if (!r) continue;
      const rect = r.getBoundingClientRect();
      if (rect.top <= lineY && rect.bottom > lineY) {
        hit = i;
        break;
      }
    }
    setActiveRow(hit);
    if (hit === null) clearBackdrop();
  }, [setActiveRow, clearBackdrop]);

  // Wire up pointer/scroll/resize listeners once on mount
  useEffect(() => {
    const mobileMQ = window.matchMedia("(max-width: 640px)");

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || mobileMQ.matches) return;
      pointerXRef.current = e.clientX;
      pointerYRef.current = e.clientY;
      hitTestHover();
    };

    const onMouseLeave = () => {
      pointerXRef.current = -1;
      pointerYRef.current = -1;
      if (!mobileMQ.matches) {
        setActiveRow(null);
        clearBackdrop();
      }
    };

    let scrollTick = false;
    const onScroll = () => {
      if (scrollTick) return;
      scrollTick = true;
      requestAnimationFrame(() => {
        scrollTick = false;
        if (mobileMQ.matches) updateMobileActiveRow();
        else hitTestHover();
      });
    };

    const onResize = () => {
      if (mobileMQ.matches) updateMobileActiveRow();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    if (mobileMQ.matches) updateMobileActiveRow();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [hitTestHover, updateMobileActiveRow, setActiveRow, clearBackdrop]);

  // Update desktop backdrop when the open project changes
  useEffect(() => {
    if (!window.matchMedia("(max-width: 640px)").matches) {
      updateDesktopBackdrop();
    }
  }, [openIndex, updateDesktopBackdrop]);

  // ---- accordion -------------------------------------------------------

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

      // Bottom-anchor: closing a panel above the new one clips from the top
      if (prevIndex !== null && nextIndex > prevIndex) {
        const innerEl = panelInnerRefs.current[prevIndex];
        if (innerEl) innerEl.style.justifyContent = "flex-end";
      }

      const rowEl = rowRefs.current[nextIndex];
      const pinTop = rowEl ? rowEl.getBoundingClientRect().top : null;
      setOpenIndex(nextIndex);

      // Viewport-pin RAF: compensate for layout shift while the new panel opens
      if (pinTop !== null && rowEl && !prefersReduced) {
        const startTime = performance.now();
        const totalDuration = openDuration * 1000;
        const raf = () => {
          if (performance.now() - startTime > totalDuration + 100) return;
          const currentTop = rowEl.getBoundingClientRect().top;
          const drift = currentTop - pinTop;
          if (Math.abs(drift) > 0.5) window.scrollBy(0, drift);
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
      if (openIndex === index) handleClose();
      else handleOpen(index);
    },
    [openIndex, handleOpen, handleClose]
  );

  return (
    <>
      {/* Fixed image-mode backdrop layers (crossfade pair) */}
      <div ref={bgRef0} className="bg-img" aria-hidden="true" />
      <div ref={bgRef1} className="bg-img" aria-hidden="true" />

      <div ref={listRef}>
        {projects.map((project, i) => (
          <div key={i}>
            <WorkRow
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              project={project}
              isOpen={openIndex === i}
              rowSolid={solidColor(i, projects.length, rampStart, rampEnd)}
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
    </>
  );
}
