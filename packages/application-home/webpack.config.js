const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

const port = 3011;

module.exports = {
  entry: './src/index',
  output: {
    publicPath: 'auto'
  },
  devtool: 'source-map',
  devServer: {
    port,
    static: './dist',
    historyApiFallback: {
      index: 'index.html'
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'applicationHome',
      // library: { type: 'var', name: 'applicationHome' },
      filename: 'remoteEntry.js',
      exposes: {
        './HomeRemote': './src/app' // This will be make the application-home available as remote
      },
      remotes: {
        applicationCart: 'applicationCart@http://localhost:3012/RemoteEntry.js' // load cart app as remote
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          eager: true,
          requiredVersion: deps.react
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom']
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
