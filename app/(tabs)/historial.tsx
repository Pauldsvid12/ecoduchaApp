import React, { useContext, useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getHistory, clearHistory, DuchaData } from '../../services/storage';

export default function HistorialScreen() {
  const { colors, theme } = useContext(ThemeContext);
  const [registro, setRegistro] = useState<DuchaData[]>([]);

  const cargarDatos = async () => {
    const data = await getHistory();
    setRegistro(data.reverse()); 
  };

  useEffect(() => {
    cargarDatos();
  }, []);

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
      elevation: 3,
    },
    cardIcon: { width: 50, alignItems: 'center', justifyContent: 'center' },
    cardBody: { flex: 1, marginLeft: 12 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardFecha: { color: colors.text, fontSize: 15, fontWeight: '700' },
    cardStats: { flexDirection: 'row', marginTop: 8, gap: 16 },
    stat: { flexDirection: 'row', alignItems: 'center' },
    statText: { color: colors.text, fontSize: 13, marginLeft: 4, opacity: 0.8 },
    litrosText: { color: colors.primary, fontSize: 18, fontWeight: '800' },
    empty: { textAlign: 'center', marginTop: 40, color: colors.text, opacity: 0.5 }
  }), [colors, theme]);

  const renderItem = ({ item }: { item: DuchaData }) => (
    <View style={styles.card}>
      <View style={styles.cardIcon}>
        <Ionicons name="water" size={32} color={colors.primary} />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardFecha}>{item.fecha}</Text>
          <Text style={styles.litrosText}>{item.litros} L</Text>
        </View>
        <View style={styles.cardStats}>
          <View style={styles.stat}>
            <Ionicons name="speedometer-outline" size={14} color={colors.text} style={{ opacity: 0.6 }}/>
            <Text style={styles.statText}>{item.caudal} L/m</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <TouchableOpacity 
          onLongPress={async () => { await clearHistory(); cargarDatos(); }}
          style={{ position: 'absolute', right: 20, top: 60 }}
        >
          <Ionicons name="trash-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Ionicons name="list" size={52} color="#fff" />
        <Text style={styles.heroTitulo}>Historial Real</Text>
        <Text style={styles.heroSub}>Datos guardados desde el simulador</Text>
      </View>
      <FlatList
        data={registro}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        onRefresh={cargarDatos}
        refreshing={false}
        ListEmptyComponent={<Text style={styles.empty}>No hay duchas registradas</Text>}
      />
    </View>
  );
}