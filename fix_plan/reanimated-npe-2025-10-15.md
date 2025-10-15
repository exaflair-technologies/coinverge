## Title
React Native Reanimated NPE on Android (TurboModule init)

## Timestamp
2025-10-15

## Problem Summary
Android runtime crash with NullPointerException originating from `com.swmansion.reanimated.ReanimatedModule` during TurboModule initialization. This typically occurs when the Reanimated Babel plugin is missing or not last in the plugin list, causing bytecode transforms to be skipped.

## Root Cause Analysis
- Project uses `react-native-reanimated@~3.17.4` with Expo SDK 54 (RN 0.79.6).
- No `babel.config.js` present; therefore, Reanimated plugin was not configured.
- Without the plugin, Reanimated native module initialization can fail at runtime on Android.

## Proposed Fix
1. Add `babel.config.js` at the repo root with `babel-preset-expo` and include `'react-native-reanimated/plugin'` as the LAST plugin.
2. Ensure `import 'react-native-reanimated';` is executed before other Reanimated-dependent code (already present in `app/_layout.tsx`).
3. Clear Metro and native caches and rebuild to ensure transforms apply.

## Implementation Steps
1. Create `babel.config.js` with:
   ```js
   module.exports = function (api) {
     api.cache(true);
     return {
       presets: ['babel-preset-expo'],
       plugins: ['react-native-reanimated/plugin'],
     };
   };
   ```
2. Restart dev server with cache clear: `expo start -c`.
3. For Android, rebuild if needed:
   - Managed: `expo run:android` (or open via `expo start --android` after cache clear)
   - Bare: Gradle clean build.

## Risks / Rollback
- Low risk; Babel config is standard for Expo/React Native with Reanimated.
- If issues occur, temporarily comment out the plugin to validate the regression (app will run but animations may fail), then re-apply correctly.

## Acceptance Criteria
- App launches on Android without Reanimated NPE.
- Navigation and screens render; no crashes in Hermes logs on module init.


