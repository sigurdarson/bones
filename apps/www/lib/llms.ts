/* llms.txt: a machine-readable summary of the library for AI tools.
   Served at /llms.txt (see src/routes); linked from the sidebar. */
export const llmsTxt = `# Bones

> Bones is a minimal, themable React component library built on Base UI.
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
  (blue, violet, teal, fuchsia, rose, red, orange, green). They apply on
  import and recolor primary actions only.
- Full themes replace every color role (and may reshape radii) and ship
  inert: import "@usebones/tokens/themes/matrix.css" then activate with
  data-theme="matrix" on <html> or any subtree. A custom theme is a
  plain CSS file overriding semantic tokens after index.css; full themes
  scope under their own data-theme value.
- No theme provider and no config file: attributes and tokens are the
  configuration API. JS context exists only where CSS cannot express the
  need (the icon set).

## Components

- Accordion: AccordionRoot (value/defaultValue as string arrays, multiple,
  disabled) + AccordionItem (value) + AccordionTrigger (label as children,
  heading and chevron automatic) + AccordionPanel. One open at a time by
  default. States via [data-panel-open] on triggers, [data-open] on items;
  height animates via --accordion-panel-height.
- AlertDialog: a confirmation that interrupts on purpose. Same six-part
  shape as Dialog (Root/Trigger/Content/Title/Description/Close) but
  always modal and outside clicks never dismiss; Escape cancels. One
  AlertDialogClose per choice (Cancel ghost, action primary or danger
  with onClick). Use only for hard-to-undo actions.
- Autocomplete: free text with suggestions; the value IS the input
  string (value/defaultValue/onValueChange fire per keystroke).
  AutocompleteRoot (items, mode "list" default | "both" | "inline" |
  "none", size) + AutocompleteInput (clearable, variant; no chevron) +
  AutocompleteContent (empty, status; function children render an
  AutocompleteItem per suggestion). invalid on the input matches Input.
  Shares the Combobox classes. Use Combobox when the value must come
  from the list.
- Avatar: one component; src + alt (the person's name; required with src,
  "" only when the name is visible beside it) + fallback (initials or
  icon, shows until the image loads and on error); size default (36px) |
  compact (28px); always round.
- AvatarGroup: overlapping Avatars (a Bones composition, no Base UI
  part); children are regular Avatars ordered most-important first;
  max={n} collapses the rest into a +N chip; size sizes the chip (match
  the Avatars). Ring color via --ub-avatar-group-ring on surfaces.
- Button: variants primary | secondary | ghost | danger, sizes default |
  compact, iconOnly. Icons are children. Native button props pass through;
  type defaults to "button". Anchors can reuse the styling:
  class="ub-button" data-variant="...".
- Checkbox: checked/defaultChecked/onCheckedChange/indeterminate/disabled.
  Style states via [data-checked], [data-indeterminate], [data-disabled].
- CheckboxGroup: wraps Checkboxes (each joins via value); defaultValue or
  value + onValueChange (string arrays); allValues + <Checkbox parent />
  for select-all with indeterminate; disabled disables members.
- Collapsible: CollapsibleRoot (defaultOpen or open + onOpenChange,
  disabled) + CollapsibleTrigger (label as children, chevron automatic) +
  CollapsiblePanel (hiddenUntilFound, keepMounted). Height animates via
  --collapsible-panel-height; state via [data-panel-open] on the trigger.
- Combobox: ComboboxRoot (items required for filtering/empty; value or
  defaultValue + onValueChange; multiple for arrays; size) +
  ComboboxInput (placeholder, variant default | borderless, clearable
  default true, the clear button replacing the chevron while something
  is selected; invalid matches Input) + ComboboxContent
  (empty="..."; searchInput puts the input in the popup; status for
  async; function children render a ComboboxItem per filtered item) +
  ComboboxGroup/GroupLabel/Collection. Chips for multiple:
  ComboboxChips > ComboboxValue fn children mapping to ComboboxChip +
  inline ComboboxInput. ComboboxTrigger is the select-like button
  (aria-label required). Prefer Select for short fixed lists.
- ContextMenu: ContextMenuRoot (size) + ContextMenuTrigger (a div around
  the right-clickable surface) + ContextMenuContent; opens at the pointer,
  long press on touch. Fill the content with the regular Menu parts
  (MenuItem, MenuCheckboxItem, ...); the popup shares Menu's classes.
- Dialog: DialogRoot (modal default true, disablePointerDismissal) +
  DialogTrigger (attach via render={<Button/>}) + DialogContent (bundles
  backdrop and centered scrollable viewport) + DialogTitle /
  DialogDescription (wire the accessible name/description) + DialogClose
  (render several for Cancel/Save). Escape closes; focus is trapped and
  returned.
- Drawer: the Dialog's shape and behavior
  (DrawerRoot/Trigger/Content/Title/Description/Close; modal, Escape,
  focus trap) plus swipe dismissal and a grab handle. side on the root:
  "right" (default) | "left" (full-height 24rem panels) | "bottom"
  (full-width mobile sheet, scrolls past 85dvh).
- Field: FieldRoot (disabled, invalid, name, validate) + FieldLabel +
  FieldDescription + FieldError (match). Wrap any Bones form control;
  validation state flows to it automatically.
- Fieldset: FieldsetRoot (disabled) + FieldsetLegend; groups Fields under
  one legend; disabled switches off every control inside, natively.
- Form: wraps Fields; onFormSubmit(values) fires once all fields are
  valid, values keyed by Field name; validationMode onSubmit (default) |
  onBlur | onChange; errors maps server errors onto fields by name
  (render a bare FieldError in that field).
- Input: two sizes; variants default | borderless; leadingIcon and
  trailingIcon (ReactNode), hint (linked via aria-describedby), invalid.
  Native input props pass through (Bones size prop replaces the native
  size attribute). States via [data-focused], [data-filled],
  [data-invalid].
- Menu: MenuRoot (size) + MenuTrigger (attach via render={<Button/>}) +
  MenuContent + MenuItem (closeOnClick default true) + MenuCheckboxItem /
  MenuRadioGroup + MenuRadioItem (stay open, auto indicators) +
  MenuGroup/MenuGroupLabel + MenuSeparator + MenuSubmenuRoot +
  MenuSubmenuTrigger (auto chevron). States via [data-highlighted],
  [data-checked], [data-popup-open].
- Menubar: one container (disabled, orientation, loopFocus); put regular
  Bones Menus inside (MenuRoot + MenuTrigger render={<Button
  variant="ghost"/>} + MenuContent). One menu open at a time; hover
  switches, arrows move along the bar.
- Meter: one component; value + min/max, label (names it; required, or
  aria-label), showValue, format (Intl.NumberFormatOptions). A current
  level (storage, seats), never a loading state.
- NavigationMenu: NavigationMenuRoot (delay 50ms, orientation; popup
  machinery bundled) + NavigationMenuList + NavigationMenuItem holding a
  NavigationMenuTrigger (chevron automatic) + NavigationMenuContent, or
  just a NavigationMenuLink (real anchor; render={<Link/>} for routers).
  One shared popup morphs between items. Nest a Root inside Content for
  flyout submenus (side="inline-end"), or a Root with inline plus a
  NavigationMenuViewport + defaultValue for same-panel submenus. For
  links; app actions use Menu.
- NumberField: one component with steppers; min/max/step/largeStep/value/
  onValueChange/disabled pass through; variant default | borderless, size,
  invalid, hint, placeholder.
- OTPField: one component; length renders the slots, value is one string
  (value/defaultValue/onValueChange), typing and pasting distribute.
  autoSubmit, mask, size default | compact; autoComplete defaults to
  one-time-code. Wrap in Field for label/validation or pass aria-label.
  States: [data-complete] on root, [data-filled]/[data-invalid] on slots.
- Popover: PopoverRoot + PopoverTrigger (attach a real control via
  render={<Button/>}) + PopoverContent (side "bottom" default, align,
  sideOffset 8) + PopoverTitle/PopoverDescription (wire the accessible
  name/description) + PopoverClose. Non-modal by default; Escape and
  outside clicks dismiss.
- PreviewCard: PreviewCardRoot + PreviewCardTrigger (a real anchor with
  href; delay 600ms) + PreviewCardContent (side "bottom" default, align,
  sideOffset 8; stays open while hovered). An enhancement: touch users
  never see it, so the link itself must suffice.
- Progress: one component; value (null = indeterminate) + min/max, label
  (names it; required, or aria-label), showValue, format. States via
  [data-indeterminate], [data-complete]. For tasks underway; levels use
  Meter.
- Radio + RadioGroup: group holds defaultValue or value + onValueChange,
  disabled; <Radio value="..." /> inside; dot indicator automatic. States
  via [data-checked], [data-disabled].
- ScrollArea: one component; wrap content, size like a box (height /
  max-height / width); both bars wired automatically, shown only when
  the axis overflows, revealed on hover/scroll. aria-label names the
  region. For panes, not the page.
- Select: SelectRoot (size, sizes trigger and items together) +
  SelectTrigger (placeholder, variant default | borderless, invalid,
  leadingIcon, hint, disabled) + SelectContent + SelectItem. States via [data-highlighted], [data-selected],
  [data-popup-open].
- Separator: a 1px line with separator semantics; orientation
  "horizontal" (default) | "vertical" (stretches inside flex rows).
  Menus use MenuSeparator instead.
- Slider: one component; track/indicator/thumbs automatic; array value =
  range with a thumb per entry; min/max/step/orientation pass through.
  Always pass aria-label. Never animate thumb position.
- Switch: wraps the Base UI Switch; checked/defaultChecked/onCheckedChange/
  disabled. Style states via [data-checked] and [data-disabled].
- Tabs: TabsRoot (size) + TabsList + TabsTab (iconOnly, disabled) +
  TabsPanel. Icons are children. Active state via [data-active].
- Toast: mount ToastProvider + one <Toaster /> once; fire with
  useToast(): toast.add({ title, description, type, actionProps }),
  toast.promise(p, { loading, success, error }), toast.update/close.
  Provider: timeout (5000ms, paused on hover/focus), limit (3). Toaster
  position: any corner or edge center (default bottom-right; swipe
  follows). Adding with an existing id updates in place (dedupe). Style
  via [data-type], [data-expanded]; success, info, warning, and error
  come tinted with icons, and promise sets loading/success/error types
  automatically.
- Toggle: pressed state via data-pressed; defaultPressed or pressed +
  onPressedChange; size, iconOnly (needs aria-label); value joins a
  ToggleGroup.
- ToggleGroup: wraps Toggles (each joins via value); string arrays via
  defaultValue or value + onValueChange; single-select by default,
  multiple for independent toggles; disabled disables members.
- Toolbar: ToolbarRoot (aria-label required, orientation, disabled) +
  ToolbarButton/ToolbarLink/ToolbarInput (attach real controls via
  render={<Toggle/>} / <Button/> / <Input/>) + ToolbarGroup +
  ToolbarSeparator (auto perpendicular). One tab stop; arrows move.
- Tooltip: TooltipRoot + TooltipTrigger (attach via render={<Button/>};
  delay 600ms lives here) + TooltipContent (side "top" default,
  sideOffset 8). Shows on hover and focus. A description, never a name:
  icon-only triggers keep their aria-label. TooltipProvider shares one
  delay across a toolbar.

## Docs

- https://usebones.com/ (introduction)
- https://usebones.com/quick-start
- https://usebones.com/theming
- https://usebones.com/sizes
- https://usebones.com/motion
- https://usebones.com/scrollbars
- https://usebones.com/accessibility
- https://usebones.com/skills
- https://usebones.com/changelog
- Every component has a page at https://usebones.com/components/<slug>
  with a playground, styling states, props, and agent instructions.
  Slugs: accordion, alert-dialog, autocomplete, avatar, avatar-group,
  button, checkbox, checkbox-group, collapsible, combobox, context-menu,
  dialog, drawer, field, fieldset, form, input, menu, menubar, meter,
  navigation-menu, number-field, otp-field, popover, preview-card,
  progress, radio, scroll-area, select, separator, slider, switch, tabs,
  toast, toggle, toggle-group, toolbar, tooltip.

## Source

- https://github.com/sigurdarson/bones
- Installable agent skill for codebases that use Bones:
  https://usebones.com/skills/bones.md (drop into
  .claude/skills/bones/SKILL.md).
- Conventions for contributors and agents: CLAUDE.md in the repo root.
- Library-development skills ship in the repo's .claude/skills
  (new-component, component-page, release).
`;
