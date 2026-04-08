import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SensorCard } from '@/components/SensorCard';
import { ThemeContext } from '@/contexts/ThemeContext';
import { useSimulador } from '../hooks/useSimulador';
import { saveDuchaData } from '../services/storage';

export default function Dashboard() {
  const { colors: Colors } = useContext(ThemeContext);
  const { activa, litros, temp, caudal, toggle, reset } = useSimulador();
  const [limiteUsuario, setLimiteUsuario] = useState(50);

  useEffect(() => {
    const cargarConfig = async () => {
      const res = await AsyncStorage.getItem('@config_app');
      if (res) {
        const config = JSON.parse(res);
        if (config.alertaLitros) setLimiteUsuario(50); 
        // Aquí podrías usar config.tiempoLimite * caudal si quisieras ser más complejo
      }
    };
    cargarConfig();
  }, [activa]);

  const getUrgencyColor = (l: number) => {
    if (l < limiteUsuario * 0.5) return '#22C55E';
    if (l < limiteUsuario) return '#F59E0B';
    return '#EF4444';
  };

  const currentColor = getUrgencyColor(litros);

  useEffect(() => {
    if (litros >= limiteUsuario && activa) {
      // Simulación de alerta de Firmware
      console.log("UMBRAL ALCANZADO: Enviando señal a válvula...");
    }
  }, [litros]);

  const finalizarDucha = async () => {
    if (litros > 0) {
      await saveDuchaData({
        litros: parseFloat(litros.toFixed(1)),
        caudal: caudal,
        fecha: new Date().toLocaleString()
      });
      Alert.alert("Ducha Finalizada", `Has consumido ${litros.toFixed(1)}L`);
    }
    reset();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors.background }]}>
      <LinearGradient colors={[currentColor, Colors.gradientEnd]} style={styles.header}>
        <View style={styles.tempContainer}>
          <Text style={styles.tempValor}>{temp.toFixed(1)}°</Text>
          <Text style={styles.tempLabel}>Temperatura en Tiempo Real</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.grid}>
          <SensorCard icono="water" titulo="Consumo" valor={litros.toFixed(1)} unidad="L" color={currentColor} />
          <SensorCard icono="speedometer" titulo="Caudal" valor={caudal.toFixed(1)} unidad="L/m" color={Colors.primary} />
        </View>

        {litros >= limiteUsuario && (
          <View style={styles.alertBox}>
            <Ionicons name="warning" size={20} color="#EF4444" />
            <Text style={styles.alertText}>Límite de consumo alcanzado</Text>
          </View>
        )}

        <View style={styles.botonesRow}>
          <TouchableOpacity 
            style={[styles.btn, { backgroundColor: activa ? '#64748B' : currentColor }]} 
            onPress={toggle}
          >
            <Text style={styles.btnText}>{activa ? 'Pausar' : 'Iniciar'}</Text>
          </TouchableOpacity>
          
          {!activa && litros > 0 && (
            <TouchableOpacity style={styles.btnReset} onPress={finalizarDucha}>
              <Ionicons name="save" size={24} color={Colors.text} />
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
  tempContainer: { alignItems: 'center' },
  tempValor: { color: '#fff', fontSize: 70, fontWeight: 'bold' },
  tempLabel: { color: '#fff', opacity: 0.8 },
  content: { padding: 20 },
  grid: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  alertBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEE2E2', padding: 15, borderRadius: 12, marginBottom: 20, gap: 10 },
  alertText: { color: '#B91C1C', fontWeight: 'bold' },
  botonesRow: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  btnReset: { width: 60, height: 60, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }
});