"use client";

import * as React from "react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@usebones/react";
import { ControlRow } from "./controls";
import { useIconLibrary, type IconLibrary } from "./icon-set-provider";

/**
 * Library-wide settings, shown as their own panel above the component
 * controls. Radius flips an attribute on <html> so the whole site
 * restyles; the icon library swaps the set through IconProvider. Choices
 * persist in localStorage.
 */
const accents = [
  "neutral",
  "blue",
  "violet",
  "teal",
  "fuchsia",
  "rose",
  "red",
  "orange",
  "green",
];

export function LibraryControls() {
  const [mounted, setMounted] = React.useState(false);
  const [pill, setPill] = React.useState(false);
  const [accent, setAccent] = React.useState("neutral");
  const { library, setLibrary } = useIconLibrary();

  React.useEffect(() => {
    setMounted(true);
    setPill(document.documentElement.getAttribute("data-radius") === "pill");
    setAccent(document.documentElement.getAttribute("data-accent") ?? "neutral");
  }, []);

  function onAccentChange(next: string) {
    setAccent(next);
    if (next === "neutral") {
      document.documentElement.removeAttribute("data-accent");
    } else {
      document.documentElement.setAttribute("data-accent", next);
    }
    try {
      if (next === "neutral") {
        localStorage.removeItem("ub-accent");
      } else {
        localStorage.setItem("ub-accent", next);
      }
    } catch {}
  }

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
        <SelectRoot
          size="compact"
          items={{ default: "Default", pill: "Pill" }}
          value={pill ? "pill" : "default"}
          onValueChange={(value) => value && onRadiusChange(value)}
        >
          <SelectTrigger variant="borderless" disabled={!mounted} />
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="pill">Pill</SelectItem>
          </SelectContent>
        </SelectRoot>
      </ControlRow>
      <ControlRow label="Accent">
        <SelectRoot
          size="compact"
          items={Object.fromEntries(
            accents.map((name) => [name, name.charAt(0).toUpperCase() + name.slice(1)]),
          )}
          value={accent}
          onValueChange={(value) => value && onAccentChange(value)}
        >
          <SelectTrigger variant="borderless" disabled={!mounted} />
          <SelectContent>
            {accents.map((name) => (
              <SelectItem key={name} value={name}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </ControlRow>
      <ControlRow label="Icons">
        <SelectRoot
          size="compact"
          items={{ lucide: "Lucide", hugeicons: "Hugeicons" }}
          value={library}
          onValueChange={(value) => value && setLibrary(value as IconLibrary)}
        >
          <SelectTrigger variant="borderless" />
          <SelectContent>
            <SelectItem value="lucide">Lucide</SelectItem>
            <SelectItem value="hugeicons">Hugeicons</SelectItem>
          </SelectContent>
        </SelectRoot>
      </ControlRow>
    </>
  );
}
