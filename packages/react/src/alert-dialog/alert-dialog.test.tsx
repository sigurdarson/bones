import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "../button/button";

function DeleteAlert({ onConfirm }: { onConfirm?: () => void }) {
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger render={<Button variant="danger" />}>
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete project?</AlertDialogTitle>
        <AlertDialogDescription>
          This permanently deletes the project and its history.
        </AlertDialogDescription>
        <AlertDialogClose render={<Button variant="ghost" />}>
          Cancel
        </AlertDialogClose>
        <AlertDialogClose render={<Button variant="danger" />} onClick={onConfirm}>
          Delete project
        </AlertDialogClose>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
}

describe("AlertDialog", () => {
  it("opens as an alertdialog, named and described", async () => {
    const user = userEvent.setup();
    render(<DeleteAlert />);

    await user.click(screen.getByRole("button", { name: "Delete" }));
    const alert = await screen.findByRole("alertdialog", {
      name: "Delete project?",
    });
    expect(alert).toHaveAccessibleDescription(
      "This permanently deletes the project and its history.",
    );
  });

  it("ignores outside clicks; only an explicit choice closes it", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<DeleteAlert onConfirm={onConfirm} />);

    await user.click(screen.getByRole("button", { name: "Delete" }));
    await screen.findByRole("alertdialog");

    await user.click(document.querySelector(".ub-alert-dialog-backdrop")!);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Delete project" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument(),
    );
  });

  it("cancels on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<DeleteAlert />);

    await user.click(screen.getByRole("button", { name: "Delete" }));
    await screen.findByRole("alertdialog");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument(),
    );
    expect(screen.getByRole("button", { name: "Delete" })).toHaveFocus();
  });
});
