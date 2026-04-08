import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '@/contexts/ThemeContext';

interface ScreenHeaderProps {
  titulo: string;
  subtitulo?: string;
  icono?: keyof typeof Ionicons.glyphMap;
  /** Contenido extra en la esquina derecha (ej: botón de trash) */
  rightSlot?: React.ReactNode;
}

/**
 * Header oscuro reutilizable (hero) para pantallas de tabs.
 * Reemplaza el bloque hero repetido en historial, estadísticas y configuración.
 *
 * @example
 * <ScreenHeader titulo="Historial" subtitulo="Tus duchas" icono="list" />
 */
export function ScreenHeader({ titulo, subtitulo, icono, rightSlot }: ScreenHeaderProps) {
  const { colors } = useContext(ThemeContext);

  const styles = useMemo(() => StyleSheet.create({
    hero: {
      backgroundColor: colors.dark,
      padding: 32,
      alignItems: 'center',
      paddingTop: 60,
      paddingBottom: 24,
    },
    titulo: {
      color: '#fff',
      fontSize: 26,
      fontWeight: '900',
      marginTop: 8,
    },
    subtitulo: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 14,
      marginTop: 4,
    },
    rightSlot: {
      position: 'absolute',
      right: 20,
      top: 60,
    },
  }), [colors]);

  return (
    <View style={styles.hero}>
      {rightSlot && <View style={styles.rightSlot}>{rightSlot}</View>}
      {icono && <Ionicons name={icono} size={52} color="#fff" />}
      <Text style={styles.titulo}>{titulo}</Text>
      {subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}
    </View>
  );
}
