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
 */
export const useToast = BaseToast.useToastManager;

export interface ToasterProps extends BaseToast.Viewport.Props {}

/**
 * Renders the toast stack, newest on top, bottom right. Mount it once
 * inside the ToastProvider; every toast added via useToast appears here
 * with a title, description, optional action, and a close button. Hover
 * (or focus with F6) to expand the stack; swipe or click to dismiss.
 */
export function Toaster({ className, ...props }: ToasterProps) {
  const { toasts } = BaseToast.useToastManager();
  return (
    <BaseToast.Portal>
      <BaseToast.Viewport
        aria-label="Notifications"
        className={withBase("ub-toaster", className)}
        {...props}
      >
        {toasts.map((toast) => (
          <BaseToast.Root key={toast.id} toast={toast} className="ub-toast">
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
