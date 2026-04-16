import { ThemeContext } from '@/contexts/ThemeContext';
import { Tabs } from 'expo-router';
import {
  BarChart3,
  Clock3,
  Home,
  Settings2,
} from 'lucide-react-native';
import { useContext } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface TabIconProps {
  Icon: typeof Home;
  label: string;
  focused: boolean;
  color: string;
}

function TabIcon({ Icon, label, focused, color }: TabIconProps) {
  const scale = useSharedValue(focused ? 1 : 0.9);

  const animatedStyle = useAnimatedStyle(() => {
    scale.value = withSpring(focused ? 1 : 0.9, {
      mass: 0.5,
      stiffness: 220,
      damping: 14,
    });
    return { transform: [{ scale: scale.value }] };
  });

  return (
    <Animated.View style={[styles.tabIconWrap, animatedStyle]}>
      {focused && <View style={[styles.tabPill, { backgroundColor: `${color}18` }]} />}
      <Icon
        size={22}
        color={color}
        strokeWidth={focused ? 2.4 : 1.8}
      />
      <Text
        style={[
          styles.tabLabel,
          { color, fontWeight: focused ? '800' : '500' },
        ]}
      >
        {label}
      </Text>
    </Animated.View>
  );
}

export default function TabsLayout() {
  const { colors } = useContext(ThemeContext);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor:   colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth:  1,
          borderTopColor:  colors.border,
          height:          Platform.OS === 'ios' ? 84 : 68,
          paddingBottom:   Platform.OS === 'ios' ? 24 : 8,
          paddingTop:      8,
          elevation:       12,
          shadowColor:     colors.shadow,
          shadowOpacity:   0.12,
          shadowRadius:    16,
          shadowOffset:    { width: 0, height: -4 },
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon Icon={Home} label="Inicio" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="historial"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon Icon={Clock3} label="Historial" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="estadisticas"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon Icon={BarChart3} label="Datos" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracion"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon Icon={Settings2} label="Ajustes" focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconWrap: {
    alignItems:     'center',
    justifyContent: 'center',
    gap:            4,
    minWidth:       56,
    minHeight:      44,
    position:       'relative',
  },
  tabPill: {
    position:     'absolute',
    top:          -4,
    width:        52,
    height:       36,
    borderRadius: 18,
  },
  tabLabel: {
    fontSize:   10,
    letterSpacing: 0.2,
  },
});