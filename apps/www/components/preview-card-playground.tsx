"use client";

import * as React from "react";
import {
  Avatar,
  PreviewCardContent,
  PreviewCardRoot,
  PreviewCardTrigger,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

type Side = "top" | "right" | "bottom" | "left";

const sides: Record<Side, string> = {
  top: "Top",
  right: "Right",
  bottom: "Bottom",
  left: "Left",
};

interface PlaygroundState {
  side: Side;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ side }: PlaygroundState): string {
  return `import {
  Avatar,
  PreviewCardContent,
  PreviewCardRoot,
  PreviewCardTrigger,
} from "@usebones/react";

<p>
  Maintained by{" "}
  <PreviewCardRoot>
    <PreviewCardTrigger href="/people/sigurdarson">
      Sigurdarson
    </PreviewCardTrigger>
    <PreviewCardContent${side !== "bottom" ? ` side="${side}"` : ""}>
      {/* avatar, name, bio */}
    </PreviewCardContent>
  </PreviewCardRoot>
</p>`;
}

export function PreviewCardPlayground() {
  const [side, setSide] = React.useState<Side>("bottom");

  return (
    <>
      <Showcase
        code={buildCode({ side })}
        note={
          <>
            A real link: it navigates on click, and the preview is a bonus
            on hover or focus. The card stays open while hovered, so
            anything inside stays clickable.
          </>
        }
      >
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          Maintained by{" "}
          <PreviewCardRoot>
            <PreviewCardTrigger
              href="https://github.com/sigurdarson"
              style={{ color: "var(--ub-accent)", textDecoration: "underline" }}
            >
              Sigurdarson
            </PreviewCardTrigger>
            <PreviewCardContent side={side}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
              >
                <Avatar
                  src="https://github.com/sigurdarson.png"
                  alt=""
                  fallback="SS"
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: 500 }}>Sigurdarson</span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--ub-text-secondary)",
                    }}
                  >
                    Building Bones
                  </span>
                </div>
              </div>
              <p
                style={{
                  margin: "0.625rem 0 0",
                  color: "var(--ub-text-secondary)",
                }}
              >
                A minimal, themable component library designed for humans
                and coding agents alike.
              </p>
            </PreviewCardContent>
          </PreviewCardRoot>
        </p>
      </Showcase>
      <Controls>
        <ControlRow label="Side">
          <SelectRoot
            size="compact"
            items={sides}
            value={side}
            onValueChange={(value) => value && setSide(value as Side)}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {(Object.keys(sides) as Side[]).map((value) => (
                <SelectItem key={value} value={value}>
                  {sides[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
      </Controls>
    </>
  );
}
