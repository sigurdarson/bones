import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  PreviewCardContent,
  PreviewCardRoot,
  PreviewCardTrigger,
} from "./preview-card";

function ProfileLink() {
  return (
    <p>
      Written by{" "}
      <PreviewCardRoot>
        <PreviewCardTrigger href="/people/ada" delay={0}>
          Ada Lovelace
        </PreviewCardTrigger>
        <PreviewCardContent>
          <p>First programmer; wrote the notes on the Analytical Engine.</p>
        </PreviewCardContent>
      </PreviewCardRoot>
    </p>
  );
}

describe("PreviewCard", () => {
  it("renders a real link and shows the preview on hover", async () => {
    const user = userEvent.setup();
    render(<ProfileLink />);

    const link = screen.getByRole("link", { name: "Ada Lovelace" });
    expect(link).toHaveAttribute("href", "/people/ada");
    expect(
      screen.queryByText(/First programmer/),
    ).not.toBeInTheDocument();

    await user.hover(link);
    await waitFor(() =>
      expect(screen.getByText(/First programmer/)).toBeInTheDocument(),
    );

    await user.unhover(link);
    await waitFor(() =>
      expect(screen.queryByText(/First programmer/)).not.toBeInTheDocument(),
    );
  });

  it("marks the trigger while the preview is open", async () => {
    const user = userEvent.setup();
    render(<ProfileLink />);

    const link = screen.getByRole("link", { name: "Ada Lovelace" });
    await user.hover(link);
    await waitFor(() => expect(link).toHaveAttribute("data-popup-open"));
    expect(link).toHaveClass("ub-preview-card-trigger");
  });
});
