# Coinverge UI

A production-ready Expo Router app for a crypto portfolio experience. It includes onboarding, secure authentication with Supabase (email/password + Google OAuth), and a tabbed dashboard for portfolio, transactions, wallet, holdings, and trading.

## Tech Stack

- React Native 0.79, React 19, Expo ~53
- Expo Router 5 for file-based navigation
- Supabase JS v2 for auth and data
- RNEUI for UI components, Expo Image/LinearGradient, Reanimated/Gesture Handler
- Edge-to-edge layouts with Safe Area handling

## App Features

- Landing screen with illustration and CTA
- Login screen
  - Email/password sign in
  - Google OAuth via Supabase (deep link redirect)
- Auth session management and redirect to tabs
- Dashboard and tabs: `Portfolio`, `Transactions`, `Wallet`, `Holdings`, `Trading`
- Profile and Settings screens with logout
- Dark background with notch/home-indicator safe-area support

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or pnpm
- Expo CLI

```bash
npm i -g @expo/cli
```

### Clone and Install

```bash
git clone <repository-url>
cd coinverge-ui
npm install
```

### Environment Variables

The app expects the following Expo public envs (used in `lib/supabase.ts`). Create a `.env` in the project root:

```env
EXPO_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=<anon-public-key>
```

> These are public runtime variables shipped to the client. Use the anon key only.

### Supabase OAuth Redirects

The login screen uses a deep link callback path `/auth/callback`.

1. In `app.json`, the scheme is `coinvergeui`. The app link will be `coinvergeui://`.
2. Add the following Redirect URLs in Supabase → Authentication → URL Configuration:
   - `coinvergeui://auth/callback`
   - For development in Expo Go, also add: `exp://127.0.0.1:19000/--/auth/callback` (and the LAN IP variant shown by Expo)

In code, the redirect is created with `Linking.createURL('/auth/callback')`.

### Run

```bash
npm run start        # interactive Expo menu
npm run ios          # launch iOS simulator
npm run android      # launch Android emulator
npm run web          # run on web
```

On first launch, you can sign up/sign in with email/password or continue with Google (if configured in Supabase).

## Project Structure

```
app/
  _layout.tsx          # Root router layout
  index.tsx            # Landing (onboarding) screen
  login.tsx            # Login + OAuth
  (tabs)/              # Tabbed app screens
components/            # Shared UI components
lib/supabase.ts        # Supabase client (uses AsyncStorage)
assets/                # Images and fonts
```

## Useful Scripts

```bash
npm run start
npm run ios
npm run android
npm run web
npm run lint
npm run reset-project    # local cleanup helper
```

## Build

Use EAS for production builds, or run platform previews via Expo:

```bash
# Preview on devices/simulators
npm run ios
npm run android

# Web export (for static hosting preview)
npx expo export --platform web
```

## Implementation Notes

- Safe-area: screens use `SafeAreaView` with top/bottom edges and minimal extra vertical padding to avoid visible bars on iOS.
- The root layout sets the OS background to black using `setBackgroundColorAsync('#000000')` to prevent white flashes.
- Auth session is kept in sync with `supabase.auth.onAuthStateChange` and persisted via `@react-native-async-storage/async-storage`.

## Troubleshooting

- Blank/white bars at top/bottom on iOS
  - Ensure you didn't add large `paddingTop`/`paddingBottom` in addition to `SafeAreaView` insets.
  - Confirm `setBackgroundColorAsync('#000')` is applied (see `app/_layout.tsx`).
- OAuth redirect fails
  - Verify Supabase redirect URLs include your scheme `coinvergeui://auth/callback` and the dev Expo URLs.
  - In Expo Go, check the URL printed in the terminal and add that in Supabase if needed.

---

This project targets Expo `~53.0.23` and React Native `0.79.5`.
