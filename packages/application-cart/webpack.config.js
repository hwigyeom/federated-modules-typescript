const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

const port = 3012;

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
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'applicationCart',
      filename: 'remoteEntry.js',
      exposes: {
        './CartRemote': './src/app' // This will be make the application-b available as remote
      },
      remotes: {
        applicationHome: `applicationHome@http://localhost:3011/RemoteEntry.js` // load application-home as remote
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
