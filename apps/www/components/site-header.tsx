import Link from "next/link";
import { Button } from "@usebones/react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-logo" aria-label="bones home">
          <Logo />
        </Link>
        <div className="site-header-actions">
          <a
            className="ub-button"
            data-variant="ghost"
            href="https://github.com/sigurdarson/bones"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <ThemeToggle />
          {/* Configurator ships later: component browser plus styling options. */}
          <Button disabled title="Coming soon">
            Configurator
          </Button>
        </div>
      </div>
    </header>
  );
}
