const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const mode = process.env.NODE_ENV || 'production';

const port = 3012;
const publicPath = `http://localhost:${port}/`;
const remoteHost = 'http://localhost:3011';

module.exports = {
  mode,
  entry: './src/index',
  output: {
    publicPath
  },
  devtool: 'source-map',
  devServer: {
    port,
    static: './dist',
    historyApiFallback: {
      index: 'index.html'
    }
  },
  optimization: {
    minimize: 'production' === mode
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'applicationCart',
      library: { type: 'var', name: 'applicationCart' },
      filename: 'remoteEntry.js',
      exposes: {
        './CartRemote': './src/app' // This will be make the application-b available as remote
      },
      remotes: {
        applicationHome: 'applicationHome' // load application-home as remote
      },
      shared: ['react', 'react-dom']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    // load the other app entry
    new HtmlWebpackTagsPlugin(({
      tags: [`${remoteHost}/remoteEntry.js`],
      append: false, // prepend this as needs to be loaded before applcation-home
      publicPath: false
    }))
  ]
};