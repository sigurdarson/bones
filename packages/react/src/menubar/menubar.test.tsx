import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menubar } from "./menubar";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../menu/menu";
import { Button } from "../button/button";

function EditorMenubar({ onUndo }: { onUndo?: () => void }) {
  return (
    <Menubar>
      <MenuRoot>
        <MenuTrigger render={<Button variant="ghost" />}>File</MenuTrigger>
        <MenuContent>
          <MenuItem>New document</MenuItem>
          <MenuItem>Duplicate</MenuItem>
        </MenuContent>
      </MenuRoot>
      <MenuRoot>
        <MenuTrigger render={<Button variant="ghost" />}>Edit</MenuTrigger>
        <MenuContent>
          <MenuItem onClick={onUndo}>Undo</MenuItem>
          <MenuItem>Redo</MenuItem>
        </MenuContent>
      </MenuRoot>
    </Menubar>
  );
}

describe("Menubar", () => {
  it("renders menubar semantics around regular menus", () => {
    render(<EditorMenubar />);
    const menubar = screen.getByRole("menubar");
    expect(menubar).toHaveClass("ub-menubar");
    expect(screen.getByRole("menuitem", { name: "File" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();
  });

  it("opens a menu and runs its item", async () => {
    const user = userEvent.setup();
    const onUndo = vi.fn();
    render(<EditorMenubar onUndo={onUndo} />);

    await user.click(screen.getByRole("menuitem", { name: "Edit" }));
    await user.click(await screen.findByRole("menuitem", { name: "Undo" }));
    expect(onUndo).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });

  it("moves between triggers with arrow keys", async () => {
    const user = userEvent.setup();
    render(<EditorMenubar />);

    await user.tab();
    expect(screen.getByRole("menuitem", { name: "File" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
  });

  it("disables every trigger from the bar", () => {
    render(
      <Menubar disabled>
        <MenuRoot>
          <MenuTrigger render={<Button variant="ghost" />}>File</MenuTrigger>
          <MenuContent>
            <MenuItem>New document</MenuItem>
          </MenuContent>
        </MenuRoot>
      </Menubar>,
    );
    expect(screen.getByRole("menuitem", { name: "File" })).toHaveAttribute(
      "data-disabled",
    );
  });
});
