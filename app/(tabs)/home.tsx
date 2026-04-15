import React from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeInDown,
  FadeInUp,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  ArrowRight,
  ChevronRight,
  Cpu,
  Database,
  Droplets,
  LucideIcon,
  ShieldCheck,
  Thermometer,
  Waves,
  Zap,
} from 'lucide-react-native';
import AnimatedFrame from '@/components/organisms/AnimatedFrame';

const { width } = Dimensions.get('window');

function HeroButton({
  title,
  subtitle,
  onPress,
}: {
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withSpring(0.985);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      onPress={onPress}
    >
      <Animated.View style={animatedStyle}>
        <LinearGradient
          colors={['#06B6D4', '#3B82F6', '#8B5CF6']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.heroButton}
        >
          <View style={styles.heroButtonTextWrap}>
            <Text style={styles.heroButtonTitle}>{title}</Text>
            <Text style={styles.heroButtonSubtitle}>{subtitle}</Text>
          </View>
          <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

function FeatureCard({
  Icon,
  title,
  description,
  delay,
}: {
  Icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <Animated.View entering={FadeInUp.delay(delay).springify()} style={styles.featureCard}>
      <View style={styles.featureIconWrap}>
        <Icon size={20} color="#7DD3FC" strokeWidth={2.2} />
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </Animated.View>
  );
}

function MiniRouteCard({
  title,
  description,
  onPress,
  delay,
}: {
  title: string;
  description: string;
  onPress: () => void;
  delay: number;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeInDown.delay(delay).springify()}>
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.985);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        onPress={onPress}
      >
        <Animated.View style={[styles.routeCard, animatedStyle]}>
          <View style={styles.routeCardText}>
            <Text style={styles.routeCardTitle}>{title}</Text>
            <Text style={styles.routeCardDescription}>{description}</Text>
          </View>
          <ChevronRight size={18} color="#BAE6FD" strokeWidth={2.2} />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const router = useRouter();

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
          <Animated.View entering={ZoomIn.springify()} style={styles.badge}>
            <Waves size={16} color="#67E8F9" strokeWidth={2.2} />
            <Text style={styles.badgeText}>EcoDucha · experiencia informativa</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(100).springify()}>
            <AnimatedFrame
              radius={30}
              inset={8}
              backgroundColor="rgba(15,23,42,0.64)"
              style={styles.heroFrame}
              contentContainerStyle={styles.heroFrameContent}
            >
              <View style={styles.heroTop}>
                <View style={styles.logoOrb}>
                  <LinearGradient
                    colors={[
                      'rgba(6,182,212,0.24)',
                      'rgba(59,130,246,0.18)',
                      'rgba(168,85,247,0.18)',
                    ]}
                    style={styles.logoGlow}
                  />
                  <Droplets size={54} color="#E0F2FE" strokeWidth={1.8} />
                </View>

                <Text style={styles.title}>EcoDucha</Text>
                <Text style={styles.subtitle}>
                  Hardware, control térmico y visualización en una app con identidad propia.
                </Text>
                <Text style={styles.description}>
                  Explora cómo interactúan el ESP32, los sensores, el TRIAC y LittleFS en una experiencia visual más clara, premium y enfocada en explicar el proyecto.
                </Text>
              </View>

              <View style={styles.heroInfoRow}>
                <View style={styles.infoPill}>
                  <ShieldCheck size={15} color="#86EFAC" strokeWidth={2.2} />
                  <Text style={styles.infoPillText}>Modo informativo</Text>
                </View>
                <View style={styles.infoPill}>
                  <Database size={15} color="#7DD3FC" strokeWidth={2.2} />
                  <Text style={styles.infoPillText}>LittleFS</Text>
                </View>
              </View>

              <HeroButton
                title="Recorrer la app"
                subtitle="Entrar al contenido principal"
                onPress={() => router.push('/(tabs)/historial')}
              />
            </AnimatedFrame>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(180).springify()} style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pilares del sistema</Text>
            <Text style={styles.sectionCaption}>
              Cuatro bloques para entender el proyecto de un vistazo
            </Text>
          </Animated.View>

          <View style={styles.featureGrid}>
            <FeatureCard
              Icon={Cpu}
              title="ESP32"
              description="Coordina sensores, lógica del sistema y publicación local de datos."
              delay={220}
            />
            <FeatureCard
              Icon={Droplets}
              title="Caudal"
              description="El sensor de flujo permite interpretar el consumo de agua por sesión."
              delay={280}
            />
            <FeatureCard
              Icon={Thermometer}
              title="Temperatura"
              description="La lectura térmica ayuda a explicar la regulación y la seguridad del sistema."
              delay={340}
            />
            <FeatureCard
              Icon={Zap}
              title="Potencia"
              description="El control con TRIAC muestra cómo se gestiona la energía en la ducha."
              delay={400}
            />
          </View>

          <Animated.View entering={FadeInUp.delay(460).springify()}>
            <AnimatedFrame
              radius={24}
              inset={9}
              backgroundColor="rgba(8,47,73,0.26)"
              style={styles.flowFrame}
              contentContainerStyle={styles.flowContent}
            >
              <Text style={styles.flowTitle}>Flujo del sistema</Text>
              <Text style={styles.flowText}>
                Usuario → Interfaz → ESP32 → Sensores → Control térmico → Registro en LittleFS
              </Text>
            </AnimatedFrame>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(520).springify()} style={styles.sectionHeaderAlt}>
            <Text style={styles.sectionTitle}>Explorar secciones</Text>
            <Text style={styles.sectionCaption}>
              Cada vista cuenta una parte distinta del prototipo
            </Text>
          </Animated.View>

          <View style={styles.routesWrap}>
            <MiniRouteCard
              title="Historial"
              description="Sesiones de prueba y narrativa del almacenamiento local."
              onPress={() => router.push('/(tabs)/historial')}
              delay={560}
            />
            <MiniRouteCard
              title="Estadísticas"
              description="Indicadores, consumos y lectura visual del rendimiento."
              onPress={() => router.push('/(tabs)/estadisticas')}
              delay={620}
            />
            <MiniRouteCard
              title="Acerca"
              description="Equipo, arquitectura general y propósito del proyecto."
              onPress={() => router.push('/(tabs)/acerca')}
              delay={680}
            />
          </View>
        </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 118,
  },
  badge: {
    alignSelf: 'center',
    marginTop: 2,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(15,23,42,0.62)',
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
  heroFrame: {
    minHeight: 420,
  },
  heroFrameContent: {
    padding: 22,
    justifyContent: 'space-between',
  },
  heroTop: {
    alignItems: 'center',
  },
  logoOrb: {
    width: 122,
    height: 122,
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
    fontSize: width < 380 ? 36 : 42,
    fontWeight: '900',
    letterSpacing: -1.1,
    textAlign: 'center',
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
    color: 'rgba(226,232,240,0.8)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    maxWidth: 340,
  },
  heroInfoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 18,
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  infoPill: {
    minHeight: 36,
    borderRadius: 999,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(2,6,23,0.46)',
    borderWidth: 1,
    borderColor: 'rgba(125,211,252,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoPillText: {
    color: '#E0F2FE',
    fontSize: 12,
    fontWeight: '700',
  },
  heroButton: {
    minHeight: 58,
    borderRadius: 18,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 4,
  },
  heroButtonTextWrap: {
    flex: 1,
  },
  heroButtonTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  heroButtonSubtitle: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 12,
    marginTop: 2,
  },
  sectionHeader: {
    marginTop: 22,
    marginBottom: 14,
  },
  sectionHeaderAlt: {
    marginTop: 22,
    marginBottom: 12,
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
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  featureCard: {
    width: '48.3%',
    backgroundColor: 'rgba(15,23,42,0.72)',
    borderRadius: 22,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.12)',
    minHeight: 128,
    shadowColor: '#38BDF8',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  featureIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(12,74,110,0.26)',
    marginBottom: 12,
  },
  featureTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 5,
  },
  featureDescription: {
    color: 'rgba(226,232,240,0.74)',
    fontSize: 12,
    lineHeight: 18,
  },
  flowFrame: {
    marginTop: 18,
  },
  flowContent: {
    padding: 18,
  },
  flowTitle: {
    color: '#E0F2FE',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },
  flowText: {
    color: 'rgba(226,232,240,0.82)',
    fontSize: 13,
    lineHeight: 20,
  },
  routesWrap: {
    gap: 12,
  },
  routeCard: {
    minHeight: 72,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(15,23,42,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(125,211,252,0.14)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  routeCardText: {
    flex: 1,
    paddingRight: 12,
  },
  routeCardTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  routeCardDescription: {
    color: 'rgba(226,232,240,0.72)',
    fontSize: 12,
    lineHeight: 18,
  },
});