"use client";

import * as React from "react";
import {
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const members = [
  "Ada Lovelace",
  "Grace Hopper",
  "Katherine Johnson",
  "Margaret Hamilton",
  "Radia Perlman",
  "Sigurdarson",
];

interface PlaygroundState {
  compact: boolean;
  clearable: boolean;
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ compact, clearable, disabled }: PlaygroundState): string {
  const inputAttrs = [
    `\n    placeholder="Assign to..."`,
    clearable ? "" : "\n    clearable={false}",
    disabled ? "\n    disabled" : "",
  ].join("");
  return `import {
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
} from "@usebones/react";

const members = ["Ada Lovelace", "Grace Hopper", /* ... */];

<ComboboxRoot items={members}${compact ? ' size="compact"' : ""}>
  <ComboboxInput${inputAttrs}
  />
  <ComboboxContent empty="No one matches.">
    {(member) => (
      <ComboboxItem key={member} value={member}>
        {member}
      </ComboboxItem>
    )}
  </ComboboxContent>
</ComboboxRoot>`;
}

export function ComboboxPlayground() {
  const [compact, setCompact] = React.useState(false);
  const [clearable, setClearable] = React.useState(true);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ compact, clearable, disabled })}
        note={
          <>
            Type to filter, or browse everything with the chevron. items
            on the root drives the filtering and the empty state; function
            children receive each match.
          </>
        }
      >
        <ComboboxRoot
          key={String(compact)}
          items={members}
          size={compact ? "compact" : "default"}
        >
          <ComboboxInput
            placeholder="Assign to..."
            aria-label="Assignee"
            clearable={clearable}
            disabled={disabled}
          />
          <ComboboxContent empty="No one matches.">
            {(member: string) => (
              <ComboboxItem key={member} value={member}>
                {member}
              </ComboboxItem>
            )}
          </ComboboxContent>
        </ComboboxRoot>
      </Showcase>
      <Controls>
        <ControlRow label="Compact">
          <Switch checked={compact} onCheckedChange={setCompact} />
        </ControlRow>
        <ControlRow label="Clearable">
          <Switch checked={clearable} onCheckedChange={setClearable} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
