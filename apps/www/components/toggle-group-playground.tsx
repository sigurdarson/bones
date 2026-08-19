"use client";

import * as React from "react";
import { Switch, Toggle, ToggleGroup } from "@usebones/react";
import { Icon } from "@usebones/icons";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const marks = [
  { value: "bold", label: "Bold", icon: "bold" as const },
  { value: "italic", label: "Italic", icon: "italic" as const },
  { value: "underline", label: "Underline", icon: "underline" as const },
];

interface PlaygroundState {
  multiple: boolean;
  compact: boolean;
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ multiple, compact, disabled }: PlaygroundState): string {
  const rows = marks
    .map(
      (mark) => `  <Toggle value="${mark.value}" iconOnly aria-label="${mark.label}"${
        compact ? ' size="compact"' : ""
      }>
    <Icon name="${mark.icon}" />
  </Toggle>`,
    )
    .join("\n");
  return `import { Toggle, ToggleGroup } from "@usebones/react";
import { Icon } from "@usebones/icons";

<ToggleGroup defaultValue={["bold"]}${multiple ? " multiple" : ""}${disabled ? " disabled" : ""}>
${rows}
</ToggleGroup>`;
}

export function ToggleGroupPlayground() {
  const [multiple, setMultiple] = React.useState(true);
  const [compact, setCompact] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ multiple, compact, disabled })}
        note={
          <>
            Groups single-select by default, like text alignment;{" "}
            <code>multiple</code> makes each toggle independent, like text
            formatting.
          </>
        }
      >
        <ToggleGroup
          key={String(multiple)}
          defaultValue={["bold"]}
          multiple={multiple}
          disabled={disabled}
        >
          {marks.map((mark) => (
            <Toggle
              key={mark.value}
              value={mark.value}
              iconOnly
              aria-label={mark.label}
              size={compact ? "compact" : "default"}
            >
              <Icon name={mark.icon} />
            </Toggle>
          ))}
        </ToggleGroup>
      </Showcase>
      <Controls>
        <ControlRow label="Multiple">
          <Switch checked={multiple} onCheckedChange={setMultiple} />
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
