import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const path = (relative: string) =>
  fileURLToPath(new URL(relative, import.meta.url));

export default defineConfig({
  root: path("./test-consumer"),
  esbuild: { jsx: "automatic" },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  server: {
    host: "127.0.0.1",
    port: 3100,
    strictPort: true,
    fs: { allow: [path("../..")] },
  },
});
