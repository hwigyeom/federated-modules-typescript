const { withStorybookModuleFederation } = require('storybook-module-federation');
const deps = require('../package.json').dependencies;
module.exports = withStorybookModuleFederation({
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
})({
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack5',
  },
});




