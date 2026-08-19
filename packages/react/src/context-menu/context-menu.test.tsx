import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ContextMenuContent,
  ContextMenuRoot,
  ContextMenuTrigger,
} from "./context-menu";
import { MenuCheckboxItem, MenuItem, MenuSeparator } from "../menu/menu";

function FileContextMenu({ onRename }: { onRename?: () => void }) {
  return (
    <ContextMenuRoot>
      <ContextMenuTrigger>
        <div>quarterly-report.pdf</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <MenuItem onClick={onRename}>Rename</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuSeparator />
        <MenuCheckboxItem defaultChecked>Pinned</MenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenuRoot>
  );
}

describe("ContextMenu", () => {
  it("opens on right click and runs an item's action", async () => {
    const user = userEvent.setup();
    const onRename = vi.fn();
    render(<FileContextMenu onRename={onRename} />);

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    fireEvent.contextMenu(screen.getByText("quarterly-report.pdf"));
    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();

    await user.click(screen.getByRole("menuitem", { name: "Rename" }));
    expect(onRename).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });

  it("hosts the regular menu parts, checkbox state included", async () => {
    const user = userEvent.setup();
    render(<FileContextMenu />);

    fireEvent.contextMenu(screen.getByText("quarterly-report.pdf"));
    const pinned = await screen.findByRole("menuitemcheckbox", { name: "Pinned" });
    expect(pinned).toHaveAttribute("data-checked");

    await user.click(pinned);
    expect(pinned).not.toHaveAttribute("data-checked");
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("closes on Escape and carries the size from the root", async () => {
    const user = userEvent.setup();
    render(
      <ContextMenuRoot size="compact">
        <ContextMenuTrigger>
          <div>quarterly-report.pdf</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <MenuItem>Rename</MenuItem>
        </ContextMenuContent>
      </ContextMenuRoot>,
    );

    fireEvent.contextMenu(screen.getByText("quarterly-report.pdf"));
    const menu = await screen.findByRole("menu");
    expect(menu).toHaveAttribute("data-size", "compact");

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });
});
