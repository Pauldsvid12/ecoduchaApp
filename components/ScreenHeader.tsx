import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import {
  LucideIcon,
  Settings2,
  List,
  BarChart2,
  Info,
  Home,
} from 'lucide-react-native';
import { ThemeContext } from '@/contexts/ThemeContext';

interface ScreenHeaderProps {
  titulo: string;
  subtitulo?: string;
  Icon?: LucideIcon;
  icono?: string;
  rightSlot?: React.ReactNode;
}

function getLegacyIcon(icono?: string): LucideIcon | undefined {
  switch (icono) {
    case 'settings':
    case 'settings-outline':
      return Settings2;
    case 'list':
    case 'list-outline':
      return List;
    case 'stats-chart':
    case 'stats-chart-outline':
      return BarChart2;
    case 'information-circle':
    case 'information-circle-outline':
      return Info;
    case 'home':
    case 'home-outline':
      return Home;
    default:
      return undefined;
  }
}

export function ScreenHeader({
  titulo,
  subtitulo,
  Icon,
  icono,
  rightSlot,
}: ScreenHeaderProps) {
  const { colors } = useContext(ThemeContext);
  const ResolvedIcon = Icon || getLegacyIcon(icono);

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      {rightSlot && <View style={styles.rightSlot}>{rightSlot}</View>}

      <Animated.View entering={FadeInDown.springify()} style={styles.content}>
        {ResolvedIcon && (
          <ResolvedIcon size={48} color="rgba(255,255,255,0.9)" strokeWidth={1.5} />
        )}
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
  },
  content: {
    alignItems: 'center',
    gap: 6,
  },
  titulo: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  subtitulo: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    textAlign: 'center',
  },
  rightSlot: {
    position: 'absolute',
    right: 20,
    top: 56,
  },
});