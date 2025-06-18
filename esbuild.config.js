import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["./src/index.js"],
    bundle: true,
    platform: "node",
    target: "node20",
    outdir: "dist",
    sourcemap: true
  })
  .catch(() => process.exit(1));
