# Component roadmap

Every Base UI part we intend to wrap, tracked so we always know what's
left. Update the status in the same PR that ships a component (the
new-component skill points here). Statuses: done, in progress, todo, or
skipped (with a reason).

| Base UI component | Bones status | Notes |
| ----------------- | ------------ | ----- |
| Accordion         | done         |       |
| Alert Dialog      | done         |       |
| Autocomplete      | done         | Shares the Combobox styling. |
| Avatar            | done         |       |
| Button            | done         | Hand-rolled (predates the Base UI part); revisit wrapping later. |
| Checkbox          | done         |       |
| Checkbox Group    | done         |       |
| Collapsible       | done         |       |
| Combobox          | done         |       |
| Context Menu      | done         | Root, trigger, and content only; items come from Menu. |
| Dialog            | done         |       |
| Drawer            | done         | Bottom sheet plus left/right side panels. |
| Field             | done         | Labels, descriptions, and errors for all form controls. |
| Fieldset          | done         |       |
| Form              | done         |       |
| Input             | done         |       |
| Menu              | done         |       |
| Menubar           | done         | One container; menus inside come from Menu. |
| Meter             | done         |       |
| Navigation Menu   | done         |       |
| Number Field      | done         |       |
| OTP Field         | done         | Pre-composed; length renders the slots. |
| Popover           | done         |       |
| Preview Card      | done         |       |
| Progress          | done         |       |
| Radio             | done         |       |
| Scroll Area       | done         |       |
| Select            | done         |       |
| Separator         | done         |       |
| Slider            | done         |       |
| Switch            | done         |       |
| Tabs              | done         |       |
| Toast             | done         | Pre-composed Toaster + useToast hook. |
| Toggle            | done         |       |
| Toggle Group      | done         |       |
| Toolbar           | done         |       |
| Tooltip           | done         |       |

## Beyond Base UI

Compositions Bones ships that have no Base UI part. They build on the
wrapped primitives; hand-rolled behavior stays minimal.

| Component    | Bones status | Notes |
| ------------ | ------------ | ----- |
| Avatar Group | done         | Overlapping Avatars with a +N overflow chip. |
