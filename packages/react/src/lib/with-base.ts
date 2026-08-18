import { cx } from "./cx";

type StateClassName<State> = string | ((state: State) => string | undefined) | undefined;

/* Base UI accepts className as a string or a function of component state;
   preserve both while prepending our class. */
export function withBase<State>(base: string, className: StateClassName<State>) {
  return (state: State) =>
    cx(base, typeof className === "function" ? className(state) : className);
}
