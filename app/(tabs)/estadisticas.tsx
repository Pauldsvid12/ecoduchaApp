import React, { useContext, useMemo, useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getHistory, DuchaData } from '../../services/storage';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionCard } from '@/components/SectionCard';
import { StatItem } from '@/components/StatItem';

export default function EstadisticasScreen() {
  const { colors, theme } = useContext(ThemeContext);
  const [registroReal, setRegistroReal] = useState<DuchaData[]>([]);

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
    const totalCosto = totalLitros * 0.003;
    const promedioLitros = totalLitros / totalDuchas;
    const duchasBuenas = registroReal.filter(d => d.litros <= 30).length;
    const porcentajeAhorro = (duchasBuenas / totalDuchas) * 100;
    return { totalLitros, totalCosto, promedioLitros, porcentajeAhorro };
  }, [registroReal]);

  const maxLitrosGrafica = useMemo(() =>
    Math.max(...registroReal.map(d => d.litros), 10),
  [registroReal]);

  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    statsRow: { flexDirection: 'row', gap: 8 },
    graficaBody: {
      flexDirection: 'row',
      height: 150,
      alignItems: 'flex-end',
      borderLeftWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.text + '33',
      paddingLeft: 10,
      justifyContent: 'space-around',
      marginTop: 8,
    },
    barraContainer: { flex: 1, alignItems: 'center' },
    barra: { width: '50%', backgroundColor: colors.primary, borderTopLeftRadius: 4, borderTopRightRadius: 4 },
    barraEtiqueta: { fontSize: 9, color: colors.text, opacity: 0.7, marginTop: 4, textAlign: 'center' },
    sinDatos: { color: colors.text, opacity: 0.5 },
  }), [colors, theme]);

  return (
    <ScrollView style={styles.container}>
      {/* ✅ ANTES: ~10 líneas de View/Text/Ionicons. AHORA: 1 componente */}
      <ScreenHeader
        titulo="Estadísticas Reales"
        subtitulo="Análisis de consumo del dispositivo"
        icono="bar-chart"
      />

      <View style={{ paddingTop: 16 }}>
        {/* ✅ ANTES: ~30 líneas de View con estilos inline. AHORA: SectionCard + StatItem */}
        <SectionCard titulo="Resumen Acumulado">
          <View style={styles.statsRow}>
            <StatItem icono="beaker-outline" valor={stats.totalLitros.toFixed(1)} label="Litros Totales" />
            <StatItem icono="cash-outline" valor={`$${stats.totalCosto.toFixed(2)}`} label="Costo Est." />
          </View>
          <View style={[styles.statsRow, { marginTop: 8 }]}>
            <StatItem icono="water-outline" valor={stats.promedioLitros.toFixed(1)} label="Prom. L/Ducha" />
            <StatItem icono="leaf-outline" valor={`${stats.porcentajeAhorro.toFixed(0)}%`} label="Eficiencia" />
          </View>
        </SectionCard>

        <SectionCard titulo="Últimas 7 Duchas (Litros)">
          <View style={styles.graficaBody}>
            {registroReal.slice(-7).map((d, index) => (
              <View key={index} style={styles.barraContainer}>
                <View style={[styles.barra, { height: `${(d.litros / maxLitrosGrafica) * 90}%` as any }]} />
                <Text style={styles.barraEtiqueta}>
                  {d.fecha.split(',')[0].slice(0, 5)}
                </Text>
              </View>
            ))}
            {registroReal.length === 0 && <Text style={styles.sinDatos}>Sin datos</Text>}
          </View>
        </SectionCard>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
