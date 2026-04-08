import React, { useContext, useMemo, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getHistory, DuchaData } from '../../services/storage';

export default function EstadisticasScreen() {
  const { colors, theme } = useContext(ThemeContext);
  const [registroReal, setRegistroReal] = useState<DuchaData[]>([]);

  // Cargar datos reales del storage
  useEffect(() => {
    const cargar = async () => {
      const h = await getHistory();
      setRegistroReal(h);
    };
    cargar();
  }, []);

  const stats = useMemo(() => {
    const totalDuchas = registroReal.length;
    if (totalDuchas === 0) return { totalLitros: 0, totalCosto: 0, promedioLitros: 0, porcentajeAhorro: 0 };

    const totalLitros = registroReal.reduce((sum, item) => sum + item.litros, 0);
    // Calculamos costo dinámico basado en las tarifas de tu código anterior
    const totalCosto = totalLitros * 0.003; 
    const promedioLitros = totalLitros / totalDuchas;
    // Consideramos "ducha buena" si es menor a 30L (puedes ajustar este umbral)
    const duchasBuenas = registroReal.filter(d => d.litros <= 30).length;
    const porcentajeAhorro = (duchasBuenas / totalDuchas) * 100;

    return { totalLitros, totalCosto, promedioLitros, porcentajeAhorro };
  }, [registroReal]);

  const maxLitrosGrafica = useMemo(() => 
    Math.max(...registroReal.map(d => d.litros), 10), 
  [registroReal]);

  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    hero: { backgroundColor: colors.dark, padding: 32, alignItems: 'center', paddingTop: 60 },
    heroTitulo: { color: '#fff', fontSize: 26, fontWeight: '900', marginTop: 8 },
    heroSub: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 4 },
    scrollView: { paddingTop: 16 },
    seccion: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      elevation: 3,
    },
    seccionTitulo: { fontSize: 15, fontWeight: '800', color: colors.text, marginBottom: 16 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
    statCard: { 
      flex: 1, 
      backgroundColor: colors.background, 
      borderRadius: 12, 
      padding: 14, 
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.primary + '33', // Color primario con transparencia
    },
    statValor: { fontSize: 22, fontWeight: '800', color: colors.primary, marginTop: 4 },
    statLabel: { fontSize: 12, color: colors.text, opacity: 0.6, marginTop: 2 },
    graficaContainer: { marginTop: 8 },
    graficaBody: { 
      flexDirection: 'row', 
      height: 150, 
      alignItems: 'flex-end', 
      borderLeftWidth: 1, 
      borderBottomWidth: 1, 
      borderColor: colors.text + '33', 
      paddingLeft: 10, 
      justifyContent: 'space-around' 
    },
    barraContainer: { flex: 1, alignItems: 'center' },
    barra: { width: '50%', backgroundColor: colors.primary, borderTopLeftRadius: 4, borderTopRightRadius: 4 },
    barraEtiqueta: { fontSize: 9, color: colors.text, opacity: 0.7, marginTop: 4, textAlign: 'center' },
  }), [colors, theme]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Ionicons name="bar-chart" size={52} color="#fff" />
        <Text style={styles.heroTitulo}>Estadísticas Reales</Text>
        <Text style={styles.heroSub}>Análisis de consumo del dispositivo</Text>
      </View>

      <View style={styles.scrollView}>
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Resumen Acumulado</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Ionicons name="beaker-outline" size={24} color={colors.primary} />
              <Text style={styles.statValor}>{stats.totalLitros.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Litros Totales</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="cash-outline" size={24} color={colors.primary} />
              <Text style={styles.statValor}>${stats.totalCosto.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Costo Est.</Text>
            </View>
          </View>
          <View style={[styles.statsRow, { marginTop: 8 }]}>
            <View style={styles.statCard}>
              <Ionicons name="water-outline" size={24} color={colors.primary} />
              <Text style={styles.statValor}>{stats.promedioLitros.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Prom. L/Ducha</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="leaf-outline" size={24} color={colors.primary} />
              <Text style={styles.statValor}>{stats.porcentajeAhorro.toFixed(0)}%</Text>
              <Text style={styles.statLabel}>Eficiencia</Text>
            </View>
          </View>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Últimas 7 Duchas (Litros)</Text>
          <View style={styles.graficaContainer}>
            <View style={styles.graficaBody}>
              {registroReal.slice(-7).map((d, index) => (
                <View key={index} style={styles.barraContainer}>
                  <View style={[styles.barra, { height: `${(d.litros / maxLitrosGrafica) * 90}%` }]} />
                  <Text style={styles.barraEtiqueta}>
                    {d.fecha.split(',')[0].slice(0, 5)} {/* Muestra solo DD/MM */}
                  </Text>
                </View>
              ))}
              {registroReal.length === 0 && <Text style={{color: colors.text, opacity: 0.5}}>Sin datos</Text>}
            </View>
          </View>
        </View>
      </View>
      <View style={{ height: 40 }}/>
    </ScrollView>
  );
}