import React, { useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ThemeContext } from '@/contexts/ThemeContext';

interface StatBarProps {
  label: string;
  value: number;
  max: number;
  color?: string;
  suffix?: string;
}

export function StatBar({
  label,
  value,
  max,
  color,
  suffix = '',
}: StatBarProps) {
  const { colors } = useContext(ThemeContext);
  const accent = color ?? colors.primary;
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(Math.min(value / Math.max(max, 1), 1), {
      duration: 700,
      easing: Easing.out(Easing.cubic),
    });
  }, [max, progress, value]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        <Text style={[styles.value, { color: accent }]}>
          {value}
          {suffix}
        </Text>
      </View>

      <View
        style={[
          styles.track,
          { backgroundColor: `${colors.textLight}18` },
        ]}
      >
        <Animated.View
          style={[
            styles.fill,
            animatedStyle,
            { backgroundColor: accent },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
  },
  value: {
    fontSize: 12,
    fontWeight: '800',
  },
  track: {
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});