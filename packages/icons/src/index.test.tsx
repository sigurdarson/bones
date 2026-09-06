import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { Icon, IconProvider, defaultIcons } from "./index";

/* An app grows the vocabulary by augmenting the registry. */
declare module "./index" {
  interface IconRegistry {
    rocket: true;
    "thumbs-up": true;
  }
}

function Rocket(props: React.SVGProps<SVGSVGElement>) {
  return <svg data-testid="rocket" {...props} />;
}

describe("Icon", () => {
  it("renders a built-in name from the default set, hidden from screen readers", () => {
    const { container } = render(<Icon name="search" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(defaultIcons.search).toBeDefined();
  });

  it("renders an added name from the glyph the provider supplies", () => {
    const { getByTestId } = render(
      <IconProvider icons={{ rocket: Rocket }}>
        <Icon name="rocket" />
      </IconProvider>,
    );
    expect(getByTestId("rocket")).toBeInTheDocument();
  });

  it("renders nothing and warns once for an added name with no glyph", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { container, rerender } = render(<Icon name="thumbs-up" />);
    expect(container.querySelector("svg")).toBeNull();
    rerender(<Icon name="thumbs-up" />);
    expect(warn).toHaveBeenCalledOnce();
    warn.mockRestore();
  });

  it("rejects names outside the vocabulary at compile time", () => {
    // @ts-expect-error not in the registry
    const bad = <Icon name="rockett" />;
    expect(bad).toBeDefined();
  });
});
