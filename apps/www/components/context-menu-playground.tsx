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

/**
 * The right-clickable surface the demos share: a dashed card standing in
 * for a file row, so the page's examples all open on the same thing.
 */
export function ContextMenuSurface({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </div>
  );
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
            Once open, arrow keys, typeahead, and Escape work like any Menu.
            There is no keyboard shortcut for a right click unless the
            surface is focusable, so actions that only live here need a
            visible home too (a toolbar, a row menu).
          </>
        }
      >
        <ContextMenuRoot size={compact ? "compact" : "default"}>
          <ContextMenuTrigger>
            <ContextMenuSurface>Right click quarterly-report.pdf</ContextMenuSurface>
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
