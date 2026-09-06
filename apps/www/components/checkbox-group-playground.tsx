import * as React from "react";
import { Checkbox, CheckboxGroup, Switch } from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const channels = [
  { value: "email", label: "Email" },
  { value: "sms", label: "Text message" },
  { value: "push", label: "Push" },
];

interface PlaygroundState {
  parent: boolean;
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ parent, disabled }: PlaygroundState): string {
  const rows = channels
    .map(
      (channel) => `  <label>
    <Checkbox value="${channel.value}" /> ${channel.label}
  </label>`,
    )
    .join("\n");
  const parentRow = parent
    ? `  <label>
    <Checkbox parent /> All notifications
  </label>\n`
    : "";
  const allValues = parent ? `\n  allValues={["email", "sms", "push"]}` : "";
  return `import { Checkbox, CheckboxGroup } from "@usebones/react";

<CheckboxGroup
  defaultValue={["email"]}${allValues}${disabled ? "\n  disabled" : ""}
>
${parentRow}${rows}
</CheckboxGroup>`;
}

export function CheckboxGroupPlayground() {
  const [parent, setParent] = React.useState(true);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ parent, disabled })}
        note={
          <>
            Checkboxes join the group by their <code>value</code>. With{" "}
            <code>allValues</code> plus a <code>parent</code> checkbox, the
            select-all row checks, unchecks, and shows the indeterminate
            dash on its own.
          </>
        }
      >
        {/* key remounts when the parent row appears so allValues applies cleanly */}
        <CheckboxGroup
          key={String(parent)}
          defaultValue={["email"]}
          allValues={parent ? channels.map((channel) => channel.value) : undefined}
          disabled={disabled}
        >
          {parent ? (
            <label className="preview-field">
              <Checkbox parent /> All notifications
            </label>
          ) : null}
          {channels.map((channel) => (
            <label key={channel.value} className="preview-field">
              <Checkbox value={channel.value} /> {channel.label}
            </label>
          ))}
        </CheckboxGroup>
      </Showcase>
      <Controls>
        <ControlRow label="Parent checkbox">
          <Switch checked={parent} onCheckedChange={setParent} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
