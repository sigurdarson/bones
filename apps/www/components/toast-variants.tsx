"use client";

import * as React from "react";
import { Button, useToast } from "@usebones/react";
import { Showcase } from "./showcase";

const code = `const toast = useToast();

toast.add({ title: "Draft saved" });

toast.add({ title: "Changes saved", type: "success" });

toast.add({ title: "New version available", type: "info" });

toast.add({ title: "Trial ends in 3 days", type: "warning" });

toast.add({
  title: "Export failed",
  description: "The PDF took too long to render.",
  type: "error",
});

/* type is set automatically: loading, then success or error. */
toast.promise(deploy(), {
  loading: { title: "Deploying..." },
  success: { title: "Deployed", description: "Live in 42s." },
  error: { title: "Deploy failed" },
});`;

/* Fake deploy for the promise demo; succeeds or fails at a coin flip so
   both outcomes show up. */
function deploy(): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => (Math.random() > 0.5 ? resolve() : reject()), 2000);
  });
}

export function ToastVariants() {
  const toast = useToast();

  return (
    <Showcase
      code={code}
      note={
        <>
          success, info, warning, and error tint the title and add an icon
          out of the box; any other type is a bare styling hook. The
          promise toast follows the deploy, which succeeds or fails at a
          coin flip here.
        </>
      }
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <Button
          variant="secondary"
          onClick={() => toast.add({ title: "Draft saved" })}
        >
          Default
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast.add({ title: "Changes saved", type: "success" })}
        >
          Success
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.add({ title: "New version available", type: "info" })
          }
        >
          Info
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.add({ title: "Trial ends in 3 days", type: "warning" })
          }
        >
          Warning
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.add({
              title: "Export failed",
              description: "The PDF took too long to render.",
              type: "error",
            })
          }
        >
          Error
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            void toast
              .promise(deploy(), {
                loading: { title: "Deploying..." },
                success: { title: "Deployed", description: "Live in 42s." },
                error: { title: "Deploy failed" },
              })
              .catch(() => {})
          }
        >
          Promise
        </Button>
      </div>
    </Showcase>
  );
}
