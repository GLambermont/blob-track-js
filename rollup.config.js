import settings from './rollup.settings.js';
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";
import gzip from 'rollup-plugin-gzip'

// Check if build mode. Defaults to production if none is given.
const IS_PROD = process.env.MODE != 'development';

// Compose an output out of given settings
const configOutput = ({ 
  dir, 
  name,
  fileNameBase, 
  formats, 
  prefix = '', 
  suffix = '' 
}) => formats.map(format => {
  return {
    file: `${dir}/${prefix}${fileNameBase}.${format}${suffix}.js`,
    name,
    format,
    sourcemap: true
  };
});

// Config for development builds
const devConfig = () => {
  return {
    input: settings.input,
    output: configOutput({
      dir: settings.outputPaths.dev,
      name: settings.name,
      fileNameBase: settings.fileNameBase,
      formats: settings.formats.dev,
    }),
    plugins: [
      eslint(),
      babel()
    ]
  };
};

// Config for production builds
const prodConfig = () => {
  return {
    input: settings.input,
    output: configOutput({
      dir: settings.outputPaths.prod,
      name: settings.name,
      fileNameBase: settings.fileNameBase,
      formats: settings.formats.prod,
      suffix: '.min'
    }),
    plugins: [
      eslint(),
      babel(),
      terser(),
      gzip({ minSize: 8192 })
    ]
  };
};

export default IS_PROD ? prodConfig : devConfig;