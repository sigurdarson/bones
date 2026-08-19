"use client";

import * as React from "react";
import {
  Button,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Switch,
} from "@usebones/react";
import { Icon } from "@usebones/icons";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "default" | "compact";

interface PlaygroundState {
  variant: Variant;
  size: Size;
  disabled: boolean;
  iconOnly: boolean;
  leadingIcon: boolean;
  trailingIcon: boolean;
}

const label = "Save changes";

/* The Code tab mirrors whatever the controls currently show. */
function buildCode(state: PlaygroundState): string {
  const attrs = [
    state.variant !== "primary" ? ` variant="${state.variant}"` : "",
    state.size !== "default" ? ` size="compact"` : "",
    state.iconOnly ? ` iconOnly aria-label="${label}"` : "",
    state.disabled ? " disabled" : "",
  ].join("");

  const usesIcons = state.iconOnly || state.leadingIcon || state.trailingIcon;
  const imports = [
    `import { Button } from "@usebones/react";`,
    ...(usesIcons ? [`import { Icon } from "@usebones/icons";`] : []),
  ].join("\n");

  let children: string;
  if (state.iconOnly) {
    children = `\n  <Icon name="check" />\n`;
  } else if (state.leadingIcon || state.trailingIcon) {
    const lines = [
      ...(state.leadingIcon ? [`  <Icon name="check" />`] : []),
      `  ${label}`,
      ...(state.trailingIcon ? [`  <Icon name="chevron-right" />`] : []),
    ];
    children = `\n${lines.join("\n")}\n`;
  } else {
    children = label;
  }

  return `${imports}

<Button${attrs}>${children}</Button>`;
}

export function ButtonPlayground() {
  const [variant, setVariant] = React.useState<Variant>("primary");
  const [compact, setCompact] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [iconOnly, setIconOnly] = React.useState(false);
  const [leadingIcon, setLeadingIcon] = React.useState(false);
  const [trailingIcon, setTrailingIcon] = React.useState(false);
  const size: Size = compact ? "compact" : "default";

  return (
    <>
      <Showcase
        code={buildCode({ variant, size, disabled, iconOnly, leadingIcon, trailingIcon })}
        note={
          <>
            Icons are just children: before the label, after it, or alone
            with <code>iconOnly</code> plus an <code>aria-label</code>.
          </>
        }
      >
        <Button
          variant={variant}
          size={size}
          disabled={disabled}
          iconOnly={iconOnly}
          aria-label={iconOnly ? label : undefined}
        >
          {iconOnly ? (
            <Icon name="check" />
          ) : (
            <>
              {leadingIcon && <Icon name="check" />}
              {label}
              {trailingIcon && <Icon name="chevron-right" />}
            </>
          )}
        </Button>
      </Showcase>
      <Controls>
        <ControlRow label="Variant">
          <SelectRoot
            size="compact"
            items={{ primary: "Primary", secondary: "Secondary", ghost: "Ghost", danger: "Danger" }}
            value={variant}
            onValueChange={(value) => value && setVariant(value as Variant)}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="ghost">Ghost</SelectItem>
              <SelectItem value="danger">Danger</SelectItem>
            </SelectContent>
          </SelectRoot>
        </ControlRow>
        <ControlRow label="Compact">
          <Switch checked={compact} onCheckedChange={setCompact} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
        <ControlRow label="Icon only">
          <Switch checked={iconOnly} onCheckedChange={setIconOnly} />
        </ControlRow>
        <ControlRow label="Leading icon">
          <Switch checked={leadingIcon} onCheckedChange={setLeadingIcon} disabled={iconOnly} />
        </ControlRow>
        <ControlRow label="Trailing icon">
          <Switch checked={trailingIcon} onCheckedChange={setTrailingIcon} disabled={iconOnly} />
        </ControlRow>
      </Controls>
    </>
  );
}
