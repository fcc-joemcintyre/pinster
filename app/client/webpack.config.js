/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true }] */
const path = require ('path');
const CompressionPlugin = require ('compression-webpack-plugin');

const baseDest = path.resolve (__dirname, '../../dist');

module.exports = {
  entry: {
    app: './src/components/App/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: `${baseDest}/public/js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CompressionPlugin ({
      test: /bundle.js$/,
    }),
  ],
};
