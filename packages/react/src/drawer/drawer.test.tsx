import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { Button } from "../button/button";

function FiltersDrawer() {
  return (
    <DrawerRoot>
      <DrawerTrigger render={<Button variant="secondary" />}>Filters</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Filters</DrawerTitle>
        <DrawerDescription>Narrow the results down.</DrawerDescription>
        <DrawerClose render={<Button variant="ghost" />}>Done</DrawerClose>
      </DrawerContent>
    </DrawerRoot>
  );
}

describe("Drawer", () => {
  it("opens on click, named and described, with a backdrop", async () => {
    const user = userEvent.setup();
    render(<FiltersDrawer />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Filters" }));

    const drawer = await screen.findByRole("dialog", { name: "Filters" });
    expect(drawer).toHaveAccessibleDescription("Narrow the results down.");
    expect(document.querySelector(".ub-drawer-backdrop")).toBeInTheDocument();
  });

  it("closes from the close button and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<FiltersDrawer />);

    await user.click(screen.getByRole("button", { name: "Filters" }));
    await user.click(await screen.findByRole("button", { name: "Done" }));

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(screen.getByRole("button", { name: "Filters" })).toHaveFocus();
  });

  it("defaults to the right side and carries an explicit side onto the popup", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<FiltersDrawer />);
    await user.click(screen.getByRole("button", { name: "Filters" }));
    expect(await screen.findByRole("dialog")).toHaveAttribute(
      "data-side",
      "right",
    );
    unmount();

    render(
      <DrawerRoot side="bottom">
        <DrawerTrigger render={<Button variant="secondary" />}>Cart</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Cart</DrawerTitle>
        </DrawerContent>
      </DrawerRoot>,
    );
    await user.click(screen.getByRole("button", { name: "Cart" }));
    expect(await screen.findByRole("dialog")).toHaveAttribute(
      "data-side",
      "bottom",
    );
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<FiltersDrawer />);

    await user.click(screen.getByRole("button", { name: "Filters" }));
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});
