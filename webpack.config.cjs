const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'src/public'),
    devMiddleware: {
      index: true,
    }
  },
  devtool: 'source-map'
};
