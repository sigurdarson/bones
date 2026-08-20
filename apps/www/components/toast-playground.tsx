"use client";

import * as React from "react";
import {
  Button,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Switch,
  ToastProvider,
  Toaster,
  useToast,
  type ToasterPosition,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const types: Record<string, string> = {
  none: "None",
  success: "Success",
  info: "Info",
  warning: "Warning",
  error: "Error",
};

const positions: Record<ToasterPosition, string> = {
  "bottom-right": "Bottom right",
  "bottom-center": "Bottom center",
  "bottom-left": "Bottom left",
  "top-right": "Top right",
  "top-center": "Top center",
  "top-left": "Top left",
};

interface PlaygroundState {
  type: string;
  action: boolean;
  position: ToasterPosition;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ type, action, position }: PlaygroundState): string {
  const options = [
    `\n      title: "Changes saved",`,
    `\n      description: "Your profile is up to date.",`,
    type !== "none" ? `\n      type: "${type}",` : "",
    action
      ? `\n      actionProps: { children: "Undo", onClick: () => restore() },`
      : "",
  ].join("");
  return `import { Button, Toaster, useToast } from "@usebones/react";

const toast = useToast();

<Button
  variant="secondary"
  onClick={() =>
    toast.add({${options}
    })
  }
>
  Save changes
</Button>

{/* the Toaster, mounted once in the layout */}
<Toaster${position !== "bottom-right" ? ` position="${position}"` : ""} />`;
}

function FireButton({ type, action }: { type: string; action: boolean }) {
  const toast = useToast();
  return (
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
  );
}

export function ToastPlayground() {
  const [type, setType] = React.useState("none");
  const [action, setAction] = React.useState(false);
  const [position, setPosition] = React.useState<ToasterPosition>("bottom-right");

  return (
    <>
      <Showcase
        code={buildCode({ type, action, position })}
        note={
          <>
            Fire a few and hover the stack to fan it out. This demo runs
            its own provider so the location control moves only these
            toasts; toast.promise handles loading, success, and error in
            one call.
          </>
        }
      >
        <ToastProvider>
          <FireButton type={type} action={action} />
          <Toaster position={position} />
        </ToastProvider>
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
        <ControlRow label="Location">
          <SelectRoot
            size="compact"
            items={positions}
            value={position}
            onValueChange={(value) =>
              value && setPosition(value as ToasterPosition)
            }
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {(Object.keys(positions) as ToasterPosition[]).map((value) => (
                <SelectItem key={value} value={value}>
                  {positions[value]}
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
