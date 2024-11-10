const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const path = require('path');
const webpack = require('webpack');

module.exports = override(
  addWebpackAlias({
    ['@']: path.resolve(__dirname, 'src')
  }),
  addWebpackPlugin(new webpack.ProvidePlugin({
    process: 'process/browser',
    Buffer: ['buffer', 'Buffer']
  }))
);
