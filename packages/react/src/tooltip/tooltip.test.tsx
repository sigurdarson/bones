import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TooltipContent, TooltipRoot, TooltipTrigger } from "./tooltip";
import { Button } from "../button/button";

function CopyTooltip() {
  return (
    <TooltipRoot>
      <TooltipTrigger delay={0} render={<Button iconOnly aria-label="Copy" />}>
        C
      </TooltipTrigger>
      <TooltipContent>Copy to clipboard</TooltipContent>
    </TooltipRoot>
  );
}

describe("Tooltip", () => {
  it("shows on hover and hides on unhover", async () => {
    const user = userEvent.setup();
    render(<CopyTooltip />);

    expect(screen.queryByText("Copy to clipboard")).not.toBeInTheDocument();
    await user.hover(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() =>
      expect(screen.getByText("Copy to clipboard")).toBeInTheDocument(),
    );

    await user.unhover(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() =>
      expect(screen.queryByText("Copy to clipboard")).not.toBeInTheDocument(),
    );
  });

  it("shows on keyboard focus", async () => {
    const user = userEvent.setup();
    render(<CopyTooltip />);

    await user.tab();
    expect(screen.getByRole("button", { name: "Copy" })).toHaveFocus();
    await waitFor(() =>
      expect(screen.getByText("Copy to clipboard")).toBeInTheDocument(),
    );
  });

  it("keeps the trigger's own accessible name through render", () => {
    render(<CopyTooltip />);
    const trigger = screen.getByRole("button", { name: "Copy" });
    expect(trigger).toHaveClass("ub-tooltip-trigger");
    expect(trigger).toHaveClass("ub-button");
  });
});
