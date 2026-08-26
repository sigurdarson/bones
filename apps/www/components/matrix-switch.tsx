"use client";

import * as React from "react";
import { Switch } from "@usebones/react";

/**
 * The theming page's "see it in action" demo: flips the whole site into
 * the matrix full theme by setting data-theme="matrix" on <html>, exactly
 * how an app would activate it. Turning it off restores whatever the
 * regular theme choice was (stored preference or system); the demo itself
 * is never persisted, so a reload always comes back normal.
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
    /* Back to the regular resolution: stored choice first, then system. */
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
    <div className="matrix-switch">
      <div>
        <p className="matrix-switch-title">See it in action</p>
        <p className="matrix-switch-hint">
          Sets <code>data-theme="matrix"</code> on the page, nothing else.
          Stays on while you browse; reload to reset.
        </p>
      </div>
      <Switch
        checked={mounted ? on : false}
        onCheckedChange={toggle}
        disabled={!mounted}
        aria-label="Turn on the matrix theme"
      />
    </div>
  );
}
