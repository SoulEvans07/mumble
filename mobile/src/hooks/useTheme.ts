import { useColorScheme } from 'react-native';

export function useTheme<T>(light: T, dark: T): T {
  const colorScheme = useColorScheme();
  return colorScheme === 'light' ? light : dark;
}
