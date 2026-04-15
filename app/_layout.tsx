import React from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import AnimatedFrame from '@/components/organisms/AnimatedFrame';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar style="light" />
        <AnimatedFrame
          style={styles.shell}
          contentContainerStyle={styles.shellContent}
          backgroundColor="#020617"
          radius={30}
          inset={8}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'fade',
              contentStyle: { backgroundColor: 'transparent' },
            }}
          />
        </AnimatedFrame>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#020617',
  },
  shell: {
    flex: 1,
    backgroundColor: '#020617',
  },
  shellContent: {
    flex: 1,
  },
});