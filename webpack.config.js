const _ = require('lodash');
const path = require('path');

const baseConfig = {
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'espn-fantasyfootball-api',
    libraryTarget: 'umd'
  },
  target: 'web',
  devtool: 'source-map',
  mode: 'development'
};

module.exports = [
  _.merge({}, baseConfig, {
    output: {
      filename: 'index-web.js'
    },
    mode: 'production',
    devtool: undefined,
  }),
  _.merge({}, baseConfig, {
    output: {
      filename: 'index-web-dev.js'
    }
  }),
  _.merge({}, baseConfig, {
    output: {
      filename: 'index-node.js'
    },
    mode: 'production',
    devtool: undefined,
    target: 'node'
  }),
  _.merge({}, baseConfig, {
    output: {
      filename: 'index-node-dev.js'
    },
    target: 'node'
  })
];
