import React, { useState, useRef, useContext, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SensorCard } from '@/components/SensorCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ThemeContext } from '@/contexts/ThemeContext';

export default function Dashboard() {
  const { theme, colors: Colors } = useContext(ThemeContext);

  const [activa, setActiva] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const [tempActual, setTempActual] = useState(19.5);
  const [sim, setSim] = useState({ litros: 0, energia: 0, caudal: 0.0, corriente: 0.0 });

  const tempObjetivo = 38;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (activa) {
      intervalRef.current = setInterval(() => {
        setTiempo(t => t + 1);
        setTempActual(t => Math.min(tempObjetivo, t + Math.random() * 0.5));
        setSim(prevSim => {
          const newCaudal = prevSim.caudal > 0 ? Math.max(0, prevSim.caudal + (Math.random() - 0.5) * 0.4) : 8.0;
          const newLitros = prevSim.litros + (newCaudal / 60);
          const newCorriente = 21 + (Math.random() - 0.5) * 1.5;
          const newEnergia = prevSim.energia + (newCorriente * 120) / 3600000;
          return { caudal: newCaudal, litros: newLitros, corriente: newCorriente, energia: newEnergia };
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setSim(prev => ({ ...prev, caudal: 0, corriente: 0 }));
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [activa, tempObjetivo]);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseAnimRef = useRef<Animated.CompositeAnimation | null>(null);

  const toggleSesion = () => {
    const nuevaActiva = !activa;
    setActiva(nuevaActiva);
    if (nuevaActiva) {
      pulseAnimRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.12, duration: 600, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      );
      pulseAnimRef.current.start();
    } else {
      if (pulseAnimRef.current) pulseAnimRef.current.stop();
      pulseAnim.setValue(1);
    }
  };

  const resetear = () => {
    setActiva(false);
    setTiempo(0);
    setTempActual(19.5);
    setSim({ litros: 0, energia: 0, caudal: 0.0, corriente: 0.0 });
  };

  const minutos = Math.floor(tiempo / 60);
  const segundos = tiempo % 60;
  const costo = parseFloat((sim.litros * 0.003 + sim.energia * 0.09).toFixed(3));
  const progTemp = Math.min((tempActual / tempObjetivo) * 100, 100);

  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: { padding: 24, paddingTop: 60, paddingBottom: 32 },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    headerTitle: { color: '#fff', fontSize: 28, fontWeight: '900' },
    estadoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    headerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
    infoBtn: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: 8, marginLeft: 8 },
    tempCenter: { alignItems: 'center', marginTop: 20 },
    tempGrande: { color: '#fff', fontSize: 64, fontWeight: '900', letterSpacing: -2 },
    tempSub: { color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 4 },
    barraFondo: { width: '70%', height: 8, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 8, marginTop: 12, overflow: 'hidden' },
    barraRelleno: { height: '100%', backgroundColor: Colors.green, borderRadius: 8 },
    cardsRow: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 16, gap: 8 },
    tiempoCostoShadow: { margin: 16, shadowColor: theme === 'dark' ? '#000' : Colors.dark, shadowOffset: { width: 0, height: 4 }, shadowOpacity: theme === 'dark' ? 0.4 : 0.2, shadowRadius: 5, elevation: 8 },
    tiempoCostoContent: { flexDirection: 'row', backgroundColor: Colors.card, borderRadius: 16, overflow: 'hidden' },
    tiempoBox: { flex: 1, alignItems: 'center', padding: 20, borderRightWidth: 1, borderRightColor: Colors.textLight },
    tiempoValor: { fontSize: 36, fontWeight: '800', color: Colors.text },
    tiempoLabel: { fontSize: 12, color: Colors.text, opacity: 0.6, marginTop: 4 },
    costoBox: { flex: 1, alignItems: 'center', padding: 20 },
    costoValor: { fontSize: 36, fontWeight: '800', color: Colors.green },
    costoLabel: { fontSize: 12, color: Colors.text, opacity: 0.6, marginTop: 4 },
    botonesRow: { paddingHorizontal: 16, marginTop: 4 },
    botonReset: { marginHorizontal: 16, marginTop: 10, borderRadius: 12, paddingVertical: 12, alignItems: 'center', backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.textLight, flexDirection: 'row', justifyContent: 'center' },
    botonResetTexto: { color: Colors.text, fontSize: 15, fontWeight: '600' },
  }), [Colors, theme]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>EcoDucha</Text>
            <View style={styles.estadoRow}>
              <Ionicons name={activa ? 'radio-button-on' : 'radio-button-off'} size={12} color={activa ? Colors.green : 'rgba(255,255,255,0.5)'} />
              <Text style={styles.headerSub}> {activa ? 'Ducha activa' : (tiempo > 0 ? 'Sesión finalizada' : 'En espera')}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/acerca')} style={styles.infoBtn}>
            <Ionicons name="information-circle-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.tempCenter}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <Text style={styles.tempGrande}>{tempActual.toFixed(1)}°C</Text>
          </Animated.View>
          <Text style={styles.tempSub}>Objetivo: {tempObjetivo}°C</Text>
          <View style={styles.barraFondo}>
            <View style={[styles.barraRelleno, { width: `${progTemp}%` }]} />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.cardsRow}>
        <SensorCard titulo="Caudal" valor={sim.caudal.toFixed(1)} unidad="L/min" icono="water-outline" color={Colors.primary} />
        <SensorCard titulo="Corriente" valor={sim.corriente.toFixed(1)} unidad="A" icono="flash-outline" color={Colors.warning} />
      </View>
      <View style={[styles.cardsRow, { marginTop: 0 }]}>
        <SensorCard titulo="Litros" valor={sim.litros.toFixed(1)} unidad="L" icono="beaker-outline" color={Colors.accent} />
        <SensorCard titulo="Energía" valor={(sim.energia * 1000).toFixed(0)} unidad="Wh" icono="battery-charging-outline" color={Colors.green} />
      </View>

      <View style={styles.tiempoCostoShadow}>
        <View style={styles.tiempoCostoContent}>
          <View style={styles.tiempoBox}>
            <Ionicons name="timer-outline" size={18} color={Colors.text} style={{ marginBottom: 4, opacity: 0.6 }} />
            <Text style={styles.tiempoValor}>{String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}</Text>
            <Text style={styles.tiempoLabel}>Duración</Text>
          </View>
          <View style={styles.costoBox}>
            <Ionicons name="cash-outline" size={18} color={Colors.text} style={{ marginBottom: 4, opacity: 0.6 }} />
            <Text style={styles.costoValor}>${costo.toFixed(3)}</Text>
            <Text style={styles.costoLabel}>Costo estimado</Text>
          </View>
        </View>
      </View>

      {/* ✅ ANTES: TouchableOpacity con ~15 líneas de estilos inline. AHORA: PrimaryButton */}
      <View style={styles.botonesRow}>
        <PrimaryButton
          label={activa ? 'Finalizar Ducha' : 'Iniciar Ducha'}
          icono={activa ? 'stop-circle-outline' : 'play-circle-outline'}
          onPress={toggleSesion}
          color={activa ? Colors.danger : Colors.green}
          disabled={!activa && tiempo > 0}
        />
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
