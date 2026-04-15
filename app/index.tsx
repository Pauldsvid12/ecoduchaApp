import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp, ZoomIn, useAnimatedStyle, useSharedValue, withSpring, } from 'react-native-reanimated';
import {
  Droplets,
  Cpu,
  Database,
  Zap,
  Waves,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

function MetricCard({
  Icon,
  title,
  description,
  delay,
}: {
  Icon: any;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <Animated.View entering={FadeInUp.delay(delay).springify()} style={styles.metricCard}>
      <View style={styles.metricIconWrap}>
        <Icon size={20} color="#7DD3FC" strokeWidth={2} />
      </View>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricDesc}>{description}</Text>
    </Animated.View>
  );
}

function EnterButton({ onPress }: { onPress: () => void }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withSpring(0.97);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      onPress={onPress}
    >
      <Animated.View style={[styles.ctaButton, animatedStyle]}>
        <LinearGradient
          colors={['#06B6D4', '#3B82F6', '#8B5CF6']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.ctaGradient}
        >
          <Text style={styles.ctaText}>Entrar a la experiencia</Text>
          <ArrowRight size={18} color="#fff" strokeWidth={2.4} />
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

export default function IndexScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#020617', '#07182C', '#0C2842', '#08121F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'bottom', 'left']}>
        <View style={styles.inner}>
          <Animated.View entering={ZoomIn.springify()} style={styles.badge}>
            <Waves size={16} color="#67E8F9" strokeWidth={2.2} />
            <Text style={styles.badgeText}>EcoDucha · App informativa</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(120).springify()} style={styles.hero}>
            <View style={styles.logoOrb}>
              <LinearGradient
                colors={['rgba(6,182,212,0.25)', 'rgba(59,130,246,0.18)', 'rgba(168,85,247,0.18)']}
                style={styles.logoGlow}
              />
              <Droplets size={52} color="#E0F2FE" strokeWidth={1.8} />
            </View>

            <Text style={styles.title}>EcoDucha</Text>
            <Text style={styles.subtitle}>
              Tecnología, ahorro y diseño en una experiencia visual potente.
            </Text>
            <Text style={styles.description}>
              Conoce el sistema, el hardware, el flujo de datos y cómo el ESP32, los sensores y LittleFS hacen posible el proyecto.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(220).springify()} style={styles.panel}>
            <View style={styles.panelHeader}>
              <ShieldCheck size={18} color="#86EFAC" strokeWidth={2} />
              <Text style={styles.panelHeaderText}>Sistema presentado de forma clara y premium</Text>
            </View>

            <View style={styles.metricsGrid}>
              <MetricCard
                Icon={Cpu}
                title="ESP32"
                description="Control central con conectividad y lógica del prototipo"
                delay={280}
              />
              <MetricCard
                Icon={Droplets}
                title="Sensores"
                description="Caudal, temperatura y corriente explicados visualmente"
                delay={340}
              />
              <MetricCard
                Icon={Database}
                title="LittleFS"
                description="Historial y almacenamiento local dentro del microcontrolador"
                delay={400}
              />
              <MetricCard
                Icon={Zap}
                title="Potencia"
                description="TRIAC y gestión térmica mostrados de forma intuitiva"
                delay={460}
              />
            </View>

            <Animated.View entering={FadeInUp.delay(520).springify()} style={styles.flowBox}>
              <Text style={styles.flowTitle}>Flujo del sistema</Text>
              <Text style={styles.flowText}>
                Usuario → Interfaz → ESP32 → Sensores → Control térmico → Registro en LittleFS
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(620).springify()}>
              <EnterButton onPress={() => router.replace('/(tabs)')} />
            </Animated.View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 24,
  },
  badge: {
    alignSelf: 'center',
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(15,23,42,0.6)',
    borderColor: 'rgba(125,211,252,0.18)',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  badgeText: {
    color: '#CFFAFE',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  hero: {
    alignItems: 'center',
    marginTop: 10,
  },
  logoOrb: {
    width: 124,
    height: 124,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(125,211,252,0.16)',
    marginBottom: 18,
    overflow: 'hidden',
  },
  logoGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  title: {
    color: '#F8FAFC',
    fontSize: width < 380 ? 38 : 44,
    fontWeight: '900',
    letterSpacing: -1.2,
  },
  subtitle: {
    color: '#BAE6FD',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
    maxWidth: 330,
  },
  description: {
    color: 'rgba(226,232,240,0.78)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    maxWidth: 340,
  },
  panel: {
    backgroundColor: 'rgba(15,23,42,0.72)',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(125,211,252,0.12)',
    padding: 18,
    marginTop: 18,
    shadowColor: '#38BDF8',
    shadowOpacity: 0.16,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  panelHeaderText: {
    color: '#DCFCE7',
    fontSize: 13,
    fontWeight: '700',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  metricCard: {
    width: '48.3%',
    backgroundColor: 'rgba(2,6,23,0.52)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.12)',
    minHeight: 118,
  },
  metricIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(12,74,110,0.28)',
    marginBottom: 12,
  },
  metricTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  metricDesc: {
    color: 'rgba(226,232,240,0.72)',
    fontSize: 12,
    lineHeight: 18,
  },
  flowBox: {
    marginTop: 14,
    borderRadius: 18,
    padding: 14,
    backgroundColor: 'rgba(8,47,73,0.32)',
    borderWidth: 1,
    borderColor: 'rgba(34,211,238,0.14)',
  },
  flowTitle: {
    color: '#E0F2FE',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },
  flowText: {
    color: 'rgba(226,232,240,0.82)',
    fontSize: 13,
    lineHeight: 20,
  },
  ctaButton: {
    marginTop: 16,
    borderRadius: 18,
    overflow: 'hidden',
  },
  ctaGradient: {
    minHeight: 56,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 18,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});