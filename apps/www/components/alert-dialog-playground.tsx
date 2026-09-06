import * as React from "react";
import {
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface ConfirmationProps {
  trigger: string;
  title: string;
  description: string;
  confirm: string;
  variant: "primary" | "danger";
  disabled?: boolean;
}

/* One confirmation: trigger, title and description, Cancel and the
   action. The layout lives here so every showcase on the page shares it. */
function Confirmation({
  trigger,
  title,
  description,
  confirm,
  variant,
  disabled,
}: ConfirmationProps) {
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger render={<Button variant="secondary" disabled={disabled} />}>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
            <AlertDialogClose render={<Button variant="ghost" />}>
              Cancel
            </AlertDialogClose>
            <AlertDialogClose render={<Button variant={variant} />}>
              {confirm}
            </AlertDialogClose>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
}

const copy = {
  destructive: {
    trigger: "Delete project",
    title: "Delete project?",
    description: "This permanently deletes the project and its history.",
    confirm: "Delete project",
    variant: "danger" as const,
  },
  neutral: {
    trigger: "Publish 3 posts",
    title: "Publish 3 posts?",
    description: "They go live on your site immediately.",
    confirm: "Publish",
    variant: "primary" as const,
  },
};

interface PlaygroundState {
  destructive: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ destructive }: PlaygroundState): string {
  const c = destructive ? copy.destructive : copy.neutral;
  return `import {
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@usebones/react";

<AlertDialogRoot>
  <AlertDialogTrigger render={<Button variant="secondary" />}>
    ${c.trigger}
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>${c.title}</AlertDialogTitle>
    <AlertDialogDescription>
      ${c.description}
    </AlertDialogDescription>
    <AlertDialogClose render={<Button variant="ghost" />}>Cancel</AlertDialogClose>
    <AlertDialogClose render={<Button${c.variant === "danger" ? ' variant="danger"' : ""} />}>
      ${c.confirm}
    </AlertDialogClose>
  </AlertDialogContent>
</AlertDialogRoot>`;
}

export function AlertDialogPlayground() {
  const [destructive, setDestructive] = React.useState(true);
  const c = destructive ? copy.destructive : copy.neutral;

  return (
    <>
      <Showcase
        code={buildCode({ destructive })}
        note={
          <>
            Keep Cancel first in the DOM so Tab reaches it before the
            action. Escape cancels, and closing by any route returns focus
            to the trigger, so the user lands back where they started.
          </>
        }
      >
        <Confirmation {...c} />
      </Showcase>
      <Controls>
        <ControlRow label="Destructive">
          <Switch checked={destructive} onCheckedChange={setDestructive} />
        </ControlRow>
      </Controls>
    </>
  );
}

const variantsCode = `<AlertDialogRoot>
  <AlertDialogTrigger render={<Button variant="secondary" />}>
    Publish 3 posts
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Publish 3 posts?</AlertDialogTitle>
    <AlertDialogDescription>They go live on your site immediately.</AlertDialogDescription>
    <AlertDialogClose render={<Button variant="ghost" />}>Cancel</AlertDialogClose>
    <AlertDialogClose render={<Button />}>Publish</AlertDialogClose>
  </AlertDialogContent>
</AlertDialogRoot>

<AlertDialogRoot>
  <AlertDialogTrigger render={<Button variant="secondary" />}>
    Delete project
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Delete project?</AlertDialogTitle>
    <AlertDialogDescription>
      This permanently deletes the project and its history.
    </AlertDialogDescription>
    <AlertDialogClose render={<Button variant="ghost" />}>Cancel</AlertDialogClose>
    <AlertDialogClose render={<Button variant="danger" />}>Delete project</AlertDialogClose>
  </AlertDialogContent>
</AlertDialogRoot>`;

export function AlertDialogVariants() {
  return (
    <Showcase
      code={variantsCode}
      note={
        <>
          Only the confirm button changes. The trigger stays secondary in
          both, so the page doesn't shout before the question is asked.
        </>
      }
    >
      <Confirmation {...copy.neutral} />
      <Confirmation {...copy.destructive} />
    </Showcase>
  );
}

const statesCode = `<AlertDialogTrigger render={<Button variant="secondary" />}>
  Archive workspace
</AlertDialogTrigger>

<AlertDialogTrigger render={<Button variant="secondary" disabled />}>
  Delete workspace
</AlertDialogTrigger>`;

export function AlertDialogStates() {
  return (
    <Showcase
      code={statesCode}
      note={
        <>
          Disabled is set on the rendered Button, like any other button.
          The dialog parts stay in the tree either way, so opening later
          needs no remount.
        </>
      }
    >
      <Confirmation
        trigger="Archive workspace"
        title="Archive workspace?"
        description="Members lose access until you restore it."
        confirm="Archive"
        variant="primary"
      />
      <Confirmation
        trigger="Delete workspace"
        title="Delete workspace?"
        description="Everything in it goes with it."
        confirm="Delete workspace"
        variant="danger"
        disabled
      />
    </Showcase>
  );
}
