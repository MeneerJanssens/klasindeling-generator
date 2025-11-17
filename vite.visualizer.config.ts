import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import baseConfig from "./vite.config";

export default defineConfig({
  ...baseConfig,
  plugins: [
    ...(baseConfig.plugins || []),
    visualizer({ open: true, filename: "dist/bundle-stats.html" })
  ]
});