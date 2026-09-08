import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { DialogPlayground } from "@/components/dialog-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const Route = createFileRoute("/components/dialog")({
  head: () => ({ meta: [{ title: "Dialog · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Dialog" />
      <p className="lead">
        A modal window over a dimmed page, wrapping the Base UI Dialog.
        Focus is trapped inside and returned on close, the window scrolls
        when taller than the screen, and Escape always works. For a panel
        that doesn't take over the page, reach for the{" "}
        <Link to="/components/popover">Popover</Link>.
      </p>
      <h2>Playground</h2>
      <p>
        Open the dialog and try Escape, a click on the backdrop, and tabbing
        past the last button; switch off Outside click to see the backdrop
        stop dismissing while the keyboard still does.
      </p>
      <DialogPlayground />
      <h2>States</h2>
      <p>
        A dialog is closed, opening, open, or closing, and only the trigger
        can be shown at rest: while open it carries{" "}
        <code>data-popup-open</code>, the popup and backdrop pass through
        their enter and exit transitions on the motion tokens, and hover and
        focus inside the window belong to the controls you put there. With{" "}
        <code>modal={"{false}"}</code> the page behind stays interactive and
        undimmed; <code>"trap-focus"</code> keeps the trap without the dim.
      </p>
      <h2>Styling states</h2>
      <p>
        The popup and backdrop both carry <code>data-starting-style</code>{" "}
        and <code>data-ending-style</code> during the enter and exit
        transitions, and the trigger carries <code>data-popup-open</code>{" "}
        while open, so a wider window or a pressed-looking trigger needs no
        JavaScript:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-dialog-popup {
  max-width: 32rem;
}

.ub-dialog-trigger[data-popup-open] {
  background: var(--ub-bg-muted);
}`}
      />
      <h2>Props</h2>
      <p>
        Open state lives on the root; the title and description wire the
        dialog's accessible name and description automatically. The
        essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "DialogContent.portalContainer",
            type: "HTMLElement | ShadowRoot | RefObject | null",
            description: "Portal parent for a local theme. Omit to use the parent portal or document body; see Theming.",
          },
          {
            name: "DialogRoot.open",
            type: "boolean",
            description: "Controlled state. Pair with onOpenChange (also defaultOpen).",
          },
          {
            name: "DialogRoot.modal",
            type: "boolean | \"trap-focus\"",
            defaultValue: "true",
            description: "Dims and inerts the page behind; false keeps it interactive, trap-focus traps focus without dimming.",
          },
          {
            name: "DialogRoot.disablePointerDismissal",
            type: "boolean",
            defaultValue: "false",
            description: "Ignore outside clicks, for forms that shouldn't be lost.",
          },
          {
            name: "DialogTrigger.render",
            type: "ReactElement",
            description: "The real control that opens the dialog, usually a Bones Button.",
          },
          {
            name: "DialogContent.initialFocus",
            type: "boolean | RefObject<HTMLElement | null> | (openType) => ...",
            description: "Where focus lands on open; defaults to the first focusable part.",
          },
          {
            name: "DialogContent.finalFocus",
            type: "RefObject<HTMLElement | null>",
            description: "Where focus returns on close; defaults to the trigger.",
          },
        ]}
      />
      <p>
        One quirk: the accessible name comes from <code>DialogTitle</code>,
        so keep one even in a tiny confirm; without it the dialog is
        announced as an unnamed dialog.
      </p>
      <AgentInstructions
        instructions={`DialogRoot, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, from @usebones/react.
- DialogContent accepts portalContainer (element or ref) to keep overlays inside a local theme; omit for the parent portal or document body.
- Structure: DialogRoot wraps DialogTrigger + DialogContent; put DialogTitle (names the dialog, always include one), DialogDescription, and the body inside the content. DialogClose closes it; render several for Cancel/Save pairs.
- Attach trigger and close buttons to real controls via render={<Button ... />}.
- Modal by default: page dimmed and inert, focus trapped, Escape closes, focus returns to the trigger. modal={false} keeps the page interactive; disablePointerDismissal ignores outside clicks for forms.
- The content scrolls when taller than the screen; no height handling needed.
- Restyle in CSS via .ub-dialog-popup (26rem max-width default), .ub-dialog-backdrop, .ub-dialog-title, .ub-dialog-description, [data-starting-style]/[data-ending-style] for enter/exit, [data-popup-open] on the trigger. Tokens only.`}
      />
    </>
  );
}
