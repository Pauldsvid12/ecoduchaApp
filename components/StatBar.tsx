import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  mes: string;
  valor: number;
  maxValor: number;
  color: string;
}

export function StatBar({ mes, valor, maxValor, color }: Props) {
  const altura = Math.max((valor / maxValor) * 140, 8);
  return (
    <View style={styles.container}>
      <Text style={styles.valor}>{valor}</Text>
      <View style={styles.barraFondo}>
        <View style={[styles.barra, { height: altura, backgroundColor: color }]} />
      </View>
      <Text style={styles.mes}>{mes}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', flex: 1, marginHorizontal: 3 },
  barraFondo: {
    height: 140,
    width: '100%',
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barra: { width: '100%', borderRadius: 8 },
  mes: { fontSize: 11, color: Colors.textLight, marginTop: 6, fontWeight: '600' },
  valor: { fontSize: 9, color: Colors.textLight, marginBottom: 4 },
});