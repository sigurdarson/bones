import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CollapsiblePanel,
  CollapsibleRoot,
  CollapsibleTrigger,
} from "./collapsible";

describe("Collapsible", () => {
  it("toggles the panel from the trigger", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <CollapsibleRoot onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
        <CollapsiblePanel>Custom domain and API access.</CollapsiblePanel>
      </CollapsibleRoot>,
    );

    const trigger = screen.getByRole("button", { name: "Advanced settings" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByText("Custom domain and API access."),
    ).not.toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("data-panel-open");
    expect(screen.getByText("Custom domain and API access.")).toBeInTheDocument();
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("starts open with defaultOpen", () => {
    render(
      <CollapsibleRoot defaultOpen>
        <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
        <CollapsiblePanel>Custom domain and API access.</CollapsiblePanel>
      </CollapsibleRoot>,
    );
    expect(screen.getByText("Custom domain and API access.")).toBeInTheDocument();
  });

  it("does not toggle while disabled", async () => {
    const user = userEvent.setup();
    render(
      <CollapsibleRoot disabled>
        <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
        <CollapsiblePanel>Custom domain and API access.</CollapsiblePanel>
      </CollapsibleRoot>,
    );
    await user.click(screen.getByRole("button", { name: "Advanced settings" }));
    expect(
      screen.queryByText("Custom domain and API access."),
    ).not.toBeInTheDocument();
  });
});
