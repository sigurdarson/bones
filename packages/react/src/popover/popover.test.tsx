import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";
import { Button } from "../button/button";

function SharePopover() {
  return (
    <PopoverRoot>
      <PopoverTrigger render={<Button variant="secondary" />}>Share</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Share this doc</PopoverTitle>
        <PopoverDescription>Anyone with the link can view.</PopoverDescription>
        <PopoverClose render={<Button variant="ghost" />}>Done</PopoverClose>
      </PopoverContent>
    </PopoverRoot>
  );
}

describe("Popover", () => {
  it("opens on click, named by its title", async () => {
    const user = userEvent.setup();
    render(<SharePopover />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Share" }));

    const popover = await screen.findByRole("dialog", { name: "Share this doc" });
    expect(popover).toHaveAccessibleDescription("Anyone with the link can view.");
    expect(screen.getByRole("button", { name: "Share" })).toHaveAttribute(
      "data-popup-open",
    );
  });

  it("closes from the close button and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<SharePopover />);

    await user.click(screen.getByRole("button", { name: "Share" }));
    await user.click(await screen.findByRole("button", { name: "Done" }));

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(screen.getByRole("button", { name: "Share" })).toHaveFocus();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<SharePopover />);

    await user.click(screen.getByRole("button", { name: "Share" }));
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});
