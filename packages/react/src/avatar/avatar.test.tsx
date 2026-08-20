import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("shows the fallback without an image", () => {
    render(<Avatar fallback="AL" />);
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("shows the fallback while an image has not loaded", () => {
    render(<Avatar src="/ada.png" alt="Ada Lovelace" fallback="AL" />);
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("carries size and defaults", () => {
    const { container } = render(<Avatar fallback="AL" size="compact" />);
    expect(container.querySelector(".ub-avatar")).toHaveAttribute(
      "data-size",
      "compact",
    );
  });

  it("warns with an image but no alt, and stays silent with one", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Avatar src="/ada.png" fallback="AL" />);
    expect(warn).toHaveBeenCalledOnce();
    warn.mockClear();
    render(<Avatar src="/ada.png" alt="" fallback="AL" />);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
