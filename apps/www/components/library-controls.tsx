"use client";

import * as React from "react";
import { ControlRow } from "./controls";
import { useIconLibrary, type IconLibrary } from "./icon-set-provider";

/**
 * Library-wide settings, shown as their own panel above the component
 * controls. Radius flips an attribute on <html> so the whole site
 * restyles; the icon library swaps the set through IconProvider. Choices
 * persist in localStorage.
 *
 * The dropdowns are placeholder native selects until the library ships a
 * Select component.
 */
export function LibraryControls() {
  const [mounted, setMounted] = React.useState(false);
  const [pill, setPill] = React.useState(false);
  const { library, setLibrary } = useIconLibrary();

  React.useEffect(() => {
    setMounted(true);
    setPill(document.documentElement.getAttribute("data-radius") === "pill");
  }, []);

  function onRadiusChange(next: string) {
    const isPill = next === "pill";
    setPill(isPill);
    if (isPill) {
      document.documentElement.setAttribute("data-radius", "pill");
    } else {
      document.documentElement.removeAttribute("data-radius");
    }
    try {
      localStorage.setItem("ub-radius", isPill ? "pill" : "rounded");
    } catch {}
  }

  return (
    <>
      <ControlRow label="Radius">
        <select
          value={pill ? "pill" : "default"}
          onChange={(event) => onRadiusChange(event.target.value)}
          disabled={!mounted}
        >
          <option value="default">Default</option>
          <option value="pill">Pill</option>
        </select>
      </ControlRow>
      <ControlRow label="Icons">
        <select
          value={library}
          onChange={(event) => setLibrary(event.target.value as IconLibrary)}
        >
          <option value="lucide">Lucide</option>
          <option value="hugeicons">Hugeicons</option>
        </select>
      </ControlRow>
    </>
  );
}
