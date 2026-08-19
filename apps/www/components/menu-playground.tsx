"use client";

import * as React from "react";
import {
  Button,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  compact: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ compact }: PlaygroundState): string {
  return `import {
  Button,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@usebones/react";

<MenuRoot${compact ? ' size="compact"' : ""}>
  <MenuTrigger render={<Button variant="secondary" />}>View</MenuTrigger>
  <MenuContent>
    <MenuItem>New folder</MenuItem>
    <MenuSeparator />
    <MenuCheckboxItem defaultChecked>Show hidden files</MenuCheckboxItem>
    <MenuSeparator />
    <MenuGroup>
      <MenuGroupLabel>Sort by</MenuGroupLabel>
      <MenuRadioGroup defaultValue="name">
        <MenuRadioItem value="name">Name</MenuRadioItem>
        <MenuRadioItem value="date">Date modified</MenuRadioItem>
        <MenuRadioItem value="size">Size</MenuRadioItem>
      </MenuRadioGroup>
    </MenuGroup>
  </MenuContent>
</MenuRoot>`;
}

export function MenuPlayground() {
  const [compact, setCompact] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ compact })}
        note={
          <>
            Checkbox and radio items stay open on click so the change is
            visible; plain items close the menu. Indicators render
            automatically.
          </>
        }
      >
        <MenuRoot size={compact ? "compact" : "default"}>
          <MenuTrigger render={<Button variant="secondary" />}>View</MenuTrigger>
          <MenuContent>
            <MenuItem>New folder</MenuItem>
            <MenuSeparator />
            <MenuCheckboxItem defaultChecked>Show hidden files</MenuCheckboxItem>
            <MenuSeparator />
            <MenuGroup>
              <MenuGroupLabel>Sort by</MenuGroupLabel>
              <MenuRadioGroup defaultValue="name">
                <MenuRadioItem value="name">Name</MenuRadioItem>
                <MenuRadioItem value="date">Date modified</MenuRadioItem>
                <MenuRadioItem value="size">Size</MenuRadioItem>
              </MenuRadioGroup>
            </MenuGroup>
          </MenuContent>
        </MenuRoot>
      </Showcase>
      <Controls>
        <ControlRow label="Compact">
          <Switch checked={compact} onCheckedChange={setCompact} />
        </ControlRow>
      </Controls>
    </>
  );
}
