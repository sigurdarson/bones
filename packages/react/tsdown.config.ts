import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    styles: "src/styles.css",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
});
