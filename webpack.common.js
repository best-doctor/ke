const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
// const pathsTransformer = require('ts-transform-paths').default

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
          // options: {
          //   getCustomTransformers: () => pathsTransformer(),
          // },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    '@chakra-ui/react': '@chakra-ui/react',
    '@chakra-ui/icons': '@chakra-ui/icons',
    'react-query': 'react-query',
  },
}
