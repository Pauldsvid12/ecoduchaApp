import { Tabs, usePathname } from 'expo-router';
import { useContext, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, History, BarChart2, Settings } from 'lucide-react-native';
import { ThemeContext } from '@/contexts/ThemeContext';
import * as Haptics from 'expo-haptics';

// ─── Configuración de tabs ────────────────────────────────────────────────────
const TABS = [
  { name: 'index',        label: 'Inicio',       Icon: Home      },
  { name: 'historial',    label: 'Historial',    Icon: History   },
  { name: 'estadisticas', label: 'Estadísticas', Icon: BarChart2 },
  { name: 'configuracion',label: 'Ajustes',      Icon: Settings  },
] as const;

// ─── Componente de cada tab ───────────────────────────────────────────────────
function TabButton({
  tab,
  isActive,
  onPress,
}: {
  tab: (typeof TABS)[number];
  isActive: boolean;
  onPress: () => void;
}) {
  const { colors } = useContext(ThemeContext);
  const scale = useSharedValue(1);
  const progress = useSharedValue(isActive ? 1 : 0);

  // Sincronizar progress cuando cambia isActive externamente
  if (progress.value !== (isActive ? 1 : 0)) {
    progress.value = withTiming(isActive ? 1 : 0, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
  }

  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSpring(0.88, { damping: 10, stiffness: 300 }, () => {
      scale.value = withSpring(1, { damping: 12, stiffness: 200 });
    });
    onPress();
  }, [onPress]);

  // Contenedor del ícono: píldora activa animada
  const pillStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      isActive ? colors.primary + '22' : 'transparent',
      { duration: 250 }
    ),
    transform: [{ scale: scale.value }],
  }));

  // Color del ícono y label
  const iconColor = isActive ? colors.primary : colors.textLight;
  const labelStyle = useAnimatedStyle(() => ({
    color: withTiming(isActive ? colors.primary : colors.textLight, {
      duration: 250,
    }),
    fontWeight: isActive ? '700' : '400',
  }));

  return (
    <Pressable
      onPress={handlePress}
      style={styles.tabButton}
      accessibilityRole="button"
      accessibilityLabel={tab.label}
      accessibilityState={{ selected: isActive }}
    >
      <Animated.View style={[styles.pill, pillStyle]}>
        <tab.Icon
          size={22}
          color={iconColor}
          strokeWidth={isActive ? 2.2 : 1.6}
        />
      </Animated.View>
      <Animated.Text style={[styles.label, labelStyle]} numberOfLines={1}>
        {tab.label}
      </Animated.Text>
    </Pressable>
  );
}

// ─── Custom Tab Bar ───────────────────────────────────────────────────────────
function CustomTabBar({ state, navigation }: { state: any; navigation: any }) {
  const { colors } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBarWrapper,
        {
          backgroundColor: colors.card,
          borderTopColor: colors.textLight + '33',
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}
    >
      {/* Línea decorativa superior */}
      <View
        style={[styles.topAccent, { backgroundColor: colors.primary + '40' }]}
      />

      <View style={styles.tabBarInner}>
        {TABS.map((tab, index) => {
          const isActive = state.index === index;
          return (
            <TabButton
              key={tab.name}
              tab={tab}
              isActive={isActive}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: state.routes[index].key,
                  canPreventDefault: true,
                });
                if (!isActive && !event.defaultPrevented) {
                  navigation.navigate(state.routes[index].name);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

// ─── Layout principal ─────────────────────────────────────────────────────────
export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen key={tab.name} name={tab.name} />
      ))}
    </Tabs>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  tabBarWrapper: {
    borderTopWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: { elevation: 12 },
    }),
  },
  topAccent: {
    height: 1,
    marginHorizontal: 24,
    borderRadius: 1,
  },
  tabBarInner: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    paddingVertical: 4,
    minHeight: 44, // touch target mínimo
  },
  pill: {
    width: 44,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.2,
  },
});