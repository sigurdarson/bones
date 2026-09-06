import * as React from "react";
import { Switch, Toggle } from "@usebones/react";
import { Icon } from "@usebones/icons";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  iconOnly: boolean;
  compact: boolean;
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ iconOnly, compact, disabled }: PlaygroundState): string {
  const attrs = [
    iconOnly ? ' iconOnly aria-label="Notifications"' : "",
    compact ? ' size="compact"' : "",
    disabled ? " disabled" : "",
  ].join("");
  const children = iconOnly
    ? `  <Icon name="bell" />`
    : `  <Icon name="bell" />\n  Notifications`;
  return `import { Toggle } from "@usebones/react";
import { Icon } from "@usebones/icons";

<Toggle defaultPressed${attrs}>
${children}
</Toggle>`;
}

export function TogglePlayground() {
  const [iconOnly, setIconOnly] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ iconOnly, compact, disabled })}
        note={
          <>
            Ghost at rest, muted when pressed. A lone toggle fits on/off
            actions like mute; for toolbars, reach for{" "}
            <code>ToggleGroup</code>.
          </>
        }
      >
        <Toggle
          defaultPressed
          iconOnly={iconOnly}
          aria-label={iconOnly ? "Notifications" : undefined}
          size={compact ? "compact" : "default"}
          disabled={disabled}
        >
          <Icon name="bell" />
          {iconOnly ? null : "Notifications"}
        </Toggle>
      </Showcase>
      <Controls>
        <ControlRow label="Icon only">
          <Switch checked={iconOnly} onCheckedChange={setIconOnly} />
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
