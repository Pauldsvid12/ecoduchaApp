import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  ZoomIn,
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
  Zap,
  Cpu,
  Database,
  ChevronRight,
  Leaf,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { ThemeContext } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

// ─── Datos estáticos del sistema EcoDucha ────────────────────────────────────
const STATS = [
  { label: 'Sensor caudal',    value: 'YF-S201',  Icon: Droplets,    color: '#00B4D8' },
  { label: 'Temperatura',      value: 'DS18B20',  Icon: Thermometer, color: '#F4845F' },
  { label: 'Sensor corriente', value: 'ACS712',   Icon: Zap,         color: '#F4C430' },
  { label: 'Controlador',      value: 'ESP32',    Icon: Cpu,         color: '#74C69D' },
  { label: 'Almacenamiento',   value: 'LittleFS', Icon: Database,    color: '#A29BFE' },
];

const HIGHLIGHTS = [
  { value: '35°C',   label: 'Control\npreciso',     color: '#F4845F' },
  { value: '120V',   label: 'Regulación\nTRIAC',    color: '#F4C430' },
  { value: '1-Wire', label: 'Protocolo\nDS18B20',   color: '#00B4D8' },
  { value: 'LFS',    label: 'Historial\nlocal',      color: '#74C69D' },
];

// ─── Subcomponentes ───────────────────────────────────────────────────────────

function PulsingDot({ color }: { color: string }) {
  const opacity = useSharedValue(1);
  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1,   { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);
  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));
  return (
    <Animated.View
      style={[{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }, style]}
    />
  );
}

function StatChip({
  item,
  index,
}: {
  item: (typeof STATS)[number];
  index: number;
}) {
  const { colors } = useContext(ThemeContext);
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 80).springify().damping(14)}
      style={[styles.chip, { backgroundColor: item.color + '18', borderColor: item.color + '40' }]}
    >
      <item.Icon size={16} color={item.color} strokeWidth={2} />
      <View style={{ marginLeft: 8 }}>
        <Text style={[styles.chipValue, { color: item.color }]}>{item.value}</Text>
        <Text style={[styles.chipLabel, { color: colors.textLight }]}>{item.label}</Text>
      </View>
    </Animated.View>
  );
}

function HighlightCard({
  item,
  index,
}: {
  item: (typeof HIGHLIGHTS)[number];
  index: number;
}) {
  const { colors } = useContext(ThemeContext);
  return (
    <Animated.View
      entering={ZoomIn.delay(200 + index * 60).springify()}
      style={[styles.highlightCard, { backgroundColor: colors.card }]}
    >
      <Text style={[styles.highlightValue, { color: item.color }]}>{item.value}</Text>
      <Text style={[styles.highlightLabel, { color: colors.textLight }]}>{item.label}</Text>
    </Animated.View>
  );
}

// ─── Pantalla principal ───────────────────────────────────────────────────────
export default function HomeScreen() {
  const { colors } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      {/* ── HERO ─────────────────────────────────────────────── */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + 20 }]}
      >
        {/* Badge estado */}
        <Animated.View entering={FadeInDown.delay(0).springify()} style={styles.heroBadge}>
          <PulsingDot color="#74C69D" />
          <Text style={styles.heroBadgeText}>Sistema activo · ESP32</Text>
        </Animated.View>

        {/* Título principal */}
        <Animated.Text
          entering={FadeInDown.delay(80).springify().damping(12)}
          style={styles.heroTitle}
        >
          Eco
          <Text style={[styles.heroTitleAccent]}>Ducha</Text>
        </Animated.Text>

        {/* Tagline */}
        <Animated.Text
          entering={FadeInDown.delay(160).springify().damping(14)}
          style={styles.heroTagline}
        >
          Ducha inteligente con control de temperatura, monitoreo de caudal y registro de consumo en tiempo real.
        </Animated.Text>

        {/* Ícono central decorativo */}
        <Animated.View
          entering={ZoomIn.delay(240).springify()}
          style={styles.heroIconWrap}
        >
          <Droplets size={48} color="rgba(255,255,255,0.9)" strokeWidth={1.5} />
        </Animated.View>

        {/* CTA */}
        <Animated.View entering={FadeInUp.delay(300).springify()}>
          <TouchableOpacity
            style={styles.heroCta}
            onPress={() => router.push('/acerca')}
            activeOpacity={0.85}
          >
            <Leaf size={16} color={colors.gradientStart} strokeWidth={2} />
            <Text style={[styles.heroCtaText, { color: colors.gradientStart }]}>
              Ver proyecto completo
            </Text>
            <ChevronRight size={16} color={colors.gradientStart} strokeWidth={2} />
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>

      {/* ── SECCIÓN: ¿Qué mide EcoDucha? ─────────────────────── */}
      <View style={styles.section}>
        <Animated.Text
          entering={FadeInDown.delay(100).springify()}
          style={[styles.sectionTitle, { color: colors.text }]}
        >
          ¿Qué mide EcoDucha?
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(150).springify()}
          style={[styles.sectionSub, { color: colors.textLight }]}
        >
          El sistema integra 3 sensores conectados al ESP32 que reportan datos en tiempo real a la pantalla Nextion y los almacena en LittleFS.
        </Animated.Text>

        <View style={styles.chipGrid}>
          {STATS.map((item, i) => (
            <StatChip key={item.value} item={item} index={i} />
          ))}
        </View>
      </View>

      {/* ── SECCIÓN: Datos técnicos ────────────────────────────── */}
      <Animated.View
        entering={FadeInDown.delay(200).springify()}
        style={[styles.section, { marginTop: 0 }]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Datos técnicos
        </Text>
        <View style={styles.highlightGrid}>
          {HIGHLIGHTS.map((item, i) => (
            <HighlightCard key={item.value} item={item} index={i} />
          ))}
        </View>
      </Animated.View>

      {/* ── SECCIÓN: Cómo funciona (resumen) ──────────────────── */}
      <Animated.View
        entering={FadeInDown.delay(260).springify()}
        style={[
          styles.howItWorksCard,
          { backgroundColor: colors.card, borderColor: colors.primary + '30' },
        ]}
      >
        <View style={styles.howHeader}>
          <Cpu size={20} color={colors.primary} strokeWidth={2} />
          <Text style={[styles.howTitle, { color: colors.text }]}>
            Flujo del sistema
          </Text>
        </View>
        {[
          { step: '01', text: 'Usuario fija temperatura objetivo en la pantalla Nextion táctil.' },
          { step: '02', text: 'ESP32 lee los 3 sensores: DS18B20 (temp), YF-S201 (caudal), ACS712 (corriente).' },
          { step: '03', text: 'TRIAC + MOC3021 regulan la potencia de la resistencia de la ducha.' },
          { step: '04', text: 'LittleFS guarda el historial de cada sesión en la memoria flash.' },
        ].map((item, i) => (
          <Animated.View
            key={item.step}
            entering={FadeInDown.delay(300 + i * 60).springify()}
            style={styles.howStep}
          >
            <View style={[styles.howStepNum, { backgroundColor: colors.primary + '18' }]}>
              <Text style={[styles.howStepNumText, { color: colors.primary }]}>
                {item.step}
              </Text>
            </View>
            <Text style={[styles.howStepText, { color: colors.textLight }]}>
              {item.text}
            </Text>
          </Animated.View>
        ))}
      </Animated.View>

      {/* ── Institución ───────────────────────────────────────── */}
      <Animated.Text
        entering={FadeInDown.delay(400).springify()}
        style={[styles.footer, { color: colors.textLight }]}
      >
        Unidad Educativa Técnico Salesiano · 2026
      </Animated.Text>
    </ScrollView>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1 },

  // Hero
  hero: {
    paddingHorizontal: 24,
    paddingBottom: 36,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  heroBadgeText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  heroTitle: {
    fontSize: 52,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1.5,
    lineHeight: 56,
  },
  heroTitleAccent: {
    color: 'rgba(255,255,255,0.65)',
  },
  heroTagline: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
    maxWidth: width * 0.8,
  },
  heroIconWrap: {
    marginTop: 28,
    marginBottom: 24,
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
  },
  heroCtaText: {
    fontSize: 14,
    fontWeight: '700',
  },

  // Secciones
  section: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  sectionSub: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },

  // Chips de sensores
  chipGrid: {
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  chipValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  chipLabel: {
    fontSize: 11,
    marginTop: 1,
  },

  // Highlight cards
  highlightGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  highlightCard: {
    width: (width - 50) / 2,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  highlightValue: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  highlightLabel: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 15,
  },

  // How it works
  howItWorksCard: {
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
  },
  howHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  howTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  howStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  howStepNum: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  howStepNumText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  howStepText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    paddingTop: 6,
  },

  // Footer
  footer: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: 28,
    opacity: 0.6,
    letterSpacing: 0.3,
  },
});