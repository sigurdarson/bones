"use client";

import * as React from "react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Separator,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

type Orientation = "horizontal" | "vertical";

const orientations: Record<Orientation, string> = {
  horizontal: "Horizontal",
  vertical: "Vertical",
};

interface PlaygroundState {
  orientation: Orientation;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ orientation }: PlaygroundState): string {
  if (orientation === "vertical") {
    return `import { Separator } from "@usebones/react";

<div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
  <span>Autosaved just now</span>
  <Separator orientation="vertical" />
  <span>v1.4.2</span>
  <Separator orientation="vertical" />
  <span>3 collaborators</span>
</div>`;
  }
  return `import { Separator } from "@usebones/react";

<p>Everyone with the link can view.</p>
<Separator />
<p>Invited people can edit.</p>`;
}

const rowText: React.CSSProperties = {
  fontSize: "0.875rem",
  color: "var(--ub-text-secondary)",
};

export function SeparatorPlayground() {
  const [orientation, setOrientation] = React.useState<Orientation>("vertical");

  return (
    <>
      <Showcase
        code={buildCode({ orientation })}
        note={
          <>
            A real separator element, so screen readers know the two sides
            are distinct; purely visual dividers can stay as borders.
          </>
        }
      >
        {orientation === "vertical" ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={rowText}>Autosaved just now</span>
            <Separator orientation="vertical" />
            <span style={rowText}>v1.4.2</span>
            <Separator orientation="vertical" />
            <span style={rowText}>3 collaborators</span>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              width: "16rem",
            }}
          >
            <span style={rowText}>Everyone with the link can view.</span>
            <Separator />
            <span style={rowText}>Invited people can edit.</span>
          </div>
        )}
      </Showcase>
      <Controls>
        <ControlRow label="Direction">
          <SelectRoot
            size="compact"
            items={orientations}
            value={orientation}
            onValueChange={(value) =>
              value && setOrientation(value as Orientation)
            }
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {(Object.keys(orientations) as Orientation[]).map((value) => (
                <SelectItem key={value} value={value}>
                  {orientations[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
      </Controls>
    </>
  );
}
