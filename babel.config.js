/**
 * Babel configuration for the Expo app.
 *
 * Critical: The React Native Reanimated Babel plugin must be included and be
 * the LAST plugin in the list. Without this, Reanimated will crash at runtime
 * on Android with a NullPointerException when initializing the native module.
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Preset provided by Expo to compile React Native + Expo APIs
      'babel-preset-expo',
    ],
    plugins: [
      // Keep this as the last item per Reanimated's installation guide
      'react-native-reanimated/plugin',
    ],
  };
};


