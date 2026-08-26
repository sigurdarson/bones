"use client";

import * as React from "react";
import {
  Button,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  NumberField,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Separator,
  Switch,
  type DrawerSide,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const sides: Record<DrawerSide, string> = {
  right: "Right",
  left: "Left",
  bottom: "Bottom",
};

interface PlaygroundState {
  side: DrawerSide;
  outsideClick: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ side, outsideClick }: PlaygroundState): string {
  const rootAttrs = [
    side !== "right" ? ` side="${side}"` : "",
    outsideClick ? "" : " disablePointerDismissal",
  ].join("");
  return `import {
  Button,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  NumberField,
  Separator,
} from "@usebones/react";

<DrawerRoot${rootAttrs}>
  <DrawerTrigger render={<Button variant="secondary" />}>
    Cart (2)
  </DrawerTrigger>
  <DrawerContent>
    <DrawerTitle>Your cart</DrawerTitle>
    <DrawerDescription>Free shipping over $50.</DrawerDescription>
    {items.map((item) => (
      <CartRow key={item.name}>
        {/* name, price, and a NumberField for the quantity */}
      </CartRow>
    ))}
    <Separator />
    {/* subtotal row */}
    <DrawerClose render={<Button />}>Checkout</DrawerClose>
  </DrawerContent>
</DrawerRoot>`;
}

const items = [
  { name: "Cotton tee", meta: "Black, medium", price: 24 },
  { name: "Canvas tote", meta: "Natural", price: 18 },
];

function CartRow({
  item,
  quantity,
  onQuantityChange,
}: {
  item: (typeof items)[number];
  quantity: number;
  onQuantityChange: (next: number) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.75rem",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{item.name}</span>
        <span style={{ fontSize: "0.75rem", color: "var(--ub-text-secondary)" }}>
          {item.meta}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <NumberField
          min={0}
          max={9}
          value={quantity}
          onValueChange={(next) => onQuantityChange(next ?? 0)}
          aria-label={`${item.name} quantity`}
        />
        <span
          style={{
            fontSize: "0.875rem",
            fontVariantNumeric: "tabular-nums",
            minWidth: "2.5rem",
            textAlign: "end",
          }}
        >
          ${item.price * quantity}
        </span>
      </div>
    </div>
  );
}

export function DrawerPlayground() {
  const [side, setSide] = React.useState<DrawerSide>("right");
  const [outsideClick, setOutsideClick] = React.useState(true);
  const [quantities, setQuantities] = React.useState<number[]>([1, 1]);
  const subtotal = items.reduce(
    (sum, item, index) => sum + item.price * (quantities[index] ?? 0),
    0,
  );

  return (
    <>
      <Showcase
        code={buildCode({ side, outsideClick })}
        note={
          <>
            A cart panel composed from Bones parts: NumberFields for
            quantities and a live subtotal. Right and left are side
            panels; bottom is the mobile sheet.
          </>
        }
      >
        <DrawerRoot
          key={side}
          side={side}
          disablePointerDismissal={!outsideClick}
        >
          <DrawerTrigger render={<Button variant="secondary" />}>
            Cart ({quantities.reduce((sum, quantity) => sum + quantity, 0)})
          </DrawerTrigger>
          <DrawerContent>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <DrawerTitle>Your cart</DrawerTitle>
                <DrawerDescription>
                  {subtotal >= 50
                    ? "This order ships free."
                    : `Free shipping over $50; you're $${50 - subtotal} away.`}
                </DrawerDescription>
              </div>
              {items.map((item, index) => (
                <CartRow
                  key={item.name}
                  item={item}
                  quantity={quantities[index] ?? 0}
                  onQuantityChange={(next) =>
                    setQuantities((current) =>
                      current.map((quantity, i) => (i === index ? next : quantity)),
                    )
                  }
                />
              ))}
              <Separator />
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  fontSize: "0.875rem",
                }}
              >
                <span style={{ color: "var(--ub-text-secondary)" }}>Subtotal</span>
                <span
                  style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
                >
                  ${subtotal}
                </span>
              </div>
              <DrawerClose render={<Button />}>Checkout</DrawerClose>
            </div>
          </DrawerContent>
        </DrawerRoot>
      </Showcase>
      <Controls>
        <ControlRow label="Side">
          <SelectRoot
            size="compact"
            items={sides}
            value={side}
            onValueChange={(value) => value && setSide(value as DrawerSide)}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {(Object.keys(sides) as DrawerSide[]).map((value) => (
                <SelectItem key={value} value={value}>
                  {sides[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
        <ControlRow label="Outside click">
          <Switch checked={outsideClick} onCheckedChange={setOutsideClick} />
        </ControlRow>
      </Controls>
    </>
  );
}
