import React, { useContext, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '@/contexts/ThemeContext';

const historialData = [
  { id: '1', fecha: '2024-05-24', duracion: 320, litros: 40, energia: 0.15, costo: 0.13 },
  { id: '2', fecha: '2024-05-23', duracion: 450, litros: 55, energia: 0.22, costo: 0.18 },
  { id: '3', fecha: '2024-05-22', duracion: 280, litros: 35, energia: 0.13, costo: 0.11 },
  { id: '4', fecha: '2024-05-21', duracion: 610, litros: 75, energia: 0.30, costo: 0.25 },
  { id: '5', fecha: '2024-05-20', duracion: 180, litros: 22, energia: 0.09, costo: 0.07 },
  { id: '6', fecha: '2024-05-19', duracion: 400, litros: 50, energia: 0.20, costo: 0.17 },
];

const config = { tiempoLimite: 8, tempObjetivo: 38 };

export default function EstadisticasScreen() {
  const { colors: Colors, theme } = useContext(ThemeContext);

  const stats = useMemo(() => {
    const totalDuchas = historialData.length;
    const totalLitros = historialData.reduce((sum, item) => sum + item.litros, 0);
    const totalCosto = historialData.reduce((sum, item) => sum + item.costo, 0);
    const duracionPromedio = historialData.reduce((sum, item) => sum + item.duracion, 0) / totalDuchas;
    const duchasBuenas = historialData.filter(d => d.duracion <= config.tiempoLimite * 60).length;
    const porcentajeAhorro = (duchasBuenas / totalDuchas) * 100;
    return { totalLitros, totalCosto, duracionPromedio, porcentajeAhorro };
  }, []);

  const maxLitrosGrafica = Math.max(...historialData.map(d => d.litros), 1);

  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    hero: { backgroundColor: Colors.dark, padding: 32, alignItems: 'center', paddingTop: 60 },
    heroTitulo: { color: '#fff', fontSize: 26, fontWeight: '900', marginTop: 8 },
    heroSub: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 4 },
    scrollView: { paddingTop: 16 },
    seccion: {
      backgroundColor: Colors.card,
      marginHorizontal: 16,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOpacity: theme === 'dark' ? 0.2 : 0.05,
      shadowRadius: 6,
      elevation: 3,
    },
    seccionTitulo: { fontSize: 15, fontWeight: '800', color: Colors.text, marginBottom: 16 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
    statCard: { 
      flex: 1, 
      backgroundColor: Colors.background, 
      borderRadius: 12, 
      padding: 14, 
      alignItems: 'center',
      borderWidth: 1,
      borderColor: Colors.textLight, // Corregido
    },
    statValor: { fontSize: 22, fontWeight: '800', color: Colors.primary, marginTop: 4 },
    statLabel: { fontSize: 12, color: Colors.text, opacity: 0.6, marginTop: 2 },
    graficaContainer: { marginTop: 8 },
    graficaBody: { 
      flexDirection: 'row', 
      height: 150, 
      alignItems: 'flex-end', 
      borderLeftWidth: 1, 
      borderBottomWidth: 1, 
      borderColor: Colors.textLight, // Corregido
      paddingLeft: 10, 
      justifyContent: 'space-around' 
    },
    barraContainer: { flex: 1, alignItems: 'center' },
    barra: { width: '50%', backgroundColor: Colors.primary, borderTopLeftRadius: 4, borderTopRightRadius: 4 },
    barraEtiqueta: { fontSize: 10, color: Colors.text, opacity: 0.7, marginTop: 4 },
  }), [Colors, theme]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Ionicons name="bar-chart" size={52} color="#fff" />
        <Text style={styles.heroTitulo}>Estadísticas</Text>
        <Text style={styles.heroSub}>Tu rendimiento de ahorro</Text>
      </View>

      <View style={styles.scrollView}>
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Resumen (últimos 7 días)</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Ionicons name="beaker-outline" size={24} color={Colors.primary} />
              <Text style={styles.statValor}>{stats.totalLitros.toFixed(0)}</Text>
              <Text style={styles.statLabel}>Litros</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="cash-outline" size={24} color={Colors.primary} />
              <Text style={styles.statValor}>${stats.totalCosto.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Gastados</Text>
            </View>
          </View>
          <View style={[styles.statsRow, { marginTop: 8 }]}>
            <View style={styles.statCard}>
              <Ionicons name="timer-outline" size={24} color={Colors.primary} />
              <Text style={styles.statValor}>{Math.round(stats.duracionPromedio / 60)} min</Text>
              <Text style={styles.statLabel}>Ducha Prom.</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="leaf-outline" size={24} color={Colors.primary} />
              <Text style={styles.statValor}>{stats.porcentajeAhorro.toFixed(0)}%</Text>
              <Text style={styles.statLabel}>Ahorro</Text>
            </View>
          </View>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Consumo Diario (Litros)</Text>
          <View style={styles.graficaContainer}>
            <View style={styles.graficaBody}>
              {historialData.slice(0, 7).reverse().map((d) => (
                <View key={d.id} style={styles.barraContainer}>
                  <View style={[styles.barra, { height: `${(d.litros / maxLitrosGrafica) * 90}%` }]} />
                  <Text style={styles.barraEtiqueta}>
                    {new Date(d.fecha).toLocaleDateString('es-ES', { day: 'numeric' })}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View style={{ height: 20 }}/>
    </ScrollView>
  );
}
