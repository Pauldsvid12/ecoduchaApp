import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SensorCard } from '@/components/SensorCard';
import { ThemeContext } from '@/contexts/ThemeContext';
import { useSimulador } from '../hooks/useSimulador';
import { saveDuchaData } from '../services/storage';

export default function Dashboard() {
  const { colors: Colors } = useContext(ThemeContext);
  const { activa, litros, temp, caudal, toggle, reset } = useSimulador();

  const getUrgencyColor = (l: number) => {
    if (l < 15) return '#22C55E';
    if (l < 30) return '#F59E0B';
    return '#EF4444';
  };

  const currentColor = getUrgencyColor(litros);

  const finalizarDucha = async () => {
    if (litros > 0) {
      await saveDuchaData({
        litros: parseFloat(litros.toFixed(1)),
        caudal: caudal,
        fecha: new Date().toLocaleString()
      });
    }
    reset();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors.background }]}>
      <LinearGradient colors={[currentColor, Colors.gradientEnd]} style={styles.header}>
        <View style={styles.tempContainer}>
          <Text style={styles.tempValor}>{temp.toFixed(1)}°</Text>
          <Text style={styles.tempLabel}>Temperatura del Agua</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.grid}>
          <SensorCard icono="water" titulo="Consumo" valor={litros.toFixed(1)} unidad="L" color={currentColor} />
          <SensorCard icono="speedometer" titulo="Caudal" valor={caudal.toFixed(1)} unidad="L/m" color={Colors.primary} />
        </View>

        <View style={styles.botonesRow}>
          <TouchableOpacity 
            style={[styles.btn, { backgroundColor: activa ? '#64748B' : currentColor }]} 
            onPress={toggle}
          >
            <Text style={styles.btnText}>{activa ? 'Pausar Ducha' : 'Iniciar EcoDucha'}</Text>
          </TouchableOpacity>
          
          {!activa && litros > 0 && (
            <TouchableOpacity style={styles.btnReset} onPress={finalizarDucha}>
              <Ionicons name="checkmark-done" size={24} color={Colors.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 40, paddingTop: 60, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems: 'center' },
  tempContainer: { alignItems: 'center', justifyContent: 'center' },
  tempValor: { color: '#fff', fontSize: 70, fontWeight: 'bold' },
  tempLabel: { color: '#fff', opacity: 0.8 },
  content: { padding: 20 },
  grid: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  botonesRow: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  btnReset: { width: 60, height: 60, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }
});