import { Stack } from 'expo-router';
import { ThemeProvider, ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';

function AppLayout() {
  const { colors } = useContext(ThemeContext);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text, fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="acerca" 
        options={{ 
          presentation: 'modal', 
          title: 'Acerca de',
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  );
}
