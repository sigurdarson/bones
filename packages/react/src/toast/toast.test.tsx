import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider, Toaster, useToast } from "./toast";
import { Button } from "../button/button";

function SaveDemo() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast.add({
          title: "Changes saved",
          description: "Your profile is up to date.",
          type: "success",
          actionProps: { children: "Undo" },
        })
      }
    >
      Save
    </Button>
  );
}

function App() {
  return (
    <ToastProvider>
      <SaveDemo />
      <Toaster />
    </ToastProvider>
  );
}

describe("Toast", () => {
  it("adds a toast with title, description, action, and close", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByText("Changes saved")).toBeInTheDocument();
    expect(screen.getByText("Your profile is up to date.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
    /* The close button stays aria-hidden until the stack is expanded
       (hover or F6); screen readers hear the live region instead, so it
       has no computed name here and we assert the label directly. */
    const close = document.querySelector(".ub-toast-close");
    expect(close).toBeInTheDocument();
    expect(close).toHaveAttribute("aria-label", "Close notification");
  });

  it("carries the type as a data attribute for styling", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("Changes saved");
    expect(document.querySelector(".ub-toast")).toHaveAttribute(
      "data-type",
      "success",
    );
  });

  it("dismisses from the close button", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("Changes saved");
    await user.click(document.querySelector(".ub-toast-close")!);
    await waitFor(() =>
      expect(screen.queryByText("Changes saved")).not.toBeInTheDocument(),
    );
  });

  it("auto-dismisses after the provider timeout", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider timeout={100}>
        <SaveDemo />
        <Toaster />
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByText("Changes saved")).toBeInTheDocument();

    await waitFor(
      () => expect(screen.queryByText("Changes saved")).not.toBeInTheDocument(),
      { timeout: 3000 },
    );
  });
});
