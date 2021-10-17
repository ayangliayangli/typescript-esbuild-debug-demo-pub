import * as path from "path";
import { exec } from "child_process";
import { buildTs } from "./build.js";
import { Command } from 'commander';
// import { Command } from 'commander/esm.mjs';

const CWD = process.cwd(); // 命令执行的位置
const DEFAULT_SRC_ENTRY = path.resolve(CWD, './src/index.js')


const program = new Command();
program.option('-e, --entry-file <type>', 'input entry file', DEFAULT_SRC_ENTRY);
program.parse(process.argv);
const commandOpts = program.opts();

const entryFile = commandOpts.entryFile;
console.log(`entryFile: ${entryFile}`);

/**
 * exec builded entry ./dist/index.js
 */
function execEntry() {
  const entry = path.resolve(CWD, "./dist/index.js");
  console.log(`[]: start to exec file: ${entry}`);
  exec(`node ${entry}`, (err, stdout, stderr) => {
    if (err) {
        console.log(err);
    }
    if (stdout) {
        console.log(stdout);
    }
    if (stderr) {
        console.log(stderr);
    }
  });
}

(async () => {
  await buildTs({entryFile});
  execEntry();
})();
