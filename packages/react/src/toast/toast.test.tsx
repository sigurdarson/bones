import * as React from "react";
import { describe, expect, it } from "vitest";
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
    expect(document.querySelector(".ub-toast-icon")).toBeInTheDocument();
  });

  it("positions the stack via the position prop", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <SaveDemo />
        <Toaster position="top-center" />
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("Changes saved");
    expect(document.querySelector(".ub-toaster")).toHaveAttribute(
      "data-position",
      "top-center",
    );
  });

  it("updates in place when adding with an existing id", async () => {
    const user = userEvent.setup();
    function SyncDemo() {
      const toast = useToast();
      const count = React.useRef(0);
      return (
        <Button
          onClick={() => {
            count.current += 1;
            toast.add({ id: "sync", title: `Synced ${count.current} files` });
          }}
        >
          Sync
        </Button>
      );
    }
    render(
      <ToastProvider>
        <SyncDemo />
        <Toaster />
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Sync" }));
    await user.click(screen.getByRole("button", { name: "Sync" }));
    expect(await screen.findByText("Synced 2 files")).toBeInTheDocument();
    expect(document.querySelectorAll(".ub-toast")).toHaveLength(1);
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
