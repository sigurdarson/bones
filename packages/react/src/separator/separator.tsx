import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { withBase } from "../lib/with-base";

export interface SeparatorProps extends BaseSeparator.Props {}

/**
 * A line between things, wrapping the Base UI Separator: a hairline with
 * the proper separator semantics. Horizontal by default; set
 * orientation="vertical" inside rows and toolbars.
 */
export function Separator({ className, ...props }: SeparatorProps) {
  return (
    <BaseSeparator className={withBase("ub-separator", className)} {...props} />
  );
}
