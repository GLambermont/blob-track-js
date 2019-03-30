import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";
import gzip from 'rollup-plugin-gzip'

// Check if build mode. Defaults to production if none is given.
const IS_PROD = process.env.MODE != 'development';

const outputPaths = {
  dev: '.tmp',
  prod: 'lib'
}

const formats = {
  dev: ['iife'],
  prod: ['amd', 'cjs', 'es', 'iife', 'umd']
};

const buildOutputPath = IS_PROD ? outputPaths.prod : outputPaths.dev;
const buildFormats = IS_PROD ? formats.prod : formats.dev;

export default {
  input: './src/js/blob-track.js',
  output: buildFormats.map(format => {
    return {
      file: `./${buildOutputPath}/blob-track.${format}.min.js`,
      format,
      sourcemap: true
    };
  }),
  plugins: [
    eslint(),
    babel(),
    terser(),
    gzip({ minSize: 8192 })
  ]
};