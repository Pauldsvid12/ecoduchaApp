import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';
import { ThemeContext } from '@/contexts/ThemeContext';

interface StatItemProps {
  Icon: LucideIcon;
  valor: string | number;
  label: string;
  color?: string;
}

export function StatItem({ Icon, valor, label, color }: StatItemProps) {
  const { colors } = useContext(ThemeContext);
  const accent = color ?? colors.primary;

  return (
    <Animated.View
      entering={FadeInLeft.springify()}
      style={[
        styles.card,
        {
          backgroundColor: colors.background,
          borderColor: `${accent}26`,
        },
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: `${accent}18` }]}>
        <Icon size={20} color={accent} strokeWidth={2.2} />
      </View>

      <Text style={[styles.valor, { color: accent }]}>{valor}</Text>
      <Text style={[styles.label, { color: colors.textLight }]}>{label}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    minHeight: 114,
    justifyContent: 'center',
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  valor: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
    letterSpacing: -0.4,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 17,
  },
});