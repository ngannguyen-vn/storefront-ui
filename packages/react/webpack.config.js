const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  // externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/react'],
        },
      },
      {
        test: /\.scss$/i,
        // exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
         // 'sass-loader'
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'react/src/components'), path.resolve(__dirname, 'shared')],
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: '@storefront-ui-react',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
