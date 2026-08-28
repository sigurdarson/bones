import * as React from "react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Switch,
} from "@usebones/react";
import { Icon } from "@usebones/icons";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  borderless: boolean;
  compact: boolean;
  disabled: boolean;
  invalid: boolean;
  leadingIcon: boolean;
  hint: boolean;
}

const plans = [
  { value: "hobby", label: "Hobby" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
];

/* value to label map so the trigger renders labels before the dropdown has
   ever opened (items mount in a portal, so labels register late). */
const planItems = Object.fromEntries(plans.map((plan) => [plan.value, plan.label]));

const hintText = "You can change plans anytime.";
const invalidHintText = "Pick a plan to continue.";

/* The Code tab mirrors whatever the controls currently show. */
function buildCode(state: PlaygroundState): string {
  const triggerAttrs = [
    `\n    placeholder="Choose a plan"`,
    state.borderless ? `\n    variant="borderless"` : "",
    state.disabled ? "\n    disabled" : "",
    state.invalid ? "\n    invalid" : "",
    state.leadingIcon ? `\n    leadingIcon={<Icon name="credit-card" />}` : "",
    state.hint ? `\n    hint="${state.invalid ? invalidHintText : hintText}"` : "",
  ].join("");

  const imports = [
    `import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@usebones/react";`,
    ...(state.leadingIcon ? [`import { Icon } from "@usebones/icons";`] : []),
  ].join("\n");

  const items = plans
    .map((plan) => `    <SelectItem value="${plan.value}">${plan.label}</SelectItem>`)
    .join("\n");

  return `${imports}

const items = { hobby: "Hobby", pro: "Pro", team: "Team" };

<SelectRoot items={items}${state.compact ? ' size="compact"' : ""}>
  <SelectTrigger${triggerAttrs}
  />
  <SelectContent>
${items}
  </SelectContent>
</SelectRoot>`;
}

export function SelectPlayground() {
  const [borderless, setBorderless] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [invalid, setInvalid] = React.useState(false);
  const [leadingIcon, setLeadingIcon] = React.useState(false);
  const [hint, setHint] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ borderless, compact, disabled, invalid, leadingIcon, hint })}
        note={
          <>
            Four parts. <code>SelectTrigger</code> renders the value and
            chevron on its own (the chevron owns the trailing slot), and the
            hint links to the trigger via <code>aria-describedby</code>.
          </>
        }
      >
        <SelectRoot items={planItems} size={compact ? "compact" : "default"}>
          <SelectTrigger
            placeholder="Choose a plan"
            variant={borderless ? "borderless" : "default"}
            disabled={disabled}
            invalid={invalid}
            leadingIcon={leadingIcon ? <Icon name="credit-card" /> : undefined}
            hint={hint ? (invalid ? invalidHintText : hintText) : undefined}
          />
          <SelectContent>
            {plans.map((plan) => (
              <SelectItem key={plan.value} value={plan.value}>
                {plan.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
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
        <ControlRow label="Hint">
          <Switch checked={hint} onCheckedChange={setHint} />
        </ControlRow>
      </Controls>
    </>
  );
}
