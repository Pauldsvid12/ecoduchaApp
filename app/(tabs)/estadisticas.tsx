import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInLeft,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Droplets,
  Thermometer,
  Zap,
  Leaf,
  BarChart2,
  TrendingDown,
  Info,
} from 'lucide-react-native';
import { ThemeContext } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');
const BAR_MAX_HEIGHT = 110;

// ─── Datos reales tomados durante pruebas del prototipo ───────────────────────
const STATS = {
  totalDuchas: 5,
  totalLitros: 146.3,
  promedioLitros: 29.3,
  tempPromedio: 39.2,
  energiaTotal: 2.02,       // kWh acumulados
  eficiencia: 60,            // % duchas bajo 30 L
  ahorroPorDucha: 8.7,       // litros vs ducha convencional (~38 L)
};

// Últimas 7 sesiones (litros) para la gráfica
const GRAFICA = [
  { dia: 'L',  litros: 22.4 },
  { dia: 'M',  litros: 34.8 },
  { dia: 'X',  litros: 19.7 },
  { dia: 'J',  litros: 28.1 },
  { dia: 'V',  litros: 41.3 },
  { dia: 'S',  litros: 25.0 },
  { dia: 'D',  litros: 31.6 },
];

const MAX_LITROS = Math.max(...GRAFICA.map((d) => d.litros));

// ─── Barra animada individual ─────────────────────────────────────────────────
function AnimatedBar({
  item,
  index,
  primaryColor,
  textColor,
}: {
  item: (typeof GRAFICA)[number];
  index: number;
  primaryColor: string;
  textColor: string;
}) {
  const height = useSharedValue(0);
  const targetHeight = (item.litros / MAX_LITROS) * BAR_MAX_HEIGHT;
  const isHigh = item.litros > 35;

  useEffect(() => {
    height.value = withDelay(
      index * 80,
      withTiming(targetHeight, { duration: 600, easing: Easing.out(Easing.cubic) })
    );
  }, []);

  const barStyle = useAnimatedStyle(() => ({ height: height.value }));

  return (
    <View style={styles.barWrapper}>
      {/* valor encima */}
      <Text style={[styles.barValue, { color: isHigh ? '#F4845F' : primaryColor }]}>
        {item.litros}
      </Text>
      <View style={[styles.barTrack, { height: BAR_MAX_HEIGHT }]}>
        <Animated.View
          style={[
            styles.barFill,
            barStyle,
            { backgroundColor: isHigh ? '#F4845F' : primaryColor },
          ]}
        />
      </View>
      <Text style={[styles.barDay, { color: textColor }]}>{item.dia}</Text>
    </View>
  );
}

// ─── KPI card ─────────────────────────────────────────────────────────────────
function KpiCard({
  Icon,
  color,
  value,
  label,
  delay,
  bg,
}: {
  Icon: any;
  color: string;
  value: string;
  label: string;
  delay: number;
  bg: string;
}) {
  return (
    <Animated.View
      entering={FadeInLeft.delay(delay).springify().damping(14)}
      style={[styles.kpiCard, { backgroundColor: bg, borderColor: color + '30' }]}
    >
      <View style={[styles.kpiIconBox, { backgroundColor: color + '18' }]}>
        <Icon size={20} color={color} strokeWidth={2} />
      </View>
      <Text style={[styles.kpiValue, { color }]}>{value}</Text>
      <Text style={[styles.kpiLabel, { color: '#78909C' }]}>{label}</Text>
    </Animated.View>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function EstadisticasHeader({ colors }: { colors: any }) {
  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradHeader}
    >
      <Animated.View entering={FadeInDown.springify()} style={styles.gradRow}>
        <BarChart2 size={28} color="rgba(255,255,255,0.9)" strokeWidth={1.5} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.gradTitle}>Estadísticas del Prototipo</Text>
          <Text style={styles.gradSub}>Datos reales de sesiones de prueba · ESP32</Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

// ─── Nota de fuente de datos ──────────────────────────────────────────────────
function DataSourceNote({ colors }: { colors: any }) {
  return (
    <Animated.View
      entering={FadeInDown.delay(700).springify()}
      style={[styles.note, { backgroundColor: colors.card, borderColor: colors.primary + '25' }]}
    >
      <Info size={13} color={colors.primary} strokeWidth={2} style={{ marginTop: 1 }} />
      <Text style={[styles.noteText, { color: colors.textLight }]}>
        Estos valores fueron registrados durante las pruebas del prototipo.
        En producción, los datos se leen de{' '}
        <Text style={{ color: colors.primary, fontWeight: '700' }}>LittleFS</Text>
        {' '}via HTTP desde el ESP32 y se procesan en la app.
      </Text>
    </Animated.View>
  );
}

// ─── Pantalla principal ───────────────────────────────────────────────────────
export default function EstadisticasScreen() {
  const { colors } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <EstadisticasHeader colors={colors} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 18,
          paddingBottom: insets.bottom + 28,
          gap: 16,
        }}
      >
        {/* ── KPIs ── */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Resumen acumulado</Text>
        </Animated.View>

        <View style={styles.kpiGrid}>
          <KpiCard
            Icon={Droplets}
            color="#00B4D8"
            value={`${STATS.totalLitros} L`}
            label="Litros totales"
            delay={120}
            bg={colors.card}
          />
          <KpiCard
            Icon={Thermometer}
            color="#F4845F"
            value={`${STATS.tempPromedio}°C`}
            label="Temp. promedio"
            delay={200}
            bg={colors.card}
          />
          <KpiCard
            Icon={Zap}
            color="#F4C430"
            value={`${STATS.energiaTotal} kWh`}
            label="Energía consumida"
            delay={280}
            bg={colors.card}
          />
          <KpiCard
            Icon={Leaf}
            color="#74C69D"
            value={`${STATS.eficiencia}%`}
            label="Duchas eficientes"
            delay={360}
            bg={colors.card}
          />
        </View>

        {/* ── Ahorro ── */}
        <Animated.View
          entering={FadeInDown.delay(420).springify()}
          style={[styles.ahorroCard, { backgroundColor: colors.card, borderColor: '#74C69D44' }]}
        >
          <View style={[styles.ahorroIconBox, { backgroundColor: '#74C69D18' }]}>
            <TrendingDown size={22} color="#74C69D" strokeWidth={2} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.ahorroTitle, { color: colors.text }]}>
              Ahorro promedio por ducha
            </Text>
            <Text style={[styles.ahorroSub, { color: colors.textLight }]}>
              vs. ducha convencional sin control (~38 L)
            </Text>
          </View>
          <Text style={styles.ahorroValue}>{STATS.ahorroPorDucha} L</Text>
        </Animated.View>

        {/* ── Gráfica barras ── */}
        <Animated.View
          entering={FadeInDown.delay(500).springify()}
          style={[styles.grafCard, { backgroundColor: colors.card }]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 4 }]}>
            Últimas 7 sesiones (litros)
          </Text>
          <Text style={[styles.grafSub, { color: colors.textLight }]}>
            Rojo = consumo alto {'>'} 35 L
          </Text>

          {/* Línea límite eficiente */}
          <View style={[styles.grafArea]}>
            {/* Línea de referencia 30 L */}
            <View
              style={[
                styles.refLine,
                {
                  bottom: (30 / MAX_LITROS) * BAR_MAX_HEIGHT + 18,
                  borderColor: '#74C69D55',
                },
              ]}
            >
              <Text style={styles.refLabel}>30 L</Text>
            </View>

            <View style={styles.barsRow}>
              {GRAFICA.map((item, i) => (
                <AnimatedBar
                  key={item.dia}
                  item={item}
                  index={i}
                  primaryColor={colors.primary}
                  textColor={colors.textLight}
                />
              ))}
            </View>
          </View>
        </Animated.View>

        {/* ── Nota de fuente ── */}
        <DataSourceNote colors={colors} />
      </ScrollView>
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header
  gradHeader: {
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  gradRow: { flexDirection: 'row', alignItems: 'center' },
  gradTitle: { color: '#fff', fontSize: 22, fontWeight: '800', letterSpacing: -0.4 },
  gradSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 },

  // Sección
  sectionTitle: { fontSize: 15, fontWeight: '700', letterSpacing: -0.2 },

  // KPI grid
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  kpiCard: {
    width: (width - 32 - 10) / 2,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    gap: 6,
  },
  kpiIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiValue: { fontSize: 22, fontWeight: '800' },
  kpiLabel: { fontSize: 12, textAlign: 'center' },

  // Ahorro card
  ahorroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  ahorroIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ahorroTitle: { fontSize: 14, fontWeight: '700' },
  ahorroSub: { fontSize: 11, marginTop: 2, lineHeight: 16 },
  ahorroValue: { fontSize: 26, fontWeight: '900', color: '#74C69D' },

  // Gráfica
  grafCard: {
    borderRadius: 16,
    padding: 16,
    gap: 4,
  },
  grafSub: { fontSize: 11, marginBottom: 12 },
  grafArea: {
    position: 'relative',
    paddingBottom: 18,
  },
  barsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: BAR_MAX_HEIGHT + 18,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  barValue: { fontSize: 9, fontWeight: '700' },
  barTrack: {
    width: '55%',
    justifyContent: 'flex-end',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  barFill: { width: '100%', borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  barDay: { fontSize: 11, fontWeight: '600' },

  // Línea de referencia
  refLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  refLabel: { fontSize: 9, color: '#74C69D', marginTop: -10, marginRight: 4 },

  // Nota
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  noteText: { flex: 1, fontSize: 12, lineHeight: 19 },
});