"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { withBase } from "../lib/with-base";

export interface AlertDialogRootProps extends BaseAlertDialog.Root.Props {}

/**
 * Holds open state; renders no element of its own. For confirmations that
 * interrupt on purpose: always modal, and outside clicks never dismiss.
 * Escape still cancels, and closing always returns focus to the trigger.
 */
export function AlertDialogRoot(props: AlertDialogRootProps) {
  return <BaseAlertDialog.Root {...props} />;
}

export interface AlertDialogTriggerProps extends BaseAlertDialog.Trigger.Props {}

/**
 * The button that opens the alert. Usually wraps an existing control via
 * render (render={<Button ... />}); carries data-popup-open while open.
 */
export function AlertDialogTrigger({ className, ...props }: AlertDialogTriggerProps) {
  return (
    <BaseAlertDialog.Trigger
      className={withBase("ub-alert-dialog-trigger", className)}
      {...props}
    />
  );
}

export interface AlertDialogContentProps extends BaseAlertDialog.Popup.Props {}

/**
 * The alert window. Bundles the Base UI Portal, Backdrop, Viewport, and
 * Popup so usage stays small; centered over a scrim, scrollable when
 * taller than the screen.
 */
export function AlertDialogContent({
  className,
  children,
  ...props
}: AlertDialogContentProps) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className="ub-alert-dialog-backdrop" />
      <BaseAlertDialog.Viewport className="ub-alert-dialog-viewport">
        <BaseAlertDialog.Popup
          className={withBase("ub-alert-dialog-popup", className)}
          {...props}
        >
          {children}
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Viewport>
    </BaseAlertDialog.Portal>
  );
}

export interface AlertDialogTitleProps extends BaseAlertDialog.Title.Props {}

/** The alert's heading; names the dialog for screen readers. */
export function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return (
    <BaseAlertDialog.Title
      className={withBase("ub-alert-dialog-title", className)}
      {...props}
    />
  );
}

export interface AlertDialogDescriptionProps
  extends BaseAlertDialog.Description.Props {}

/** Supporting text, linked to the dialog via aria-describedby. */
export function AlertDialogDescription({
  className,
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <BaseAlertDialog.Description
      className={withBase("ub-alert-dialog-description", className)}
      {...props}
    />
  );
}

export interface AlertDialogCloseProps extends BaseAlertDialog.Close.Props {}

/**
 * A button that closes the alert. Render one per choice (Cancel and the
 * action itself), usually wrapping bones Buttons via render.
 */
export function AlertDialogClose({ className, ...props }: AlertDialogCloseProps) {
  return (
    <BaseAlertDialog.Close
      className={withBase("ub-alert-dialog-close", className)}
      {...props}
    />
  );
}
