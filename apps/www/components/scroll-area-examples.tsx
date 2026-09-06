import * as React from "react";
import { ScrollArea } from "@usebones/react";
import { Showcase } from "./showcase";

/* ---------- Variants: one axis vs both ---------- */

const notes = [
  ["1.4.2", "Menu indicators keep their slot so toggling never resizes."],
  ["1.4.1", "Dialog backdrops pick up a slight blur."],
  ["1.4.0", "Overlays share one z-index token and layer above app chrome."],
  ["1.3.2", "Select popups match the trigger width on every screen."],
  ["1.3.1", "Sliders no longer animate thumb position while dragging."],
  ["1.3.0", "Accordion triggers render inside real headings."],
] as const;

const deployLog = `12:01:14 build   pulling base image node:22-slim (cached)
12:01:15 build   pnpm install --frozen-lockfile completed in 8.2s
12:01:24 build   turbo build: packages/tokens, packages/react, apps/www
12:01:58 build   static build finished: 24 routes, 0 warnings
12:02:03 deploy  uploading 214 assets to the edge network
12:02:19 deploy  promoting deployment to production
12:02:20 deploy  aliasing usebones.com and www.usebones.com
12:02:21 ready   deployment live in 67s`;

const pane: React.CSSProperties = {
  height: "10rem",
  width: "13rem",
  border: "1px solid var(--ub-border)",
  borderRadius: "var(--ub-radius-md)",
};

const variantsCode = `<ScrollArea style={{ height: "10rem", width: "13rem" }} aria-label="Release notes">
  {notes.map(([version, note]) => (
    <p key={version}>
      <strong>{version}</strong> {note}
    </p>
  ))}
</ScrollArea>

<ScrollArea style={{ height: "10rem", width: "13rem" }} aria-label="Deploy log">
  <pre>{deployLog}</pre>
</ScrollArea>`;

export function ScrollAreaVariants() {
  return (
    <Showcase
      code={variantsCode}
      note={
        <>
          Each bar shows only when its axis overflows, so the same markup
          handles both panes. Give the content a little end padding: the
          bars overlay it, and the last line otherwise sits under the
          horizontal bar.
        </>
      }
    >
      <ScrollArea style={pane} aria-label="Release notes">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.625rem",
            padding: "0.75rem",
            paddingInlineEnd: "1rem",
            fontSize: "0.875rem",
            color: "var(--ub-text-secondary)",
          }}
        >
          {notes.map(([version, note]) => (
            <p key={version} style={{ margin: 0 }}>
              <strong style={{ color: "var(--ub-text-primary)" }}>
                {version}
              </strong>{" "}
              {note}
            </p>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea style={pane} aria-label="Deploy log">
        <pre
          style={{
            margin: 0,
            padding: "0.75rem",
            paddingBlockEnd: "1rem",
            width: "max-content",
            fontSize: "0.8125rem",
            lineHeight: 1.6,
            color: "var(--ub-text-secondary)",
          }}
        >
          {deployLog}
        </pre>
      </ScrollArea>
    </Showcase>
  );
}
