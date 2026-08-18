"use client";

import * as React from "react";
import { Button } from "@usebones/react";
import { Icon } from "@usebones/icons";

/**
 * Icon-only light/dark toggle with system as the default.
 *
 * Three states, two of them invisible: no stored value means "follow the
 * system" (including live OS theme changes); a stored "light"/"dark" in
 * localStorage means the user chose explicitly. Toggling back to whatever
 * the system currently prefers clears the stored value, so the site quietly
 * returns to following the system. The root layout script re-applies the
 * resolved theme before paint.
 */
export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function onSystemChange(event: MediaQueryListEvent) {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("ub-theme");
      } catch {}
      if (stored) return;
      document.documentElement.classList.toggle("dark", event.matches);
      setDark(event.matches);
    }
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (next === systemDark) {
        localStorage.removeItem("ub-theme");
      } else {
        localStorage.setItem("ub-theme", next ? "dark" : "light");
      }
    } catch {}
  }

  /* Theme state lives on <html> and is unknown during server render. */
  if (!mounted) {
    return <Button variant="ghost" iconOnly aria-label="Switch theme" disabled />;
  }

  return (
    <Button
      variant="ghost"
      iconOnly
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Icon name={dark ? "sun" : "moon"} />
    </Button>
  );
}
