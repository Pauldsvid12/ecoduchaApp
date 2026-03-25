import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatBar } from '@/components/StatBar';
import { estadisticasMensuales } from '@/constants/MockData';
import { Colors } from '@/constants/Colors';

export default function Estadisticas() {
  const [vista, setVista] = useState<'litros' | 'kwh'>('litros');

  const maxLitros = Math.max(...estadisticasMensuales.map(e => e.litros));
  const maxKwh = Math.max(...estadisticasMensuales.map(e => e.kwh));
  const promedioLitros = (estadisticasMensuales.reduce((s, e) => s + e.litros, 0) / estadisticasMensuales.length).toFixed(0);
  const promedioKwh = (estadisticasMensuales.reduce((s, e) => s + e.kwh, 0) / estadisticasMensuales.length).toFixed(1);

  const equivalencias = [
    { icono: 'leaf-outline' as const, texto: 'Ahorrar 100L al mes equivale al impacto de plantar un árbol' },
    { icono: 'bulb-outline' as const, texto: '1 kWh ahorrado = 10 horas de foco LED encendido' },
    { icono: 'trending-down-outline' as const, texto: 'Con EcoDucha puedes reducir tu planilla hasta un 20%' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0F2D4E', '#0EA5E9']} style={styles.header}>
        <Text style={styles.headerTitle}>Consumo mensual</Text>
        <View style={styles.promedioRow}>
          <View style={styles.promedioItem}>
            <Ionicons name="water-outline" size={18} color="rgba(255,255,255,0.8)" />
            <Text style={styles.promedioValor}>{promedioLitros} L</Text>
            <Text style={styles.promedioLabel}>Promedio agua/mes</Text>
          </View>
          <View style={styles.promedioItem}>
            <Ionicons name="flash-outline" size={18} color="rgba(255,255,255,0.8)" />
            <Text style={styles.promedioValor}>{promedioKwh} kWh</Text>
            <Text style={styles.promedioLabel}>kWh promedio/mes</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Toggle agua / energía */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleBtn, vista === 'litros' && styles.toggleActivo]}
          onPress={() => setVista('litros')}
        >
          <Ionicons name="water-outline" size={16} color={vista === 'litros' ? Colors.dark : Colors.textLight} />
          <Text style={[styles.toggleTexto, vista === 'litros' && styles.toggleTextoActivo]}> Agua (L)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, vista === 'kwh' && styles.toggleActivo]}
          onPress={() => setVista('kwh')}
        >
          <Ionicons name="flash-outline" size={16} color={vista === 'kwh' ? Colors.dark : Colors.textLight} />
          <Text style={[styles.toggleTexto, vista === 'kwh' && styles.toggleTextoActivo]}> Energía (kWh)</Text>
        </TouchableOpacity>
      </View>

      {/* Gráfica */}
      <View style={styles.graficaCard}>
        <Text style={styles.graficaTitulo}>
          {vista === 'litros' ? 'Litros consumidos por mes' : 'Energía consumida por mes (kWh)'}
        </Text>
        <View style={styles.graficaContainer}>
          {estadisticasMensuales.map((e) => (
            <StatBar
              key={e.mes}
              mes={e.mes}
              valor={vista === 'litros' ? e.litros : e.kwh}
              maxValor={vista === 'litros' ? maxLitros : maxKwh}
              color={vista === 'litros' ? Colors.primary : Colors.warning}
            />
          ))}
        </View>
      </View>

      {/* Equivalencias */}
      <View style={styles.equivalenciasCard}>
        <Text style={styles.seccionTitulo}>¿Qué significa ese consumo?</Text>
        {equivalencias.map((e, i) => (
          <View key={i} style={styles.equivItem}>
            <Ionicons name={e.icono} size={24} color={Colors.green} />
            <Text style={styles.equivTexto}>{e.texto}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { padding: 24, paddingTop: 32 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '900', marginBottom: 16 },
  promedioRow: { flexDirection: 'row', gap: 12 },
  promedioItem: { flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: 14, alignItems: 'center' },
  promedioValor: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 6 },
  promedioLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 4 },
  toggleContainer: {
    flexDirection: 'row', margin: 16,
    backgroundColor: '#E2E8F0', borderRadius: 12, padding: 4,
  },
  toggleBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  toggleActivo: { backgroundColor: Colors.white, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  toggleTexto: { fontSize: 13, color: Colors.textLight, fontWeight: '600' },
  toggleTextoActivo: { color: Colors.dark },
  graficaCard: {
    backgroundColor: Colors.white, marginHorizontal: 16, borderRadius: 16, padding: 20,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  graficaTitulo: { fontSize: 14, fontWeight: '700', color: Colors.dark, marginBottom: 20 },
  graficaContainer: { flexDirection: 'row', alignItems: 'flex-end', height: 180 },
  equivalenciasCard: {
    backgroundColor: Colors.white, margin: 16, borderRadius: 16, padding: 20,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  seccionTitulo: { fontSize: 15, fontWeight: '800', color: Colors.dark, marginBottom: 16 },
  equivItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14, gap: 12 },
  equivTexto: { flex: 1, fontSize: 13, color: Colors.text, lineHeight: 20 },
});