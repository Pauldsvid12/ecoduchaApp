import React, { useState, useRef, useContext, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SensorCard } from '@/components/SensorCard';
import { ThemeContext } from '@/contexts/ThemeContext';

export default function Dashboard() {
  const { colors: Colors } = useContext(ThemeContext);

  const [activa, setActiva] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const [tempActual, setTempActual] = useState(18.0);
  const [sim, setSim] = useState({ litros: 0, caudal: 0.0 });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getUrgencyColor = (litros: number) => {
    if (litros < 15) return '#22C55E'; 
    if (litros < 30) return '#F59E0B'; 
    return '#EF4444';                
  };

  const currentColor = useMemo(() => getUrgencyColor(sim.litros), [sim.litros]);

  const ahorro = useMemo(() => {
    const DUCHA_ESTANDAR = 100;
    const calculado = DUCHA_ESTANDAR - sim.litros;
    return calculado > 0 ? calculado : 0;
  }, [sim.litros]);

  const botellasAhorradas = Math.floor(ahorro);

  useEffect(() => {
    if (activa) {
      intervalRef.current = setInterval(() => {
        setTiempo(t => t + 1);
        setTempActual(t => Math.min(38, t + 0.2)); 

        setSim(prev => ({
          ...prev,
          caudal: 8.5,
          litros: prev.litros + (8.5 / 60) 
        }));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [activa]);

  const toggleSesion = () => setActiva(!activa);
  const resetear = () => {
    setActiva(false);
    setTiempo(0);
    setSim({ litros: 0, caudal: 0.0 });
    setTempActual(18.0);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors.background }]}>
      <LinearGradient colors={[currentColor, Colors.gradientEnd]} style={styles.header}>
        <View style={styles.tempContainer}>
          <Text style={styles.tempValor}>{tempActual.toFixed(1)}°</Text>
          <Text style={styles.tempLabel}>Temperatura del Agua</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.grid}>
          <SensorCard 
            icono="water" 
            titulo="Consumo" 
            valor={sim.litros.toFixed(1)} 
            unidad="L"
            color={currentColor} 
          />
          <SensorCard 
            icono="speedometer" 
            titulo="Caudal" 
            valor={sim.caudal.toFixed(1)} 
            unidad="L/m"
            color={Colors.primary} 
          />
        </View>

        <View style={[styles.cardAhorro, { borderColor: currentColor }]}>
          <View style={styles.ahorroInfo}>
            <Ionicons name="leaf" size={24} color="#22C55E" />
            <Text style={styles.ahorroTitulo}>Impacto Ecológico</Text>
          </View>
          <Text style={styles.ahorroDetalle}>Estás ahorrando el equivalente a:</Text>
          <View style={styles.botellasRow}>
            <Text style={styles.botellasNumero}>{botellasAhorradas}</Text>
            <Text style={styles.botellasTexto}> botellas de 1L</Text>
          </View>
        </View>

        <View style={styles.botonesRow}>
          <TouchableOpacity 
            style={[styles.btn, { backgroundColor: activa ? '#64748B' : currentColor }]} 
            onPress={toggleSesion}
          >
            <Text style={styles.btnText}>{activa ? (tiempo > 0 ? 'Pausar' : 'Cerrar') : 'Empezar Ducha'}</Text>
          </TouchableOpacity>
          
          {!activa && tiempo > 0 && (
            <TouchableOpacity style={styles.btnReset} onPress={resetear}>
              <Ionicons name="refresh" size={24} color={Colors.text} />
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
  cardAhorro: { backgroundColor: '#F8FAFC', borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderStyle: 'dashed' },
  ahorroInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 5 },
  ahorroTitulo: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  ahorroDetalle: { color: '#64748B', fontSize: 14 },
  botellasRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 10 },
  botellasNumero: { fontSize: 32, fontWeight: 'bold', color: '#22C55E' },
  botellasTexto: { fontSize: 16, color: '#64748B' },
  botonesRow: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  btnReset: { width: 60, height: 60, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }
});