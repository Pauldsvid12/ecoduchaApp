import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { ThemeContext } from '@/contexts/ThemeContext';

interface SwitchRowProps {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  /** Subtexto opcional debajo del label */
  hint?: string;
}

/**
 * Fila de toggle reutilizable con label (y hint opcional).
 * Reemplaza el bloque `switchRow` repetido en configuración.
 *
 * @example
 * <SwitchRow label="Tema oscuro" value={isDark} onValueChange={toggleTheme} />
 */
export function SwitchRow({ label, value, onValueChange, hint }: SwitchRowProps) {
  const { colors } = useContext(ThemeContext);

  const styles = useMemo(() => StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    textGroup: {
      flex: 1,
      marginRight: 12,
    },
    label: {
      fontSize: 14,
      color: colors.text,
    },
    hint: {
      fontSize: 12,
      color: colors.text,
      opacity: 0.5,
      marginTop: 2,
    },
  }), [colors]);

  return (
    <View style={styles.row}>
      <View style={styles.textGroup}>
        <Text style={styles.label}>{label}</Text>
        {hint && <Text style={styles.hint}>{hint}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E2E8F0', true: colors.primary }}
        thumbColor="#fff"
      />
    </View>
  );
}
