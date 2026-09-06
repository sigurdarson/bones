import * as React from "react";
import { Switch } from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  checked: boolean;
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ checked, disabled }: PlaygroundState): string {
  const attrs = [checked ? " defaultChecked" : "", disabled ? " disabled" : ""].join("");
  return `import { Switch } from "@usebones/react";

<label>
  <Switch${attrs} />
  Email notifications
</label>`;
}

export function SwitchPlayground() {
  const [checked, setChecked] = React.useState(true);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ checked, disabled })}
        note={
          <>
            Toggling the switch in the preview updates the Checked control
            too; it's one piece of state. Wrap it in a <code>label</code> so
            the text is clickable and read by screen readers.
          </>
        }
      >
        <label className="preview-field">
          <Switch checked={checked} onCheckedChange={setChecked} disabled={disabled} />
          Email notifications
        </label>
      </Showcase>
      <Controls>
        <ControlRow label="Checked">
          <Switch checked={checked} onCheckedChange={setChecked} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
