import * as React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Button,
  DrawerContent,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@usebones/react";
import { Icon } from "@usebones/icons";
import { GithubMark } from "./github-mark";
import { Logo } from "./logo";
import { Sidebar } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";
import reactPackage from "../../../packages/react/package.json";

/* On narrow screens the sidebar becomes a left drawer opened from the
   header; it closes itself when the route changes. */
function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = useLocation({ select: (location) => location.pathname });

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <DrawerRoot side="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        render={
          <Button
            variant="ghost"
            iconOnly
            className="site-nav-toggle"
            aria-label="Open navigation"
          />
        }
      >
        <Icon name="menu" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="site-nav-drawer-title">Navigation</DrawerTitle>
        <Sidebar className="sidebar-in-drawer" />
      </DrawerContent>
    </DrawerRoot>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-logo" aria-label="Bones home">
          <Logo />
        </Link>
        <div className="site-header-actions">
          <ThemeToggle />
          <a
            className="ub-button"
            data-variant="secondary"
            href="https://github.com/sigurdarson/bones"
            target="_blank"
            rel="noreferrer"
            aria-label={`Bones v${reactPackage.version} on GitHub`}
          >
            <GithubMark />v{reactPackage.version}
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
