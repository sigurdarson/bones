"use client";

import * as React from "react";
import {
  Button,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Switch,
  Toggle,
  ToggleGroup,
  ToolbarButton,
  ToolbarGroup,
  ToolbarRoot,
  ToolbarSeparator,
} from "@usebones/react";
import { Icon } from "@usebones/icons";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const fonts: Record<string, string> = {
  inter: "Inter",
  georgia: "Georgia",
  menlo: "Menlo",
};

const marks = [
  { value: "bold", label: "Bold", icon: "bold" as const },
  { value: "italic", label: "Italic", icon: "italic" as const },
  { value: "underline", label: "Underline", icon: "underline" as const },
];

const alignments = [
  { value: "left", label: "Align left", icon: "align-left" as const },
  { value: "center", label: "Align center", icon: "align-center" as const },
  { value: "right", label: "Align right", icon: "align-right" as const },
];

interface PlaygroundState {
  disabled: boolean;
  compact: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ disabled, compact }: PlaygroundState): string {
  const size = compact ? ' size="compact"' : "";
  return `import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Toggle,
  ToggleGroup,
  ToolbarButton,
  ToolbarGroup,
  ToolbarRoot,
  ToolbarSeparator,
} from "@usebones/react";
import { Icon } from "@usebones/icons";

const fonts = { inter: "Inter", georgia: "Georgia", menlo: "Menlo" };

<ToolbarRoot aria-label="Formatting"${disabled ? " disabled" : ""}>
  <SelectRoot items={fonts} defaultValue="inter"${size}>
    <ToolbarButton render={<SelectTrigger variant="borderless" />} />
    <SelectContent>
      <SelectItem value="inter">Inter</SelectItem>
      <SelectItem value="georgia">Georgia</SelectItem>
      <SelectItem value="menlo">Menlo</SelectItem>
    </SelectContent>
  </SelectRoot>
  <ToolbarSeparator />
  <ToolbarGroup render={<ToggleGroup defaultValue={["bold"]} multiple />}>
    <ToolbarButton
      render={<Toggle value="bold" iconOnly aria-label="Bold"${size} />}
    >
      <Icon name="bold" />
    </ToolbarButton>
    {/* italic, underline */}
  </ToolbarGroup>
  <ToolbarSeparator />
  <ToolbarGroup render={<ToggleGroup defaultValue={["left"]} />}>
    <ToolbarButton
      render={<Toggle value="left" iconOnly aria-label="Align left"${size} />}
    >
      <Icon name="align-left" />
    </ToolbarButton>
    {/* center, right */}
  </ToolbarGroup>
</ToolbarRoot>`;
}

export function ToolbarPlayground() {
  const [disabled, setDisabled] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const size = compact ? ("compact" as const) : ("default" as const);

  return (
    <>
      <Showcase
        code={buildCode({ disabled, compact })}
        note={
          <>
            One tab stop: arrow keys move along the row. Real controls
            attach via <code>render</code>: a Select for the font,
            independent toggles for marks, a single-select group for
            alignment.
          </>
        }
      >
        <ToolbarRoot aria-label="Formatting" disabled={disabled}>
          <SelectRoot items={fonts} defaultValue="inter" size={size}>
            <ToolbarButton
              render={
                <SelectTrigger
                  variant="borderless"
                  style={{ minWidth: "6.5rem" }}
                />
              }
            />
            <SelectContent>
              {Object.keys(fonts).map((value) => (
                <SelectItem key={value} value={value}>
                  {fonts[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
          <ToolbarSeparator />
          <ToolbarGroup render={<ToggleGroup defaultValue={["bold"]} multiple />}>
            {marks.map((mark) => (
              <ToolbarButton
                key={mark.value}
                render={
                  <Toggle
                    value={mark.value}
                    iconOnly
                    aria-label={mark.label}
                    size={size}
                  />
                }
              >
                <Icon name={mark.icon} />
              </ToolbarButton>
            ))}
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup render={<ToggleGroup defaultValue={["left"]} />}>
            {alignments.map((alignment) => (
              <ToolbarButton
                key={alignment.value}
                render={
                  <Toggle
                    value={alignment.value}
                    iconOnly
                    aria-label={alignment.label}
                    size={size}
                  />
                }
              >
                <Icon name={alignment.icon} />
              </ToolbarButton>
            ))}
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarButton
            render={
              <Button
                variant="ghost"
                iconOnly
                aria-label="Copy link"
                size={size}
              />
            }
          >
            <Icon name="copy" />
          </ToolbarButton>
        </ToolbarRoot>
      </Showcase>
      <Controls>
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
