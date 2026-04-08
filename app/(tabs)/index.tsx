import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SensorCard } from '@/components/SensorCard';
import { Colors } from '@/constants/Colors';

export default function Dashboard() {
  const [activa, setActiva] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const [litros, setLitros] = useState(0);
  const [tempActual, setTempActual] = useState(19.5);
  const [energia, setEnergia] = useState(0);
  const tempObjetivo = 38;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (activa) {
      pulseRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.12, duration: 600, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      );
      pulseRef.current.start();

      interval = setInterval(() => {
        setTiempo(t => t + 1);
        setLitros(l => parseFloat((l + 0.125).toFixed(2)));
        setTempActual(t => parseFloat(Math.min(t + 0.3, tempObjetivo + 0.5).toFixed(1)));
        setEnergia(e => parseFloat((e + 0.00041).toFixed(4)));
      }, 1000);
    } else {
      pulseRef.current?.stop();
      pulseAnim.setValue(1);
    }
    return () => clearInterval(interval);
  }, [activa]);

  const resetear = () => {
    setActiva(false);
    setTiempo(0);
    setLitros(0);
    setTempActual(19.5);
    setEnergia(0);
  };

  const minutos = Math.floor(tiempo / 60);
  const segundos = tiempo % 60;
  const costo = parseFloat((litros * 0.003 + energia * 0.09).toFixed(3));
  const progTemp = Math.min((tempActual / tempObjetivo) * 100, 100);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <LinearGradient colors={['#0F2D4E', '#0EA5E9']} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>EcoDucha</Text>
            <View style={styles.estadoRow}>
              <Ionicons
                name={activa ? 'radio-button-on' : 'radio-button-off'}
                size={12}
                color={activa ? Colors.green : 'rgba(255,255,255,0.5)'}
              />
              <Text style={styles.headerSub}> {activa ? 'Sesión activa' : 'Sin sesión'}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/acerca')} style={styles.infoBtn}>
            <Ionicons name="information-circle-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Temperatura grande */}
        <View style={styles.tempCenter}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <Text style={styles.tempGrande}>{tempActual}°C</Text>
          </Animated.View>
          <Text style={styles.tempSub}>Objetivo: {tempObjetivo}°C</Text>
          <View style={styles.barraFondo}>
            <View style={[styles.barraRelleno, { width: `${progTemp}%` }]} />
          </View>
        </View>
      </LinearGradient>

      {/* Cards sensores */}
      <View style={styles.cardsRow}>
        <SensorCard titulo="Caudal" valor="7.5" unidad="L/min" icono="water-outline" color={Colors.primary} />
        <SensorCard titulo="Corriente" valor="22.4" unidad="A" icono="flash-outline" color={Colors.warning} />
      </View>
      <View style={[styles.cardsRow, { marginTop: 0 }]}>
        <SensorCard titulo="Litros" valor={litros.toFixed(1)} unidad="L" icono="beaker-outline" color={Colors.accent} />
        <SensorCard titulo="Energía" valor={(energia * 1000).toFixed(1)} unidad="Wh" icono="battery-charging-outline" color={Colors.green} />
      </View>

      {/* Tiempo y costo */}
      <View style={styles.tiempoCostoShadow}>
        <View style={styles.tiempoCostoContent}>
          <View style={styles.tiempoBox}>
            <Ionicons name="timer-outline" size={18} color={Colors.textLight} style={{ marginBottom: 4 }} />
            <Text style={styles.tiempoValor}>
              {String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}
            </Text>
            <Text style={styles.tiempoLabel}>Duración</Text>
          </View>
          <View style={styles.costoBox}>
            <Ionicons name="cash-outline" size={18} color={Colors.textLight} style={{ marginBottom: 4 }} />
            <Text style={styles.costoValor}>${costo.toFixed(3)}</Text>
            <Text style={styles.costoLabel}>Costo estimado</Text>
          </View>
        </View>
      </View>

      {/* Botón principal */}
      <View style={styles.botonesRow}>
        <TouchableOpacity
          style={[styles.botonPrincipal, { backgroundColor: activa ? Colors.danger : Colors.green }]}
          onPress={() => setActiva(!activa)}
        >
          <Ionicons
            name={activa ? 'stop-circle-outline' : 'play-circle-outline'}
            size={24}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.botonTexto}>{activa ? 'Finalizar Ducha' : 'Iniciar Ducha'}</Text>
        </TouchableOpacity>
      </View>

      {tiempo > 0 && !activa && (
        <TouchableOpacity style={styles.botonReset} onPress={resetear}>
          <Ionicons name="refresh-outline" size={18} color={Colors.text} style={{ marginRight: 6 }} />
          <Text style={styles.botonResetTexto}>Nueva sesión</Text>
        </TouchableOpacity>
      )}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { padding: 24, paddingTop: 48, paddingBottom: 32 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: '900' },
  estadoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  headerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  infoBtn: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: 8 },
  tempCenter: { alignItems: 'center', marginTop: 20 },
  tempGrande: { color: '#fff', fontSize: 64, fontWeight: '900', letterSpacing: -2 },
  tempSub: { color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 4 },
  barraFondo: {
    width: '70%', height: 8, backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 8, marginTop: 12, overflow: 'hidden',
  },
  barraRelleno: { height: '100%', backgroundColor: Colors.green, borderRadius: 8 },
  cardsRow: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 16, gap: 8 },
  tiempoCostoShadow: {
    margin: 16,
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  tiempoCostoContent: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  tiempoBox: { flex: 1, alignItems: 'center', padding: 20, borderRightWidth: 1, borderRightColor: '#F1F5F9' },
  tiempoValor: { fontSize: 36, fontWeight: '800', color: Colors.dark },
  tiempoLabel: { fontSize: 12, color: Colors.textLight, marginTop: 4 },
  costoBox: { flex: 1, alignItems: 'center', padding: 20 },
  costoValor: { fontSize: 36, fontWeight: '800', color: Colors.green },
  costoLabel: { fontSize: 12, color: Colors.textLight, marginTop: 4 },
  botonesRow: { paddingHorizontal: 16, marginTop: 4 },
  botonPrincipal: { borderRadius: 16, paddingVertical: 18, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  botonTexto: { color: '#fff', fontSize: 18, fontWeight: '800' },
  botonReset: {
    marginHorizontal: 16, marginTop: 10, borderRadius: 12, paddingVertical: 12,
    alignItems: 'center', backgroundColor: Colors.white,
    borderWidth: 1, borderColor: '#E2E8F0', flexDirection: 'row', justifyContent: 'center',
  },
  botonResetTexto: { color: Colors.text, fontSize: 15, fontWeight: '600' },
});