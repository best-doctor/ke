const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const maxBundleBytesSize = 1670 * 1024

module.exports = merge(common, {
  mode: 'production',
  performance: {
    hints: 'error',
    maxEntrypointSize: maxBundleBytesSize,
    maxAssetSize: maxBundleBytesSize,
  },
})
