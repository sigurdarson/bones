import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ToolbarButton,
  ToolbarGroup,
  ToolbarRoot,
  ToolbarSeparator,
} from "./toolbar";
import { Button } from "../button/button";
import { Toggle } from "../toggle/toggle";

function EditorToolbar({ disabled }: { disabled?: boolean }) {
  return (
    <ToolbarRoot aria-label="Formatting" disabled={disabled}>
      <ToolbarGroup>
        <ToolbarButton render={<Toggle aria-label="Bold" iconOnly />}>
          B
        </ToolbarButton>
        <ToolbarButton render={<Toggle aria-label="Italic" iconOnly />}>
          I
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton render={<Button variant="ghost" />}>Copy link</ToolbarButton>
    </ToolbarRoot>
  );
}

describe("Toolbar", () => {
  it("renders a named toolbar with a perpendicular separator", () => {
    render(<EditorToolbar />);
    expect(screen.getByRole("toolbar", { name: "Formatting" })).toBeInTheDocument();
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("data-orientation", "vertical");
    /* Shares the Separator component's class so the two restyle
       together. */
    expect(separator).toHaveClass("ub-separator");
  });

  it("is one tab stop; arrow keys move between controls", async () => {
    const user = userEvent.setup();
    render(<EditorToolbar />);

    await user.tab();
    expect(screen.getByRole("button", { name: "Bold" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "Italic" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "Copy link" })).toHaveFocus();
  });

  it("keeps the rendered control's behavior and classes", async () => {
    const user = userEvent.setup();
    render(<EditorToolbar />);
    const bold = screen.getByRole("button", { name: "Bold" });
    expect(bold).toHaveClass("ub-toolbar-button");
    expect(bold).toHaveClass("ub-toggle");
    await user.click(bold);
    expect(bold).toHaveAttribute("data-pressed");
  });

  it("disables everything from the root", () => {
    render(<EditorToolbar disabled />);
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute(
      "data-disabled",
    );
  });
});
