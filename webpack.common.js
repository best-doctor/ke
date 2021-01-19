const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

module.exports = {
  entry: './src/index',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'ke',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ watch: true }),
    new MomentLocalesPlugin({ localesToKeep: ['es-us', 'ru'] }),
  ],
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
}
