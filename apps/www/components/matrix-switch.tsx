import { Switch } from "@usebones/react";
import { useTheme } from "../lib/use-theme";

/**
 * The theming page's demo: flips the whole site into the matrix theme by
 * setting data-theme="matrix" on <html>, exactly how an app would.
 * Turning it off restores the stored or system theme; never persisted, so
 * a reload comes back normal.
 */
export function MatrixSwitch() {
  const theme = useTheme();

  function toggle(next: boolean) {
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBlock: "1.5rem",
      }}
    >
      <span>Switch to the Matrix</span>
      <Switch
        checked={theme === "matrix"}
        onCheckedChange={toggle}
        disabled={!theme}
        aria-label="Turn on the matrix theme"
      />
    </div>
  );
}
