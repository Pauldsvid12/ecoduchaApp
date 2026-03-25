import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Props {
  sesion: {
    id: string; fecha: string; hora: string;
    duracion: number; litros: number;
    tempProm: number; energia: number; costo: number;
  };
}

export function SessionItem({ sesion }: Props) {
  const minutos = Math.floor(sesion.duracion / 60);
  const segundos = sesion.duracion % 60;

  return (
    <View style={styles.container}>
      <View style={styles.fechaBox}>
        <Text style={styles.hora}>{sesion.hora}</Text>
        <Text style={styles.fecha}>{sesion.fecha.split('-').reverse().join('/')}</Text>
      </View>
      <View style={styles.separador} />
      <View style={styles.datos}>
        <View style={styles.fila}>
          <Text style={styles.dato}>💧 {sesion.litros} L</Text>
          <Text style={styles.dato}>⚡ {sesion.energia} kWh</Text>
        </View>
        <View style={styles.fila}>
          <Text style={styles.dato}>🌡️ {sesion.tempProm}°C</Text>
          <Text style={styles.dato}>⏱️ {minutos}m {segundos}s</Text>
        </View>
      </View>
      <View style={styles.costoBox}>
        <Text style={styles.costoLabel}>Costo</Text>
        <Text style={styles.costo}>${sesion.costo.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white, borderRadius: 14, padding: 14,
    marginBottom: 10, flexDirection: 'row', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 3,
  },
  fechaBox: { alignItems: 'center', width: 55 },
  hora: { fontSize: 14, fontWeight: '700', color: Colors.dark },
  fecha: { fontSize: 10, color: Colors.textLight, marginTop: 2 },
  separador: { width: 1, height: '80%', backgroundColor: '#E2E8F0', marginHorizontal: 12 },
  datos: { flex: 1 },
  fila: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  dato: { fontSize: 13, color: Colors.text },
  costoBox: { alignItems: 'center', backgroundColor: Colors.background, borderRadius: 10, padding: 8 },
  costoLabel: { fontSize: 9, color: Colors.textLight, fontWeight: '600' },
  costo: { fontSize: 16, fontWeight: '800', color: Colors.green },
});
