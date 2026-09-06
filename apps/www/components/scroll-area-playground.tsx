import * as React from "react";
import {
  ScrollArea,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

type Direction = "vertical" | "horizontal";

const directions: Record<Direction, string> = {
  vertical: "Vertical",
  horizontal: "Horizontal",
};

const notes = [
  ["1.4.2", "Menu indicators keep their slot so toggling never resizes."],
  ["1.4.1", "Dialog backdrops pick up a slight blur."],
  ["1.4.0", "Overlays share one z-index token and layer above app chrome."],
  ["1.3.2", "Select popups match the trigger width on every screen."],
  ["1.3.1", "Sliders no longer animate thumb position while dragging."],
  ["1.3.0", "Accordion triggers render inside real headings."],
] as const;

const projects = [
  "website-redesign",
  "mobile-app",
  "design-tokens",
  "marketing-site",
  "billing-service",
  "internal-tools",
];

const pane: React.CSSProperties = {
  border: "1px solid var(--ub-border)",
  borderRadius: "var(--ub-radius-md)",
};

interface PlaygroundState {
  direction: Direction;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ direction }: PlaygroundState): string {
  const paneStyle = `border: "1px solid var(--ub-border)",
    borderRadius: "var(--ub-radius-md)",`;
  if (direction === "horizontal") {
    return `import { ScrollArea } from "@usebones/react";

<ScrollArea
  style={{
    width: "16rem",
    ${paneStyle}
  }}
  aria-label="Projects"
>
  <div style={{ display: "flex", gap: "0.5rem", width: "max-content" }}>
    {projects.map((name) => (
      <span key={name} className="chip">{name}</span>
    ))}
  </div>
</ScrollArea>`;
  }
  return `import { ScrollArea } from "@usebones/react";

<ScrollArea
  style={{
    height: "10rem",
    ${paneStyle}
  }}
  aria-label="Release notes"
>
  {notes.map(([version, note]) => (
    <p key={version}>
      <strong>{version}</strong> {note}
    </p>
  ))}
</ScrollArea>`;
}

export function ScrollAreaPlayground() {
  const [direction, setDirection] = React.useState<Direction>("vertical");

  return (
    <>
      <Showcase
        code={buildCode({ direction })}
        note={
          <>
            The bars overlay the content and reveal on hover or while
            scrolling, the same in every browser. The viewport is
            focusable, so keyboard scrolling works.
          </>
        }
      >
        {direction === "vertical" ? (
          <ScrollArea
            style={{ ...pane, height: "10rem", width: "18rem" }}
            aria-label="Release notes"
          >
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
        ) : (
          <ScrollArea style={{ ...pane, width: "16rem" }} aria-label="Projects">
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                width: "max-content",
                padding: "0.75rem",
                paddingBlockEnd: "1rem",
              }}
            >
              {projects.map((name) => (
                <span
                  key={name}
                  style={{
                    padding: "0.25rem 0.625rem",
                    border: "1px solid var(--ub-border)",
                    borderRadius: "var(--ub-radius-full)",
                    fontSize: "0.8125rem",
                    color: "var(--ub-text-secondary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </ScrollArea>
        )}
      </Showcase>
      <Controls>
        <ControlRow label="Direction">
          <SelectRoot
            size="compact"
            items={directions}
            value={direction}
            onValueChange={(value) => value && setDirection(value as Direction)}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {(Object.keys(directions) as Direction[]).map((value) => (
                <SelectItem key={value} value={value}>
                  {directions[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
      </Controls>
    </>
  );
}
