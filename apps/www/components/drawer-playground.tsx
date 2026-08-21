"use client";

import * as React from "react";
import {
  Button,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  Switch,
} from "@usebones/react";

<DrawerRoot${outsideClick ? "" : " disablePointerDismissal"}>
  <DrawerTrigger render={<Button variant="secondary" />}>Filters</DrawerTrigger>
  <DrawerContent>
    <DrawerTitle>Filters</DrawerTitle>
    <DrawerDescription>Narrow the results down.</DrawerDescription>
    {/* switch rows */}
    <DrawerClose render={<Button />}>Done</DrawerClose>
  </DrawerContent>
</DrawerRoot>`;
}

function FilterRow({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = React.useState(Boolean(defaultOn));
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.75rem",
        fontSize: "0.875rem",
      }}
    >
      <span>{label}</span>
      <Switch checked={on} onCheckedChange={setOn} />
    </label>
  );
}

export function DrawerPlayground() {
  const [outsideClick, setOutsideClick] = React.useState(true);

  return (
    <>
      <Showcase
        code={buildCode({ outsideClick })}
        note={
          <>
            A bottom sheet: modal like a dialog, plus swipe-down to
            dismiss on touch screens and a grab handle. On wide desktop
            layouts a Dialog usually fits better.
          </>
        }
      >
        <DrawerRoot disablePointerDismissal={!outsideClick}>
          <DrawerTrigger render={<Button variant="secondary" />}>
            Filters
          </DrawerTrigger>
          <DrawerContent>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerDescription>Narrow the results down.</DrawerDescription>
              </div>
              <FilterRow label="In stock only" defaultOn />
              <FilterRow label="On sale" />
              <FilterRow label="Free shipping" />
              <div style={{ alignSelf: "flex-end" }}>
                <DrawerClose render={<Button />}>Done</DrawerClose>
              </div>
            </div>
          </DrawerContent>
        </DrawerRoot>
      </Showcase>
      <Controls>
        <ControlRow label="Outside click">
          <Switch checked={outsideClick} onCheckedChange={setOutsideClick} />
        </ControlRow>
      </Controls>
    </>
  );
}
