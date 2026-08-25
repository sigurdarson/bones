import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Meter } from "./meter";

describe("Meter", () => {
  it("renders a named meter with label and value", () => {
    render(<Meter value={62} label="Storage used" showValue />);
    const meter = screen.getByRole("meter", { name: "Storage used" });
    expect(meter).toBeInTheDocument();
    expect(screen.getByText("62%")).toBeInTheDocument();
  });

  it("respects a custom range and format", () => {
    render(
      <Meter
        value={7}
        min={0}
        max={10}
        label="Seats filled"
        showValue
        format={{ style: "decimal" }}
      />,
    );
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "7");
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("warns without any label and stays silent with one", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Meter value={10} />);
    expect(warn).toHaveBeenCalledOnce();
    warn.mockClear();
    render(<Meter value={10} label="Storage" />);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("passes data attributes through", () => {
    render(<Meter value={30} label="Quota" data-tone="high" />);
    expect(screen.getByRole("meter")).toHaveAttribute("data-tone", "high");
  });
});
