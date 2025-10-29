const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add .mjs support for Supabase modules
config.resolver.sourceExts.push('mjs');

// Configure transformer for better compatibility
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: false,
    },
  }),
  unstable_allowRequireContext: true,
  minifierConfig: {
    keep_classnames: true,
    keep_fnames: true,
    mangle: {
      module: true,
      keep_classnames: true,
      keep_fnames: true,
    },
  },
};

// Fix MIME type issues for web bundle
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Fix MIME type for JavaScript bundles
      if (req.url && req.url.includes('.bundle')) {
        res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
