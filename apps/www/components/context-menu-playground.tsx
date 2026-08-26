"use client";

import * as React from "react";
import {
  ContextMenuContent,
  ContextMenuRoot,
  ContextMenuTrigger,
  MenuCheckboxItem,
  MenuItem,
  MenuSeparator,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  compact: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ compact }: PlaygroundState): string {
  return `import {
  ContextMenuContent,
  ContextMenuRoot,
  ContextMenuTrigger,
  MenuCheckboxItem,
  MenuItem,
  MenuSeparator,
} from "@usebones/react";

<ContextMenuRoot${compact ? ' size="compact"' : ""}>
  <ContextMenuTrigger>
    <FileCard name="quarterly-report.pdf" />
  </ContextMenuTrigger>
  <ContextMenuContent>
    <MenuItem>Open</MenuItem>
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuSeparator />
    <MenuCheckboxItem defaultChecked>Pinned</MenuCheckboxItem>
  </ContextMenuContent>
</ContextMenuRoot>`;
}

export function ContextMenuPlayground() {
  const [compact, setCompact] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ compact })}
        note={
          <>
            The trigger wraps any surface; the menu opens at the pointer.
            Everything inside the content is the regular Bones Menu parts,
            so the two menus restyle together.
          </>
        }
      >
        <ContextMenuRoot size={compact ? "compact" : "default"}>
          <ContextMenuTrigger>
            <div
              style={{
                display: "grid",
                placeItems: "center",
                width: "16rem",
                height: "7rem",
                border: "1px dashed var(--ub-border-strong)",
                borderRadius: "var(--ub-radius-md)",
                color: "var(--ub-text-secondary)",
                fontSize: "0.875rem",
                userSelect: "none",
              }}
            >
              Right click quarterly-report.pdf
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <MenuItem>Open</MenuItem>
            <MenuItem>Rename</MenuItem>
            <MenuItem>Duplicate</MenuItem>
            <MenuSeparator />
            <MenuCheckboxItem defaultChecked>Pinned</MenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenuRoot>
      </Showcase>
      <Controls>
        <ControlRow label="Compact">
          <Switch checked={compact} onCheckedChange={setCompact} />
        </ControlRow>
      </Controls>
    </>
  );
}
