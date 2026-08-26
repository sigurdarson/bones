import * as React from "react";
import {
  FieldLabel,
  FieldRoot,
  FieldsetLegend,
  FieldsetRoot,
  Input,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ disabled }: PlaygroundState): string {
  return `import {
  FieldLabel,
  FieldRoot,
  FieldsetLegend,
  FieldsetRoot,
  Input,
} from "@usebones/react";

<FieldsetRoot${disabled ? " disabled" : ""}>
  <FieldsetLegend>Shipping address</FieldsetLegend>
  <FieldRoot name="street">
    <FieldLabel>Street</FieldLabel>
    <Input placeholder="12 North Road" />
  </FieldRoot>
  <FieldRoot name="city">
    <FieldLabel>City</FieldLabel>
    <Input placeholder="Portland" />
  </FieldRoot>
</FieldsetRoot>`;
}

export function FieldsetPlayground() {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ disabled })}
        note={
          <>
            A native fieldset: the legend names the group for screen
            readers, and <code>disabled</code> switches off every control
            inside at once.
          </>
        }
      >
        <div style={{ width: "18rem" }}>
          <FieldsetRoot disabled={disabled}>
            <FieldsetLegend>Shipping address</FieldsetLegend>
            <FieldRoot name="street">
              <FieldLabel>Street</FieldLabel>
              <Input placeholder="12 North Road" />
            </FieldRoot>
            <FieldRoot name="city">
              <FieldLabel>City</FieldLabel>
              <Input placeholder="Portland" />
            </FieldRoot>
          </FieldsetRoot>
        </div>
      </Showcase>
      <Controls>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
