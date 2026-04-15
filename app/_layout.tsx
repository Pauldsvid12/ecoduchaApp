import { Stack } from 'expo-router';
import { useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeContext, ThemeProvider } from '../contexts/ThemeContext';

function AppLayout() {
  const { colors } = useContext(ThemeContext);

  return (
    <Stack
      screenOptions={{
        headerStyle:      { backgroundColor: colors.card },
        headerTintColor:  colors.primary,
        headerTitleStyle: { color: colors.text, fontWeight: '800' },
        animation:        'slide_from_right',
      }}
    >
      <Stack.Screen name="(tabs)"   options={{ headerShown: false }} />
      <Stack.Screen name="welcome"  options={{ headerShown: false }} />
      <Stack.Screen
        name="acerca"
        options={{
          presentation: 'modal',
          title:        'Acerca de EcoDucha',
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppLayout />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}