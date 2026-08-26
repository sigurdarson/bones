"use client";

import * as React from "react";
import {
  Button,
  Input,
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

const access: Record<string, string> = {
  collaborators: "Only collaborators",
  link: "Anyone with the link",
  me: "Only me",
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

const access = {
  collaborators: "Only collaborators",
  link: "Anyone with the link",
  me: "Only me",
};

<PopoverRoot>
  <PopoverTrigger render={<Button variant="secondary" />}>Share</PopoverTrigger>
  <PopoverContent${attrs}>
    <PopoverTitle>Invite to collaborate</PopoverTitle>
    <PopoverDescription>
      Add people by email, or copy a link for your team.
    </PopoverDescription>
    <Input placeholder="Add emails to invite people" />
    <SelectRoot items={access} defaultValue="collaborators">
      <SelectTrigger variant="borderless" />
      <SelectContent>
        <SelectItem value="collaborators">Only collaborators</SelectItem>
        <SelectItem value="link">Anyone with the link</SelectItem>
        <SelectItem value="me">Only me</SelectItem>
      </SelectContent>
    </SelectRoot>
    <Button>Copy link</Button>
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
            A share sheet composed from Bones parts: input, select, and
            button inside the popover. The title names the panel; Escape
            or an outside click dismisses it.
          </>
        }
      >
        <PopoverRoot>
          <PopoverTrigger render={<Button variant="secondary" />}>
            Share
          </PopoverTrigger>
          <PopoverContent
            side={side}
            align={align}
            style={{ width: "24rem", maxWidth: "24rem" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div>
                <PopoverTitle>Invite to collaborate</PopoverTitle>
                <PopoverDescription>
                  Add people by email, or copy a link for your team.
                </PopoverDescription>
              </div>
              <Input placeholder="Add emails to invite people" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                }}
              >
                <SelectRoot items={access} defaultValue="collaborators">
                  <SelectTrigger variant="borderless" />
                  <SelectContent>
                    <SelectItem value="collaborators">
                      Only collaborators
                    </SelectItem>
                    <SelectItem value="link">Anyone with the link</SelectItem>
                    <SelectItem value="me">Only me</SelectItem>
                  </SelectContent>
                </SelectRoot>
                <Button>Copy link</Button>
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
