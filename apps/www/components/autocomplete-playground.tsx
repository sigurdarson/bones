"use client";

import * as React from "react";
import {
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteRoot,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const pages = [
  "Accessibility",
  "Button",
  "Checkbox",
  "Combobox",
  "Motion",
  "Quick start",
  "Theming",
  "Tokens",
];

type Mode = "list" | "both" | "inline" | "none";

const modes: Record<Mode, string> = {
  list: "List",
  both: "Both",
  inline: "Inline",
  none: "None",
};

interface PlaygroundState {
  mode: Mode;
  compact: boolean;
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ mode, compact, disabled }: PlaygroundState): string {
  return `import {
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteRoot,
} from "@usebones/react";

const pages = ["Accessibility", "Button", /* ... */];

<AutocompleteRoot items={pages}${mode !== "list" ? ` mode="${mode}"` : ""}${compact ? ' size="compact"' : ""}>
  <AutocompleteInput
    placeholder="Search the docs"${disabled ? "\n    disabled" : ""}
  />
  <AutocompleteContent empty="No pages found.">
    {(page) => (
      <AutocompleteItem key={page} value={page}>
        {page}
      </AutocompleteItem>
    )}
  </AutocompleteContent>
</AutocompleteRoot>`;
}

export function AutocompletePlayground() {
  const [mode, setMode] = React.useState<Mode>("list");
  const [compact, setCompact] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ mode, compact, disabled })}
        note={
          <>
            The value is the text itself: suggestions fill it in, and
            anything typed stays valid. Only "list" and "both" filter
            while typing; "inline" and "none" keep the list static on
            purpose, with "both" and "inline" completing as you arrow.
          </>
        }
      >
        <div style={{ width: "18rem" }}>
          <AutocompleteRoot
            key={mode}
            items={pages}
            mode={mode}
            size={compact ? "compact" : "default"}
          >
            <AutocompleteInput
              placeholder="Search the docs"
              aria-label="Search the docs"
              disabled={disabled}
            />
            <AutocompleteContent empty="No pages found.">
              {(page: string) => (
                <AutocompleteItem key={page} value={page}>
                  {page}
                </AutocompleteItem>
              )}
            </AutocompleteContent>
          </AutocompleteRoot>
        </div>
      </Showcase>
      <Controls>
        <ControlRow label="Mode">
          <SelectRoot
            size="compact"
            items={modes}
            value={mode}
            onValueChange={(value) => value && setMode(value as Mode)}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {(Object.keys(modes) as Mode[]).map((value) => (
                <SelectItem key={value} value={value}>
                  {modes[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
        <ControlRow label="Compact">
          <Switch checked={compact} onCheckedChange={setCompact} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
