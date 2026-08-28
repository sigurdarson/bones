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
  <MenuTrigger render={<Button variant="secondary" />}>Display</MenuTrigger>
  <MenuContent>
    <MenuGroup>
      <MenuGroupLabel>Group by</MenuGroupLabel>
      <MenuRadioGroup defaultValue="status">
        <MenuRadioItem value="status">Status</MenuRadioItem>
        <MenuRadioItem value="assignee">Assignee</MenuRadioItem>
        <MenuRadioItem value="priority">Priority</MenuRadioItem>
      </MenuRadioGroup>
    </MenuGroup>
    <MenuSeparator />
    <MenuCheckboxItem defaultChecked>Show completed</MenuCheckboxItem>
    <MenuCheckboxItem>Show empty groups</MenuCheckboxItem>
    <MenuSeparator />
    <MenuItem>Reset to default</MenuItem>
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
            visible; plain items like Reset close the menu. Indicators
            render automatically.
          </>
        }
      >
        <MenuRoot size={compact ? "compact" : "default"}>
          <MenuTrigger render={<Button variant="secondary" />}>
            Display
          </MenuTrigger>
          <MenuContent>
            <MenuGroup>
              <MenuGroupLabel>Group by</MenuGroupLabel>
              <MenuRadioGroup defaultValue="status">
                <MenuRadioItem value="status">Status</MenuRadioItem>
                <MenuRadioItem value="assignee">Assignee</MenuRadioItem>
                <MenuRadioItem value="priority">Priority</MenuRadioItem>
              </MenuRadioGroup>
            </MenuGroup>
            <MenuSeparator />
            <MenuCheckboxItem defaultChecked>Show completed</MenuCheckboxItem>
            <MenuCheckboxItem>Show empty groups</MenuCheckboxItem>
            <MenuSeparator />
            <MenuItem>Reset to default</MenuItem>
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
