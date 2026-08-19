import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TabsList, TabsPanel, TabsRoot, TabsTab } from "./tabs";

function renderTabs(size?: "default" | "compact") {
  return render(
    <TabsRoot defaultValue="profile" size={size}>
      <TabsList>
        <TabsTab value="profile">Profile</TabsTab>
        <TabsTab value="billing">Billing</TabsTab>
        <TabsTab value="danger" disabled>
          Danger zone
        </TabsTab>
      </TabsList>
      <TabsPanel value="profile">Profile panel</TabsPanel>
      <TabsPanel value="billing">Billing panel</TabsPanel>
    </TabsRoot>,
  );
}

describe("Tabs", () => {
  it("renders tablist semantics and shows the default panel", () => {
    renderTabs();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Profile" })).toHaveAttribute("data-active");
    expect(screen.getByText("Profile panel")).toBeInTheDocument();
    expect(screen.queryByText("Billing panel")).not.toBeInTheDocument();
  });

  it("switches panels on click", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole("tab", { name: "Billing" }));
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveAttribute("data-active");
    expect(screen.getByText("Billing panel")).toBeInTheDocument();
    expect(screen.queryByText("Profile panel")).not.toBeInTheDocument();
  });

  it("does not activate a disabled tab", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole("tab", { name: "Danger zone" }));
    expect(screen.getByRole("tab", { name: "Profile" })).toHaveAttribute("data-active");
  });

  it("renders the sliding indicator automatically", () => {
    const { container } = renderTabs();
    expect(container.querySelector(".ub-tabs-indicator")).toBeInTheDocument();
  });

  it("carries size on the root, defaulting to default", () => {
    const { container, unmount } = renderTabs();
    expect(container.querySelector(".ub-tabs")).toHaveAttribute("data-size", "default");
    unmount();
    const { container: compact } = renderTabs("compact");
    expect(compact.querySelector(".ub-tabs")).toHaveAttribute("data-size", "compact");
  });

  it("warns when an icon-only tab has no accessible name", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <TabsRoot defaultValue="one">
        <TabsList>
          <TabsTab value="one" iconOnly>
            <svg />
          </TabsTab>
        </TabsList>
      </TabsRoot>,
    );
    expect(warn).toHaveBeenCalledOnce();
    warn.mockRestore();
  });
});
