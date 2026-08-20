import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AvatarGroup } from "./avatar-group";
import { Avatar } from "../avatar/avatar";

function Team({ max, size }: { max?: number; size?: "default" | "compact" }) {
  return (
    <AvatarGroup max={max} size={size} data-testid="group">
      <Avatar fallback="AL" />
      <Avatar fallback="GH" />
      <Avatar fallback="KJ" />
      <Avatar fallback="MB" />
      <Avatar fallback="RT" />
    </AvatarGroup>
  );
}

describe("AvatarGroup", () => {
  it("shows every avatar when max is not set", () => {
    render(<Team />);
    for (const initials of ["AL", "GH", "KJ", "MB", "RT"]) {
      expect(screen.getByText(initials)).toBeInTheDocument();
    }
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  it("collapses everything past max into a +N chip", () => {
    render(<Team max={3} />);
    expect(screen.getByText("AL")).toBeInTheDocument();
    expect(screen.getByText("KJ")).toBeInTheDocument();
    expect(screen.queryByText("MB")).not.toBeInTheDocument();
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("shows no chip when the avatars fit within max", () => {
    render(
      <AvatarGroup max={3}>
        <Avatar fallback="AL" />
        <Avatar fallback="GH" />
      </AvatarGroup>,
    );
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  it("sizes the chip and merges the consumer className", () => {
    render(<Team max={2} size="compact" />);
    const chip = screen.getByText("+3");
    expect(chip).toHaveAttribute("data-size", "compact");

    render(
      <AvatarGroup className="extra" data-testid="plain">
        <Avatar fallback="AL" />
      </AvatarGroup>,
    );
    const group = screen.getByTestId("plain");
    expect(group).toHaveClass("ub-avatar-group");
    expect(group).toHaveClass("extra");
  });
});
