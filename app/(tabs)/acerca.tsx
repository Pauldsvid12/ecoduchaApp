import React from 'react';
import {
  Linking,
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
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  Code2,
  Cpu,
  Database,
  Droplets,
  Globe,
  GraduationCap,
  Layers3,
  LucideIcon,
  Monitor,
  Thermometer,
  Users,
  Waves,
  Zap,
} from 'lucide-react-native';
import AnimatedFrame from '@/components/organisms/AnimatedFrame';

const team = [
  { name: 'Paul Juela', role: 'Programación ESP32 e integración IoT', Icon: Code2 },
  { name: 'Matías Cabrera', role: 'Diseño de hardware y circuitos', Icon: Zap },
  { name: 'Alejandro Jiménez', role: 'Interfaz Nextion y sensores', Icon: Monitor },
];

const hardware = [
  { name: 'ESP32', desc: 'Microcontrolador principal con conectividad WiFi', Icon: Cpu },
  { name: 'YF-S201', desc: 'Sensor de caudal para medición del agua', Icon: Droplets },
  { name: 'DS18B20', desc: 'Sensor sumergible de temperatura', Icon: Thermometer },
  { name: 'ACS712', desc: 'Sensor de corriente basado en efecto Hall', Icon: Zap },
  { name: 'BTA41 TRIAC', desc: 'Etapa de control de potencia', Icon: Layers3 },
  { name: 'Nextion 3.5"', desc: 'Pantalla táctil para interacción local', Icon: Monitor },
  { name: 'LittleFS', desc: 'Sistema de archivos local en la flash del ESP32', Icon: Database },
];

function InfoRow({
  Icon,
  title,
  subtitle,
  delay,
}: {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  delay: number;
}) {
  return (
    <Animated.View entering={FadeInDown.delay(delay).springify()} style={styles.infoRow}>
      <View style={styles.infoIconWrap}>
        <Icon size={18} color="#7DD3FC" strokeWidth={2.2} />
      </View>
      <View style={styles.infoTextWrap}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoSubtitle}>{subtitle}</Text>
      </View>
    </Animated.View>
  );
}

function TeamCard({
  name,
  role,
  Icon,
  delay,
}: {
  name: string;
  role: string;
  Icon: LucideIcon;
  delay: number;
}) {
  return (
    <Animated.View entering={FadeInUp.delay(delay).springify()} style={styles.teamCard}>
      <View style={styles.teamIconWrap}>
        <Icon size={20} color="#7DD3FC" strokeWidth={2.2} />
      </View>
      <Text style={styles.teamName}>{name}</Text>
      <Text style={styles.teamRole}>{role}</Text>
    </Animated.View>
  );
}

function LinkButton() {
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
      onPress={() => Linking.openURL('https://pauldsvid12.github.io/ecoducha/')}
    >
      <Animated.View style={animatedStyle}>
        <LinearGradient
          colors={['#06B6D4', '#3B82F6', '#8B5CF6']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.linkButton}
        >
          <Globe size={18} color="#FFFFFF" strokeWidth={2.4} />
          <Text style={styles.linkButtonText}>Ver web del proyecto</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

export default function AcercaScreen() {
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
              <View style={styles.logoOrb}>
                <LinearGradient
                  colors={[
                    'rgba(6,182,212,0.24)',
                    'rgba(59,130,246,0.18)',
                    'rgba(168,85,247,0.18)',
                  ]}
                  style={styles.logoGlow}
                />
                <Waves size={46} color="#E0F2FE" strokeWidth={1.8} />
              </View>

              <Text style={styles.title}>EcoDucha</Text>
              <Text style={styles.subtitle}>
                Proyecto informativo sobre control térmico, medición y experiencia IoT.
              </Text>
              <Text style={styles.description}>
                Esta app muestra el sistema como narrativa visual: hardware, lógica
                general, almacenamiento local y propósito educativo del prototipo.
              </Text>
            </AnimatedFrame>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(120).springify()} style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Identidad del proyecto</Text>
            <Text style={styles.sectionCaption}>
              Lo esencial de EcoDucha resumido en una sola vista
            </Text>
          </Animated.View>

          <AnimatedFrame
            radius={24}
            inset={9}
            backgroundColor="rgba(15,23,42,0.72)"
            style={styles.infoFrame}
            contentContainerStyle={styles.infoContent}
          >
            <InfoRow
              Icon={Cpu}
              title="Base tecnológica"
              subtitle="ESP32, sensores, TRIAC y pantalla de interacción local."
              delay={180}
            />
            <InfoRow
              Icon={Database}
              title="Persistencia"
              subtitle="LittleFS como memoria de sesiones y registros internos."
              delay={240}
            />
            <InfoRow
              Icon={Users}
              title="Enfoque"
              subtitle="Presentación informativa del sistema y su arquitectura."
              delay={300}
            />
          </AnimatedFrame>

          <Animated.View entering={FadeInDown.delay(340).springify()} style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Equipo</Text>
            <Text style={styles.sectionCaption}>
              Desarrollo técnico y construcción del prototipo
            </Text>
          </Animated.View>

          <View style={styles.teamGrid}>
            {team.map((member, index) => (
              <TeamCard
                key={member.name}
                name={member.name}
                role={member.role}
                Icon={member.Icon}
                delay={380 + index * 70}
              />
            ))}
          </View>

          <Animated.View entering={FadeInDown.delay(560).springify()} style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hardware</Text>
            <Text style={styles.sectionCaption}>
              Componentes que hacen posible el sistema
            </Text>
          </Animated.View>

          <AnimatedFrame
            radius={24}
            inset={9}
            backgroundColor="rgba(8,47,73,0.26)"
            style={styles.hardwareFrame}
            contentContainerStyle={styles.hardwareContent}
          >
            {hardware.map((item, index) => (
              <Animated.View
                key={item.name}
                entering={FadeInDown.delay(600 + index * 45).springify()}
                style={[
                  styles.hardwareRow,
                  index !== hardware.length - 1 && styles.hardwareRowBorder,
                ]}
              >
                <View style={styles.hardwareIconWrap}>
                  <item.Icon size={18} color="#7DD3FC" strokeWidth={2.2} />
                </View>
                <View style={styles.hardwareText}>
                  <Text style={styles.hardwareName}>{item.name}</Text>
                  <Text style={styles.hardwareDesc}>{item.desc}</Text>
                </View>
              </Animated.View>
            ))}
          </AnimatedFrame>

          <Animated.View entering={FadeInDown.delay(920).springify()} style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Origen académico</Text>
          </Animated.View>

          <AnimatedFrame
            radius={24}
            inset={9}
            backgroundColor="rgba(15,23,42,0.7)"
            style={styles.schoolFrame}
            contentContainerStyle={styles.schoolContent}
          >
            <View style={styles.schoolRow}>
              <GraduationCap size={18} color="#86EFAC" strokeWidth={2.2} />
              <Text style={styles.schoolText}>UETS Cuenca — 3.° BGU Informática</Text>
            </View>
          </AnimatedFrame>

          <Animated.View entering={FadeInDown.delay(980).springify()} style={styles.linkWrap}>
            <LinkButton />
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
    minHeight: 280,
  },
  heroContent: {
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoOrb: {
    width: 110,
    height: 110,
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
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.9,
    textAlign: 'center',
  },
  subtitle: {
    color: '#BAE6FD',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  description: {
    color: 'rgba(226,232,240,0.8)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
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
  infoFrame: {},
  infoContent: {
    padding: 18,
    gap: 12,
  },
  infoRow: {
    borderRadius: 18,
    padding: 14,
    backgroundColor: 'rgba(2,6,23,0.42)',
    borderWidth: 1,
    borderColor: 'rgba(125,211,252,0.08)',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  infoIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(12,74,110,0.24)',
  },
  infoTextWrap: {
    flex: 1,
  },
  infoTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
  },
  infoSubtitle: {
    color: 'rgba(226,232,240,0.72)',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },
  teamGrid: {
    gap: 12,
  },
  teamCard: {
    backgroundColor: 'rgba(15,23,42,0.72)',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.12)',
    minHeight: 112,
  },
  teamIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(12,74,110,0.26)',
    marginBottom: 12,
  },
  teamName: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  teamRole: {
    color: 'rgba(226,232,240,0.72)',
    fontSize: 12,
    lineHeight: 18,
  },
  hardwareFrame: {},
  hardwareContent: {
    padding: 16,
  },
  hardwareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  hardwareRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(125,211,252,0.08)',
  },
  hardwareIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(2,6,23,0.42)',
  },
  hardwareText: {
    flex: 1,
  },
  hardwareName: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
  },
  hardwareDesc: {
    color: 'rgba(226,232,240,0.72)',
    fontSize: 12,
    marginTop: 3,
    lineHeight: 18,
  },
  schoolFrame: {},
  schoolContent: {
    padding: 18,
  },
  schoolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  schoolText: {
    color: '#E0F2FE',
    fontSize: 14,
    fontWeight: '800',
  },
  linkWrap: {
    marginTop: 18,
  },
  linkButton: {
    minHeight: 56,
    borderRadius: 18,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  linkButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});