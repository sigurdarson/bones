"use client";

import * as React from "react";
import { Input, Switch } from "@usebones/react";
import { Icon } from "@usebones/icons";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  borderless: boolean;
  compact: boolean;
  disabled: boolean;
  invalid: boolean;
  leadingIcon: boolean;
  trailingIcon: boolean;
  hint: boolean;
}

const hintText = "We only use this for receipts.";
const invalidHintText = "That doesn't look like an email address.";

/* The Code tab mirrors whatever the controls currently show. */
function buildCode(state: PlaygroundState): string {
  const attrs = [
    state.borderless ? `\n  variant="borderless"` : "",
    state.compact ? `\n  size="compact"` : "",
    state.disabled ? "\n  disabled" : "",
    state.invalid ? "\n  invalid" : "",
    state.leadingIcon ? `\n  leadingIcon={<Icon name="user" />}` : "",
    state.trailingIcon ? `\n  trailingIcon={<Icon name="check" />}` : "",
    state.hint ? `\n  hint="${state.invalid ? invalidHintText : hintText}"` : "",
  ].join("");

  const usesIcons = state.leadingIcon || state.trailingIcon;
  const imports = [
    `import { Input } from "@usebones/react";`,
    ...(usesIcons ? [`import { Icon } from "@usebones/icons";`] : []),
  ].join("\n");

  return `${imports}

<Input
  type="email"
  placeholder="you@example.com"${attrs}
/>`;
}

export function InputPlayground() {
  const [borderless, setBorderless] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [invalid, setInvalid] = React.useState(false);
  const [leadingIcon, setLeadingIcon] = React.useState(false);
  const [trailingIcon, setTrailingIcon] = React.useState(false);
  const [hint, setHint] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ borderless, compact, disabled, invalid, leadingIcon, trailingIcon, hint })}
        note={
          <>
            Everything a native <code>input</code> accepts passes through.
            Icons are decorative props, and the hint links to the input via{" "}
            <code>aria-describedby</code>.
          </>
        }
      >
        <div style={{ width: "18rem" }}>
          <Input
            type="email"
            placeholder="you@example.com"
            aria-label="Email address"
            variant={borderless ? "borderless" : "default"}
            size={compact ? "compact" : "default"}
            disabled={disabled}
            invalid={invalid}
            leadingIcon={leadingIcon ? <Icon name="user" /> : undefined}
            trailingIcon={trailingIcon ? <Icon name="check" /> : undefined}
            hint={hint ? (invalid ? invalidHintText : hintText) : undefined}
          />
        </div>
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
        <ControlRow label="Leading icon">
          <Switch checked={leadingIcon} onCheckedChange={setLeadingIcon} />
        </ControlRow>
        <ControlRow label="Trailing icon">
          <Switch checked={trailingIcon} onCheckedChange={setTrailingIcon} />
        </ControlRow>
        <ControlRow label="Hint">
          <Switch checked={hint} onCheckedChange={setHint} />
        </ControlRow>
      </Controls>
    </>
  );
}
