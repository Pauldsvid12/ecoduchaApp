import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '@/contexts/ThemeContext';

interface TarifaRowProps {
  label: string;
  valor: string | number;
  /** Si es true agrega un separador superior */
  divider?: boolean;
}

/**
 * Fila de tarifa / dato informativo (label + valor).
 * Uso dentro de SectionCard para mostrar tarifas, configuraciones de solo lectura, etc.
 *
 * @example
 * <TarifaRow label="Tarifa agua" valor="$0.003/L" />
 * <TarifaRow label="Tarifa energía" valor="$0.09/kWh" divider />
 */
export function TarifaRow({ label, valor, divider = false }: TarifaRowProps) {
  const { colors } = useContext(ThemeContext);

  const styles = useMemo(() => StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderTopWidth: divider ? StyleSheet.hairlineWidth : 0,
      borderTopColor: colors.textLight,
    },
    label: {
      fontSize: 14,
      color: colors.text,
    },
    valor: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
    },
  }), [colors, divider]);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
}
