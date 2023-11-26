module.exports = function override(config, env) {
    config.resolve.fallback = {
      crypto: require.resolve('crypto-browserify'),
      // Add other fallbacks here if needed
    };
    return config;
  };