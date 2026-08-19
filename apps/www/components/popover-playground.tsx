"use client";

import * as React from "react";
import {
  Button,
  Input,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

type Side = "top" | "right" | "bottom" | "left";
type Align = "center" | "start" | "end";

const sides: Record<Side, string> = {
  top: "Top",
  right: "Right",
  bottom: "Bottom",
  left: "Left",
};

const aligns: Record<Align, string> = {
  center: "Center",
  start: "Start",
  end: "End",
};

interface PlaygroundState {
  side: Side;
  align: Align;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ side, align }: PlaygroundState): string {
  const attrs = [
    side !== "bottom" ? ` side="${side}"` : "",
    align !== "center" ? ` align="${align}"` : "",
  ].join("");
  return `import {
  Button,
  Input,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@usebones/react";

<PopoverRoot>
  <PopoverTrigger render={<Button variant="secondary" />}>Share</PopoverTrigger>
  <PopoverContent${attrs}>
    <PopoverTitle>Share this doc</PopoverTitle>
    <PopoverDescription>Anyone with the link can view.</PopoverDescription>
    <Input readOnly defaultValue="https://usebones.com/d/8f2k1" />
    <PopoverClose render={<Button variant="ghost" />}>Done</PopoverClose>
  </PopoverContent>
</PopoverRoot>`;
}

export function PopoverPlayground() {
  const [side, setSide] = React.useState<Side>("bottom");
  const [align, setAlign] = React.useState<Align>("center");

  return (
    <>
      <Showcase
        code={buildCode({ side, align })}
        note={
          <>
            Six parts. The title names the panel for screen readers, focus
            moves in on open and back to the trigger on close, and Escape
            or an outside click dismisses it.
          </>
        }
      >
        <PopoverRoot>
          <PopoverTrigger render={<Button variant="secondary" />}>
            Share
          </PopoverTrigger>
          <PopoverContent side={side} align={align}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
            >
              <div>
                <PopoverTitle>Share this doc</PopoverTitle>
                <PopoverDescription>
                  Anyone with the link can view.
                </PopoverDescription>
              </div>
              <Input readOnly defaultValue="https://usebones.com/d/8f2k1" />
              <div style={{ alignSelf: "flex-end" }}>
                <PopoverClose render={<Button variant="ghost" />}>
                  Done
                </PopoverClose>
              </div>
            </div>
          </PopoverContent>
        </PopoverRoot>
      </Showcase>
      <Controls>
        <ControlRow label="Side">
          <SelectRoot
            size="compact"
            items={sides}
            value={side}
            onValueChange={(value) => value && setSide(value as Side)}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {(Object.keys(sides) as Side[]).map((value) => (
                <SelectItem key={value} value={value}>
                  {sides[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
        <ControlRow label="Align">
          <SelectRoot
            size="compact"
            items={aligns}
            value={align}
            onValueChange={(value) => value && setAlign(value as Align)}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {(Object.keys(aligns) as Align[]).map((value) => (
                <SelectItem key={value} value={value}>
                  {aligns[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
      </Controls>
    </>
  );
}
