import * as React from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  ArrowLeft02Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
  Cancel01Icon,
  Copy01Icon,
  CreditCardIcon,
  InformationCircleIcon,
  Loading03Icon,
  Moon02Icon,
  Notification01Icon,
  Search01Icon,
  Sun01Icon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  Tick02Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import type { IconComponent, IconSet } from "@usebones/icons";

/* Adapts a Hugeicons glyph to the plain SVG component shape the Bones icon
   adapter expects. */
function wrap(icon: IconSvgElement): IconComponent {
  return function WrappedHugeicon(props: React.SVGProps<SVGSVGElement>) {
    return <HugeiconsIcon icon={icon} {...(props as object)} />;
  };
}

export const hugeicons: IconSet = {
  "align-center": wrap(TextAlignCenterIcon),
  "align-left": wrap(TextAlignLeftIcon),
  "align-right": wrap(TextAlignRightIcon),
  "arrow-left": wrap(ArrowLeft02Icon),
  "arrow-right": wrap(ArrowRight02Icon),
  bell: wrap(Notification01Icon),
  bold: wrap(TextBoldIcon),
  check: wrap(Tick02Icon),
  "chevron-down": wrap(ArrowDown01Icon),
  "chevron-right": wrap(ArrowRight01Icon),
  close: wrap(Cancel01Icon),
  copy: wrap(Copy01Icon),
  "credit-card": wrap(CreditCardIcon),
  info: wrap(InformationCircleIcon),
  italic: wrap(TextItalicIcon),
  loader: wrap(Loading03Icon),
  moon: wrap(Moon02Icon),
  search: wrap(Search01Icon),
  sun: wrap(Sun01Icon),
  underline: wrap(TextUnderlineIcon),
  user: wrap(UserIcon),
};
