const { configure, presets } = require('eslint-kit')

module.exports = configure({
  allowDebug: process.env.NODE_ENV !== 'production',

  presets: [
    presets.imports(),
    presets.node(),
    presets.typescript(),
    presets.react(),
    presets.nextJs(),
  ],

  extend: {
    rules: {
      'jsx-a11y/media-has-caption': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
})
