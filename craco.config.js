module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Allow ESM packages (e.g. @threeveloper/azure-react-icons) that omit .js extensions
      webpackConfig.module.rules.push({
        test: /\.m?js$/,
        resolve: { fullySpecified: false },
      });
      // Suppress source-map warnings from packages that don't ship their sources
      webpackConfig.ignoreWarnings = [/Failed to parse source map/];
      return webpackConfig;
    },
  },
  jest: {
    configure: (jestConfig) => {
      // Transform @threeveloper/azure-react-icons through Babel (it's pure ESM)
      jestConfig.transformIgnorePatterns = [
        '/node_modules/(?!@threeveloper/azure-react-icons)',
        '\\.pnp\\.[^\\\\]+$',
      ];
      return jestConfig;
    },
  },
};
