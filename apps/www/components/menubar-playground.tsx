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
  compact: boolean;
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ compact, disabled }: PlaygroundState): string {
  const menuSize = compact ? ' size="compact"' : "";
  const buttonSize = compact ? ' size="compact"' : "";
  return `import {
  Button,
  Menubar,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@usebones/react";

<Menubar${disabled ? " disabled" : ""}>
  <MenuRoot${menuSize}>
    <MenuTrigger render={<Button variant="ghost"${buttonSize} />}>
      File
    </MenuTrigger>
    <MenuContent>
      <MenuItem>New document</MenuItem>
      {/* ... */}
    </MenuContent>
  </MenuRoot>
  <MenuRoot${menuSize}>
    <MenuTrigger render={<Button variant="ghost"${buttonSize} />}>
      Edit
    </MenuTrigger>
    <MenuContent>{/* ... */}</MenuContent>
  </MenuRoot>
  <MenuRoot${menuSize}>
    <MenuTrigger render={<Button variant="ghost"${buttonSize} />}>
      View
    </MenuTrigger>
    <MenuContent>{/* ... */}</MenuContent>
  </MenuRoot>
</Menubar>`;
}

export function MenubarPlayground() {
  const [compact, setCompact] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const size = compact ? ("compact" as const) : ("default" as const);

  return (
    <>
      <Showcase
        code={buildCode({ compact, disabled })}
        note={
          <>
            Once a menu is open, Left and Right move along the bar (wrapping
            at the ends) and Escape closes it. Size lives on each{" "}
            <code>MenuRoot</code> and its ghost Button, not on the bar, so
            set both or the rows and triggers end up mismatched.
          </>
        }
      >
        <Menubar disabled={disabled}>
          <MenuRoot size={size}>
            <MenuTrigger render={<Button variant="ghost" size={size} />}>
              File
            </MenuTrigger>
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
          <MenuRoot size={size}>
            <MenuTrigger render={<Button variant="ghost" size={size} />}>
              Edit
            </MenuTrigger>
            <MenuContent>
              <MenuItem>Undo</MenuItem>
              <MenuItem>Redo</MenuItem>
              <MenuSeparator />
              <MenuItem>Find and replace</MenuItem>
            </MenuContent>
          </MenuRoot>
          <MenuRoot size={size}>
            <MenuTrigger render={<Button variant="ghost" size={size} />}>
              View
            </MenuTrigger>
            <MenuContent>
              <MenuCheckboxItem defaultChecked>Show sidebar</MenuCheckboxItem>
              <MenuCheckboxItem>Show word count</MenuCheckboxItem>
            </MenuContent>
          </MenuRoot>
        </Menubar>
      </Showcase>
      <Controls>
        <ControlRow label="Compact">
          <Switch checked={compact} onCheckedChange={setCompact} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
