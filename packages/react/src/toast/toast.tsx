"use client";

import { Toast as BaseToast } from "@base-ui/react/toast";
import { withBase } from "../lib/with-base";

export interface ToastProviderProps extends BaseToast.Provider.Props {}

/**
 * Holds the toast queue; renders no element of its own. Wrap the app (or
 * the subtree that fires toasts) once, and mount one Toaster inside it.
 */
export function ToastProvider(props: ToastProviderProps) {
  return <BaseToast.Provider {...props} />;
}

/**
 * Fires toasts from anywhere under the provider:
 * const toast = useToast();
 * toast.add({ title: "Saved", description: "..." });
 * Also close, update, and promise (loading/success/error in one call).
 * Adding with an existing id updates that toast in place and refreshes
 * its timer, so repeat events collapse into one toast.
 */
export const useToast = BaseToast.useToastManager;

export type ToasterPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToasterProps extends BaseToast.Viewport.Props {
  /** Which corner (or edge center) the stack lives in. @default "bottom-right" */
  position?: ToasterPosition;
}

const successIcon = (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M5.5 8.2 7.2 9.9l3.3-3.8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const errorIcon = (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11" r="0.9" fill="currentColor" />
  </svg>
);

/**
 * Renders the toast stack, newest on top, bottom right by default. Mount
 * it once inside the ToastProvider; every toast added via useToast
 * appears here with a title, description, optional action, and a close
 * button. success and error types get an icon and tint automatically.
 * Hover (or focus with F6) to expand the stack; swipe or click to
 * dismiss, in the direction matching the corner.
 */
export function Toaster({
  className,
  position = "bottom-right",
  ...props
}: ToasterProps) {
  const { toasts } = BaseToast.useToastManager();

  const vertical = position.startsWith("top") ? ("up" as const) : ("down" as const);
  const swipeDirection = position.endsWith("left")
    ? ([vertical, "left"] as const)
    : position.endsWith("right")
      ? ([vertical, "right"] as const)
      : ([vertical] as const);

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport
        aria-label="Notifications"
        data-position={position}
        className={withBase("ub-toaster", className)}
        {...props}
      >
        {toasts.map((toast) => (
          <BaseToast.Root
            key={toast.id}
            toast={toast}
            swipeDirection={[...swipeDirection]}
            className="ub-toast"
          >
            {toast.type === "success" || toast.type === "error" ? (
              <span className="ub-toast-icon" aria-hidden>
                {toast.type === "success" ? successIcon : errorIcon}
              </span>
            ) : null}
            <BaseToast.Content className="ub-toast-content">
              <BaseToast.Title className="ub-toast-title" />
              <BaseToast.Description className="ub-toast-description" />
            </BaseToast.Content>
            <BaseToast.Action className="ub-toast-action" />
            <BaseToast.Close className="ub-toast-close" aria-label="Close notification">
              <svg viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M3 3l6 6M9 3l-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </BaseToast.Close>
          </BaseToast.Root>
        ))}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}
