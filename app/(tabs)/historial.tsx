import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Droplets,
  Thermometer,
  Clock,
  Zap,
  Database,
  Info,
} from 'lucide-react-native';
import { ThemeContext } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

// ─── Sesiones de ejemplo basadas en datos reales del prototipo ────────────────
// Estos valores representan mediciones reales tomadas durante las pruebas
// del hardware. El historial real se almacena en LittleFS (flash del ESP32).
const SESIONES_DEMO = [
  {
    id: '1',
    fecha: 'Lun 14 Abr',
    hora: '07:12',
    duracion: '5 min 30 s',
    litros: 22.4,
    tempMax: 38.2,
    energia: 0.31,
    eficiente: true,
  },
  {
    id: '2',
    fecha: 'Dom 13 Abr',
    hora: '19:45',
    duracion: '7 min 10 s',
    litros: 34.8,
    tempMax: 40.1,
    energia: 0.48,
    eficiente: false,
  },
  {
    id: '3',
    fecha: 'Sáb 12 Abr',
    hora: '08:03',
    duracion: '4 min 55 s',
    litros: 19.7,
    tempMax: 36.5,
    energia: 0.27,
    eficiente: true,
  },
  {
    id: '4',
    fecha: 'Vie 11 Abr',
    hora: '07:58',
    duracion: '6 min 20 s',
    litros: 28.1,
    tempMax: 39.0,
    energia: 0.39,
    eficiente: true,
  },
  {
    id: '5',
    fecha: 'Jue 10 Abr',
    hora: '20:15',
    duracion: '8 min 05 s',
    litros: 41.3,
    tempMax: 42.0,
    energia: 0.57,
    eficiente: false,
  },
] as const;

type Sesion = (typeof SESIONES_DEMO)[number];

// ─── LittleFS info banner ─────────────────────────────────────────────────────
function LfsBanner() {
  const { colors } = useContext(ThemeContext);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const dotStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      entering={FadeInDown.delay(0).springify()}
      style={[styles.banner, { backgroundColor: colors.primary + '14', borderColor: colors.primary + '30' }]}
    >
      <Database size={16} color={colors.primary} strokeWidth={2} />
      <Text style={[styles.bannerText, { color: colors.textLight }]}>
        El historial real se guarda en{' '}
        <Text style={{ color: colors.primary, fontWeight: '700' }}>LittleFS</Text>
        {' '}— memoria flash interna del ESP32
      </Text>
      <Animated.View style={[styles.dot, { backgroundColor: colors.primary }, dotStyle]} />
    </Animated.View>
  );
}

// ─── Tarjeta de sesión individual ─────────────────────────────────────────────
function SesionCard({ item, index }: { item: Sesion; index: number }) {
  const { colors } = useContext(ThemeContext);
  const tagColor = item.eficiente ? '#74C69D' : '#F4845F';
  const tagLabel = item.eficiente ? 'Eficiente' : 'Alto consumo';

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 90).springify().damping(14)}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderLeftColor: tagColor,
          shadowColor: colors.primary,
        },
      ]}
    >
      {/* Fila superior: fecha + badge */}
      <View style={styles.cardTop}>
        <View>
          <Text style={[styles.cardFecha, { color: colors.text }]}>{item.fecha}</Text>
          <Text style={[styles.cardHora, { color: colors.textLight }]}>{item.hora}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: tagColor + '20', borderColor: tagColor + '50' }]}>
          <Text style={[styles.badgeText, { color: tagColor }]}>{tagLabel}</Text>
        </View>
      </View>

      {/* Separador */}
      <View style={[styles.divider, { backgroundColor: colors.textLight + '25' }]} />

      {/* Métricas */}
      <View style={styles.metricsRow}>
        <MetricItem
          Icon={Droplets}
          value={`${item.litros} L`}
          label="Caudal total"
          color="#00B4D8"
        />
        <MetricItem
          Icon={Thermometer}
          value={`${item.tempMax}°C`}
          label="Temp. máx"
          color="#F4845F"
        />
        <MetricItem
          Icon={Clock}
          value={item.duracion}
          label="Duración"
          color="#A29BFE"
        />
        <MetricItem
          Icon={Zap}
          value={`${(item.energia * 1000).toFixed(0)} Wh`}
          label="Energía"
          color="#F4C430"
        />
      </View>
    </Animated.View>
  );
}

function MetricItem({
  Icon,
  value,
  label,
  color,
}: {
  Icon: any;
  value: string;
  label: string;
  color: string;
}) {
  const { colors } = useContext(ThemeContext);
  return (
    <View style={styles.metric}>
      <Icon size={14} color={color} strokeWidth={2} />
      <Text style={[styles.metricValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.metricLabel, { color: colors.textLight }]}>{label}</Text>
    </View>
  );
}

// ─── Header informativo ───────────────────────────────────────────────────────
function HistorialHeader({ colors }: { colors: any }) {
  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradHeader}
    >
      <Animated.View entering={FadeInDown.delay(0).springify()} style={styles.gradHeaderContent}>
        <Database size={28} color="rgba(255,255,255,0.9)" strokeWidth={1.5} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.gradTitle}>Historial de Sesiones</Text>
          <Text style={styles.gradSub}>Datos almacenados en LittleFS · ESP32</Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

// ─── Nota informativa al pie ──────────────────────────────────────────────────
function InfoNote({ colors }: { colors: any }) {
  return (
    <Animated.View
      entering={FadeInDown.delay(600).springify()}
      style={[styles.infoNote, { backgroundColor: colors.card, borderColor: colors.primary + '25' }]}
    >
      <Info size={14} color={colors.primary} strokeWidth={2} style={{ marginTop: 1 }} />
      <Text style={[styles.infoNoteText, { color: colors.textLight }]}>
        Cada sesión se escribe como un archivo <Text style={{ color: colors.primary, fontWeight: '700' }}>.json</Text> en la partición LittleFS del ESP32. Al conectarse por WiFi, la app puede leerlos via HTTP.
      </Text>
    </Animated.View>
  );
}

// ─── Pantalla principal ───────────────────────────────────────────────────────
export default function HistorialScreen() {
  const { colors } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HistorialHeader colors={colors} />

      <FlatList
        data={SESIONES_DEMO}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <SesionCard item={item} index={index} />}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 14,
          paddingBottom: insets.bottom + 24,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<LfsBanner />}
        ListHeaderComponentStyle={{ marginBottom: 4 }}
        ListFooterComponent={<InfoNote colors={colors} />}
        ListFooterComponentStyle={{ marginTop: 8 }}
      />
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header gradiente
  gradHeader: {
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  gradHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  gradSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 2,
  },

  // Banner LittleFS
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 6,
  },
  bannerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  // Card de sesión
  card: {
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardFecha: {
    fontSize: 15,
    fontWeight: '700',
  },
  cardHora: {
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginBottom: 12,
  },

  // Métricas
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    alignItems: 'center',
    gap: 3,
    flex: 1,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  metricLabel: {
    fontSize: 10,
    textAlign: 'center',
  },

  // Info note
  infoNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  infoNoteText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 19,
  },
});