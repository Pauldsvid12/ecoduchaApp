import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '@/contexts/ThemeContext';

interface StatItemProps {
  icono: keyof typeof Ionicons.glyphMap;
  valor: string | number;
  label: string;
  /** Color del ícono y del valor. Por defecto usa colors.primary */
  color?: string;
}

/**
 * Tarjeta de estadística individual (ícono + valor + label).
 * Uso típico dentro de un `<View style={{ flexDirection: 'row', gap: 8 }}>` de 2 o 4 items.
 *
 * @example
 * <StatItem icono="beaker-outline" valor="120.5" label="Litros Totales" />
 */
export function StatItem({ icono, valor, label, color }: StatItemProps) {
  const { colors, theme } = useContext(ThemeContext);
  const accentColor = color ?? colors.primary;

  const styles = useMemo(() => StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 14,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.primary + '33',
    },
    valor: {
      fontSize: 22,
      fontWeight: '800',
      color: accentColor,
      marginTop: 4,
    },
    label: {
      fontSize: 12,
      color: colors.text,
      opacity: 0.6,
      marginTop: 2,
      textAlign: 'center',
    },
  }), [colors, theme, accentColor]);

  return (
    <View style={styles.card}>
      <Ionicons name={icono} size={24} color={accentColor} />
      <Text style={styles.valor}>{valor}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}
