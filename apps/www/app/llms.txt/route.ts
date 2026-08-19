export const dynamic = "force-static";

/* llms.txt: a machine-readable summary of the library for AI tools.
   Served at /llms.txt, linked from the sidebar. */
const content = `# bones

> bones is a minimal, themable React component library built on Base UI.
> All design values are CSS custom properties prefixed --ub-. Components are
> styled through class names (ub-<component>) and data attributes, never
> inline styles, so they can be restyled without forking.

## Install

- pnpm add @usebones/react @usebones/tokens (components + tokens)
- pnpm add @usebones/icons (optional icon adapter, Lucide default)
- Import once: "@usebones/tokens/index.css" then "@usebones/react/styles.css"
- Use explicit .css paths in imports; TypeScript 7 rejects extensionless
  side-effect CSS imports.

## Theming

- Dark mode: data-theme="dark" (canonical; .dark also works) on <html> or
  any subtree.
- Pill radius: data-radius="pill" on <html> or any subtree.
- Components read semantic tokens only: --ub-bg, --ub-surface,
  --ub-text-primary, --ub-text-secondary, --ub-border, --ub-accent,
  --ub-ring, --ub-danger, --ub-success, --ub-warning, --ub-info. Override
  these to retheme; never fork CSS.
- Raw scales (50 to 950, shared lightness ladder): gray, red, orange,
  green, teal, blue, violet, fuchsia, rose. Themes reference these;
  components never do.
- Motion: --ub-duration-fast/base/slow and --ub-ease-out/in-out/spring.
  Durations collapse to zero under prefers-reduced-motion.
- Prebuilt accent themes: import "@usebones/tokens/themes/<scale>.css"
  (blue, violet, teal, fuchsia, rose, red, orange, green).
- No theme provider and no config file: attributes and tokens are the
  configuration API. JS context exists only where CSS cannot express the
  need (the icon set).

## Components

- AlertDialog: a confirmation that interrupts on purpose. Same six-part
  shape as Dialog (Root/Trigger/Content/Title/Description/Close) but
  always modal and outside clicks never dismiss; Escape cancels. One
  AlertDialogClose per choice (Cancel ghost, action primary or danger
  with onClick). Use only for hard-to-undo actions.
- Button: variants primary | secondary | ghost | danger, sizes default |
  compact, iconOnly. Icons are children. Native button props pass through;
  type defaults to "button". Anchors can reuse the styling:
  class="ub-button" data-variant="...".
- Checkbox: checked/defaultChecked/onCheckedChange/indeterminate/disabled.
  Style states via [data-checked], [data-indeterminate], [data-disabled].
- CheckboxGroup: wraps Checkboxes (each joins via value); defaultValue or
  value + onValueChange (string arrays); allValues + <Checkbox parent />
  for select-all with indeterminate; disabled disables members.
- Dialog: DialogRoot (modal default true, disablePointerDismissal) +
  DialogTrigger (attach via render={<Button/>}) + DialogContent (bundles
  backdrop and centered scrollable viewport) + DialogTitle /
  DialogDescription (wire the accessible name/description) + DialogClose
  (render several for Cancel/Save). Escape closes; focus is trapped and
  returned.
- Field: FieldRoot (disabled, invalid, name, validate) + FieldLabel +
  FieldDescription + FieldError (match). Wrap any bones form control;
  validation state flows to it automatically.
- Fieldset: FieldsetRoot (disabled) + FieldsetLegend; groups Fields under
  one legend; disabled switches off every control inside, natively.
- Form: wraps Fields; onFormSubmit(values) fires once all fields are
  valid, values keyed by Field name; validationMode onSubmit (default) |
  onBlur | onChange; errors maps server errors onto fields by name
  (render a bare FieldError in that field).
- Input: two sizes; variants default | borderless; leadingIcon and
  trailingIcon (ReactNode), hint (linked via aria-describedby), invalid.
  Native input props pass through (bones size prop replaces the native
  size attribute). States via [data-focused], [data-filled],
  [data-invalid].
- Menu: MenuRoot (size) + MenuTrigger (attach via render={<Button/>}) +
  MenuContent + MenuItem (closeOnClick default true) + MenuCheckboxItem /
  MenuRadioGroup + MenuRadioItem (stay open, auto indicators) +
  MenuGroup/MenuGroupLabel + MenuSeparator + MenuSubmenuRoot +
  MenuSubmenuTrigger (auto chevron). States via [data-highlighted],
  [data-checked], [data-popup-open].
- NumberField: one component with steppers; min/max/step/largeStep/value/
  onValueChange/disabled pass through; variant default | borderless, size,
  invalid, hint, placeholder.
- Popover: PopoverRoot + PopoverTrigger (attach a real control via
  render={<Button/>}) + PopoverContent (side "bottom" default, align,
  sideOffset 8) + PopoverTitle/PopoverDescription (wire the accessible
  name/description) + PopoverClose. Non-modal by default; Escape and
  outside clicks dismiss.
- Radio + RadioGroup: group holds defaultValue or value + onValueChange,
  disabled; <Radio value="..." /> inside; dot indicator automatic. States
  via [data-checked], [data-disabled].
- Select: SelectRoot (size, sizes trigger and items together) +
  SelectTrigger (placeholder, variant default | borderless, invalid,
  leadingIcon, hint, disabled) + SelectContent + SelectItem. States via [data-highlighted], [data-selected],
  [data-popup-open].
- Slider: one component; track/indicator/thumbs automatic; array value =
  range with a thumb per entry; min/max/step/orientation pass through.
  Always pass aria-label. Never animate thumb position.
- Switch: wraps the Base UI Switch; checked/defaultChecked/onCheckedChange/
  disabled. Style states via [data-checked] and [data-disabled].
- Tabs: TabsRoot (size) + TabsList + TabsTab (iconOnly, disabled) +
  TabsPanel. Icons are children. Active state via [data-active].
- Toggle: pressed state via data-pressed; defaultPressed or pressed +
  onPressedChange; size, iconOnly (needs aria-label); value joins a
  ToggleGroup.
- ToggleGroup: wraps Toggles (each joins via value); string arrays via
  defaultValue or value + onValueChange; single-select by default,
  multiple for independent toggles; disabled disables members.
- Tooltip: TooltipRoot + TooltipTrigger (attach via render={<Button/>};
  delay 600ms lives here) + TooltipContent (side "top" default,
  sideOffset 8). Shows on hover and focus. A description, never a name:
  icon-only triggers keep their aria-label. TooltipProvider shares one
  delay across a toolbar.

## Docs

- https://usebones.com/ (introduction)
- https://usebones.com/quick-start
- https://usebones.com/sizes
- https://usebones.com/theming
- https://usebones.com/motion
- https://usebones.com/accessibility
- https://usebones.com/components/button
- https://usebones.com/components/switch

## Source

- https://github.com/sigurdarson/bones
- Conventions for contributors and agents: CLAUDE.md in the repo root.
- Agent skills ship in .claude/skills (new-component, release).
`;

export function GET() {
  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
