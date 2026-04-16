import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  Clock3,
  Database,
  Droplets,
  Flame,
  LucideIcon,
  ShieldCheck,
  Thermometer,
  Zap,
} from 'lucide-react-native';
import AnimatedFrame from '@/components/organisms/AnimatedFrame';

const sessions = [
  {
    id: '1',
    date: 'Lun 14 Abr',
    time: '07:12',
    duration: '5 min 30 s',
    liters: 22.4,
    temp: 38.2,
    energy: 0.31,
    efficient: true,
  },
  {
    id: '2',
    date: 'Dom 13 Abr',
    time: '19:45',
    duration: '7 min 10 s',
    liters: 34.8,
    temp: 40.1,
    energy: 0.48,
    efficient: false,
  },
  {
    id: '3',
    date: 'Sáb 12 Abr',
    time: '08:03',
    duration: '4 min 55 s',
    liters: 19.7,
    temp: 36.5,
    energy: 0.27,
    efficient: true,
  },
  {
    id: '4',
    date: 'Vie 11 Abr',
    time: '07:58',
    duration: '6 min 20 s',
    liters: 28.1,
    temp: 39.0,
    energy: 0.39,
    efficient: true,
  },
  {
    id: '5',
    date: 'Jue 10 Abr',
    time: '20:15',
    duration: '8 min 05 s',
    liters: 41.3,
    temp: 42.0,
    energy: 0.57,
    efficient: false,
  },
];

function MetaPill({
  Icon,
  text,
  tone = 'default',
}: {
  Icon: LucideIcon;
  text: string;
  tone?: 'default' | 'good' | 'warn';
}) {
  const bg =
    tone === 'good'
      ? 'rgba(34,197,94,0.16)'
      : tone === 'warn'
      ? 'rgba(251,146,60,0.16)'
      : 'rgba(2,6,23,0.42)';

  const border =
    tone === 'good'
      ? 'rgba(134,239,172,0.18)'
      : tone === 'warn'
      ? 'rgba(251,191,36,0.18)'
      : 'rgba(125,211,252,0.12)';

  const iconColor =
    tone === 'good'
      ? '#86EFAC'
      : tone === 'warn'
      ? '#FBBF24'
      : '#7DD3FC';

  return (
    <View style={[styles.metaPill, { backgroundColor: bg, borderColor: border }]}>
      <Icon size={14} color={iconColor} strokeWidth={2.2} />
      <Text style={styles.metaPillText}>{text}</Text>
    </View>
  );
}

function SessionMetric({
  Icon,
  label,
  value,
  color,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View style={styles.sessionMetric}>
      <View style={[styles.sessionMetricIcon, { backgroundColor: `${color}20` }]}>
        <Icon size={15} color={color} strokeWidth={2.2} />
      </View>
      <View>
        <Text style={styles.sessionMetricValue}>{value}</Text>
        <Text style={styles.sessionMetricLabel}>{label}</Text>
      </View>
    </View>
  );
}

function SessionCard({
  item,
  delay,
}: {
  item: (typeof sessions)[number];
  delay: number;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeInRight.delay(delay).springify()}>
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.988);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
      >
        <Animated.View style={animatedStyle}>
          <AnimatedFrame
            radius={22}
            inset={10}
            backgroundColor="rgba(15,23,42,0.72)"
            style={styles.sessionFrame}
            contentContainerStyle={styles.sessionFrameContent}
          >
            <View style={styles.sessionTop}>
              <View>
                <Text style={styles.sessionDate}>{item.date}</Text>
                <Text style={styles.sessionTime}>{item.time}</Text>
              </View>
              <MetaPill
                Icon={item.efficient ? ShieldCheck : Flame}
                text={item.efficient ? 'Eficiente' : 'Consumo alto'}
                tone={item.efficient ? 'good' : 'warn'}
              />
            </View>

            <View style={styles.sessionMiddle}>
              <MetaPill Icon={Clock3} text={item.duration} />
              <MetaPill Icon={Database} text="Guardado en LittleFS" />
            </View>

            <View style={styles.sessionMetricsGrid}>
              <SessionMetric
                Icon={Droplets}
                label="Agua"
                value={`${item.liters} L`}
                color="#22D3EE"
              />
              <SessionMetric
                Icon={Thermometer}
                label="Temp. máx"
                value={`${item.temp} °C`}
                color="#FB923C"
              />
              <SessionMetric
                Icon={Zap}
                label="Energía"
                value={`${item.energy} kWh`}
                color="#A78BFA"
              />
            </View>
          </AnimatedFrame>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

export default function HistorialScreen() {
  return (
    <LinearGradient
      colors={['#020617', '#07182C', '#0C2842', '#08121F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View entering={FadeInDown.springify()}>
            <AnimatedFrame
              radius={30}
              inset={8}
              backgroundColor="rgba(15,23,42,0.64)"
              style={styles.heroFrame}
              contentContainerStyle={styles.heroContent}
            >
              <Text style={styles.eyebrow}>Historial del sistema</Text>
              <Text style={styles.title}>Sesiones registradas</Text>
              <Text style={styles.description}>
                Esta vista explica cómo EcoDucha conserva eventos de prueba,
                duración, consumo y comportamiento térmico usando almacenamiento local.
              </Text>

              <View style={styles.heroPills}>
                <MetaPill Icon={Database} text="LittleFS local" />
                <MetaPill Icon={Clock3} text="Registro por sesión" />
              </View>
            </AnimatedFrame>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(120).springify()} style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Últimas sesiones</Text>
            <Text style={styles.sectionCaption}>
              Ejemplos reales del comportamiento que la app presenta de forma visual
            </Text>
          </Animated.View>

          <View style={styles.listWrap}>
            {sessions.map((item, index) => (
              <SessionCard
                key={item.id}
                item={item}
                delay={180 + index * 70}
              />
            ))}
          </View>

          <Animated.View entering={FadeInDown.delay(620).springify()}>
            <AnimatedFrame
              radius={24}
              inset={9}
              backgroundColor="rgba(8,47,73,0.26)"
              style={styles.noteFrame}
              contentContainerStyle={styles.noteContent}
            >
              <View style={styles.noteRow}>
                <Database size={18} color="#7DD3FC" strokeWidth={2.2} />
                <Text style={styles.noteTitle}>¿Qué representa esta vista?</Text>
              </View>
              <Text style={styles.noteText}>
                En la versión informativa, el historial ya no controla la ducha:
                ahora comunica cómo se guardan sesiones, cómo se interpretan métricas
                y cómo LittleFS sirve como memoria local del prototipo.
              </Text>
            </AnimatedFrame>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 118,
  },
  heroFrame: {
    minHeight: 220,
  },
  heroContent: {
    padding: 22,
    justifyContent: 'center',
  },
  eyebrow: {
    color: '#67E8F9',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.45,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  description: {
    color: 'rgba(226,232,240,0.8)',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  heroPills: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 18,
  },
  sectionHeader: {
    marginTop: 22,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sectionCaption: {
    color: 'rgba(186,230,253,0.72)',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  listWrap: {
    gap: 14,
  },
  sessionFrame: {
    minHeight: 176,
  },
  sessionFrameContent: {
    padding: 18,
  },
  sessionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  sessionDate: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
  },
  sessionTime: {
    color: 'rgba(226,232,240,0.7)',
    fontSize: 12,
    marginTop: 4,
  },
  sessionMiddle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },
  metaPill: {
    minHeight: 34,
    borderRadius: 999,
    paddingHorizontal: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaPillText: {
    color: '#E0F2FE',
    fontSize: 12,
    fontWeight: '700',
  },
  sessionMetricsGrid: {
    marginTop: 16,
    gap: 10,
  },
  sessionMetric: {
    borderRadius: 16,
    padding: 12,
    backgroundColor: 'rgba(2,6,23,0.42)',
    borderWidth: 1,
    borderColor: 'rgba(125,211,252,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sessionMetricIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionMetricValue: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
  },
  sessionMetricLabel: {
    color: 'rgba(186,230,253,0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  noteFrame: {
    marginTop: 18,
  },
  noteContent: {
    padding: 18,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  noteTitle: {
    color: '#E0F2FE',
    fontSize: 14,
    fontWeight: '800',
  },
  noteText: {
    color: 'rgba(226,232,240,0.82)',
    fontSize: 13,
    lineHeight: 20,
  },
});