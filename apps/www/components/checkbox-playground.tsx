import * as React from "react";
import { Checkbox, Switch } from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ checked, indeterminate, disabled }: PlaygroundState): string {
  const attrs = [
    checked ? " defaultChecked" : "",
    indeterminate ? " indeterminate" : "",
    disabled ? " disabled" : "",
  ].join("");
  return `import { Checkbox } from "@usebones/react";

<label>
  <Checkbox${attrs} />
  Email me about product updates
</label>`;
}

export function CheckboxPlayground() {
  const [checked, setChecked] = React.useState(true);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ checked, indeterminate, disabled })}
        note={
          <>
            Toggling the checkbox in the preview updates the Checked control
            too; it's one piece of state. Wrap it in a <code>label</code> so
            the text is clickable and read by screen readers.
          </>
        }
      >
        <label className="preview-field">
          <Checkbox
            checked={checked}
            onCheckedChange={(value) => setChecked(value === true)}
            indeterminate={indeterminate}
            disabled={disabled}
          />
          Email me about product updates
        </label>
      </Showcase>
      <Controls>
        <ControlRow label="Checked">
          <Switch checked={checked} onCheckedChange={setChecked} />
        </ControlRow>
        <ControlRow label="Indeterminate">
          <Switch checked={indeterminate} onCheckedChange={setIndeterminate} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
