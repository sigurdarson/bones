import { createFileRoute } from "@tanstack/react-router";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { ToastPlayground } from "@/components/toast-playground";
import {
  ToastDedupe,
  ToastHeights,
  ToastPosition,
  ToastUndo,
} from "@/components/toast-recipes";
import { ToastVariants } from "@/components/toast-variants";

export const Route = createFileRoute("/components/toast")({
  head: () => ({ meta: [{ title: "Toast · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Toast" />
      <p className="lead">
        Brief notifications stacked bottom right, wrapping the Base UI
        Toast. Announced politely to screen readers, expandable on hover,
        dismissible by swipe, timer paused while you're reading. Fire them
        from anywhere with one hook.
      </p>
      <h2>Setup</h2>
      <p>
        Two pieces, mounted once and before anything fires: the provider
        holds the queue, the Toaster renders the stack. This site does it
        in the root layout:
      </p>
      <CodeBlock
        code={`import { ToastProvider, Toaster } from "@usebones/react";

<ToastProvider>
  {children}
  <Toaster />
</ToastProvider>`}
      />
      <h2>Playground</h2>
      <p>
        Every control maps to an option of <code>toast.add</code>. The demo
        mounts its own provider, so the position control moves only these
        toasts.
      </p>
      <ToastPlayground />
      <h2>Variants</h2>
      <p>
        Default plus the four conventional types, each tinted with an
        icon, and a promise toast that follows an async call through
        loading, success, or failure with the types set automatically.
      </p>
      <ToastVariants />
      <h2>Recipes</h2>
      <p>
        The queue is plain data, so the common patterns are each a few
        lines: pick a corner, mix short and tall toasts, collapse repeats,
        and offer an undo.
      </p>
      <p>
        <strong>Position.</strong> The Toaster takes a{" "}
        <code>position</code>: any corner or edge center, bottom right by
        default. Top positions peek downward and swipe upward.
      </p>
      <ToastPosition />
      <p>
        <strong>Varying heights.</strong> Each toast's height is measured,
        so the stack and the expanded fan stay correct with mixed content
        lengths.
      </p>
      <ToastHeights />
      <p>
        <strong>Deduplication.</strong> Pass a fixed <code>id</code> and
        repeat events collapse into one toast instead of stacking; each add
        refreshes the timer.
      </p>
      <ToastDedupe />
      <p>
        <strong>Undo action.</strong> The classic use of{" "}
        <code>actionProps</code>: the action closes the toast and a
        follow-up confirms.
      </p>
      <ToastUndo />
      <h2>Styling states</h2>
      <p>
        Each toast carries <code>data-type</code> with whatever type you
        pass (success, info, warning, and error come tinted with icons;
        anything else is yours to style), <code>data-expanded</code> while
        the stack is fanned out, and the usual{" "}
        <code>data-starting-style</code>/<code>data-ending-style</code>{" "}
        transitions:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-toast[data-type="deploy"] .ub-toast-title {
  color: var(--ub-accent);
}`}
      />
      <h2>Props</h2>
      <p>
        The provider takes the queue-wide settings; everything per-toast
        goes to <code>toast.add</code> (or <code>update</code>/
        <code>promise</code>). The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "Toaster.portalContainer",
            type: "HTMLElement | ShadowRoot | RefObject | null",
            description: "Portal parent for a local theme. Omit to use the parent portal or document body; see Theming.",
          },
          {
            name: "ToastProvider.timeout",
            type: "number",
            defaultValue: "5000",
            description: "Milliseconds before auto-dismiss; paused on hover and focus.",
          },
          {
            name: "ToastProvider.limit",
            type: "number",
            defaultValue: "3",
            description: "Most toasts shown at once; extras queue up.",
          },
          {
            name: "Toaster.position",
            type: "ToasterPosition",
            defaultValue: '"bottom-right"',
            description: "Any corner or edge center; swipe direction follows.",
          },
          {
            name: "toast.add({ title })",
            type: "ReactNode",
            description: "What the toast says; names it for screen readers.",
          },
          {
            name: "toast.add({ description })",
            type: "ReactNode",
            description: "Supporting text under the title.",
          },
          {
            name: "toast.add({ type })",
            type: "string",
            description: "Free-form tag surfaced as data-type for styling.",
          },
          {
            name: "toast.add({ actionProps })",
            type: "button props",
            description: "Renders an action button; children is its label, onClick its handler.",
          },
          {
            name: "toast.promise(p, { loading, success, error })",
            type: "function",
            description: "One toast that follows a promise through its three outcomes.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`ToastProvider, Toaster, useToast, from @usebones/react.
- Toaster accepts portalContainer (element or ref) to keep overlays inside a local theme; omit for the parent portal or document body.
- Mount once: ToastProvider wrapping the app with one <Toaster /> inside (this renders the bottom-right stack; no toast markup anywhere else).
- Fire from any client component: const toast = useToast(); toast.add({ title, description, type, actionProps: { children, onClick } }). Returns an id for toast.update/toast.close.
- toast.promise(promise, { loading: {...}, success: {...}, error: {...} }) follows a promise through its outcomes.
- Provider settings: timeout (5000ms, paused on hover/focus), limit (3).
- Never mount a second Toaster; one provider and one stack per app.
- Restyle in CSS via .ub-toast, .ub-toast-title, .ub-toast-description, .ub-toast-action, [data-type="..."], [data-expanded], [data-starting-style]/[data-ending-style]. Tokens only.`}
      />
    </>
  );
}
