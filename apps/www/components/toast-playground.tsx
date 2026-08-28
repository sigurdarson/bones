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

/* Each type gets content that fits it. */
const content = {
  none: { title: "Draft saved", description: "We keep your last ten drafts." },
  success: { title: "Changes saved", description: "Your profile is up to date." },
  info: { title: "New version available", description: "Refresh to get 1.4.2." },
  warning: {
    title: "Trial ends in 3 days",
    description: "Pick a plan to keep your projects.",
  },
  error: {
    title: "Export failed",
    description: "The PDF took too long to render.",
  },
} as const;

type ToastType = keyof typeof content;

interface PlaygroundState {
  type: ToastType;
  action: boolean;
  position: ToasterPosition;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ type, action, position }: PlaygroundState): string {
  const { title, description } = content[type];
  const options = [
    `\n      title: "${title}",`,
    `\n      description: "${description}",`,
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
  Show toast
</Button>

{/* the Toaster, mounted once in the layout */}
<Toaster${position !== "bottom-right" ? ` position="${position}"` : ""} />`;
}

function FireButton({ type, action }: { type: ToastType; action: boolean }) {
  const toast = useToast();
  return (
    <Button
      variant="secondary"
      onClick={() =>
        toast.add({
          title: content[type].title,
          description: content[type].description,
          type: type === "none" ? undefined : type,
          actionProps: action ? { children: "Undo" } : undefined,
        })
      }
    >
      Show toast
    </Button>
  );
}

export function ToastPlayground() {
  const [type, setType] = React.useState<ToastType>("none");
  const [action, setAction] = React.useState(false);
  const [position, setPosition] = React.useState<ToasterPosition>("bottom-right");

  return (
    <>
      <Showcase
        code={buildCode({ type, action, position })}
        note={
          <>
            Fire a few and hover the stack to fan it out. This demo runs
            its own provider so the position control moves only these
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
            onValueChange={(value) => value && setType(value as ToastType)}
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
        <ControlRow label="Position">
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
