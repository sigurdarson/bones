"use client";

import * as React from "react";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { withBase } from "../lib/with-base";

export interface AvatarProps extends BaseAvatar.Root.Props {
  /** Image URL; the fallback shows while it loads and if it fails. */
  src?: string;
  /**
   * The person's name for the image. Pass an empty string only when the
   * avatar is decorative (their name is already visible beside it).
   */
  alt?: string;
  /** What shows without an image: initials, or an icon. */
  fallback?: React.ReactNode;
  /** Two sizes only: default is 36px, compact is 28px. @default "default" */
  size?: "default" | "compact";
}

/**
 * A person, as a picture or initials, wrapping the Base UI Avatar. The
 * image and fallback are managed automatically: the fallback renders
 * until the image has actually loaded, and stays if it fails. Always
 * round, independent of the radius setting.
 */
export function Avatar({
  className,
  src,
  alt,
  fallback,
  size = "default",
  ...props
}: AvatarProps) {
  if (process.env.NODE_ENV !== "production" && src && alt == null) {
    console.warn(
      "Bones: an Avatar with an image needs alt (the person's name), or alt=\"\" when the name is already visible beside it.",
    );
  }
  return (
    <BaseAvatar.Root
      data-size={size}
      className={withBase("ub-avatar", className)}
      {...props}
    >
      {src ? (
        <BaseAvatar.Image className="ub-avatar-image" src={src} alt={alt} />
      ) : null}
      <BaseAvatar.Fallback className="ub-avatar-fallback">
        {fallback}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
