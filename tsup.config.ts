import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  // TODO: Probably need to extract this into a script and handle multiple templates
  onSuccess: "git archive main ./templates/one-to-one | tar -x -C ./dist",
  format: ["esm"],
  sourcemap: true,
  minify: true,
  target: "esnext",
  outDir: "dist",
})
