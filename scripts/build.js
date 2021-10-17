import { build } from "esbuild";
import * as path from "path";
import { execFileSync, execSync } from "child_process";
import chalk from 'chalk'

const CWD = process.cwd(); // 命令执行的位置

export async function buildTs({entryFile}) {
  console.log("[]: build start");
  const startTime = Date.now();
  await build({
    entryPoints: [entryFile],
    outfile: path.resolve(CWD, "./dist/index.js"),
    format: "iife",
    bundle: true,
    sourcemap: "inline",
  });
  const endTime = Date.now();
  const buildTime = (endTime - startTime) / 1000;
  const buildTimeStr = chalk.greenBright(`${buildTime}ms`);
  console.log(`[]: build end, build duration: (${buildTimeStr})===`);
}
