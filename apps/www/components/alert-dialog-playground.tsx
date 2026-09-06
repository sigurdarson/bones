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

interface PlaygroundState {
  destructive: boolean;
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
            Outside clicks are ignored on purpose; only Cancel, the action,
            or Escape close it. Render one <code>AlertDialogClose</code>{" "}
            per choice.
          </>
        }
      >
        <AlertDialogRoot>
          <AlertDialogTrigger render={<Button variant="secondary" />}>
            {c.trigger}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <AlertDialogTitle>{c.title}</AlertDialogTitle>
                <AlertDialogDescription>{c.description}</AlertDialogDescription>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.5rem",
                }}
              >
                <AlertDialogClose render={<Button variant="ghost" />}>
                  Cancel
                </AlertDialogClose>
                <AlertDialogClose
                  render={
                    <Button variant={c.variant === "danger" ? "danger" : "primary"} />
                  }
                >
                  {c.confirm}
                </AlertDialogClose>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialogRoot>
      </Showcase>
      <Controls>
        <ControlRow label="Destructive">
          <Switch checked={destructive} onCheckedChange={setDestructive} />
        </ControlRow>
      </Controls>
    </>
  );
}
