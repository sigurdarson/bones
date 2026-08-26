"use client";

import * as React from "react";
import { Switch } from "@usebones/react";
import { Controls, ControlRow } from "./controls";

/**
 * The theming page's demo: flips the whole site into the matrix theme by
 * setting data-theme="matrix" on <html>, exactly how an app would.
 * Turning it off restores the stored or system theme; never persisted, so
 * a reload comes back normal.
 */
export function MatrixSwitch() {
  const [mounted, setMounted] = React.useState(false);
  const [on, setOn] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setOn(document.documentElement.getAttribute("data-theme") === "matrix");
  }, []);

  function toggle(next: boolean) {
    setOn(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "matrix");
      return;
    }
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("ub-theme");
    } catch {}
    const dark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  return (
    <Controls>
      <ControlRow label="Matrix">
        <Switch
          checked={mounted ? on : false}
          onCheckedChange={toggle}
          disabled={!mounted}
          aria-label="Turn on the matrix theme"
        />
      </ControlRow>
    </Controls>
  );
}
