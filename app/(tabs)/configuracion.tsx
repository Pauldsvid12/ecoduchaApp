import React, { useState, useContext, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, TextInput } from 'react-native';
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

  const guardar = async () => {
    await AsyncStorage.setItem('config', JSON.stringify({ tempObjetivo, tiempoLimite, notificaciones, alertaLitros, nombreUsuario }));
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
      shadowColor: '#000',
      shadowOpacity: theme === 'dark' ? 0.2 : 0.05,
      shadowRadius: 6,
      elevation: 3,
    },
    seccionTituloRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    seccionTitulo: { fontSize: 15, fontWeight: '800', color: colors.text },
    inputRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    inputLabel: { fontSize: 14, color: colors.text },
    input: {
      borderWidth: 1,
      borderColor: colors.textLight, // Corregido
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
      borderColor: colors.textLight, // Corregido
    },
    tempValorBox: { alignItems: 'center' },
    tempValor: { fontSize: 42, fontWeight: '900', color: colors.primary },
    tempUnidad: { fontSize: 24, fontWeight: '700', color: colors.primary, opacity: 0.8 },
    tempRango: { fontSize: 11, color: colors.text, opacity: 0.6 },
    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.textLight, // Corregido
    },
    switchLabel: { fontSize: 14, color: colors.text },
    tarifaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.textLight, // Corregido
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
        <Text style={styles.heroSub}>Personaliza tu EcoDucha</Text>
      </View>

      {/* Apariencia */}
      <View style={styles.seccion}>
        <View style={styles.seccionTituloRow}>
          <Ionicons name="color-palette-outline" size={18} color={colors.primary} />
          <Text style={styles.seccionTitulo}> Apariencia</Text>
        </View>
        <View style={[styles.switchRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.switchLabel}>Tema oscuro</Text>
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} trackColor={{ false: '#E2E8F0', true: colors.primary }} />
        </View>
      </View>

      {/* Usuario */}
      <View style={styles.seccion}>
        <View style={styles.seccionTituloRow}>
          <Ionicons name="person-outline" size={18} color={colors.primary} />
          <Text style={styles.seccionTitulo}> Usuario</Text>
        </View>
        <View style={[styles.inputRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.inputLabel}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={nombreUsuario}
            onChangeText={setNombreUsuario}
            placeholder="Tu nombre"
            placeholderTextColor={colors.textLight}
          />
        </View>
      </View>

      {/* Temperatura */}
      <View style={styles.seccion}>
        <View style={styles.seccionTituloRow}>
          <Ionicons name="thermometer-outline" size={18} color={colors.primary} />
          <Text style={styles.seccionTitulo}> Temperatura Objetivo</Text>
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
      
      {/* Tiempo Límite */}
      <View style={styles.seccion}>
        <View style={styles.seccionTituloRow}>
          <Ionicons name="timer-outline" size={18} color={colors.primary} />
          <Text style={styles.seccionTitulo}> Tiempo Límite</Text>
        </View>
        <View style={styles.tempControl}>
          <TouchableOpacity style={styles.tempBtn} onPress={() => setTiempoLimite(t => Math.max(5, t - 1))}>
            <Ionicons name="remove-outline" size={28} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.tempValorBox}>
            <Text style={styles.tempValor}>{tiempoLimite}<Text style={styles.tempUnidad}> min</Text></Text>
            <Text style={styles.tempRango}>Rango: 5 – 20 min</Text>
          </View>
          <TouchableOpacity style={styles.tempBtn} onPress={() => setTiempoLimite(t => Math.min(20, t + 1))}>
            <Ionicons name="add-outline" size={28} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Alertas */}
      <View style={styles.seccion}>
        <View style={styles.seccionTituloRow}>
          <Ionicons name="notifications-outline" size={18} color={colors.primary} />
          <Text style={styles.seccionTitulo}> Alertas</Text>
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Notificaciones generales</Text>
          <Switch value={notificaciones} onValueChange={setNotificaciones} trackColor={{ false: '#E2E8F0', true: colors.primary }} />
        </View>
        <View style={[styles.switchRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.switchLabel}>Alerta al pasar 50 litros</Text>
          <Switch value={alertaLitros} onValueChange={setAlertaLitros} trackColor={{ false: '#E2E8F0', true: colors.primary }} />
        </View>
      </View>

      {/* Tarifas */}
      <View style={styles.seccion}>
        <View style={styles.seccionTituloRow}>
          <Ionicons name="cash-outline" size={18} color={colors.primary} />
          <Text style={styles.seccionTitulo}> Tarifas (Ecuador)</Text>
        </View>
        <View style={styles.tarifaRow}>
          <Text style={styles.tarifaLabel}>Costo agua</Text>
          <Text style={styles.tarifaValor}>$0.003 / litro</Text>
        </View>
        <View style={[styles.tarifaRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
          <Text style={styles.tarifaLabel}>Costo energía</Text>
          <Text style={styles.tarifaValor}>$0.09 / kWh</Text>
        </View>
      </View>

      {/* Botón Guardar */}
      <TouchableOpacity
        style={[styles.botonGuardar, guardado && { backgroundColor: colors.green }]}
        onPress={guardar}
      >
        <Ionicons
          name={guardado ? 'checkmark-circle-outline' : 'save-outline'}
          size={20}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.botonGuardarTexto}>
          {guardado ? 'Guardado correctamente' : 'Guardar configuración'}
        </Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
