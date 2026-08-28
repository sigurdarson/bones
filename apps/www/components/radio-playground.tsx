import * as React from "react";
import { Radio, RadioGroup, Switch } from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const plans = [
  { value: "hobby", label: "Hobby" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
];

/* The Code tab mirrors whatever the controls currently show. */
function buildCode(disabled: boolean): string {
  const rows = plans
    .map(
      (plan) => `  <label>
    <Radio value="${plan.value}" /> ${plan.label}
  </label>`,
    )
    .join("\n");
  return `import { Radio, RadioGroup } from "@usebones/react";

<RadioGroup defaultValue="pro"${disabled ? " disabled" : ""}>
${rows}
</RadioGroup>`;
}

export function RadioPlayground() {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode(disabled)}
        note={
          <>
            The dot indicator renders automatically, and arrow keys move the
            selection. Wrap each radio in a <code>label</code> with its
            text, or use a Field per option.
          </>
        }
      >
        <RadioGroup defaultValue="pro" disabled={disabled}>
          {plans.map((plan) => (
            <label key={plan.value} className="preview-field">
              <Radio value={plan.value} /> {plan.label}
            </label>
          ))}
        </RadioGroup>
      </Showcase>
      <Controls>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
