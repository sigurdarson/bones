import * as React from "react";
import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Input,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  outsideClick: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ outsideClick }: PlaygroundState): string {
  return `import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@usebones/react";

<DialogRoot${outsideClick ? "" : " disablePointerDismissal"}>
  <DialogTrigger render={<Button variant="secondary" />}>Rename</DialogTrigger>
  <DialogContent>
    <DialogTitle>Rename project</DialogTitle>
    <DialogDescription>
      The new name shows up everywhere this project is linked.
    </DialogDescription>
    <Input defaultValue="Website redesign" aria-label="Project name" />
    <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
    <DialogClose render={<Button />}>Save</DialogClose>
  </DialogContent>
</DialogRoot>`;
}

export function DialogPlayground() {
  const [outsideClick, setOutsideClick] = React.useState(true);

  return (
    <>
      <Showcase
        code={buildCode({ outsideClick })}
        note={
          <>
            Modal by default: the page behind is dimmed and inert, focus is
            trapped inside, and Escape closes. Turn off outside click for
            forms that shouldn't be lost to a stray click.
          </>
        }
      >
        <DialogRoot disablePointerDismissal={!outsideClick}>
          <DialogTrigger render={<Button variant="secondary" />}>
            Rename
          </DialogTrigger>
          <DialogContent>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <DialogTitle>Rename project</DialogTitle>
                <DialogDescription>
                  The new name shows up everywhere this project is linked.
                </DialogDescription>
              </div>
              <Input defaultValue="Website redesign" aria-label="Project name" />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.5rem",
                }}
              >
                <DialogClose render={<Button variant="ghost" />}>
                  Cancel
                </DialogClose>
                <DialogClose render={<Button />}>Save</DialogClose>
              </div>
            </div>
          </DialogContent>
        </DialogRoot>
      </Showcase>
      <Controls>
        <ControlRow label="Outside click">
          <Switch checked={outsideClick} onCheckedChange={setOutsideClick} />
        </ControlRow>
      </Controls>
    </>
  );
}
