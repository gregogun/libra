const { build } = require('esbuild');
const replace = require('replace-in-file');

const contracts = ['src/contracts/contract.ts'];

build({
  entryPoints: contracts.map((source) => {
    return `${source}`;
  }),
  outdir: './build',
  minify: false,
  bundle: true,
  format: 'iife',
})
  .catch(() => process.exit(1))
  // note: Warp SDK currently does not support files in IIFE bundle format, so we need to remove the "iife" part ;-)
  // update: it does since 0.4.31, but because viewblock.io is still incompatibile with this version, leaving as is for now.
  .finally(() => {
    const files = contracts.map((source) => {
      return `./build${source}`.replace('.ts', '.js');
    });
    replace.sync({
      files: files,
      from: [/\(\(\) => {/g, /}\)\(\);/g],
      to: '',
      countMatches: true,
    });
  });
