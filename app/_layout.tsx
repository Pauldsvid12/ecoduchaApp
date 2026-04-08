import { Stack } from 'expo-router';
import { ThemeProvider, ThemeContext } from '@/contexts/ThemeContext';
import { useContext } from 'react';

function AppLayout() {
  const { colors: Colors } = useContext(ThemeContext);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.card },
        headerTintColor: Colors.text,
        headerTitleStyle: { color: Colors.text, fontWeight: 'bold' },
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
