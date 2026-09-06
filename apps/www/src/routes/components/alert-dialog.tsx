import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentInstructions } from "@/components/agent-instructions";
import {
  AlertDialogPlayground,
  AlertDialogStates,
  AlertDialogVariants,
} from "@/components/alert-dialog-playground";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const Route = createFileRoute("/components/alert-dialog")({
  head: () => ({ meta: [{ title: "Alert dialog · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Alert dialog" />
      <p className="lead">
        A confirmation that interrupts on purpose, wrapping the Base UI
        Alert Dialog. Always modal, and a stray click outside never
        dismisses it: the user answers, or cancels with Escape. For
        anything that doesn't demand an answer, use the{" "}
        <Link to="/components/dialog">Dialog</Link>.
      </p>
      <h2>Playground</h2>
      <p>
        Flip Destructive to swap the confirm button between primary and
        danger, then open it and try clicking the backdrop. Confirmations
        aren't only for deletes; anything hard to undo (publishing,
        sending, transferring) earns one.
      </p>
      <AlertDialogPlayground />
      <h2>Variants</h2>
      <p>
        Neutral and destructive, and the difference is one Button variant
        on the confirm: primary when the action is merely irreversible,
        danger when it destroys something.
      </p>
      <AlertDialogVariants />
      <h2>States</h2>
      <p>
        Closed or open, and open is live: click the first trigger. While
        open the trigger carries <code>data-popup-open</code> and focus
        stays inside; a disabled trigger comes from disabling the Button
        you render.
      </p>
      <AlertDialogStates />
      <h2>Styling states</h2>
      <p>
        The popup and backdrop both carry <code>data-starting-style</code>{" "}
        and <code>data-ending-style</code> during the enter and exit
        transitions, and the trigger carries <code>data-popup-open</code>{" "}
        while open, so a bigger settle and a dimmed trigger are two rules:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-alert-dialog-popup[data-starting-style] {
  scale: 0.9;
}

.ub-alert-dialog-trigger[data-popup-open] {
  opacity: 0.6;
}`}
      />
      <h2>Props</h2>
      <p>
        The same shape as the Dialog, minus the escape hatches: it is
        always modal and outside clicks are always ignored, so neither is
        a prop. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "AlertDialogRoot.open",
            type: "boolean",
            description: "Controlled state. Pair with onOpenChange (also defaultOpen).",
          },
          {
            name: "AlertDialogTrigger.render",
            type: "ReactElement",
            description: "The real control that opens the alert, usually a Bones Button.",
          },
          {
            name: "AlertDialogClose.render",
            type: "ReactElement",
            description: "One per choice: Cancel as a ghost, the action as primary or danger.",
          },
          {
            name: "AlertDialogClose.onClick",
            type: "() => void",
            description: "Run the confirmed action here; the alert closes after.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`AlertDialogRoot, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogClose, from @usebones/react.
- Structure: AlertDialogRoot wraps AlertDialogTrigger + AlertDialogContent; put AlertDialogTitle + AlertDialogDescription and one AlertDialogClose per choice inside (Cancel ghost and first in the DOM, the action primary or danger with onClick).
- Attach trigger and close buttons to real controls via render={<Button ... />}; disable the trigger by disabling that Button.
- Use it only when the action is hard to undo; it is always modal and outside clicks never dismiss (Escape cancels). Otherwise use Dialog.
- Restyle in CSS via .ub-alert-dialog-popup (26rem max-width default), .ub-alert-dialog-backdrop, .ub-alert-dialog-title, .ub-alert-dialog-description, [data-starting-style]/[data-ending-style] for enter/exit, [data-popup-open] on the trigger. Tokens only.`}
      />
    </>
  );
}
