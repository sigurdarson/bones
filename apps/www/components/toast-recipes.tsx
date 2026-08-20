"use client";

import * as React from "react";
import {
  Button,
  ToastProvider,
  Toaster,
  useToast,
  type ToasterPosition,
} from "@usebones/react";
import { Showcase } from "./showcase";

/* ---------- Location ---------- */

const locationCode = `const [position, setPosition] = React.useState<ToasterPosition>("top-right");

<ToastProvider>
  {/* app */}
  <Toaster position={position} />
</ToastProvider>`;

function LocationButtons({
  onPick,
}: {
  onPick: (position: ToasterPosition) => void;
}) {
  const toast = useToast();
  function fire(position: ToasterPosition, label: string) {
    onPick(position);
    toast.add({ title: label, description: "The stack follows the prop." });
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <Button variant="secondary" onClick={() => fire("top-right", "Top right")}>
        Top right
      </Button>
      <Button variant="secondary" onClick={() => fire("top-center", "Top center")}>
        Top center
      </Button>
      <Button
        variant="secondary"
        onClick={() => fire("bottom-center", "Bottom center")}
      >
        Bottom center
      </Button>
    </div>
  );
}

export function ToastLocation() {
  const [position, setPosition] = React.useState<ToasterPosition>("top-right");
  return (
    <Showcase
      code={locationCode}
      note={
        <>
          This demo runs its own provider so the site's bottom-right stack
          stays put. Swipe direction follows the corner automatically.
        </>
      }
    >
      <ToastProvider>
        <LocationButtons onPick={setPosition} />
        <Toaster position={position} />
      </ToastProvider>
    </Showcase>
  );
}

/* ---------- Varying heights ---------- */

const heightsCode = `toast.add({ title: "Copied" });

toast.add({
  title: "Storage almost full",
  description:
    "You've used 9.4 GB of 10 GB. Older attachments are removed first " +
    "when you run out, starting with files you haven't opened this year.",
});`;

export function ToastHeights() {
  const toast = useToast();
  return (
    <Showcase
      code={heightsCode}
      note={
        <>
          Heights are measured per toast, so short and tall notifications
          stack and fan out without overlapping.
        </>
      }
    >
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button variant="secondary" onClick={() => toast.add({ title: "Copied" })}>
          Short
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.add({
              title: "Storage almost full",
              description:
                "You've used 9.4 GB of 10 GB. Older attachments are removed first when you run out, starting with files you haven't opened this year.",
            })
          }
        >
          Tall
        </Button>
      </div>
    </Showcase>
  );
}

/* ---------- Deduplication ---------- */

const dedupeCode = `/* Adding with an existing id updates that toast in place and
   refreshes its timer, so repeat events collapse into one. */
toast.add({ id: "sync", title: \`Synced \${count} files\` });`;

export function ToastDedupe() {
  const toast = useToast();
  const count = React.useRef(0);
  return (
    <Showcase
      code={dedupeCode}
      note={
        <>
          Click repeatedly: one toast, updated in place, timer refreshed.
          Without the fixed <code>id</code> every click would stack a new
          one.
        </>
      }
    >
      <Button
        variant="secondary"
        onClick={() => {
          count.current += 1;
          toast.add({
            id: "sync",
            title: `Synced ${count.current} ${count.current === 1 ? "file" : "files"}`,
          });
        }}
      >
        Sync a file
      </Button>
    </Showcase>
  );
}

/* ---------- Undo action ---------- */

const undoCode = `toast.add({
  title: "Project archived",
  actionProps: {
    children: "Undo",
    onClick: () => {
      restore();
      toast.add({ title: "Project restored", type: "success" });
    },
  },
});`;

export function ToastUndo() {
  const toast = useToast();
  return (
    <Showcase
      code={undoCode}
      note={
        <>
          The action closes its toast when clicked; firing a follow-up
          toast confirms what happened.
        </>
      }
    >
      <Button
        variant="secondary"
        onClick={() =>
          toast.add({
            title: "Project archived",
            actionProps: {
              children: "Undo",
              onClick: () =>
                toast.add({ title: "Project restored", type: "success" }),
            },
          })
        }
      >
        Archive project
      </Button>
    </Showcase>
  );
}
