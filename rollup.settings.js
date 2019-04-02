export default {
  name: 'motionTracker',
  fileNameBase: 'motion-tracker',
  input: './src/js/motion-tracker.js',
  outputPaths: {
    dev: '.tmp',
    prod: 'lib'
  },
  formats: {
    dev: ['iife'],
    prod: ['amd', 'cjs', 'es', 'iife', 'umd']
  }
};