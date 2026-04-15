import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

type GradientColors = readonly [string, string, ...string[]];

function GlowBorder({
  color,
  duration,
  min = 0.16,
  max = 0.5,
  inset = 10,
}: {
  color: string;
  duration: number;
  min?: number;
  max?: number;
  inset?: number;
}) {
  const opacity = useSharedValue(min);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(max, {
        duration,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [duration, max, min, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.borderLayer,
        {
          top: inset,
          right: inset,
          bottom: inset,
          left: inset,
          borderColor: color,
          shadowColor: color,
        },
        animatedStyle,
      ]}
    />
  );
}

function CornerGlow({
  colors,
  style,
}: {
  colors: GradientColors;
  style: any;
}) {
  return (
    <LinearGradient
      pointerEvents="none"
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.cornerGlow, style]}
    />
  );
}

function EdgeLight({
  colors,
  style,
  start,
  end,
}: {
  colors: GradientColors;
  style: any;
  start: { x: number; y: number };
  end: { x: number; y: number };
}) {
  return (
    <LinearGradient
      pointerEvents="none"
      colors={colors}
      start={start}
      end={end}
      style={[styles.edgeLight, style]}
    />
  );
}

function RgbFrame() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <GlowBorder color="#00E5FF" duration={2400} />
      <GlowBorder color="#A855F7" duration={3100} min={0.1} max={0.34} inset={12} />
      <GlowBorder color="#22C55E" duration={3700} min={0.08} max={0.24} inset={14} />

      <EdgeLight
        colors={[
          'transparent',
          'rgba(0,229,255,0.8)',
          'rgba(168,85,247,0.9)',
          'rgba(34,197,94,0.8)',
          'transparent',
        ]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.topEdge}
      />

      <EdgeLight
        colors={[
          'transparent',
          'rgba(34,197,94,0.8)',
          'rgba(168,85,247,0.9)',
          'rgba(0,229,255,0.8)',
          'transparent',
        ]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.bottomEdge}
      />

      <EdgeLight
        colors={[
          'transparent',
          'rgba(0,229,255,0.75)',
          'rgba(168,85,247,0.85)',
          'transparent',
        ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.leftEdge}
      />

      <EdgeLight
        colors={[
          'transparent',
          'rgba(34,197,94,0.75)',
          'rgba(168,85,247,0.85)',
          'transparent',
        ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.rightEdge}
      />

      <CornerGlow
        colors={['rgba(0,229,255,0.22)', 'transparent']}
        style={{ top: 6, left: 6 }}
      />
      <CornerGlow
        colors={['rgba(168,85,247,0.24)', 'transparent']}
        style={{ top: 6, right: 6 }}
      />
      <CornerGlow
        colors={['rgba(34,197,94,0.22)', 'transparent']}
        style={{ bottom: 6, left: 6 }}
      />
      <CornerGlow
        colors={['rgba(0,229,255,0.2)', 'transparent']}
        style={{ bottom: 6, right: 6 }}
      />
    </View>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar style="light" />
        <View style={styles.appShell}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'fade',
              contentStyle: { backgroundColor: 'transparent' },
            }}
          />
          <RgbFrame />
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#020617',
  },
  appShell: {
    flex: 1,
    backgroundColor: '#020617',
  },
  borderLayer: {
    position: 'absolute',
    borderRadius: 28,
    borderWidth: 1.5,
    shadowOpacity: 0.9,
    shadowRadius: 18,
  },
  edgeLight: {
    position: 'absolute',
    borderRadius: 999,
  },
  topEdge: {
    top: 8,
    left: 26,
    right: 26,
    height: 3,
  },
  bottomEdge: {
    bottom: 8,
    left: 26,
    right: 26,
    height: 3,
  },
  leftEdge: {
    top: 26,
    bottom: 26,
    left: 8,
    width: 3,
  },
  rightEdge: {
    top: 26,
    bottom: 26,
    right: 8,
    width: 3,
  },
  cornerGlow: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 999,
  },
});