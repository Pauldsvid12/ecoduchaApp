import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Tabs } from 'expo-router';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Droplets,
  BarChart3,
  History,
  Info,
  LucideIcon,
} from 'lucide-react-native';

type TabButtonProps = BottomTabBarButtonProps & {
  label: string;
  Icon: LucideIcon;
};

function TabButton(props: TabButtonProps) {
  const { accessibilityState, onPress, onLongPress, label, Icon } = props;
  const focused = Boolean(accessibilityState?.selected);

  const scale = useSharedValue(focused ? 1 : 0.98);
  const lift = useSharedValue(focused ? -6 : 0);
  const labelOpacity = useSharedValue(focused ? 1 : 0.72);

  useEffect(() => {
    scale.value = withSpring(focused ? 1 : 0.98, {
      damping: 14,
      stiffness: 180,
    });
    lift.value = withSpring(focused ? -6 : 0, {
      damping: 14,
      stiffness: 180,
    });
    labelOpacity.value = withTiming(focused ? 1 : 0.72, {
      duration: 180,
    });
  }, [focused, labelOpacity, lift, scale]);

  const animatedButton = useAnimatedStyle(() => ({
    transform: [{ translateY: lift.value }, { scale: scale.value }],
  }));

  const animatedLabel = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
  }));

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.pressable}
    >
      <Animated.View style={[styles.tabItemWrap, animatedButton]}>
        {focused ? (
          <LinearGradient
            colors={['#06B6D4', '#3B82F6', '#8B5CF6']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.activePill}
          >
            <Icon size={18} color="#FFFFFF" strokeWidth={2.4} />
            <Animated.Text style={[styles.activeLabel, animatedLabel]}>
              {label}
            </Animated.Text>
          </LinearGradient>
        ) : (
          <View style={styles.inactivePill}>
            <Icon size={18} color="rgba(186,230,253,0.9)" strokeWidth={2.2} />
            <Animated.Text style={[styles.inactiveLabel, animatedLabel]}>
              {label}
            </Animated.Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        sceneStyle: { backgroundColor: 'transparent' },
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Inicio',
          tabBarButton: (props) => (
            <TabButton {...props} label="Inicio" Icon={Droplets} />
          ),
        }}
      />
      <Tabs.Screen
        name="historial"
        options={{
          title: 'Historial',
          tabBarButton: (props) => (
            <TabButton {...props} label="Historial" Icon={History} />
          ),
        }}
      />
      <Tabs.Screen
        name="estadisticas"
        options={{
          title: 'Stats',
          tabBarButton: (props) => (
            <TabButton {...props} label="Stats" Icon={BarChart3} />
          ),
        }}
      />
      <Tabs.Screen
        name="acerca"
        options={{
          title: 'Acerca',
          tabBarButton: (props) => (
            <TabButton {...props} label="Acerca" Icon={Info} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 14,
    height: 74,
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(2, 6, 23, 0.88)',
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: 'rgba(125, 211, 252, 0.16)',
    borderRadius: 26,
    shadowColor: '#38BDF8',
    shadowOpacity: 0.18,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 14,
  },
  tabBarItem: {
    height: 50,
  },
  pressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemWrap: {
    minWidth: 76,
    maxWidth: 110,
  },
  activePill: {
    minHeight: 46,
    borderRadius: 999,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#60A5FA',
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  inactivePill: {
    minHeight: 46,
    borderRadius: 999,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.46)',
  },
  activeLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  inactiveLabel: {
    color: '#CFFAFE',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.15,
  },
});