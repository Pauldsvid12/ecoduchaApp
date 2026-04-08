import React, { useContext, useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '@/contexts/ThemeContext';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  icono?: keyof typeof Ionicons.glyphMap;
  /** Color de fondo. Por defecto usa colors.primary */
  color?: string;
  /** Muestra un spinner en lugar del ícono */
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

/**
 * Botón primario de acción reutilizable.
 * Reemplaza botonPrincipal, botonGuardar, botonReset, etc.
 *
 * @example
 * <PrimaryButton label="Iniciar Ducha" icono="play-circle-outline" onPress={toggle} color={colors.green} />
 * <PrimaryButton label="Sincronizar" icono="cloud-upload-outline" onPress={guardar} loading={saving} />
 */
export function PrimaryButton({
  label,
  onPress,
  icono,
  color,
  loading = false,
  disabled = false,
  style,
}: PrimaryButtonProps) {
  const { colors } = useContext(ThemeContext);
  const bgColor = color ?? colors.primary;

  const styles = useMemo(() => StyleSheet.create({
    btn: {
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
    },
    label: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '800',
      marginLeft: icono || loading ? 8 : 0,
    },
  }), [disabled, icono, loading]);

  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: bgColor }, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        icono && <Ionicons name={icono} size={20} color="#fff" />
      )}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
