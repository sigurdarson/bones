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
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Switch,
  type DrawerSide,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const sides: Record<DrawerSide, string> = {
  right: "Right",
  left: "Left",
  bottom: "Bottom",
};

interface PlaygroundState {
  side: DrawerSide;
  outsideClick: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ side, outsideClick }: PlaygroundState): string {
  const rootAttrs = [
    side !== "right" ? ` side="${side}"` : "",
    outsideClick ? "" : " disablePointerDismissal",
  ].join("");
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

<DrawerRoot${rootAttrs}>
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
  const [side, setSide] = React.useState<DrawerSide>("right");
  const [outsideClick, setOutsideClick] = React.useState(true);

  return (
    <>
      <Showcase
        code={buildCode({ side, outsideClick })}
        note={
          <>
            Modal like a dialog, plus swipe-to-dismiss on touch screens
            and a grab handle. Right and left are side panels for
            filters, carts, and inspectors; bottom is the mobile sheet.
          </>
        }
      >
        <DrawerRoot
          key={side}
          side={side}
          disablePointerDismissal={!outsideClick}
        >
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
        <ControlRow label="Side">
          <SelectRoot
            size="compact"
            items={sides}
            value={side}
            onValueChange={(value) => value && setSide(value as DrawerSide)}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {(Object.keys(sides) as DrawerSide[]).map((value) => (
                <SelectItem key={value} value={value}>
                  {sides[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
        <ControlRow label="Outside click">
          <Switch checked={outsideClick} onCheckedChange={setOutsideClick} />
        </ControlRow>
      </Controls>
    </>
  );
}
