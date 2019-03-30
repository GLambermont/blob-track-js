export default {
  name: 'blobTrack',
  fileNameBase: 'blob-track',
  input: './src/js/blob-track.js',
  outputPaths: {
    dev: '.tmp',
    prod: 'lib'
  },
  formats: {
    dev: ['iife'],
    prod: ['amd', 'cjs', 'es', 'iife', 'umd']
  }
};