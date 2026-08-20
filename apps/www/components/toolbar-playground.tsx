"use client";

import * as React from "react";
import {
  Button,
  Switch,
  Toggle,
  ToolbarButton,
  ToolbarGroup,
  ToolbarLink,
  ToolbarRoot,
  ToolbarSeparator,
} from "@usebones/react";
import { Icon } from "@usebones/icons";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ disabled }: PlaygroundState): string {
  return `import {
  Button,
  Toggle,
  ToolbarButton,
  ToolbarGroup,
  ToolbarLink,
  ToolbarRoot,
  ToolbarSeparator,
} from "@usebones/react";
import { Icon } from "@usebones/icons";

<ToolbarRoot aria-label="Formatting"${disabled ? " disabled" : ""}>
  <ToolbarGroup>
    <ToolbarButton render={<Toggle iconOnly aria-label="Bold" />}>
      <Icon name="bold" />
    </ToolbarButton>
    <ToolbarButton render={<Toggle iconOnly aria-label="Italic" />}>
      <Icon name="italic" />
    </ToolbarButton>
    <ToolbarButton render={<Toggle iconOnly aria-label="Underline" />}>
      <Icon name="underline" />
    </ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
  <ToolbarButton
    render={<Button variant="ghost" iconOnly aria-label="Copy link" />}
  >
    <Icon name="copy" />
  </ToolbarButton>
  <ToolbarSeparator />
  <ToolbarLink href="/shortcuts">Shortcuts</ToolbarLink>
</ToolbarRoot>`;
}

export function ToolbarPlayground() {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ disabled })}
        note={
          <>
            One tab stop: Tab lands on the first control and arrow keys
            move along the row. Real controls attach via{" "}
            <code>render</code>, keeping their own styling and state.
          </>
        }
      >
        <ToolbarRoot aria-label="Formatting" disabled={disabled}>
          <ToolbarGroup>
            <ToolbarButton render={<Toggle iconOnly aria-label="Bold" />}>
              <Icon name="bold" />
            </ToolbarButton>
            <ToolbarButton render={<Toggle iconOnly aria-label="Italic" />}>
              <Icon name="italic" />
            </ToolbarButton>
            <ToolbarButton render={<Toggle iconOnly aria-label="Underline" />}>
              <Icon name="underline" />
            </ToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarButton
            render={<Button variant="ghost" iconOnly aria-label="Copy link" />}
          >
            <Icon name="copy" />
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarLink>Shortcuts</ToolbarLink>
        </ToolbarRoot>
      </Showcase>
      <Controls>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
