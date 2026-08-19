import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "./menu";
import { Button } from "../button/button";

describe("Menu", () => {
  it("opens on click and runs an item's action, then closes", async () => {
    const user = userEvent.setup();
    const onRename = vi.fn();
    render(
      <MenuRoot>
        <MenuTrigger render={<Button variant="secondary" />}>Options</MenuTrigger>
        <MenuContent>
          <MenuItem onClick={onRename}>Rename</MenuItem>
          <MenuItem>Duplicate</MenuItem>
        </MenuContent>
      </MenuRoot>,
    );

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Options" }));
    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Options" })).toHaveAttribute(
      "data-popup-open",
    );

    await user.click(screen.getByRole("menuitem", { name: "Rename" }));
    expect(onRename).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });

  it("supports keyboard navigation from the trigger", async () => {
    const user = userEvent.setup();
    render(
      <MenuRoot>
        <MenuTrigger render={<Button variant="secondary" />}>Options</MenuTrigger>
        <MenuContent>
          <MenuItem>Rename</MenuItem>
          <MenuItem>Duplicate</MenuItem>
        </MenuContent>
      </MenuRoot>,
    );

    await user.tab();
    await user.keyboard("{ArrowDown}");
    await screen.findByRole("menu");
    await user.keyboard("{ArrowDown}");
    await waitFor(() =>
      expect(screen.getByRole("menuitem", { name: "Duplicate" })).toHaveAttribute(
        "data-highlighted",
      ),
    );
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
    expect(screen.getByRole("button", { name: "Options" })).toHaveFocus();
  });

  it("toggles a checkbox item without closing", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <MenuRoot>
        <MenuTrigger render={<Button variant="secondary" />}>View</MenuTrigger>
        <MenuContent>
          <MenuCheckboxItem defaultChecked onCheckedChange={onCheckedChange}>
            Show hidden files
          </MenuCheckboxItem>
        </MenuContent>
      </MenuRoot>,
    );

    await user.click(screen.getByRole("button", { name: "View" }));
    const item = await screen.findByRole("menuitemcheckbox", {
      name: "Show hidden files",
    });
    expect(item).toHaveAttribute("data-checked");

    await user.click(item);
    expect(onCheckedChange).toHaveBeenCalledWith(false, expect.anything());
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("selects one radio item per group", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <MenuRoot>
        <MenuTrigger render={<Button variant="secondary" />}>Sort</MenuTrigger>
        <MenuContent>
          <MenuRadioGroup defaultValue="name" onValueChange={onValueChange}>
            <MenuRadioItem value="name">Name</MenuRadioItem>
            <MenuRadioItem value="date">Date modified</MenuRadioItem>
          </MenuRadioGroup>
        </MenuContent>
      </MenuRoot>,
    );

    await user.click(screen.getByRole("button", { name: "Sort" }));
    expect(
      await screen.findByRole("menuitemradio", { name: "Name" }),
    ).toHaveAttribute("data-checked");

    await user.click(screen.getByRole("menuitemradio", { name: "Date modified" }));
    expect(onValueChange).toHaveBeenCalledWith("date", expect.anything());
  });

  it("carries the size from the root onto the popup", async () => {
    const user = userEvent.setup();
    render(
      <MenuRoot size="compact">
        <MenuTrigger render={<Button variant="secondary" />}>Options</MenuTrigger>
        <MenuContent>
          <MenuItem>Rename</MenuItem>
          <MenuSeparator />
          <MenuItem>Delete</MenuItem>
        </MenuContent>
      </MenuRoot>,
    );

    await user.click(screen.getByRole("button", { name: "Options" }));
    const menu = await screen.findByRole("menu");
    expect(menu).toHaveAttribute("data-size", "compact");
  });
});
