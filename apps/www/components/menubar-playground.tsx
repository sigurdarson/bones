"use client";

import * as React from "react";
import {
  Button,
  Menubar,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSeparator,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
  MenuTrigger,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ disabled }: PlaygroundState): string {
  return `import {
  Button,
  Menubar,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@usebones/react";

<Menubar${disabled ? " disabled" : ""}>
  <MenuRoot>
    <MenuTrigger render={<Button variant="ghost" />}>File</MenuTrigger>
    <MenuContent>
      <MenuItem>New document</MenuItem>
      {/* ... */}
    </MenuContent>
  </MenuRoot>
  <MenuRoot>
    <MenuTrigger render={<Button variant="ghost" />}>Edit</MenuTrigger>
    <MenuContent>{/* ... */}</MenuContent>
  </MenuRoot>
  <MenuRoot>
    <MenuTrigger render={<Button variant="ghost" />}>View</MenuTrigger>
    <MenuContent>{/* ... */}</MenuContent>
  </MenuRoot>
</Menubar>`;
}

export function MenubarPlayground() {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ disabled })}
        note={
          <>
            A strip of regular bones Menus: once one is open, hovering
            another trigger switches to it, and everything inside is the
            usual Menu vocabulary, submenus and checkbox items included.
          </>
        }
      >
        <Menubar disabled={disabled}>
          <MenuRoot>
            <MenuTrigger render={<Button variant="ghost" />}>File</MenuTrigger>
            <MenuContent>
              <MenuItem>New document</MenuItem>
              <MenuItem>Duplicate</MenuItem>
              <MenuSeparator />
              <MenuSubmenuRoot>
                <MenuSubmenuTrigger>Export as</MenuSubmenuTrigger>
                <MenuContent>
                  <MenuItem>Markdown</MenuItem>
                  <MenuItem>PDF</MenuItem>
                </MenuContent>
              </MenuSubmenuRoot>
            </MenuContent>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button variant="ghost" />}>Edit</MenuTrigger>
            <MenuContent>
              <MenuItem>Undo</MenuItem>
              <MenuItem>Redo</MenuItem>
              <MenuSeparator />
              <MenuItem>Find and replace</MenuItem>
            </MenuContent>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button variant="ghost" />}>View</MenuTrigger>
            <MenuContent>
              <MenuCheckboxItem defaultChecked>Show sidebar</MenuCheckboxItem>
              <MenuCheckboxItem>Show word count</MenuCheckboxItem>
            </MenuContent>
          </MenuRoot>
        </Menubar>
      </Showcase>
      <Controls>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
