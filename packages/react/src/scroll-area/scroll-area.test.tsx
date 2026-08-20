import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScrollArea } from "./scroll-area";

describe("ScrollArea", () => {
  it("renders the content inside a viewport", () => {
    render(
      <ScrollArea style={{ height: "8rem" }} data-testid="area">
        <p>Release notes</p>
      </ScrollArea>,
    );
    const area = screen.getByTestId("area");
    expect(area).toHaveClass("ub-scroll-area");
    expect(screen.getByText("Release notes")).toBeInTheDocument();
    expect(area.querySelector(".ub-scroll-area-viewport")).toBeInTheDocument();
  });

  it("merges the consumer className and passes props through", () => {
    render(
      <ScrollArea className="extra" aria-label="Release notes" data-testid="area">
        <p>Content</p>
      </ScrollArea>,
    );
    const area = screen.getByTestId("area");
    expect(area).toHaveClass("extra");
    expect(area).toHaveAttribute("aria-label", "Release notes");
  });
});
