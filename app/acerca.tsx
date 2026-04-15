import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Code2, Cpu, Droplets, Thermometer, Zap, Monitor,
  Users, School, Globe, Layers, Database, Waves,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { ThemeContext } from '../contexts/ThemeContext';
import { lightColors } from '../constants/Colors';

type ColorScheme = typeof lightColors;

const equipo = [
  { nombre: 'Paul Juela',         rol: 'Programación ESP32 & IoT',       Icon: Code2    },
  { nombre: 'Matías Cabrera',     rol: 'Diseño de Hardware & Circuitos',  Icon: Zap      },
  { nombre: 'Alejandro Jiménez',  rol: 'Interfaz Nextion & Sensores',     Icon: Monitor  },
];

const hardware = [
  { Icon: Cpu,         nombre: 'ESP32',          desc: 'Microcontrolador principal con WiFi integrado' },
  { Icon: Droplets,    nombre: 'YF-S201',         desc: 'Sensor de caudal de agua' },
  { Icon: Thermometer, nombre: 'DS18B20',          desc: 'Sensor de temperatura sumergible' },
  { Icon: Zap,         nombre: 'ACS712',           desc: 'Sensor de corriente eléctrica (Efecto Hall)' },
  { Icon: Layers,      nombre: 'BTA41 TRIAC',      desc: 'Control de potencia de la resistencia' },
  { Icon: Monitor,     nombre: 'Nextion 3.5"',     desc: 'Pantalla táctil de interfaz de usuario' },
  { Icon: Database,    nombre: 'LittleFS',          desc: 'Sistema de archivos en flash del ESP32' },
];

function WebButton({ colors }: { colors: ColorScheme }) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      onPressIn={() => { scale.value = withSpring(0.96); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={() => Linking.openURL('https://pauldsvid12.github.io/ecoducha/')}
    >
      <Animated.View style={[styles.webBtn, { backgroundColor: colors.dark }, animStyle]}>
        <Globe size={20} color="#fff" strokeWidth={2} />
        <Text style={styles.webBtnTexto}>Ver Página del Proyecto</Text>
      </Animated.View>
    </Pressable>
  );
}

export default function Acerca() {
  const { colors } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
    >
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.header}>
        <Waves size={64} color="#fff" strokeWidth={1.2} />
        <Text style={styles.nombre}>EcoDucha</Text>
        <Text style={styles.version}>v1.0 — 2026</Text>
        <Text style={styles.slogan}>"Inteligencia que fluye, energía que se cuida."</Text>
      </LinearGradient>

      <Animated.View entering={FadeInDown.delay(100).springify()} style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.cardTituloRow}>
          <Layers size={18} color={colors.primary} strokeWidth={2} />
          <Text style={[styles.cardTitulo, { color: colors.text }]}>¿Qué es EcoDucha?</Text>
        </View>
        <Text style={[styles.cardTexto, { color: colors.text }]}>
          Sistema IoT que controla la temperatura de la ducha, mide el consumo de agua y energía en tiempo real, y almacena un historial de sesiones en LittleFS.
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).springify()} style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.cardTituloRow}>
          <Cpu size={18} color={colors.primary} strokeWidth={2} />
          <Text style={[styles.cardTitulo, { color: colors.text }]}>Hardware Utilizado</Text>
        </View>
        {hardware.map((h, i) => (
          <View
            key={h.nombre}
            style={[styles.hwItem, { borderBottomColor: colors.textLight + '30' }, i === hardware.length - 1 && { borderBottomWidth: 0 }]}
          >
            <View style={[styles.hwIconBox, { backgroundColor: colors.background }]}>
              <h.Icon size={20} color={colors.primary} strokeWidth={2} />
            </View>
            <View style={styles.hwTexto}>
              <Text style={[styles.hwNombre, { color: colors.text }]}>{h.nombre}</Text>
              <Text style={[styles.hwDesc, { color: colors.textLight }]}>{h.desc}</Text>
            </View>
          </View>
        ))}
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).springify()} style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.cardTituloRow}>
          <Users size={18} color={colors.primary} strokeWidth={2} />
          <Text style={[styles.cardTitulo, { color: colors.text }]}>Equipo de Desarrollo</Text>
        </View>
        {equipo.map((m, i) => (
          <View
            key={m.nombre}
            style={[styles.miembro, { borderBottomColor: colors.textLight + '30' }, i === equipo.length - 1 && { borderBottomWidth: 0 }]}
          >
            <View style={[styles.miembroIconBox, { backgroundColor: colors.background }]}>
              <m.Icon size={22} color={colors.primary} strokeWidth={2} />
            </View>
            <View>
              <Text style={[styles.miembroNombre, { color: colors.text }]}>{m.nombre}</Text>
              <Text style={[styles.miembroRol, { color: colors.textLight }]}>{m.rol}</Text>
            </View>
          </View>
        ))}
        <View style={[styles.institucionRow, { borderTopColor: colors.textLight + '30' }]}>
          <School size={14} color={colors.primary} strokeWidth={2} />
          <Text style={[styles.institucion, { color: colors.primary }]}>UETS Cuenca — 3.° BGU Informática</Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400).springify()} style={{ marginHorizontal: 16, marginTop: 16 }}>
        <WebButton colors={colors} />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 32, alignItems: 'center', paddingBottom: 24 },
  nombre: { color: '#fff', fontSize: 36, fontWeight: '900', marginTop: 8 },
  version: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4 },
  slogan: { color: 'rgba(255,255,255,0.85)', fontSize: 14, textAlign: 'center', marginTop: 12, fontStyle: 'italic' },
  card: { margin: 16, marginBottom: 0, borderRadius: 16, padding: 20, elevation: 3 },
  cardTituloRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  cardTitulo: { fontSize: 15, fontWeight: '800' },
  cardTexto: { fontSize: 14, lineHeight: 22, opacity: 0.8 },
  hwItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1 },
  hwIconBox: { borderRadius: 10, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  hwTexto: { flex: 1 },
  hwNombre: { fontSize: 14, fontWeight: '700' },
  hwDesc: { fontSize: 12, marginTop: 2 },
  miembro: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 10, borderBottomWidth: 1 },
  miembroIconBox: { borderRadius: 12, width: 46, height: 46, alignItems: 'center', justifyContent: 'center' },
  miembroNombre: { fontSize: 15, fontWeight: '700' },
  miembroRol: { fontSize: 12, marginTop: 2 },
  institucionRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 14, justifyContent: 'center', borderTopWidth: 1, paddingTop: 14 },
  institucion: { fontSize: 13, fontWeight: '600' },
  webBtn: { borderRadius: 16, paddingVertical: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10 },
  webBtnTexto: { color: '#fff', fontSize: 15, fontWeight: '700' },
});