"use client";

import * as React from "react";
import { NumberField, Switch } from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  borderless: boolean;
  compact: boolean;
  disabled: boolean;
  invalid: boolean;
  hint: boolean;
}

const hintText = "Between 1 and 12 seats.";
const invalidHintText = "Pick at least one seat.";

/* The Code tab mirrors whatever the controls currently show. */
function buildCode(state: PlaygroundState): string {
  const attrs = [
    state.borderless ? `\n  variant="borderless"` : "",
    state.compact ? `\n  size="compact"` : "",
    state.disabled ? "\n  disabled" : "",
    state.invalid ? "\n  invalid" : "",
    state.hint ? `\n  hint="${state.invalid ? invalidHintText : hintText}"` : "",
  ].join("");
  return `import { NumberField } from "@usebones/react";

<NumberField
  defaultValue={2}
  min={1}
  max={12}
  aria-label="Seats"${attrs}
/>`;
}

export function NumberFieldPlayground() {
  const [borderless, setBorderless] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [invalid, setInvalid] = React.useState(false);
  const [hint, setHint] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ borderless, compact, disabled, invalid, hint })}
        note={
          <>
            Arrow keys step, shift steps by the large step, and holding a
            stepper repeats. min, max, and step pass straight through.
          </>
        }
      >
        <NumberField
          defaultValue={2}
          min={1}
          max={12}
          aria-label="Seats"
          variant={borderless ? "borderless" : "default"}
          size={compact ? "compact" : "default"}
          disabled={disabled}
          invalid={invalid}
          hint={hint ? (invalid ? invalidHintText : hintText) : undefined}
        />
      </Showcase>
      <Controls>
        <ControlRow label="Borderless">
          <Switch checked={borderless} onCheckedChange={setBorderless} />
        </ControlRow>
        <ControlRow label="Compact">
          <Switch checked={compact} onCheckedChange={setCompact} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
        <ControlRow label="Invalid">
          <Switch checked={invalid} onCheckedChange={setInvalid} />
        </ControlRow>
        <ControlRow label="Hint">
          <Switch checked={hint} onCheckedChange={setHint} />
        </ControlRow>
      </Controls>
    </>
  );
}
