const path = require('path');

module.exports = {
  mode: "development",
  devtool: 'source-map',
  entry: './src/gcip.ts',
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
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle-gcip.js',
    path: path.resolve(__dirname, 'public'),
  },
};