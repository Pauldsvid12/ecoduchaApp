import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';
import { ThemeContext } from '@/contexts/ThemeContext';

interface ScreenHeaderProps {
  titulo: string;
  subtitulo?: string;
  Icon?: LucideIcon;
  rightSlot?: React.ReactNode;
}

export function ScreenHeader({
  titulo,
  subtitulo,
  Icon,
  rightSlot,
}: ScreenHeaderProps) {
  const { colors } = useContext(ThemeContext);

  return (
    <LinearGradient
      colors={[
        colors.gradientStart ?? '#0C2842',
        colors.gradientEnd ?? colors.dark ?? '#08121F',
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      {rightSlot ? <View style={styles.rightSlot}>{rightSlot}</View> : null}

      <Animated.View entering={FadeInDown.springify()} style={styles.content}>
        {Icon ? (
          <View style={styles.iconWrap}>
            <Icon size={28} color="#F8FAFC" strokeWidth={1.8} />
          </View>
        ) : null}

        <Text style={styles.titulo}>{titulo}</Text>

        {subtitulo ? <Text style={styles.subtitulo}>{subtitulo}</Text> : null}
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  content: {
    alignItems: 'center',
    gap: 8,
  },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitulo: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
  },
  rightSlot: {
    position: 'absolute',
    right: 18,
    top: 54,
    zIndex: 2,
  },
});