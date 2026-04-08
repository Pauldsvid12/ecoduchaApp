import React, { useState, useContext, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../contexts/ThemeContext';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionCard } from '@/components/SectionCard';
import { SwitchRow } from '@/components/SwitchRow';
import { PrimaryButton } from '@/components/PrimaryButton';
import { TarifaRow } from '@/components/TarifaRow';

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
    tempRango: { fontSize: 11, color: colors.text, opacity: 0.6 },
    botonesArea: { marginHorizontal: 16, marginTop: 20 },
  }), [colors, theme]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ✅ ANTES: ~10 líneas de View/Text/Ionicons. AHORA: 1 componente */}
      <ScreenHeader
        titulo="Configuración"
        subtitulo="Sincronización con EcoDucha"
        icono="settings"
      />

      <View style={{ paddingTop: 16 }}>
        {/* ✅ ANTES: View + View seccionTituloRow + Text + Switch inline. AHORA: SectionCard + SwitchRow */}
        <SectionCard titulo="Apariencia" icono="color-palette-outline">
          <SwitchRow
            label="Tema oscuro"
            value={theme === 'dark'}
            onValueChange={toggleTheme}
          />
        </SectionCard>

        <SectionCard titulo="Usuario" icono="person-outline">
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
        </SectionCard>

        <SectionCard titulo="Temperatura Objetivo (ESP32)" icono="thermometer-outline">
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
        </SectionCard>

        {/* ✅ ANTES: dos bloques switchRow con View+Text+Switch cada uno. AHORA: SwitchRow */}
        <SectionCard titulo="Alertas de Consumo" icono="notifications-outline">
          <SwitchRow
            label="Notificaciones generales"
            value={notificaciones}
            onValueChange={setNotificaciones}
          />
          <SwitchRow
            label="Alerta al pasar 50 litros"
            value={alertaLitros}
            onValueChange={setAlertaLitros}
          />
        </SectionCard>

        {/* ✅ ANTES: tarifaRow inline con estilos repetidos. AHORA: TarifaRow */}
        <SectionCard titulo="Tarifas" icono="cash-outline">
          <TarifaRow label="Tarifa agua" valor="$0.003 / L" />
          <TarifaRow label="Tarifa energía" valor="$0.09 / kWh" divider />
          <TarifaRow label="Tiempo límite ducha" valor={`${tiempoLimite} min`} divider />
        </SectionCard>
      </View>

      {/* ✅ ANTES: ~15 líneas de TouchableOpacity con estilos propios. AHORA: PrimaryButton */}
      <View style={styles.botonesArea}>
        <PrimaryButton
          label={guardado ? 'Sincronizado con Éxito' : 'Sincronizar Ajustes'}
          icono={guardado ? 'checkmark-circle-outline' : 'cloud-upload-outline'}
          onPress={guardar}
          color={guardado ? '#22C55E' : colors.primary}
        />
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
