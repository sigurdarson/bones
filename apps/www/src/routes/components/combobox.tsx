import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
  ComboboxTrigger,
} from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import {
  ComboboxAsyncMultiple,
  ComboboxAsyncSingle,
  ComboboxCreatable,
  ComboboxGrouped,
  ComboboxMultiple,
  ComboboxPopupInput,
} from "@/components/combobox-examples";
import { ComboboxPlayground } from "@/components/combobox-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/combobox")({
  head: () => ({ meta: [{ title: "Combobox · Bones" }] }),
  component: Page,
});

/* The roster is Icelanders of saga fame, same as the playground. */
const members = [
  "Gunnar á Hlíðarenda",
  "Eiríkur rauði",
  "Leifur heppni",
  "Snorri Sturluson",
  "Auður djúpúðga",
];

function MemberItems() {
  return (
    <ComboboxContent empty="No one matches.">
      {(member: string) => (
        <ComboboxItem key={member} value={member}>
          {member}
        </ComboboxItem>
      )}
    </ComboboxContent>
  );
}

function Page() {
  return (
    <>
      <PageHeader title="Combobox" />
      <p className="lead">
        Pick from a list by typing, wrapping the Base UI Combobox. The
        input filters as you type, the chevron browses the whole list, and
        the selection is a real value like any form control. For a short
        fixed list, the <Link to="/components/select">Select</Link>{" "}
        stays simpler.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. Try typing a few letters, then
        clearing; the Code tab always shows the markup for exactly what
        you've configured.
      </p>
      <ComboboxPlayground />
      <h2>Variants</h2>
      <p>
        Two inputs and a button: bordered is the default, borderless trades
        the border for a muted fill, and <code>ComboboxTrigger</code> reads
        like a Select and moves the typing into the popup.
      </p>
      <Showcase
        code={`<ComboboxRoot items={members}>
  <ComboboxInput placeholder="Assign to..." />
  <ComboboxContent empty="No one matches.">
    {(member) => (
      <ComboboxItem key={member} value={member}>
        {member}
      </ComboboxItem>
    )}
  </ComboboxContent>
</ComboboxRoot>

<ComboboxRoot items={members}>
  <ComboboxInput variant="borderless" placeholder="Assign to..." />
  <ComboboxContent empty="No one matches.">{/* same items */}</ComboboxContent>
</ComboboxRoot>

<ComboboxRoot items={members}>
  <ComboboxTrigger placeholder="Assign to..." aria-label="Assignee" />
  <ComboboxContent searchInput="Search people..." empty="No one matches.">
    {/* same items */}
  </ComboboxContent>
</ComboboxRoot>`}
        note={
          <>
            The trigger's placeholder is visual only: name it with{" "}
            <code>aria-label</code> or a Field label. Both inputs keep the
            chevron; the trigger reuses the Select trigger's classes, so
            the two restyle together.
          </>
        }
      >
        <div className="showcase-stack" style={{ width: "22rem" }}>
          <ComboboxRoot items={members}>
            <ComboboxInput placeholder="Assign to..." aria-label="Bordered" />
            <MemberItems />
          </ComboboxRoot>
          <ComboboxRoot items={members}>
            <ComboboxInput
              variant="borderless"
              placeholder="Assign to..."
              aria-label="Borderless"
            />
            <MemberItems />
          </ComboboxRoot>
          <ComboboxRoot items={members}>
            <ComboboxTrigger placeholder="Assign to..." aria-label="Assignee" />
            <ComboboxContent searchInput="Search people..." empty="No one matches.">
              {(member: string) => (
                <ComboboxItem key={member} value={member}>
                  {member}
                </ComboboxItem>
              )}
            </ComboboxContent>
          </ComboboxRoot>
        </div>
      </Showcase>
      <h2>States</h2>
      <p>
        Open, highlighted, and selected are live; try the examples. A
        selection swaps the chevron for a clear button, disabled dims the
        whole group, invalid turns the border to the danger color, and focus
        rings the group on every focus, not just keyboard.
      </p>
      <Showcase
        code={`<ComboboxRoot items={members}>
  <ComboboxInput placeholder="Assign to..." />
</ComboboxRoot>

<ComboboxRoot items={members} defaultValue="Snorri Sturluson">
  <ComboboxInput placeholder="Assign to..." />
</ComboboxRoot>

<ComboboxRoot items={members}>
  <ComboboxInput placeholder="Assign to..." disabled />
</ComboboxRoot>

<ComboboxRoot items={members}>
  <ComboboxInput placeholder="Assign to..." invalid />
</ComboboxRoot>`}
      >
        <div className="showcase-stack" style={{ width: "22rem" }}>
          <ComboboxRoot items={members}>
            <ComboboxInput placeholder="Assign to..." aria-label="Empty" />
            <MemberItems />
          </ComboboxRoot>
          <ComboboxRoot items={members} defaultValue="Snorri Sturluson">
            <ComboboxInput placeholder="Assign to..." aria-label="Selected" />
            <MemberItems />
          </ComboboxRoot>
          <ComboboxRoot items={members}>
            <ComboboxInput placeholder="Assign to..." aria-label="Disabled" disabled />
            <MemberItems />
          </ComboboxRoot>
          <ComboboxRoot items={members}>
            <ComboboxInput placeholder="Assign to..." aria-label="Invalid" invalid />
            <MemberItems />
          </ComboboxRoot>
        </div>
      </Showcase>
      <h2>Recipes</h2>
      <p>
        The parts compose into the usual bigger patterns without extra
        props; each recipe below is a complete, paste-ready arrangement.
      </p>
      <p>
        <strong>Multiple select.</strong> <code>multiple</code> turns the
        value into an array, and <code>ComboboxChips</code> shows it as
        removable chips with the input riding inline after them.
      </p>
      <ComboboxMultiple />
      <p>
        <strong>Input inside popup.</strong> For a select-like control,
        swap the input for a <code>ComboboxTrigger</code> and put the search
        field inside the popup with <code>searchInput</code> on the
        content.
      </p>
      <ComboboxPopupInput />
      <p>
        <strong>Grouped.</strong> Pass groups as the root's items and render
        each group's own items through <code>ComboboxCollection</code>;
        filtering reaches into every group.
      </p>
      <ComboboxGrouped />
      <p>
        <strong>Creatable.</strong> Manage the items yourself and append a
        create row when the query matches nothing; selecting it adds the
        value and keeps it chosen.
      </p>
      <ComboboxCreatable />
      <h2>Async search</h2>
      <p>
        Fetch on <code>onInputValueChange</code>, hand the results to{" "}
        <code>items</code>, and keep a status line up while the request
        runs; with <code>multiple</code>, picked people stay as chips while
        new searches stream fresh results into the list. Both demos fake the
        network with a delay.
      </p>
      <ComboboxAsyncSingle />
      <ComboboxAsyncMultiple />
      <h2>Styling states</h2>
      <p>
        Items carry <code>data-highlighted</code> and{" "}
        <code>data-selected</code>, the chevron carries{" "}
        <code>data-popup-open</code>, and the popup has the usual{" "}
        <code>data-starting-style</code>/<code>data-ending-style</code>{" "}
        transitions:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-combobox-item[data-highlighted] {
  background: var(--ub-accent);
  color: var(--ub-accent-contrast);
}`}
      />
      <h2>Props</h2>
      <p>
        Everything Base UI's Combobox parts accept passes through
        (multiple, itemToStringLabel for object items, onInputValueChange,
        ...). The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "ComboboxContent.portalContainer",
            type: "HTMLElement | ShadowRoot | RefObject | null",
            description: "Portal parent for a local theme. Omit to use the parent portal or document body; see Theming.",
          },
          {
            name: "ComboboxRoot.items",
            type: "Value[]",
            description: "The full list; typing filters it and powers the empty state.",
          },
          {
            name: "ComboboxRoot.value",
            type: "Value | Value[]",
            description: "Controlled selection (also defaultValue, onValueChange); multiple makes it an array.",
          },
          {
            name: "ComboboxRoot.size",
            type: '"default" | "compact"',
            defaultValue: '"default"',
            description: "Sizes the input and the list together: 36px tall with 16px text by default, 28px with 14px text compact.",
          },
          {
            name: "ComboboxInput.variant",
            type: '"default" | "borderless"',
            defaultValue: '"default"',
            description: "Bordered, or a muted fill with no border.",
          },
          {
            name: "ComboboxInput.clearable",
            type: "boolean",
            defaultValue: "true",
            description: "While something is selected, the clear button takes the chevron's place.",
          },
          {
            name: "ComboboxInput.invalid",
            type: "boolean",
            defaultValue: "false",
            description: "Danger border and ring, plus aria-invalid; a surrounding Field sets it automatically. Also on ComboboxTrigger.",
          },
          {
            name: "ComboboxContent.empty",
            type: "ReactNode",
            description: "Shown while the filter matches nothing.",
          },
          {
            name: "ComboboxContent.children",
            type: "(item) => ReactNode",
            description: "Called with each filtered item; render a ComboboxItem.",
          },
          {
            name: "ComboboxContent.searchInput",
            type: "boolean | string",
            description: "Puts the text input inside the popup, for ComboboxTrigger; a string sets its placeholder.",
          },
          {
            name: "ComboboxContent.status",
            type: "ReactNode",
            description: "A politely announced status line above the list, for async searches.",
          },
          {
            name: "ComboboxContent.sideOffset",
            type: "number",
            defaultValue: "4",
            description: "Gap between the input and the popup, in pixels. Also side and align.",
          },
          {
            name: "ComboboxTrigger.placeholder",
            type: "ReactNode",
            description: "Shown while nothing is selected; visual only, so name the trigger with aria-label.",
          },
          {
            name: "ComboboxRoot.itemToStringLabel",
            type: "(item) => string",
            description: "The label to show and filter on when items are objects.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`ComboboxRoot, ComboboxInput, ComboboxTrigger, ComboboxContent, ComboboxItem, ComboboxGroup, ComboboxGroupLabel, ComboboxChips, ComboboxChip, ComboboxValue, ComboboxCollection, ComboboxStatus, from @usebones/react.
- ComboboxContent accepts portalContainer (element or ref) to keep overlays inside a local theme; omit for the parent portal or document body.
- Structure: ComboboxRoot (pass items; size "default" | "compact") wraps ComboboxInput (placeholder, variant "default" | "borderless", clearable default true, invalid, disabled; chevron built in, swapped for a clear button while something is selected) + ComboboxContent (empty="..." plus function children rendering a ComboboxItem per filtered item).
- value/defaultValue/onValueChange like every control; multiple turns the value into an array. Object items need itemToStringLabel.
- Multiple with chips: ComboboxChips wrapping ComboboxValue's function children (map values to ComboboxChip; put ComboboxInput clearable={false} after them). Chip remove buttons are automatic.
- Select-like: ComboboxTrigger (placeholder is visual only; name it via aria-label or a Field label) with searchInput="..." on ComboboxContent putting the input inside the popup.
- Grouped: items are groups; function children get each group; ComboboxGroup items={group.items} + ComboboxGroupLabel + ComboboxCollection render the rows.
- Async: fetch in onInputValueChange, pass results as items, status="Searching..." on the content while loading (announced politely), empty={null} while loading.
- Creatable: manage items in state, render static children, and append a ComboboxItem whose value is the query when nothing matches.
- Prefer Select for short fixed lists; the combobox earns its input when the list is long enough to search.
- Inside FieldRoot, drop invalid and use FieldLabel and FieldError instead; the Field wires the name and validation.
- Restyle in CSS via .ub-combobox-input-group ([data-variant], [data-size]), .ub-combobox-input ([data-invalid], [data-disabled]), .ub-combobox-chips, .ub-combobox-chip, .ub-combobox-popup, .ub-combobox-item ([data-highlighted], [data-selected]), [data-popup-open] on the chevron. Tokens only.`}
      />
    </>
  );
}
