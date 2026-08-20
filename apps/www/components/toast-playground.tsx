"use client";

import * as React from "react";
import {
  Button,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Switch,
  useToast,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const types: Record<string, string> = {
  none: "None",
  success: "Success",
  error: "Error",
};

interface PlaygroundState {
  type: string;
  action: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ type, action }: PlaygroundState): string {
  const options = [
    `\n      title: "Changes saved",`,
    `\n      description: "Your profile is up to date.",`,
    type !== "none" ? `\n      type: "${type}",` : "",
    action
      ? `\n      actionProps: { children: "Undo", onClick: () => restore() },`
      : "",
  ].join("");
  return `import { Button, useToast } from "@usebones/react";

const toast = useToast();

<Button
  variant="secondary"
  onClick={() =>
    toast.add({${options}
    })
  }
>
  Save changes
</Button>`;
}

export function ToastPlayground() {
  const [type, setType] = React.useState("none");
  const [action, setAction] = React.useState(false);
  const toast = useToast();

  return (
    <>
      <Showcase
        code={buildCode({ type, action })}
        note={
          <>
            Fire a few and hover the stack to fan it out. The Toaster in
            this site's layout renders them; toast.promise handles
            loading, success, and error in one call.
          </>
        }
      >
        <Button
          variant="secondary"
          onClick={() =>
            toast.add({
              title: "Changes saved",
              description: "Your profile is up to date.",
              type: type === "none" ? undefined : type,
              actionProps: action ? { children: "Undo" } : undefined,
            })
          }
        >
          Save changes
        </Button>
      </Showcase>
      <Controls>
        <ControlRow label="Type">
          <SelectRoot
            size="compact"
            items={types}
            value={type}
            onValueChange={(value) => value && setType(value)}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {Object.keys(types).map((value) => (
                <SelectItem key={value} value={value}>
                  {types[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
        <ControlRow label="Action">
          <Switch checked={action} onCheckedChange={setAction} />
        </ControlRow>
      </Controls>
    </>
  );
}
