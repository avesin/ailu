
# ailu

ailu is a React Native app designed to help clients chat with ChatGPT, Gemini AI, and custom LLM servers. Built with Expo, Redux, and Expo Router, it provides a modern, mobile-first chat experience.

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

## Requirements

- Node.js
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

## License

MIT
