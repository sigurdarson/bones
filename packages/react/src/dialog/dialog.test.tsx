import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "../button/button";

function RenameDialog() {
  return (
    <DialogRoot>
      <DialogTrigger render={<Button variant="secondary" />}>Rename</DialogTrigger>
      <DialogContent>
        <DialogTitle>Rename project</DialogTitle>
        <DialogDescription>
          The new name shows up everywhere this project is linked.
        </DialogDescription>
        <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
      </DialogContent>
    </DialogRoot>
  );
}

describe("Dialog", () => {
  it("opens on click, named and described, with a backdrop", async () => {
    const user = userEvent.setup();
    render(<RenameDialog />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Rename" }));

    const dialog = await screen.findByRole("dialog", { name: "Rename project" });
    expect(dialog).toHaveAccessibleDescription(
      "The new name shows up everywhere this project is linked.",
    );
    expect(document.querySelector(".ub-dialog-backdrop")).toBeInTheDocument();
  });

  it("closes from the close button and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<RenameDialog />);

    await user.click(screen.getByRole("button", { name: "Rename" }));
    await user.click(await screen.findByRole("button", { name: "Cancel" }));

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(screen.getByRole("button", { name: "Rename" })).toHaveFocus();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<RenameDialog />);

    await user.click(screen.getByRole("button", { name: "Rename" }));
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("moves focus into the dialog when it opens", async () => {
    const user = userEvent.setup();
    render(<RenameDialog />);

    await user.click(screen.getByRole("button", { name: "Rename" }));
    const dialog = await screen.findByRole("dialog");
    await waitFor(() =>
      expect(dialog.contains(document.activeElement)).toBe(true),
    );
  });
});
