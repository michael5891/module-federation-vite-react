import { createContext, useContext, type ReactNode } from 'react';

export type Theme = {
  name: string;
  surface: string;
  text: string;
  accent: string;
  accentText: string;
};

const ThemeContext = createContext<Theme>({
  name: 'Daylight',
  surface: '#e8f1ff',
  text: '#172554',
  accent: '#1d4ed8',
  accentText: '#ffffff',
});

export function ThemeProvider({
  children,
  theme,
}: {
  children: ReactNode;
  theme: Theme;
}) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
