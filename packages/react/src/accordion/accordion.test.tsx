import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
} from "./accordion";

function Faq(props: React.ComponentProps<typeof AccordionRoot>) {
  return (
    <AccordionRoot {...props}>
      <AccordionItem value="refunds">
        <AccordionTrigger>Can I get a refund?</AccordionTrigger>
        <AccordionPanel>Within 30 days, no questions asked.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="cancel">
        <AccordionTrigger>How do I cancel?</AccordionTrigger>
        <AccordionPanel>From billing settings, anytime.</AccordionPanel>
      </AccordionItem>
    </AccordionRoot>
  );
}

describe("Accordion", () => {
  it("renders headings and toggles a section", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    expect(screen.getAllByRole("heading")).toHaveLength(2);
    const trigger = screen.getByRole("button", { name: "Can I get a refund?" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText("Within 30 days, no questions asked."),
    ).toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps one section open at a time by default", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    await user.click(screen.getByRole("button", { name: "Can I get a refund?" }));
    await user.click(screen.getByRole("button", { name: "How do I cancel?" }));
    expect(
      screen.queryByText("Within 30 days, no questions asked."),
    ).not.toBeInTheDocument();
    expect(screen.getByText("From billing settings, anytime.")).toBeInTheDocument();
  });

  it("lets several sections stay open with multiple", async () => {
    const user = userEvent.setup();
    render(<Faq multiple />);

    await user.click(screen.getByRole("button", { name: "Can I get a refund?" }));
    await user.click(screen.getByRole("button", { name: "How do I cancel?" }));
    expect(
      screen.getByText("Within 30 days, no questions asked."),
    ).toBeInTheDocument();
    expect(screen.getByText("From billing settings, anytime.")).toBeInTheDocument();
  });

  it("keeps every trigger a keyboard stop", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    await user.tab();
    expect(
      screen.getByRole("button", { name: "Can I get a refund?" }),
    ).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "How do I cancel?" })).toHaveFocus();
  });
});
