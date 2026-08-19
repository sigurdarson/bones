"use client";

import * as React from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { withBase } from "../lib/with-base";

export interface SliderProps extends BaseSlider.Root.Props {
  /** Accessible name for the thumb (or thumbs, suffixed by index for ranges). */
  "aria-label"?: string;
}

/**
 * A slider, wrapping the Base UI Slider parts. Track, filled indicator,
 * and thumbs render automatically; pass an array value for a range and a
 * thumb appears per entry. Arrow keys step, home/end jump.
 */
export function Slider({ className, "aria-label": ariaLabel, ...props }: SliderProps) {
  const raw = props.value ?? props.defaultValue;
  const thumbCount = Array.isArray(raw) ? raw.length : 1;

  return (
    <BaseSlider.Root className={withBase("ub-slider", className)} {...props}>
      <BaseSlider.Control className="ub-slider-control">
        <BaseSlider.Track className="ub-slider-track">
          <BaseSlider.Indicator className="ub-slider-indicator" />
          {Array.from({ length: thumbCount }, (_, index) => (
            <BaseSlider.Thumb
              key={index}
              className="ub-slider-thumb"
              aria-label={
                thumbCount > 1 && ariaLabel ? `${ariaLabel} ${index + 1}` : ariaLabel
              }
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
