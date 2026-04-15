import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import {
  Clock3,
  Droplets,
  LucideIcon,
  ShieldCheck,
  Thermometer,
  Zap,
} from 'lucide-react-native';
import { ThemeContext } from '@/contexts/ThemeContext';

interface SessionItemProps {
  fecha: string;
  hora: string;
  duracion: string;
  litros: number;
  temperatura: number;
  energia: number;
  eficiente?: boolean;
}

function MiniMetric({
  Icon,
  value,
  color,
}: {
  Icon: LucideIcon;
  value: string;
  color: string;
}) {
  return (
    <View style={styles.metric}>
      <Icon size={14} color={color} strokeWidth={2.2} />
      <Text style={styles.metricText}>{value}</Text>
    </View>
  );
}

export function SessionItem({
  fecha,
  hora,
  duracion,
  litros,
  temperatura,
  energia,
  eficiente = false,
}: SessionItemProps) {
  const { colors } = useContext(ThemeContext);

  return (
    <Animated.View
      entering={FadeInRight.springify()}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: `${colors.primary}18`,
        },
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.fecha, { color: colors.text }]}>{fecha}</Text>
          <Text style={[styles.hora, { color: colors.textLight }]}>{hora}</Text>
        </View>

        <View
          style={[
            styles.badge,
            {
              backgroundColor: eficiente
                ? 'rgba(34,197,94,0.16)'
                : 'rgba(251,146,60,0.16)',
            },
          ]}
        >
          <ShieldCheck
            size={14}
            color={eficiente ? '#86EFAC' : '#FBBF24'}
            strokeWidth={2.2}
          />
          <Text style={styles.badgeText}>
            {eficiente ? 'Eficiente' : 'Alta demanda'}
          </Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <MiniMetric Icon={Clock3} value={duracion} color="#7DD3FC" />
        <MiniMetric Icon={Droplets} value={`${litros} L`} color="#22D3EE" />
        <MiniMetric Icon={Thermometer} value={`${temperatura} °C`} color="#FB923C" />
        <MiniMetric Icon={Zap} value={`${energia} kWh`} color="#A78BFA" />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start',
  },
  fecha: {
    fontSize: 15,
    fontWeight: '800',
  },
  hora: {
    fontSize: 12,
    marginTop: 4,
  },
  badge: {
    minHeight: 32,
    borderRadius: 999,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '800',
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metric: {
    minHeight: 30,
    borderRadius: 999,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(2,6,23,0.42)',
    borderWidth: 1,
    borderColor: 'rgba(125,211,252,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricText: {
    color: '#E0F2FE',
    fontSize: 11,
    fontWeight: '700',
  },
});