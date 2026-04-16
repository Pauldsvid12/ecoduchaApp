import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';
import { ThemeContext } from '@/contexts/ThemeContext';

interface SensorCardProps {
  titulo: string;
  descripcion?: string;
  valor?: string | number;
  unidad?: string;
  Icon: LucideIcon;
  color?: string;
}

export function SensorCard({
  titulo,
  descripcion,
  valor,
  unidad,
  Icon,
  color,
}: SensorCardProps) {
  const { colors } = useContext(ThemeContext);
  const accent = color ?? colors.primary;

  return (
    <Animated.View
      entering={FadeInUp.springify()}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: `${accent}22`,
          shadowColor: accent,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: `${accent}18` }]}>
          <Icon size={20} color={accent} strokeWidth={2.2} />
        </View>

        <Text style={[styles.title, { color: colors.text }]}>{titulo}</Text>
      </View>

      {typeof valor !== 'undefined' ? (
        <View style={styles.metricRow}>
          <Text style={[styles.valor, { color: colors.text }]}>{valor}</Text>
          {unidad ? (
            <Text style={[styles.unidad, { color: colors.textLight }]}>
              {unidad}
            </Text>
          ) : null}
        </View>
      ) : null}

      {descripcion ? (
        <Text style={[styles.descripcion, { color: colors.textLight }]}>
          {descripcion}
        </Text>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 132,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  header: {
    gap: 10,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 14,
    gap: 4,
  },
  valor: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.6,
  },
  unidad: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
  },
});