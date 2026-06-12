"use client";

import { createContext, useContext, useState } from "react";

export type ImageMode = "off" | "image" | "solid";

type WorkModeCtx = {
  isDark: boolean;
  imageMode: ImageMode;
  toggleDark: () => void;
  cycleImage: () => void;
};

const WorkModeContext = createContext<WorkModeCtx>({
  isDark: false,
  imageMode: "off",
  toggleDark: () => {},
  cycleImage: () => {},
});

export function WorkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [imageMode, setImageMode] = useState<ImageMode>("off");

  const toggleDark = () => setIsDark((d) => !d);
  const cycleImage = () =>
    setImageMode((m) => (m === "off" ? "image" : m === "image" ? "solid" : "off"));

  return (
    <WorkModeContext.Provider value={{ isDark, imageMode, toggleDark, cycleImage }}>
      {children}
    </WorkModeContext.Provider>
  );
}

export function useWorkMode() {
  return useContext(WorkModeContext);
}
