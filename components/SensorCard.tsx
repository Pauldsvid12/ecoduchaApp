import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface Props {
  titulo: string;
  valor: string;
  unidad: string;
  icono: keyof typeof Ionicons.glyphMap;
  color?: string;
}

export function SensorCard({ titulo, valor, unidad, icono, color = Colors.primary }: Props) {
  // Contenedor exterior para la sombra (sin fondo)
  return (
    <View style={[styles.shadowContainer, { shadowColor: color }]}>
      {/* Contenedor interior para el contenido (con fondo y bordes) */}
      <View style={styles.cardContent}>
        <Ionicons name={icono} size={28} color={color} style={styles.icono} />
        <Text style={[styles.valor, { color }]}>{valor}</Text>
        <Text style={styles.unidad}>{unidad}</Text>
        <Text style={styles.titulo}>{titulo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    flex: 1,
    marginHorizontal: 4,
    // Estilos de sombra para iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    // Elevación para la sombra en Android
    elevation: 8,
  },
  cardContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    overflow: 'hidden', // Asegura que el contenido respete los bordes redondeados
  },
  icono: { marginBottom: 6 },
  valor: { fontSize: 26, fontWeight: '800' },
  unidad: { fontSize: 12, color: Colors.textLight, marginBottom: 2 },
  titulo: { fontSize: 11, color: Colors.text, textAlign: 'center', fontWeight: '600' },
});
