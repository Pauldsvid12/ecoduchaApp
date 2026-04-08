import React, { useContext, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemeContext } from '../contexts/ThemeContext';
import { lightColors } from '../constants/Colors';

type ColorScheme = typeof lightColors;
type IoniconName = keyof typeof Ionicons.glyphMap;

const equipo: { nombre: string; rol: string; icono: IoniconName }[] = [
  { nombre: 'Paul Juela', rol: 'Programación ESP32 & IoT', icono: 'code-slash-outline' },
  { nombre: 'Matías Cabrera', rol: 'Diseño de Hardware & Circuitos', icono: 'flash-outline' },
  { nombre: 'Alejandro Jiménez', rol: 'Interfaz Nextion & Sensores', icono: 'desktop-outline' },
];

const hardware: { icono: IoniconName; nombre: string; desc: string }[] = [
  { icono: 'hardware-chip-outline', nombre: 'ESP32', desc: 'Microcontrolador principal con WiFi integrado' },
  { icono: 'water-outline', nombre: 'YF-S201', desc: 'Sensor de caudal de agua' },
  { icono: 'thermometer-outline', nombre: 'DS18B20', desc: 'Sensor de temperatura sumergible' },
  { icono: 'flash-outline', nombre: 'ACS712', desc: 'Sensor de corriente eléctrica (Efecto Hall)' },
  { icono: 'power-outline', nombre: 'BTA41 TRIAC', desc: 'Control de potencia de la resistencia' },
  { icono: 'phone-portrait-outline', nombre: 'Nextion 3.5"', desc: 'Pantalla táctil de interfaz de usuario' },
];

export default function Acerca() {
  const router = useRouter();
  const { colors, theme } = useContext(ThemeContext);
  const styles = useMemo(() => createStyles(colors, theme), [colors, theme]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.header}>
        <Ionicons name="water" size={64} color="#fff" />
        <Text style={styles.nombre}>EcoDucha</Text>
        <Text style={styles.version}>v1.0 — 2026</Text>
        <Text style={styles.slogan}>"Inteligencia que fluye, energía que se cuida."</Text>
      </LinearGradient>

      <View style={styles.card}>
        <View style={styles.cardTituloRow}>
          <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
          <Text style={styles.cardTitulo}>¿Qué es EcoDucha?</Text>
        </View>
        <Text style={styles.cardTexto}>
          Sistema IoT que controla la temperatura de la ducha, mide el consumo de agua y energía en tiempo real, y almacena un historial de sesiones.
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardTituloRow}>
          <Ionicons name="construct-outline" size={20} color={colors.primary} />
          <Text style={styles.cardTitulo}>Hardware Utilizado</Text>
        </View>
        {hardware.map((h) => (
          <View key={h.nombre} style={styles.hwItem}>
            <View style={styles.hwIconBox}>
              <Ionicons name={h.icono} size={22} color={colors.primary} />
            </View>
            <View style={styles.hwTexto}>
              <Text style={styles.hwNombre}>{h.nombre}</Text>
              <Text style={styles.hwDesc}>{h.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <View style={styles.cardTituloRow}>
          <Ionicons name="people-outline" size={20} color={colors.primary} />
          <Text style={styles.cardTitulo}>Equipo de Desarrollo</Text>
        </View>
        {equipo.map((m) => (
          <View key={m.nombre} style={styles.miembro}>
            <View style={styles.miembroIconBox}>
              <Ionicons name={m.icono} size={24} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.miembroNombre}>{m.nombre}</Text>
              <Text style={styles.miembroRol}>{m.rol}</Text>
            </View>
          </View>
        ))}
        <View style={styles.institucionRow}>
          <Ionicons name="school-outline" size={16} color={colors.primary} />
          <Text style={styles.institucion}>UETS Cuenca — 3.° BGU Informática</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.webBtn}
        onPress={() => Linking.openURL('https://pauldsvid12.github.io/ecoducha/')}
      >
        <Ionicons name="logo-github" size={20} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.webBtnTexto}>Ver Página del Proyecto</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const createStyles = (colors: ColorScheme, theme: string) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 32, alignItems: 'center', paddingBottom: 24 },
  nombre: { color: '#fff', fontSize: 36, fontWeight: '900', marginTop: 8 },
  version: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4 },
  slogan: { color: 'rgba(255,255,255,0.85)', fontSize: 14, textAlign: 'center', marginTop: 12, fontStyle: 'italic' },
  card: {
    backgroundColor: colors.card,
    margin: 16, 
    marginBottom: 0, 
    borderRadius: 16, 
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: theme === 'dark' ? 0.2 : 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTituloRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  cardTitulo: { fontSize: 15, fontWeight: '800', color: colors.text, marginLeft: 6 },
  cardTexto: { fontSize: 14, color: colors.text, lineHeight: 22, opacity: 0.8 },
  hwItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.textLight,
  },
  hwIconBox: {
    backgroundColor: colors.background,
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hwTexto: { flex: 1 },
  hwNombre: { fontSize: 14, fontWeight: '700', color: colors.text },
  hwDesc: { fontSize: 12, color: colors.textLight, marginTop: 2 },
  miembro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.textLight,
  },
  miembroIconBox: {
    backgroundColor: colors.background,
    borderRadius: 12,
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miembroNombre: { fontSize: 15, fontWeight: '700', color: colors.text },
  miembroRol: { fontSize: 12, color: colors.textLight, marginTop: 2 },
  institucionRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 14, 
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.textLight,
    paddingTop: 14,
  },
  institucion: { fontSize: 13, color: colors.primary, fontWeight: '600', marginLeft: 6 },
  webBtn: {
    backgroundColor: colors.dark,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  webBtnTexto: { color: '#fff', fontSize: 15, fontWeight: '700' },
});