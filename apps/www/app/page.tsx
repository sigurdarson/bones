import Link from "next/link";
import { Demo } from "./demo";

export default function Home() {
  return (
    <main
      style={{
        maxWidth: "40rem",
        margin: "0 auto",
        padding: "6rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
        bones
      </h1>
      <p style={{ color: "var(--ub-text-secondary)", lineHeight: 1.6, margin: 0 }}>
        A minimal, themable component library built on Base UI — designed to be
        read, composed, and extended by humans and agents alike.
      </p>
      <Demo />
      <p style={{ margin: 0 }}>
        <Link href="/docs" style={{ color: "var(--ub-text-primary)" }}>
          Read the docs →
        </Link>
      </p>
    </main>
  );
}
