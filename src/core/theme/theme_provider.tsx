import React, { createContext, useContext, useMemo, useState } from "react";
import { Platform } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";


const ThemeContext = createContext<any>(null);

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

const typography = {
  h1: {
    fontSize: 28,
    fontWeight: "700",
  },

  h2: {
    fontSize: 22,
    fontWeight: "600",
  },

  h3: {
    fontSize: 18,
    fontWeight: "600",
  },

  body: {
    fontSize: 14,
    fontWeight: "400",
  },

  caption: {
    fontSize: 12,
    fontWeight: "400",
  },

  button: {
    fontSize: 14,
    fontWeight: "600",
  },
}

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: "#F9F8F6",
    surface: "#F9F8F6",
    primary: "#D62828",
  },
  spacing: spacing,
  typography: typography,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: "#121212",
    surface: "#222222",
    primary: "#D62828",
  },
  spacing: spacing,
  typography: typography,
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const ThemeProvider = ({ children }: any) => {
  const [dark, setDark] = useState(true);
  const toggleTheme = () => setDark(!dark);
  const theme = useMemo(
    () => (dark ? darkTheme : lightTheme),
    [dark]
  );
  
  return (
    <ThemeContext.Provider value={{theme, dark, toggleTheme}}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);