"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { withBase } from "../lib/with-base";

export interface DialogRootProps extends BaseDialog.Root.Props {}

/**
 * Holds open state; renders no element of its own. Modal by default: the
 * page behind is dimmed and inert, and focus is trapped until it closes.
 */
export function DialogRoot(props: DialogRootProps) {
  return <BaseDialog.Root {...props} />;
}

export interface DialogTriggerProps extends BaseDialog.Trigger.Props {}

/**
 * The button that opens the dialog. Usually wraps an existing control via
 * render (render={<Button ... />}); carries data-popup-open while open.
 */
export function DialogTrigger({ className, ...props }: DialogTriggerProps) {
  return (
    <BaseDialog.Trigger
      className={withBase("ub-dialog-trigger", className)}
      {...props}
    />
  );
}

export interface DialogContentProps extends BaseDialog.Popup.Props {}

/**
 * The dialog window. Bundles the Base UI Portal, Backdrop, Viewport, and
 * Popup so usage stays small: centered over a scrim, scrollable when
 * taller than the screen. Escape closes it; focus returns to the trigger.
 */
export function DialogContent({ className, children, ...props }: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="ub-dialog-backdrop" />
      <BaseDialog.Viewport className="ub-dialog-viewport">
        <BaseDialog.Popup
          className={withBase("ub-dialog-popup", className)}
          {...props}
        >
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  );
}

export interface DialogTitleProps extends BaseDialog.Title.Props {}

/** The dialog's heading; names the dialog for screen readers. */
export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title className={withBase("ub-dialog-title", className)} {...props} />
  );
}

export interface DialogDescriptionProps extends BaseDialog.Description.Props {}

/** Supporting text, linked to the dialog via aria-describedby. */
export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      className={withBase("ub-dialog-description", className)}
      {...props}
    />
  );
}

export interface DialogCloseProps extends BaseDialog.Close.Props {}

/** A button that closes the dialog. Usually wraps a Bones Button via render. */
export function DialogClose({ className, ...props }: DialogCloseProps) {
  return (
    <BaseDialog.Close className={withBase("ub-dialog-close", className)} {...props} />
  );
}
