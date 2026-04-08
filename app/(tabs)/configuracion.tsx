import React, { useState, useContext, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function Configuracion() {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  const [tempObjetivo, setTempObjetivo] = useState(38);
  const [tiempoLimite, setTiempoLimite] = useState(10);
  const [notificaciones, setNotificaciones] = useState(true);
  const [alertaLitros, setAlertaLitros] = useState(true);
  const [nombreUsuario, setNombreUsuario] = useState('Paul');
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    const cargarConfig = async () => {
      const res = await AsyncStorage.getItem('@config_app');
      if (res) {
        const c = JSON.parse(res);
        setTempObjetivo(c.tempObjetivo);
        setTiempoLimite(c.tiempoLimite);
        setNotificaciones(c.notificaciones);
        setAlertaLitros(c.alertaLitros);
        setNombreUsuario(c.nombreUsuario);
      }
    };
    cargarConfig();
  }, []);

  const guardar = async () => {
    const config = { tempObjetivo, tiempoLimite, notificaciones, alertaLitros, nombreUsuario };
    await AsyncStorage.setItem('@config_app', JSON.stringify(config));
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    hero: { backgroundColor: colors.dark, padding: 32, alignItems: 'center', paddingTop: 60 },
    heroTitulo: { color: '#fff', fontSize: 26, fontWeight: '900', marginTop: 8 },
    heroSub: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 4 },
    seccion: {
      backgroundColor: colors.card,
      margin: 16,
      marginBottom: 0,
      borderRadius: 16,
      padding: 20,
      elevation: 3,
    },
    seccionTituloRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    seccionTitulo: { fontSize: 15, fontWeight: '800', color: colors.text },
    inputRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    inputLabel: { fontSize: 14, color: colors.text },
    input: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 8,
      fontSize: 14,
      color: colors.text,
      width: 160,
      backgroundColor: colors.background,
    },
    tempControl: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    tempBtn: {
      backgroundColor: colors.background,
      borderRadius: 14,
      width: 52,
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.primary,
    },
    tempValorBox: { alignItems: 'center' },
    tempValor: { fontSize: 42, fontWeight: '900', color: colors.primary },
    tempUnidad: { fontSize: 24, fontWeight: '700', color: colors.primary },
    tempRango: { fontSize: 11, color: colors.text, opacity: 0.6 },
    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    switchLabel: { fontSize: 14, color: colors.text },
    tarifaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    tarifaLabel: { fontSize: 14, color: colors.text },
    tarifaValor: { fontSize: 14, fontWeight: '700', color: colors.text },
    botonGuardar: {
      backgroundColor: colors.primary,
      marginHorizontal: 16,
      marginTop: 20,
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    botonGuardarTexto: { color: '#fff', fontSize: 16, fontWeight: '800' },
  }), [colors, theme]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Ionicons name="settings" size={52} color="#fff" />
        <Text style={styles.heroTitulo}>Configuración</Text>
        <Text style={styles.heroSub}>Sincronización con EcoDucha</Text>
      </View>

      <View style={styles.seccion}>
        <View style={styles.seccionTituloRow}>
          <Ionicons name="color-palette-outline" size={18} color={colors.primary} />
          <Text style={styles.seccionTitulo}> Apariencia</Text>
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Tema oscuro</Text>
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} trackColor={{ false: '#E2E8F0', true: colors.primary }} />
        </View>
      </View>

      <View style={styles.seccion}>
        <View style={styles.seccionTituloRow}>
          <Ionicons name="person-outline" size={18} color={colors.primary} />
          <Text style={styles.seccionTitulo}> Usuario</Text>
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={nombreUsuario}
            onChangeText={setNombreUsuario}
            placeholder="Tu nombre"
            placeholderTextColor="#94A3B8"
          />
        </View>
      </View>

      <View style={styles.seccion}>
        <View style={styles.seccionTituloRow}>
          <Ionicons name="thermometer-outline" size={18} color={colors.primary} />
          <Text style={styles.seccionTitulo}> Temperatura Objetivo (ESP32)</Text>
        </View>
        <View style={styles.tempControl}>
          <TouchableOpacity style={styles.tempBtn} onPress={() => setTempObjetivo(t => Math.max(20, t - 1))}>
            <Ionicons name="remove-outline" size={28} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.tempValorBox}>
            <Text style={styles.tempValor}>{tempObjetivo}°C</Text>
            <Text style={styles.tempRango}>Rango: 20°C – 45°C</Text>
          </View>
          <TouchableOpacity style={styles.tempBtn} onPress={() => setTempObjetivo(t => Math.min(45, t + 1))}>
            <Ionicons name="add-outline" size={28} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.seccion}>
        <View style={styles.seccionTituloRow}>
          <Ionicons name="notifications-outline" size={18} color={colors.primary} />
          <Text style={styles.seccionTitulo}> Alertas de Consumo</Text>
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Notificaciones generales</Text>
          <Switch value={notificaciones} onValueChange={setNotificaciones} trackColor={{ false: '#E2E8F0', true: colors.primary }} />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Alerta al pasar 50 litros</Text>
          <Switch value={alertaLitros} onValueChange={setAlertaLitros} trackColor={{ false: '#E2E8F0', true: colors.primary }} />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.botonGuardar, guardado && { backgroundColor: '#22C55E' }]}
        onPress={guardar}
      >
        <Ionicons
          name={guardado ? 'checkmark-circle-outline' : 'cloud-upload-outline'}
          size={20}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.botonGuardarTexto}>
          {guardado ? 'Sincronizado con Éxito' : 'Sincronizar Ajustes'}
        </Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}