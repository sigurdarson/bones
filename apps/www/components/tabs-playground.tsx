"use client";

import * as React from "react";
import { Switch, TabsList, TabsPanel, TabsRoot, TabsTab } from "@usebones/react";
import { Icon, type IconName } from "@usebones/icons";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

type Size = "default" | "compact";

const demoTabs: Array<{ value: string; label: string; icon: IconName; panel: string }> = [
  { value: "profile", label: "Profile", icon: "user", panel: "Name, avatar, and how you appear." },
  { value: "notifications", label: "Notifications", icon: "bell", panel: "What we notify you about and when." },
  { value: "billing", label: "Billing", icon: "credit-card", panel: "Plan, invoices, and payment method." },
];

interface PlaygroundState {
  size: Size;
  iconOnly: boolean;
  leadingIcon: boolean;
  trailingIcon: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ size, iconOnly, leadingIcon, trailingIcon }: PlaygroundState): string {
  const tabs = demoTabs
    .map((tab) => {
      if (iconOnly) {
        return `    <TabsTab value="${tab.value}" iconOnly aria-label="${tab.label}">
      <Icon name="${tab.icon}" />
    </TabsTab>`;
      }
      if (!leadingIcon && !trailingIcon) {
        return `    <TabsTab value="${tab.value}">${tab.label}</TabsTab>`;
      }
      const lines = [
        ...(leadingIcon ? [`      <Icon name="${tab.icon}" />`] : []),
        `      ${tab.label}`,
        ...(trailingIcon ? [`      <Icon name="chevron-down" />`] : []),
      ];
      return `    <TabsTab value="${tab.value}">\n${lines.join("\n")}\n    </TabsTab>`;
    })
    .join("\n");

  const panels = demoTabs
    .map((tab) => `  <TabsPanel value="${tab.value}">${tab.panel}</TabsPanel>`)
    .join("\n");

  const usesIcons = iconOnly || leadingIcon || trailingIcon;
  const imports = [
    `import { TabsList, TabsPanel, TabsRoot, TabsTab } from "@usebones/react";`,
    ...(usesIcons ? [`import { Icon } from "@usebones/icons";`] : []),
  ].join("\n");

  return `${imports}

<TabsRoot defaultValue="profile"${size === "compact" ? ' size="compact"' : ""}>
  <TabsList>
${tabs}
  </TabsList>
${panels}
</TabsRoot>`;
}

export function TabsPlayground() {
  const [compact, setCompact] = React.useState(false);
  const [iconOnly, setIconOnly] = React.useState(false);
  const [leadingIcon, setLeadingIcon] = React.useState(false);
  const [trailingIcon, setTrailingIcon] = React.useState(false);
  const size: Size = compact ? "compact" : "default";

  return (
    <>
      <Showcase
        code={buildCode({ size, iconOnly, leadingIcon, trailingIcon })}
        note={
          <>
            Four parts. The sliding indicator is rendered by <code>TabsList</code>{" "}
            automatically, and icons are just children: before the label,
            after it, or alone with <code>iconOnly</code> plus an{" "}
            <code>aria-label</code>.
          </>
        }
      >
        <TabsRoot defaultValue="profile" size={size}>
          <TabsList>
            {demoTabs.map((tab) => (
              <TabsTab
                key={tab.value}
                value={tab.value}
                iconOnly={iconOnly}
                aria-label={iconOnly ? tab.label : undefined}
              >
                {iconOnly ? (
                  <Icon name={tab.icon} />
                ) : (
                  <>
                    {leadingIcon && <Icon name={tab.icon} />}
                    {tab.label}
                    {trailingIcon && <Icon name="chevron-down" />}
                  </>
                )}
              </TabsTab>
            ))}
          </TabsList>
          {demoTabs.map((tab) => (
            <TabsPanel key={tab.value} value={tab.value}>
              {tab.panel}
            </TabsPanel>
          ))}
        </TabsRoot>
      </Showcase>
      <Controls>
        <ControlRow label="Compact">
          <Switch checked={compact} onCheckedChange={setCompact} />
        </ControlRow>
        <ControlRow label="Icon only">
          <Switch checked={iconOnly} onCheckedChange={setIconOnly} />
        </ControlRow>
        <ControlRow label="Leading icon">
          <Switch checked={leadingIcon} onCheckedChange={setLeadingIcon} disabled={iconOnly} />
        </ControlRow>
        <ControlRow label="Trailing icon">
          <Switch checked={trailingIcon} onCheckedChange={setTrailingIcon} disabled={iconOnly} />
        </ControlRow>
      </Controls>
    </>
  );
}
