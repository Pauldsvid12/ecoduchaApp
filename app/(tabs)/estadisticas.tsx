import React, { useContext, useMemo } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeInDown,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { BarChart3, Droplets, Leaf, TrendingUp, Zap } from 'lucide-react-native';
import { ThemeContext } from '@/contexts/ThemeContext';
import { sesiones, estadisticasMensuales, kpisGlobales } from '@/constants/MockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 36 - 40; // padding + ejes

// ─── Tipos ────────────────────────────────────────────────────────────────────
type MiniKpiProps = {
  label:  string;
  valor:  string;
  unidad: string;
  color:  string;
  Icon:   typeof Droplets;
  delay:  number;
};

type BarItemProps = {
  mes:      string;
  litros:   number;
  kwh:      number;
  maxLitros: number;
  index:    number;
};

type SesionRowProps = {
  fecha:     string;
  litros:    number;
  tempProm:  number;
  eficiente: boolean;
  delay:     number;
};

type ProgressBarProps = {
  label:  string;
  valor:  number;
  max:    number;
  color:  string;
  unidad: string;
  delay:  number;
};

// ─── KPI Card pequeña ──────────────────────────────────────────────────────────
function MiniKpi({ label, valor, unidad, color, Icon, delay }: MiniKpiProps) {
  return (
    <Animated.View
      entering={FadeInRight.delay(delay)}
      style={[styles.miniKpi, { borderColor: `${color}25`, backgroundColor: `${color}0E` }]}
    >
      <View style={[styles.miniKpiIcon, { backgroundColor: `${color}20` }]}>
        <Icon size={16} color={color} strokeWidth={2.2} />
      </View>
      <Text style={[styles.miniKpiValor, { color }]}>{valor}</Text>
      <Text style={styles.miniKpiUnidad}>{unidad}</Text>
      <Text style={styles.miniKpiLabel}>{label}</Text>
    </Animated.View>
  );
}

// ─── Barra de gráfica ─────────────────────────────────────────────────────────
function BarItem({ mes, litros, kwh, maxLitros, index }: BarItemProps) {
  const { colors } = useContext(ThemeContext);
  const heightPct = litros / maxLitros;
  const barH = useSharedValue(0);

  React.useEffect(() => {
    barH.value = withTiming(heightPct * 110, { duration: 600 + index * 80 });
  }, []);

  const barAnim = useAnimatedStyle(() => ({ height: barH.value }));

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 60)}
      style={styles.barWrap}
    >
      <Text style={[styles.barKwh, { color: colors.textLight }]}>{kwh}</Text>
      <Animated.View style={[styles.bar, barAnim, { backgroundColor: '#0077B6' }]} />
      <Text style={[styles.barMes, { color: colors.textLight }]}>{mes}</Text>
    </Animated.View>
  );
}

// ─── Fila de sesión reciente ───────────────────────────────────────────────────
function SesionRow({ fecha, litros, tempProm, eficiente, delay }: SesionRowProps) {
  const { colors } = useContext(ThemeContext);

  return (
    <Animated.View
      entering={FadeInRight.delay(delay)}
      style={[styles.sesionRow, { borderBottomColor: colors.border }]}
    >
      <View
        style={[
          styles.sesionDot,
          { backgroundColor: eficiente ? '#4ADE80' : '#F87171' },
        ]}
      />
      <Text style={[styles.sesionFecha, { color: colors.text }]}>{fecha}</Text>
      <Text style={[styles.sesionLitros, { color: '#22D3EE' }]}>{litros} L</Text>
      <Text style={[styles.sesionTemp, { color: '#FB923C' }]}>{tempProm}°C</Text>
    </Animated.View>
  );
}

// ─── Barra de progreso horizontal ─────────────────────────────────────────────
function ProgressBar({ label, valor, max, color, unidad, delay }: ProgressBarProps) {
  const { colors } = useContext(ThemeContext);
  const width = useSharedValue(0);

  React.useEffect(() => {
    width.value = withTiming((valor / max) * (CHART_WIDTH - 80), { duration: 700 + delay });
  }, []);

  const barAnim = useAnimatedStyle(() => ({ width: width.value }));

  return (
    <Animated.View entering={FadeInRight.delay(delay)} style={styles.progressRow}>
      <Text style={[styles.progressLabel, { color: colors.textLight }]}>{label}</Text>
      <View style={styles.progressTrackWrap}>
        <View style={[styles.progressTrack, { backgroundColor: `${color}18` }]}>
          <Animated.View
            style={[styles.progressFill, barAnim, { backgroundColor: color, borderRadius: 4 }]}
          />
        </View>
        <Text style={[styles.progressValor, { color }]}>
          {valor} {unidad}
        </Text>
      </View>
    </Animated.View>
  );
}

// ─── Pantalla ─────────────────────────────────────────────────────────────────
export default function EstadisticasScreen() {
  const { colors } = useContext(ThemeContext);

  const maxLitrosMensuales = useMemo(
    () => Math.max(...estadisticasMensuales.map((m) => m.litros)),
    [],
  );

  const maxLitrosSesion = useMemo(
    () => Math.max(...sesiones.map((s) => s.litros)),
    [],
  );

  // Pulso animado del ícono de header
  const pulse = useSharedValue(1);
  React.useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 900 }),
        withTiming(1,    { duration: 900 }),
      ),
      -1,
    );
  }, []);
  const pulseStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulse.value }] }));

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientMid ?? colors.gradientEnd, colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >

          {/* ── HEADER ─────────────────────────────────────────────────────── */}
          <Animated.View entering={FadeInDown} style={styles.header}>
            <View>
              <Text style={styles.headerEyebrow}>Análisis del prototipo</Text>
              <Text style={styles.headerTitulo}>Estadísticas</Text>
            </View>
            <Animated.View style={[styles.headerIcon, pulseStyle]}>
              <BarChart3 size={26} color="#FFFFFF" strokeWidth={1.8} />
            </Animated.View>
          </Animated.View>

          {/* ── KPIs PRINCIPALES ────────────────────────────────────────────── */}
          <View style={styles.kpiRow}>
            <MiniKpi
              label="Total litros"
              valor={kpisGlobales.litrosTotales.toFixed(1)}
              unidad="L"
              color="#22D3EE"
              Icon={Droplets}
              delay={80}
            />
            <MiniKpi
              label="Energía total"
              valor={String(kpisGlobales.energiaTotal)}
              unidad="kWh"
              color="#A78BFA"
              Icon={Zap}
              delay={140}
            />
            <MiniKpi
              label="Eficiencia"
              valor={`${kpisGlobales.eficiencia}%`}
              unidad="duchas OK"
              color="#4ADE80"
              Icon={Leaf}
              delay={200}
            />
            <MiniKpi
              label="Ahorro est."
              valor={`${kpisGlobales.ahorroPorDucha}`}
              unidad="L/ducha"
              color="#FBBF24"
              Icon={TrendingUp}
              delay={260}
            />
          </View>

          {/* ── GRÁFICA DE BARRAS MENSUAL ────────────────────────────────────── */}
          <Animated.View
            entering={FadeInDown.delay(300)}
            style={[styles.card, { backgroundColor: `${colors.card}E8`, borderColor: colors.border }]}
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitulo, { color: colors.text }]}>
                Consumo mensual
              </Text>
              <Text style={[styles.cardSub, { color: colors.textLight }]}>
                Litros acumulados
              </Text>
            </View>
            <View style={styles.chartArea}>
              {estadisticasMensuales.map((m, i) => (
                <BarItem
                  key={m.mes}
                  mes={m.mes}
                  litros={m.litros}
                  kwh={m.kwh}
                  maxLitros={maxLitrosMensuales}
                  index={i}
                />
              ))}
            </View>
            <Text style={[styles.chartFooter, { color: colors.textLight }]}>
              kWh sobre cada barra · Litros en el eje
            </Text>
          </Animated.View>

          {/* ── BARRAS DE PROGRESO POR SESIÓN ───────────────────────────────── */}
          <Animated.View
            entering={FadeInDown.delay(380)}
            style={[styles.card, { backgroundColor: `${colors.card}E8`, borderColor: colors.border }]}
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitulo, { color: colors.text }]}>
                Litros por sesión
              </Text>
              <Text style={[styles.cardSub, { color: colors.textLight }]}>
                Máx: {maxLitrosSesion} L
              </Text>
            </View>
            <View style={styles.progressList}>
              {sesiones.map((s, i) => (
                <ProgressBar
                  key={s.id}
                  label={s.fecha.slice(5)}
                  valor={s.litros}
                  max={maxLitrosSesion}
                  color={s.eficiente ? '#22D3EE' : '#F87171'}
                  unidad="L"
                  delay={i * 60}
                />
              ))}
            </View>
          </Animated.View>

          {/* ── ÚLTIMAS 5 SESIONES ───────────────────────────────────────────── */}
          <Animated.View
            entering={FadeInDown.delay(460)}
            style={[styles.card, { backgroundColor: `${colors.card}E8`, borderColor: colors.border }]}
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitulo, { color: colors.text }]}>
                Últimas sesiones
              </Text>
              <Text style={[styles.cardSub, { color: colors.textLight }]}>
                Temp. promedio · litros
              </Text>
            </View>
            {sesiones.slice(0, 5).map((s, i) => (
              <SesionRow
                key={s.id}
                fecha={s.fecha}
                litros={s.litros}
                tempProm={s.tempProm}
                eficiente={s.eficiente}
                delay={i * 60}
              />
            ))}
          </Animated.View>

          {/* ── NOTA FOOTER ─────────────────────────────────────────────────── */}
          <Animated.View
            entering={FadeInDown.delay(540)}
            style={styles.notaBanner}
          >
            <Text style={styles.notaText}>
              Datos generados durante las pruebas del prototipo. En el dispositivo real, cada sesión se almacena como archivo JSON en LittleFS (flash del ESP32) y se sincroniza vía MQTT.
            </Text>
          </Animated.View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safeArea: { flex: 1 },
  scroll: {
    paddingHorizontal: 18,
    paddingTop:        12,
    paddingBottom:     110,
    gap:               12,
  },

  // Header
  header: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'flex-end',
    paddingVertical: 12,
  },
  headerEyebrow: {
    color:         'rgba(255,255,255,0.55)',
    fontSize:      11,
    fontWeight:    '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  headerTitulo: {
    color:         '#FFFFFF',
    fontSize:      32,
    fontWeight:    '900',
    letterSpacing: -0.8,
    marginTop:     2,
  },
  headerIcon: {
    width:          52,
    height:         52,
    borderRadius:   18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems:     'center',
    justifyContent: 'center',
    borderWidth:    1,
    borderColor:    'rgba(255,255,255,0.15)',
  },

  // Mini KPIs
  kpiRow: {
    flexDirection:  'row',
    flexWrap:       'wrap',
    gap:            8,
  },
  miniKpi: {
    width:           '48.5%',
    borderRadius:    18,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth:     1,
    gap:             4,
  },
  miniKpiIcon: {
    width:          32,
    height:         32,
    borderRadius:   10,
    alignItems:     'center',
    justifyContent: 'center',
    marginBottom:   4,
  },
  miniKpiValor: {
    fontSize:      24,
    fontWeight:    '900',
    letterSpacing: -0.5,
  },
  miniKpiUnidad: {
    color:      'rgba(255,255,255,0.55)',
    fontSize:   11,
    fontWeight: '600',
  },
  miniKpiLabel: {
    color:      'rgba(255,255,255,0.8)',
    fontSize:   11,
    fontWeight: '700',
    marginTop:  2,
  },

  // Cards
  card: {
    borderRadius: 22,
    padding:      18,
    borderWidth:  1,
    gap:          14,
  },
  cardHeader: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'baseline',
  },
  cardTitulo: {
    fontSize:      16,
    fontWeight:    '800',
    letterSpacing: -0.2,
  },
  cardSub: {
    fontSize:   12,
    fontWeight: '600',
  },

  // Chart
  chartArea: {
    flexDirection:  'row',
    alignItems:     'flex-end',
    justifyContent: 'space-between',
    height:         130,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.12)',
    paddingBottom:  4,
  },
  barWrap: {
    flex:           1,
    alignItems:     'center',
    gap:            4,
    justifyContent: 'flex-end',
  },
  bar: {
    width:               '55%',
    borderTopLeftRadius:  5,
    borderTopRightRadius: 5,
    minHeight:            4,
  },
  barKwh: {
    fontSize:  9,
    fontWeight: '700',
  },
  barMes: {
    fontSize:   10,
    fontWeight: '700',
  },
  chartFooter: {
    fontSize:  11,
    textAlign: 'center',
    marginTop: -6,
  },

  // Progress
  progressList: { gap: 10 },
  progressRow:  { gap: 6 },
  progressLabel: { fontSize: 11, fontWeight: '700' },
  progressTrackWrap: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           8,
  },
  progressTrack: {
    flex:         1,
    height:       8,
    borderRadius: 4,
    overflow:     'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressValor: {
    fontSize:   12,
    fontWeight: '800',
    minWidth:   48,
    textAlign:  'right',
  },

  // Sesion rows
  sesionRow: {
    flexDirection:  'row',
    alignItems:     'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    gap:            10,
  },
  sesionDot: {
    width:        8,
    height:       8,
    borderRadius: 4,
  },
  sesionFecha: { flex: 1, fontSize: 13, fontWeight: '700' },
  sesionLitros: { fontSize: 13, fontWeight: '900', minWidth: 44, textAlign: 'right' },
  sesionTemp:   { fontSize: 13, fontWeight: '800', minWidth: 44, textAlign: 'right' },

  // Nota
  notaBanner: {
    padding:         14,
    borderRadius:    16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth:     1,
    borderColor:     'rgba(255,255,255,0.1)',
  },
  notaText: {
    color:      'rgba(255,255,255,0.6)',
    fontSize:   12,
    lineHeight: 18,
  },
});