"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { HslColor, WorkProject } from "./types";
import { WorkRow } from "./WorkRow";
import { WorkPanel } from "./WorkPanel";
import { useWorkMode } from "./WorkModeContext";
import { useWorkOrder } from "./WorkOrderContext";

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

function rowKey(p: WorkProject): string {
  return `${p.brand}|${p.project}`;
}

export function WorkList({ projects, rampStart, rampEnd }: Props) {
  // Track the open project by stable key so it follows the row through re-sorts.
  const [openProjectKey, setOpenProjectKey] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();
  const { isDark, imageMode } = useWorkMode();
  const { factors, isReorder } = useWorkOrder();

  // Sort projects by active factors in priority order.
  const sortedProjects = useMemo(() => {
    const active = factors.filter((f) => f.state !== "off");
    return [...projects].sort((a, b) => {
      for (const f of active) {
        const av = a[f.key] as string | number;
        const bv = b[f.key] as string | number;
        let r =
          typeof av === "number" && typeof bv === "number"
            ? av - bv
            : String(av).localeCompare(String(bv));
        if (f.state === "desc") r = -r;
        if (r) return r;
      }
      return 0;
    });
  }, [projects, factors]);

  const activeFactors = useMemo(() => factors.filter((f) => f.state !== "off"), [factors]);

  // Derive openIndex from the open project key + current sort order.
  // The panel follows the correct row automatically when factors change.
  const openIndex = useMemo(() => {
    if (openProjectKey === null) return null;
    const idx = sortedProjects.findIndex((p) => rowKey(p) === openProjectKey);
    return idx >= 0 ? idx : null;
  }, [sortedProjects, openProjectKey]);

  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const panelInnerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const bgRef0 = useRef<HTMLDivElement>(null);
  const bgRef1 = useRef<HTMLDivElement>(null);

  // Mutable refs — avoid stale closures in stable callbacks.
  // Synced in a layoutEffect so they're always up to date by the time
  // event handlers (scroll, pointer) run post-paint.
  const bgFrontRef = useRef<HTMLDivElement | null>(null);
  const activeIndexRef = useRef<number | null>(null);
  const openIndexRef = useRef<number | null>(null);
  const pointerXRef = useRef(-1);
  const pointerYRef = useRef(-1);
  const projectsRef = useRef(sortedProjects);

  useLayoutEffect(() => {
    projectsRef.current = sortedProjects;
    openIndexRef.current = openIndex;
  });

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

  const updateDesktopBackdrop = useCallback(() => {
    if (activeIndexRef.current !== null) return;
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

      if (prevIndex !== null && nextIndex > prevIndex) {
        const innerEl = panelInnerRefs.current[prevIndex];
        if (innerEl) innerEl.style.justifyContent = "flex-end";
      }

      const rowEl = rowRefs.current[nextIndex];
      const pinTop = rowEl ? rowEl.getBoundingClientRect().top : null;
      setOpenProjectKey(rowKey(sortedProjects[nextIndex]));

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
    [openIndex, openDuration, prefersReduced, sortedProjects]
  );

  const handleClose = useCallback(() => {
    setOpenProjectKey(null);
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
      <div ref={bgRef0} className="bg-img" aria-hidden="true" />
      <div ref={bgRef1} className="bg-img" aria-hidden="true" />

      <div ref={listRef}>
        {sortedProjects.map((project, i) => (
          <motion.div
            key={rowKey(project)}
            layout="position"
            transition={{
              layout: {
                duration: isReorder && !prefersReduced ? 0.6 : 0,
                ease: "easeOut",
              },
            }}
          >
            <WorkRow
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              project={project}
              activeFactors={activeFactors}
              isOpen={openIndex === i}
              rowSolid={solidColor(i, sortedProjects.length, rampStart, rampEnd)}
              onClick={() => handleRowClick(i)}
            />
            <AnimatePresence mode="sync">
              {openIndex === i && project.blocks && project.blocks.length > 0 && (
                <motion.div
                  key={`panel-${rowKey(project)}`}
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
          </motion.div>
        ))}
      </div>
    </>
  );
}
