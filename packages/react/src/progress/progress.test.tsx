import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "./progress";

describe("Progress", () => {
  it("renders a named progressbar with label and value", () => {
    render(<Progress value={40} label="Uploading" showValue />);
    const bar = screen.getByRole("progressbar", { name: "Uploading" });
    expect(bar).toBeInTheDocument();
    expect(screen.getByText("40%")).toBeInTheDocument();
  });

  it("goes indeterminate with value={null}", () => {
    render(<Progress value={null} aria-label="Working" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-indeterminate");
  });

  it("warns without any label and stays silent with one", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Progress value={10} />);
    expect(warn).toHaveBeenCalledOnce();
    warn.mockClear();
    render(<Progress value={10} aria-label="Upload" />);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
