"use client";

import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { withBase } from "../lib/with-base";

export interface MenubarProps extends BaseMenubar.Props {}

/**
 * A horizontal strip of menus (File, Edit, View), wrapping the Base UI
 * Menubar. Put regular Bones Menus inside: MenuRoot + MenuTrigger
 * (attach a ghost Button via render) + MenuContent with the usual items.
 * One menu open at a time; once open, hovering another trigger switches
 * to it, and arrow keys move along the bar.
 */
export function Menubar({ className, ...props }: MenubarProps) {
  return (
    <BaseMenubar className={withBase("ub-menubar", className)} {...props} />
  );
}
