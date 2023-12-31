const { composePlugins, withNx } = require('@nx/webpack');
const path = require('path');

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx({
    target: 'node',
  }),
  (config) => {
    // module : {
    //   rules: [
    //     {
    //       test:/\.ts?$/,
    //       use:'ts-loader',
    //     }
    //   ]
    // }
    config.resolve = {
      ...config.resolve,
      alias: {
        '@app': path.resolve('./src/app/')
      },
    };
    // Update the webpack config as needed here.
    // e.g. `config.plugins.push(new MyPlugin())`
    return config;
  }
);
