import { useSyncExternalStore } from "react";

type Theme = "light" | "dark" | "matrix";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  const theme = document.documentElement.getAttribute("data-theme");
  return theme === "dark" || theme === "matrix" ? theme : "light";
}

function getServerSnapshot(): undefined {
  return undefined;
}

/** The HTML attribute is shared by the pre-paint script and both controls. */
export function useTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
