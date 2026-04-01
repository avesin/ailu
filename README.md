# Ailu

ailu is a React Native app designed to help clients chat with ChatGPT, Gemini AI, and custom LLM servers. Built with Expo, Redux, and Expo Router, it provides a modern, mobile-first chat experience.

## ScreenShoot

<table align="center" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center">
      <img src="https://res.cloudinary.com/dtfr5rwgo/image/upload/v1775035761/Screenshot_1775035737_onzehi.png" alt="Screenshot 1" width="50%"/>
    </td>
    <td align="center">
      <img src="https://res.cloudinary.com/dtfr5rwgo/image/upload/v1775035766/Screenshot_1775035733_yczeju.png" alt="Screenshot 2" width="50%"/>
    </td>
  </tr>
</table>

## Features

- Chat with multiple AI providers: ChatGPT, Gemini AI, and your own LLM server
- Modern UI with React Native Paper and Expo
- Drawer-based navigation
- Persistent chat history
- File-based routing with Expo Router

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the app**
   ```bash
   npx expo start
   ```

3. **Open on your device**
   - Use Expo Go or a development build on your Android/iOS device or emulator.

## Project Structure

- `app/` — App entry and route definitions (drawer navigation)
- `src/components/` — UI components
- `src/features/chat/` — Chat logic and state
- `src/redux/` — Redux store and slices
- `src/core/` — API, theme, and utilities

## Main Libraries & Implementation

- **expo**: The core framework for building and running the app. Handles development, building, and device compatibility.
- **expo-router**: Provides file-based routing. All navigation is managed by the folder and file structure in the `app/` directory, including nested and dynamic routes.
- **react-native**: The base framework for building native mobile apps using JavaScript/TypeScript.
- **react-native-paper**: Implements Material Design UI components. Used for theming, buttons, text inputs, surfaces, and overall app styling.
- **@react-navigation/drawer**: Enables drawer navigation. The drawer is defined in `app/(drawer)/_layout.tsx` and used for main app navigation.
- **@reduxjs/toolkit**, **redux**, **react-redux**: State management. The Redux store is set up in `src/redux/store.ts`, with slices for chat and LLM state in `src/features/chat/` and `src/redux/`.
- **redux-persist**: Persists Redux state (e.g., chat history) across app restarts. Integrated in the Redux store setup.
- **@react-native-async-storage/async-storage**: Used by redux-persist to store data locally on the device.
- **axios**: Handles HTTP requests to LLM servers and AI APIs. Used in `src/core/api/llm_api.ts`.
- **@expo/vector-icons**: Provides icon support for UI components (e.g., buttons, navigation).
- **react-native-gesture-handler**, **react-native-reanimated**, **react-native-screens**, **react-native-safe-area-context**: Required for navigation, gestures, animations, and safe area handling in React Native apps.

### Development Tools
- **typescript**: Type safety throughout the codebase.
- **eslint**, **eslint-config-expo**: Linting and code quality.

## Requirements

- Node.js
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

## License

MIT
