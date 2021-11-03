const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

const port = 3010;

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
      index: '/index.html'
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
      name: 'application_shell_remote',
      filename: 'app-shell.js',
      remotes: {
        applicationHome: `applicationHome@http://localhost:3011/remoteEntry.js`, // load Home app as remote
        applicationCart: 'applicationCart@http://localhost:3012/remoteEntry.js' // load cart app as remote
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
