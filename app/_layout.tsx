import { ThemeProvider } from '@/src/core/theme/theme_provider';
import { store } from '@/src/redux/store';
import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { Provider } from "react-redux";

export default function RootLayout() {
  const theme = useTheme();

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }}>
          <Stack.Screen name="(drawer)" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
