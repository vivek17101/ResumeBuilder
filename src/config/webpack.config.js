const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      'react/jsx-runtime': path.resolve('./node_modules/react/jsx-runtime.js')
    },
    extensions: ['.js', '.jsx', '.json']
  };

  return config;
};