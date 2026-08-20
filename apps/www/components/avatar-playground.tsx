"use client";

import * as React from "react";
import { Avatar, Switch } from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  image: boolean;
  compact: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ image, compact }: PlaygroundState): string {
  const attrs = [
    image ? `\n  src="https://github.com/sigurdarson.png"\n  alt=""` : "",
    `\n  fallback="SS"`,
    compact ? `\n  size="compact"` : "",
  ].join("");
  return `import { Avatar } from "@usebones/react";

<Avatar${attrs}
/>`;
}

export function AvatarPlayground() {
  const [image, setImage] = React.useState(true);
  const [compact, setCompact] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ image, compact })}
        note={
          <>
            The fallback renders until the image has actually loaded and
            stays if it fails. alt is the person's name; empty only when
            the name is already visible beside it, like here.
          </>
        }
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Avatar
            src={image ? "https://github.com/sigurdarson.png" : undefined}
            alt=""
            fallback="SS"
            size={compact ? "compact" : "default"}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
              Sigurdarson
            </span>
            <span
              style={{ fontSize: "0.75rem", color: "var(--ub-text-secondary)" }}
            >
              Owner
            </span>
          </div>
        </div>
      </Showcase>
      <Controls>
        <ControlRow label="Image">
          <Switch checked={image} onCheckedChange={setImage} />
        </ControlRow>
        <ControlRow label="Compact">
          <Switch checked={compact} onCheckedChange={setCompact} />
        </ControlRow>
      </Controls>
    </>
  );
}
