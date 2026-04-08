import React, { useEffect, useRef, useContext, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemeContext } from '@/contexts/ThemeContext';

export default function WelcomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const { colors: Colors } = useContext(ThemeContext);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
    logoContainer: { alignItems: 'center', marginBottom: 16 },
    wifiDots: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
    dot: { borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.6)' },
    titulo: { fontSize: 48, fontWeight: '900', color: '#fff', letterSpacing: -1 },
    slogan: { fontSize: 16, color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: 8, lineHeight: 24 },
    statsRow: { flexDirection: 'row', gap: 16, marginTop: 40, marginBottom: 40 },
    statItem: {
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.15)',
      borderRadius: 14,
      padding: 16,
      width: 90,
    },
    statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.9)', marginTop: 6, textAlign: 'center', fontWeight: '600' },
    boton: {
      backgroundColor: Colors.white,
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 40,
      flexDirection: 'row',
      alignItems: 'center',
    },
    botonTexto: { color: Colors.dark, fontSize: 18, fontWeight: '800' },
    version: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 24 },
  }), [Colors]);

  return (
    <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], alignItems: 'center' }}>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Ionicons name="water" size={80} color="#fff" />
          <View style={styles.wifiDots}>
            <View style={[styles.dot, { width: 6, height: 6 }]} />
            <View style={[styles.dot, { width: 10, height: 10 }]} />
            <View style={[styles.dot, { width: 14, height: 14 }]} />
          </View>
        </View>

        <Text style={styles.titulo}>EcoDucha</Text>
        <Text style={styles.slogan}>Inteligencia que fluye,{'\n'}energía que se cuida.</Text>

        {/* Stats preview */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="water-outline" size={28} color="#fff" />
            <Text style={styles.statLabel}>Mide litros</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="flash-outline" size={28} color="#fff" />
            <Text style={styles.statLabel}>Mide energía</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="thermometer-outline" size={28} color="#fff" />
            <Text style={styles.statLabel}>Controla temp.</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.boton} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.botonTexto}>Comenzar</Text>
          <Ionicons name="arrow-forward" size={20} color={Colors.dark} style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        <Text style={styles.version}>v1.0 — Proyecto Integrador 2024</Text>
      </Animated.View>
    </LinearGradient>
  );
}
