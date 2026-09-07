import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { build } from "esbuild";

// Consume the public export through an app, after building the packages.
const result = await build({
  stdin: {
    contents: 'export { Button } from "@usebones/react";',
    resolveDir: fileURLToPath(new URL("../apps/www", import.meta.url)),
  },
  bundle: true,
  write: false,
  format: "esm",
  minify: true,
  external: ["react", "react-dom", "react/*", "react-dom/*"],
  define: { "process.env.NODE_ENV": '"production"' },
  metafile: true,
  logLevel: "silent",
});
const bytes = gzipSync(result.outputFiles[0].contents).length;
const inputs = Object.entries(Object.values(result.metafile.outputs)[0].inputs);
assert(
  bytes < 2048,
  `Button-only bundle grew to ${bytes} gzip bytes (limit: 2048).`,
);
assert(
  !inputs.some(
    ([name, info]) => name.includes("/toast/") && info.bytesInOutput > 0,
  ),
  "Button-only bundle retained toast code.",
);
console.log(
  `Button-only bundle: ${bytes} gzip bytes; no toast implementation retained.`,
);
