# Coinverge UI

## Prerequisites

Install the following dependencies:

1. **Node.js** (version 18 or higher)
   ```bash
   # Download from https://nodejs.org/
   # Verify: node --version
   ```

2. **Expo CLI**
   ```bash
   npm install -g @expo/cli
   ```

3. **Git** (for cloning)
   ```bash
   # Download from https://git-scm.com/
   ```

## Install and Run

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coinverge-ui
   ```

2. **Install project dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Get the `.env` file from the maintainer
   - Place it in the root directory of the project

4. **Run the application**
   ```bash
   npx expo start
   ```

5. **First Time Setup**
   - Login through email (use initials for first login)
   - After successful login, the application pages will open

## Build Commands

- **Android build**
  ```bash
  npx expo build:android
  ```

- **iOS build**
  ```bash
  npx expo build:ios
  ```

- **Web build**
  ```bash
  npx expo export:web
  ```

## Platform-specific runs

- **Android**: `npx expo start --android`
- **iOS**: `npx expo start --ios`
- **Web**: `npx expo start --web`

**Note:** This project uses Expo 53.0.23
