"use client";

import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import { withBase } from "../lib/with-base";

export interface NavigationMenuRootProps extends BaseNavigationMenu.Root.Props {}

/**
 * Site navigation with rich dropdowns, wrapping the Base UI Navigation
 * Menu. One shared popup morphs between the open item's content instead
 * of opening a new one per item. The Portal, Positioner, Popup, and
 * Viewport are bundled here, so children are just the list.
 */
export function NavigationMenuRoot({
  className,
  children,
  ...props
}: NavigationMenuRootProps) {
  return (
    <BaseNavigationMenu.Root
      className={withBase("ub-navigation-menu", className)}
      {...props}
    >
      {children}
      <BaseNavigationMenu.Portal>
        <BaseNavigationMenu.Positioner
          className="ub-navigation-menu-positioner"
          sideOffset={8}
          collisionPadding={16}
        >
          <BaseNavigationMenu.Popup className="ub-navigation-menu-popup">
            <BaseNavigationMenu.Viewport className="ub-navigation-menu-viewport" />
          </BaseNavigationMenu.Popup>
        </BaseNavigationMenu.Positioner>
      </BaseNavigationMenu.Portal>
    </BaseNavigationMenu.Root>
  );
}

export interface NavigationMenuListProps extends BaseNavigationMenu.List.Props {}

/** The row of top-level items; arrow keys move between them. */
export function NavigationMenuList({ className, ...props }: NavigationMenuListProps) {
  return (
    <BaseNavigationMenu.List
      className={withBase("ub-navigation-menu-list", className)}
      {...props}
    />
  );
}

export interface NavigationMenuItemProps extends BaseNavigationMenu.Item.Props {}

/** One top-level entry: a Trigger with Content, or just a Link. */
export function NavigationMenuItem({ className, ...props }: NavigationMenuItemProps) {
  return (
    <BaseNavigationMenu.Item
      className={withBase("ub-navigation-menu-item", className)}
      {...props}
    />
  );
}

export interface NavigationMenuTriggerProps
  extends BaseNavigationMenu.Trigger.Props {}

/**
 * Opens the item's content on hover or click. Children become the label;
 * the chevron renders automatically and flips while open.
 */
export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <BaseNavigationMenu.Trigger
      className={withBase("ub-navigation-menu-trigger", className)}
      {...props}
    >
      {children}
      <BaseNavigationMenu.Icon className="ub-navigation-menu-chevron">
        <svg viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M3 4.5l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BaseNavigationMenu.Icon>
    </BaseNavigationMenu.Trigger>
  );
}

export interface NavigationMenuContentProps
  extends BaseNavigationMenu.Content.Props {}

/**
 * The item's dropdown content, rendered into the shared popup. Fill it
 * with NavigationMenuLinks (or any layout around them).
 */
export function NavigationMenuContent({
  className,
  ...props
}: NavigationMenuContentProps) {
  return (
    <BaseNavigationMenu.Content
      className={withBase("ub-navigation-menu-content", className)}
      {...props}
    />
  );
}

export interface NavigationMenuLinkProps extends BaseNavigationMenu.Link.Props {}

/**
 * A real anchor wired into the menu's keyboard navigation. Use it for
 * plain top-level items and for the links inside content; integrate a
 * router by rendering its Link: render={<Link href="..." />}.
 */
export function NavigationMenuLink({ className, ...props }: NavigationMenuLinkProps) {
  return (
    <BaseNavigationMenu.Link
      className={withBase("ub-navigation-menu-link", className)}
      {...props}
    />
  );
}
