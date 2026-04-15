import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

type GradientColors = readonly [string, string, ...string[]];

interface AnimatedFrameProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  radius?: number;
  inset?: number;
  backgroundColor?: string;
}

function GlowBorderLayer({
  color,
  duration,
  min,
  max,
  inset,
  radius,
}: {
  color: string;
  duration: number;
  min: number;
  max: number;
  inset: number;
  radius: number;
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
          borderRadius: Math.max(radius - inset, 12),
        },
        animatedStyle,
      ]}
    />
  );
}

function MovingSegment({
  progress,
  width,
  height,
  inset,
  radius,
  colors,
  offset = 0,
  longSize = 96,
  thickness = 4,
  opacity = 1,
}: {
  progress: SharedValue<number>;
  width: number;
  height: number;
  inset: number;
  radius: number;
  colors: GradientColors;
  offset?: number;
  longSize?: number;
  thickness?: number;
  opacity?: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    if (width <= 0 || height <= 0) {
      return { opacity: 0 };
    }

    const edgeInset = inset + 10;
    const minX = edgeInset + longSize / 2;
    const maxX = width - edgeInset - longSize / 2;
    const minY = edgeInset + longSize / 2;
    const maxY = height - edgeInset - longSize / 2;

    const horizontalTravel = Math.max(maxX - minX, 1);
    const verticalTravel = Math.max(maxY - minY, 1);
    const perimeter = horizontalTravel * 2 + verticalTravel * 2;

    const raw = (progress.value + offset) % 1;
    const distance = raw * perimeter;

    let left = 0;
    let top = 0;
    let segmentWidth = longSize;
    let segmentHeight = thickness;

    if (distance < horizontalTravel) {
      const centerX = minX + distance;
      left = centerX - longSize / 2;
      top = edgeInset - thickness / 2;
      segmentWidth = longSize;
      segmentHeight = thickness;
    } else if (distance < horizontalTravel + verticalTravel) {
      const local = distance - horizontalTravel;
      const centerY = minY + local;
      left = width - edgeInset - thickness / 2;
      top = centerY - longSize / 2;
      segmentWidth = thickness;
      segmentHeight = longSize;
    } else if (distance < horizontalTravel * 2 + verticalTravel) {
      const local = distance - horizontalTravel - verticalTravel;
      const centerX = maxX - local;
      left = centerX - longSize / 2;
      top = height - edgeInset - thickness / 2;
      segmentWidth = longSize;
      segmentHeight = thickness;
    } else {
      const local = distance - horizontalTravel * 2 - verticalTravel;
      const centerY = maxY - local;
      left = edgeInset - thickness / 2;
      top = centerY - longSize / 2;
      segmentWidth = thickness;
      segmentHeight = longSize;
    }

    return {
      left,
      top,
      width: segmentWidth,
      height: segmentHeight,
      opacity,
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.segmentWrap,
        animatedStyle,
        { borderRadius: radius },
      ]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFillObject}
      />
    </Animated.View>
  );
}

function AmbientEdge({
  colors,
  style,
  start,
  end,
}: {
  colors: GradientColors;
  style: StyleProp<ViewStyle>;
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

function CornerGlow({
  colors,
  style,
  size,
}: {
  colors: GradientColors;
  style: StyleProp<ViewStyle>;
  size: number;
}) {
  return (
    <LinearGradient
      pointerEvents="none"
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.cornerGlow,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    />
  );
}

export function AnimatedFrame({
  children,
  style,
  contentContainerStyle,
  radius = 28,
  inset = 10,
  backgroundColor = 'transparent',
}: AnimatedFrameProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 5600,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [progress]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  };

  const overlayRadius = useMemo(
    () => Math.max(radius - inset, 12),
    [radius, inset]
  );

  return (
    <View
      onLayout={handleLayout}
      style={[
        styles.container,
        {
          borderRadius: radius,
          backgroundColor,
        },
        style,
      ]}
    >
      <View style={[styles.content, contentContainerStyle]}>{children}</View>

      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          styles.overlay,
          { borderRadius: radius },
        ]}
      >
        <GlowBorderLayer
          color="#22D3EE"
          duration={2400}
          min={0.12}
          max={0.34}
          inset={inset}
          radius={radius}
        />
        <GlowBorderLayer
          color="#8B5CF6"
          duration={3200}
          min={0.08}
          max={0.28}
          inset={inset + 2}
          radius={radius}
        />
        <GlowBorderLayer
          color="#22C55E"
          duration={3900}
          min={0.05}
          max={0.18}
          inset={inset + 4}
          radius={radius}
        />

        <AmbientEdge
          colors={[
            'transparent',
            'rgba(34,211,238,0.75)',
            'rgba(139,92,246,0.85)',
            'rgba(34,197,94,0.72)',
            'transparent',
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            top: inset,
            left: radius,
            right: radius,
            height: 3,
            borderRadius: 999,
          }}
        />

        <AmbientEdge
          colors={[
            'transparent',
            'rgba(34,197,94,0.65)',
            'rgba(139,92,246,0.85)',
            'rgba(34,211,238,0.65)',
            'transparent',
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            bottom: inset,
            left: radius,
            right: radius,
            height: 3,
            borderRadius: 999,
          }}
        />

        <AmbientEdge
          colors={[
            'transparent',
            'rgba(34,211,238,0.6)',
            'rgba(139,92,246,0.78)',
            'transparent',
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            top: radius,
            bottom: radius,
            left: inset,
            width: 3,
            borderRadius: 999,
          }}
        />

        <AmbientEdge
          colors={[
            'transparent',
            'rgba(34,197,94,0.6)',
            'rgba(139,92,246,0.78)',
            'transparent',
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            top: radius,
            bottom: radius,
            right: inset,
            width: 3,
            borderRadius: 999,
          }}
        />

        <CornerGlow
          size={112}
          colors={['rgba(34,211,238,0.22)', 'transparent']}
          style={{ top: 6, left: 6 }}
        />
        <CornerGlow
          size={112}
          colors={['rgba(139,92,246,0.22)', 'transparent']}
          style={{ top: 6, right: 6 }}
        />
        <CornerGlow
          size={112}
          colors={['rgba(34,197,94,0.2)', 'transparent']}
          style={{ bottom: 6, left: 6 }}
        />
        <CornerGlow
          size={112}
          colors={['rgba(34,211,238,0.18)', 'transparent']}
          style={{ bottom: 6, right: 6 }}
        />

        <MovingSegment
          progress={progress}
          width={size.width}
          height={size.height}
          inset={inset}
          radius={overlayRadius}
          colors={[
            'rgba(255,255,255,0)',
            'rgba(34,211,238,0.25)',
            'rgba(34,211,238,1)',
            'rgba(139,92,246,1)',
            'rgba(255,255,255,0)',
          ]}
          opacity={0.95}
        />

        <MovingSegment
          progress={progress}
          width={size.width}
          height={size.height}
          inset={inset}
          radius={overlayRadius}
          colors={[
            'rgba(255,255,255,0)',
            'rgba(34,197,94,0.2)',
            'rgba(34,197,94,0.95)',
            'rgba(34,211,238,0.9)',
            'rgba(255,255,255,0)',
          ]}
          offset={0.34}
          longSize={72}
          thickness={3}
          opacity={0.72}
        />
      </View>
    </View>
  );
}

export default AnimatedFrame;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  overlay: {
    overflow: 'hidden',
  },
  borderLayer: {
    position: 'absolute',
    borderWidth: 1.5,
    shadowOpacity: 0.95,
    shadowRadius: 18,
  },
  edgeLight: {
    position: 'absolute',
  },
  cornerGlow: {
    position: 'absolute',
  },
  segmentWrap: {
    position: 'absolute',
    overflow: 'hidden',
    shadowColor: '#67E8F9',
    shadowOpacity: 0.95,
    shadowRadius: 12,
  },
});