import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@usebones/react";
import { SelectPlayground } from "@/components/select-playground";
import { Showcase } from "@/components/showcase";
import { AgentInstructions } from "@/components/agent-instructions";

export const Route = createFileRoute("/components/select")({
  head: () => ({ meta: [{ title: "Select · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Select" />
      <p className="lead">
        A dropdown for picking one option, wrapping the Base UI Select. Full
        keyboard navigation and typeahead come from the foundation; the
        popup opens with a small fade and settle.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <SelectPlayground />
      <h2>Variants</h2>
      <p>
        Bordered is the default; borderless trades the border for a muted
        fill, the same surface as a secondary button.
      </p>
      <Showcase
        code={`<SelectTrigger placeholder="Choose a plan" />
<SelectTrigger variant="borderless" placeholder="Choose a plan" />`}
      >
        <div className="showcase-stack">
          <SelectRoot items={{ hobby: "Hobby", pro: "Pro" }}>
            <SelectTrigger placeholder="Choose a plan" />
            <SelectContent>
              <SelectItem value="hobby">Hobby</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
            </SelectContent>
          </SelectRoot>
          <SelectRoot items={{ hobby: "Hobby", pro: "Pro" }}>
            <SelectTrigger variant="borderless" placeholder="Choose a plan" />
            <SelectContent>
              <SelectItem value="hobby">Hobby</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
            </SelectContent>
          </SelectRoot>
        </div>
      </Showcase>
      <h2>States</h2>
      <p>
        Open, highlighted, and selected are live; try the examples. Disabled
        and invalid are the ones you set, and invalid turns the border and
        hint to the danger color.
      </p>
      <Showcase
        code={`<SelectTrigger placeholder="Choose a plan" disabled />
<SelectTrigger
  placeholder="Choose a plan"
  invalid
  hint="Pick a plan to continue."
/>`}
      >
        <div className="showcase-stack">
          <SelectRoot items={{ hobby: "Hobby" }}>
            <SelectTrigger placeholder="Choose a plan" disabled />
            <SelectContent>
              <SelectItem value="hobby">Hobby</SelectItem>
            </SelectContent>
          </SelectRoot>
          <SelectRoot items={{ hobby: "Hobby", pro: "Pro" }}>
            <SelectTrigger
              placeholder="Choose a plan"
              invalid
              hint="Pick a plan to continue."
            />
            <SelectContent>
              <SelectItem value="hobby">Hobby</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
            </SelectContent>
          </SelectRoot>
        </div>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The highlighted item carries <code>data-highlighted</code>, the
        chosen one <code>data-selected</code>, and the trigger{" "}
        <code>data-popup-open</code> while open, so custom styling never
        needs JavaScript:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-select-item[data-highlighted] {
  background: var(--ub-bg-muted);
}`}
      />
      <h2>Props</h2>
      <p>
        Each part passes the full Base UI API through. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "SelectRoot.defaultValue",
            type: "string",
            description: "The option selected on first render, when uncontrolled.",
          },
          {
            name: "SelectRoot.value",
            type: "string",
            description: "Controlled selection. Pair with onValueChange.",
          },
          {
            name: "SelectRoot.onValueChange",
            type: "(value) => void",
            description: "Called when the selection changes.",
          },
          {
            name: "SelectTrigger.placeholder",
            type: "ReactNode",
            description: "Shown while nothing is selected.",
          },
          {
            name: "SelectTrigger.variant",
            type: '"default" | "borderless"',
            defaultValue: '"default"',
            description: "Bordered, or a muted fill with no border.",
          },
          {
            name: "SelectRoot.items",
            type: "Record<value, label>",
            description:
              "Value to label map; required for the trigger to show the selected label before the dropdown has opened.",
          },
          {
            name: "SelectRoot.size",
            type: '"default" | "compact"',
            defaultValue: '"default"',
            description: "Sizes the trigger and dropdown items together: 36px tall by default, 28px compact.",
          },
          {
            name: "SelectTrigger.disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Blocks opening the select.",
          },
          {
            name: "SelectTrigger.invalid",
            type: "boolean",
            defaultValue: "false",
            description: "Danger border, ring, and hint, plus aria-invalid.",
          },
          {
            name: "SelectTrigger.leadingIcon",
            type: "ReactNode",
            description: "Icon before the value. Decorative.",
          },
          {
            name: "SelectTrigger.hint",
            type: "ReactNode",
            description: "Helper text below the trigger, linked via aria-describedby.",
          },
          {
            name: "SelectItem.value",
            type: "string",
            description: "Identity of the option.",
          },
          {
            name: "SelectItem.disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Blocks choosing this option.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`SelectRoot, SelectTrigger, SelectContent, SelectItem, from @usebones/react.
- SelectRoot: defaultValue or value + onValueChange (the callback value can be null); size sizes the trigger and dropdown items together. Always pass items (a value to label record) so the trigger shows the selected label instead of the raw value.
- SelectTrigger: placeholder, variant "default" | "borderless", invalid, leadingIcon, hint. The chevron renders automatically; there is no trailing icon slot.
- SelectContent handles the portal and positioning. SelectItem children are the label; the selected check renders automatically.
- Restyle in CSS via [data-highlighted], [data-selected], [data-popup-open], using --ub-* tokens only.`}
      />
    </>
  );
}
