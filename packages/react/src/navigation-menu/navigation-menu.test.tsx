import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./navigation-menu";

function SiteNav() {
  return (
    <NavigationMenuRoot delay={0} closeDelay={0}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/components">Components</NavigationMenuLink>
            <NavigationMenuLink href="/theming">Theming</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenuRoot>
  );
}

describe("NavigationMenu", () => {
  it("renders navigation semantics with plain links alongside triggers", () => {
    render(<SiteNav />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Product" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute(
      "href",
      "/pricing",
    );
  });

  it("opens the item's content with real links inside", async () => {
    const user = userEvent.setup();
    render(<SiteNav />);

    const trigger = screen.getByRole("button", { name: "Product" });
    await user.click(trigger);
    await waitFor(() => expect(trigger).toHaveAttribute("data-popup-open"));
    expect(
      await screen.findByRole("link", { name: "Components" }),
    ).toHaveAttribute("href", "/components");
  });

  it("renders inline submenu content in a viewport via defaultValue", () => {
    render(
      <NavigationMenuRoot inline orientation="vertical" defaultValue="theming">
        <NavigationMenuList>
          <NavigationMenuItem value="theming">
            <NavigationMenuTrigger>Theming</NavigationMenuTrigger>
            <NavigationMenuContent>Tokens everywhere.</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenuRoot>,
    );
    expect(screen.getByText("Tokens everywhere.")).toBeInTheDocument();
    expect(
      document.querySelector(".ub-navigation-menu-inline-viewport"),
    ).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<SiteNav />);

    await user.click(screen.getByRole("button", { name: "Product" }));
    await screen.findByRole("link", { name: "Components" });
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(
        screen.queryByRole("link", { name: "Components" }),
      ).not.toBeInTheDocument(),
    );
  });
});
