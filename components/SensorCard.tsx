import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Props {
  titulo: string;
  valor: string;
  unidad: string;
  icono: string;
  color?: string;
}

export function SensorCard({ titulo, valor, unidad, icono, color = Colors.primary }: Props) {
  return (
    <View style={[styles.card, { borderTopColor: color }]}>
      <Text style={styles.icono}>{icono}</Text>
      <Text style={[styles.valor, { color }]}>{valor}</Text>
      <Text style={styles.unidad}>{unidad}</Text>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  icono: { fontSize: 28, marginBottom: 6 },
  valor: { fontSize: 26, fontWeight: '800' },
  unidad: { fontSize: 12, color: Colors.textLight, marginBottom: 2 },
  titulo: { fontSize: 11, color: Colors.text, textAlign: 'center', fontWeight: '600' },
});
