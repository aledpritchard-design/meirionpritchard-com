"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Factor, FactorState } from "./types";

const STATE_CYCLE: Record<FactorState, FactorState> = {
  off: "desc",
  desc: "asc",
  asc: "off",
};

export const DEFAULT_FACTORS: Factor[] = [
  { key: "brand",    label: "Brand",    state: "desc" },
  { key: "project",  label: "Project",  state: "desc" },
  { key: "category", label: "Category", state: "desc" },
  { key: "date",     label: "Date",     state: "off"  },
];

type WorkOrderCtx = {
  factors: Factor[];
  isReorder: boolean;
  cycleFactorState: (pos: number) => void;
  reorderFactors: (from: number, to: number) => void;
};

const WorkOrderContext = createContext<WorkOrderCtx | null>(null);

export function WorkOrderProvider({ children }: { children: ReactNode }) {
  const [factors, setFactors] = useState<Factor[]>(DEFAULT_FACTORS);
  const [isReorder, setIsReorder] = useState(false);

  useEffect(() => {
    if (!isReorder) return;
    const t = setTimeout(() => setIsReorder(false), 650);
    return () => clearTimeout(t);
  }, [isReorder]);

  const cycleFactorState = useCallback((pos: number) => {
    setIsReorder(false);
    setFactors((prev) => {
      const next = [...prev];
      next[pos] = { ...next[pos], state: STATE_CYCLE[next[pos].state] };
      return next;
    });
  }, []);

  const reorderFactors = useCallback((from: number, to: number) => {
    setIsReorder(true);
    setFactors((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }, []);

  return (
    <WorkOrderContext.Provider value={{ factors, isReorder, cycleFactorState, reorderFactors }}>
      {children}
    </WorkOrderContext.Provider>
  );
}

export function useWorkOrder(): WorkOrderCtx {
  const ctx = useContext(WorkOrderContext);
  if (!ctx) throw new Error("useWorkOrder must be inside WorkOrderProvider");
  return ctx;
}
