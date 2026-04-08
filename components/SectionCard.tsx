import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '@/contexts/ThemeContext';

interface SectionCardProps {
  titulo: string;
  icono?: keyof typeof Ionicons.glyphMap;
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Tarjeta de sección con título e ícono opcional.
 * Reemplaza el bloque `seccion` + `seccionTituloRow` repetido en estadísticas y configuración.
 *
 * @example
 * <SectionCard titulo="Apariencia" icono="color-palette-outline">
 *   <SwitchRow ... />
 * </SectionCard>
 */
export function SectionCard({ titulo, icono, children, style }: SectionCardProps) {
  const { colors, theme } = useContext(ThemeContext);

  const styles = useMemo(() => StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 16,
      padding: 20,
      elevation: 3,
      shadowColor: theme === 'dark' ? '#000' : colors.dark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme === 'dark' ? 0.3 : 0.08,
      shadowRadius: 4,
    },
    tituloRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      gap: 6,
    },
    titulo: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.text,
    },
  }), [colors, theme]);

  return (
    <View style={[styles.card, style]}>
      <View style={styles.tituloRow}>
        {icono && <Ionicons name={icono} size={18} color={colors.primary} />}
        <Text style={styles.titulo}>{titulo}</Text>
      </View>
      {children}
    </View>
  );
}
