const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const maxBundleBytesSize = 1670 * 1024

module.exports = merge(common, {
  mode: 'production',
  performance: {
    hints: 'error',
    maxEntrypointSize: maxBundleBytesSize,
    maxAssetSize: maxBundleBytesSize,
  },
  plugins: [new CleanWebpackPlugin({ watch: true })],
})
