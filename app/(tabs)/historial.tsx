import React, { useContext, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../contexts/ThemeContext';

// Datos de ejemplo
const historialData = [
  { id: '1', fecha: '2024-05-24', duracion: 320, litros: 40, energia: 0.15, costo: 0.13 },
  { id: '2', fecha: '2024-05-23', duracion: 450, litros: 55, energia: 0.22, costo: 0.18 },
  { id: '3', fecha: '2024-05-22', duracion: 280, litros: 35, energia: 0.13, costo: 0.11 },
  { id: '4', fecha: '2024-05-21', duracion: 670, litros: 75, energia: 0.30, costo: 0.25 },
  { id: '5', fecha: '2024-05-20', duracion: 180, litros: 22, energia: 0.09, costo: 0.07 },
  { id: '6', fecha: '2024-05-19', duracion: 400, litros: 50, energia: 0.20, costo: 0.17 },
];

function formatDuracion(segundos: number) {
  const mins = Math.floor(segundos / 60);
  const secs = segundos % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function HistorialScreen() {
  const { colors, theme } = useContext(ThemeContext);

  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    hero: { backgroundColor: colors.dark, padding: 32, alignItems: 'center', paddingTop: 60, paddingBottom: 24 },
    heroTitulo: { color: '#fff', fontSize: 26, fontWeight: '900', marginTop: 8 },
    heroSub: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 4 },
    card: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginTop: 12,
      borderRadius: 16,
      padding: 18,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: theme === 'dark' ? 0.2 : 0.05,
      shadowRadius: 6,
      elevation: 3,
    },
    cardIcon: { width: 50, alignItems: 'center', justifyContent: 'center' },
    cardBody: { flex: 1, marginLeft: 12 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardFecha: { color: colors.text, fontSize: 16, fontWeight: '700' },
    cardDuracion: { color: colors.primary, fontSize: 16, fontWeight: '800' },
    cardStats: { flexDirection: 'row', marginTop: 8, gap: 16 },
    stat: { flexDirection: 'row', alignItems: 'center' },
    statText: { color: colors.text, fontSize: 13, marginLeft: 4, opacity: 0.8 },
  }), [colors, theme]);

  const renderItem = ({ item }: { item: typeof historialData[0] }) => (
    <View style={styles.card}>
      <View style={styles.cardIcon}>
        <Ionicons name="water-outline" size={32} color={colors.primary} />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardFecha}>{new Date(item.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</Text>
          <Text style={styles.cardDuracion}>{formatDuracion(item.duracion)}</Text>
        </View>
        <View style={styles.cardStats}>
          <View style={styles.stat}>
            <Ionicons name="beaker-outline" size={14} color={colors.text} style={{ opacity: 0.6 }}/>
            <Text style={styles.statText}>{item.litros.toFixed(1)} L</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="flash-outline" size={14} color={colors.text} style={{ opacity: 0.6 }}/>
            <Text style={styles.statText}>{item.energia.toFixed(3)} kWh</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="cash-outline" size={14} color={colors.text} style={{ opacity: 0.6 }}/>
            <Text style={styles.statText}>${item.costo.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Ionicons name="list" size={52} color="#fff" />
        <Text style={styles.heroTitulo}>Historial</Text>
        <Text style={styles.heroSub}>Tu consumo a lo largo del tiempo</Text>
      </View>
      <FlatList
        data={historialData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
