"use client";

import * as React from "react";
import { Button, Switch } from "@usebones/react";

/**
 * Temporary playground proving the pipeline works end to end:
 * dark mode, pill radius, and both exemplar components.
 */
export function Demo() {
  const [dark, setDark] = React.useState(false);
  const [pill, setPill] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  React.useEffect(() => {
    if (pill) {
      document.documentElement.setAttribute("data-radius", "pill");
    } else {
      document.documentElement.removeAttribute("data-radius");
    }
  }, [pill]);

  return (
    <section
      style={{
        border: "1px solid var(--ub-border)",
        borderRadius: "var(--ub-radius-lg)",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        background: "var(--ub-surface)",
      }}
    >
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: "0.625rem", fontSize: "0.875rem" }}>
        <Switch checked={dark} onCheckedChange={setDark} />
        Dark mode
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: "0.625rem", fontSize: "0.875rem" }}>
        <Switch checked={pill} onCheckedChange={setPill} />
        Pill radius
      </label>
    </section>
  );
}
