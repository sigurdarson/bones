"use client";

import * as React from "react";
import { IconProvider } from "@usebones/icons";
import { hugeicons } from "@/lib/hugeicons";

export type IconLibrary = "lucide" | "hugeicons";

const IconLibraryContext = React.createContext<{
  library: IconLibrary;
  setLibrary: (library: IconLibrary) => void;
}>({ library: "lucide", setLibrary: () => {} });

export function useIconLibrary() {
  return React.useContext(IconLibraryContext);
}

/**
 * Wraps the whole site so the icon library can be swapped live from the
 * controls panel. Lucide is the bones default; Hugeicons demonstrates the
 * IconProvider adapter doing its job.
 */
export function IconSetProvider({ children }: { children: React.ReactNode }) {
  const [library, setLibraryState] = React.useState<IconLibrary>("lucide");

  React.useEffect(() => {
    try {
      if (localStorage.getItem("ub-icon-library") === "hugeicons") {
        setLibraryState("hugeicons");
      }
    } catch {}
  }, []);

  function setLibrary(next: IconLibrary) {
    setLibraryState(next);
    try {
      localStorage.setItem("ub-icon-library", next);
    } catch {}
  }

  return (
    <IconLibraryContext.Provider value={{ library, setLibrary }}>
      <IconProvider icons={library === "hugeicons" ? hugeicons : {}}>
        {children}
      </IconProvider>
    </IconLibraryContext.Provider>
  );
}
