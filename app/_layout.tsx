import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="acerca"
          options={{
            title: 'Acerca de EcoDucha',
            headerStyle: { backgroundColor: '#0F2D4E' },
            headerTintColor: '#fff',
          }}
        />
      </Stack>
    </>
  );
}
