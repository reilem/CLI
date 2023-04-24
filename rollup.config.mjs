import esbuild from "rollup-plugin-esbuild";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("./package.json"));
const external = Object.keys(pkg.dependencies || {}).concat(["fs/promises"]);

const extensions = [".js", ".ts"];

export default [
  {
    input: `src/index.ts`,
    external,
    plugins: [
      esbuild({
        // optimizeDeps: {
        //   include: ["@capacitor/cli/dist/config"],
        // },
      }),
      json(),
      nodeResolve({
        extensions,
        modulesOnly: true,
      }),
    ],
    output: [
      {
        file: `dist/index.js`,
        format: "cjs",
        banner: "#!/usr/bin/env node",
      },
    ],
  },
];
