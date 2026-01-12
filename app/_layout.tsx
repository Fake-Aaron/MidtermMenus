import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  // 🔹 Deferred Deep Link Handler
  useEffect(() => {
    const handleDeferredDeepLink = async () => {
      // 1️⃣ Was app opened via a real deep link?
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        return; // Expo Router handles this automatically
      }

      // 2️⃣ Check stored deferred link
      const deferredLink = await AsyncStorage.getItem('deferredLink');
      if (deferredLink) {
        router.replace(deferredLink as any);
        await AsyncStorage.removeItem('deferredLink');
      }
    };

    handleDeferredDeepLink();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal', title: 'Modal' }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
