import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Sesion {
  id: string;
  fecha: string;
  hora: string;
  duracion: number;
  litros: number;
  tempProm: number;
  energia: number;
  costo: number;
}

export function SessionItem({ sesion, colors }: { sesion: Sesion, colors: any }) {
  const minutos = Math.floor(sesion.duracion / 60);
  const segundos = sesion.duracion % 60;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      borderRadius: 14,
      padding: 14,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 3,
    },
    fechaBox: { alignItems: 'center', width: 55 },
    hora: { fontSize: 14, fontWeight: '700', color: colors.dark },
    fecha: { fontSize: 10, color: colors.textLight, marginTop: 2 },
    separador: {
      width: 1,
      height: '80%',
      backgroundColor: colors.card === '#FFFFFF' ? '#E2E8F0' : '#334155',
      marginHorizontal: 12,
    },
    datos: { flex: 1 },
    fila: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    datoItem: { flexDirection: 'row', alignItems: 'center' },
    dato: { fontSize: 12, color: colors.text },
    costoBox: {
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 10,
      padding: 8,
    },
    costoLabel: { fontSize: 9, color: colors.textLight, fontWeight: '600' },
    costo: { fontSize: 16, fontWeight: '800', color: colors.green },
  });

  return (
    <View style={styles.container}>

      {/* Fecha y hora */}
      <View style={styles.fechaBox}>
        <Text style={styles.hora}>{sesion.hora}</Text>
        <Text style={styles.fecha}>{sesion.fecha.split('-').reverse().join('/')}</Text>
      </View>

      <View style={styles.separador} />

      {/* Datos de la sesión */}
      <View style={styles.datos}>
        <View style={styles.fila}>
          <View style={styles.datoItem}>
            <Ionicons name="water-outline" size={13} color={colors.primary} />
            <Text style={styles.dato}> {sesion.litros} L</Text>
          </View>
          <View style={styles.datoItem}>
            <Ionicons name="flash-outline" size={13} color={colors.warning} />
            <Text style={styles.dato}> {sesion.energia} kWh</Text>
          </View>
        </View>
        <View style={styles.fila}>
          <View style={styles.datoItem}>
            <Ionicons name="thermometer-outline" size={13} color={colors.accent} />
            <Text style={styles.dato}> {sesion.tempProm}°C</Text>
          </View>
          <View style={styles.datoItem}>
            <Ionicons name="timer-outline" size={13} color={colors.textLight} />
            <Text style={styles.dato}> {minutos}m {segundos}s</Text>
          </View>
        </View>
      </View>

      {/* Costo */}
      <View style={styles.costoBox}>
        <Text style={styles.costoLabel}>Costo</Text>
        <Text style={styles.costo}>${sesion.costo.toFixed(2)}</Text>
      </View>

    </View>
  );
}
