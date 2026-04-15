import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';
import { ThemeContext } from '@/contexts/ThemeContext';

interface PrimaryButtonProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  Icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

export function PrimaryButton({
  title,
  subtitle,
  onPress,
  Icon,
  variant = 'primary',
  disabled = false,
}: PrimaryButtonProps) {
  const { colors } = useContext(ThemeContext);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.55 : 1,
  }));

  const content = (
    <View style={styles.inner}>
      <View style={styles.textWrap}>
        <Text
          style={[
            styles.title,
            variant === 'ghost' && { color: colors.text },
          ]}
        >
          {title}
        </Text>

        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              variant === 'ghost' && { color: colors.textLight },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {Icon ? (
        <View style={styles.iconSlot}>
          <Icon
            size={18}
            color={variant === 'ghost' ? colors.primary : '#FFFFFF'}
            strokeWidth={2.4}
          />
        </View>
      ) : null}
    </View>
  );

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.985);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
    >
      <Animated.View style={animatedStyle}>
        {variant === 'primary' ? (
          <LinearGradient
            colors={['#06B6D4', '#3B82F6', '#8B5CF6']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.primary}
          >
            {content}
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.secondary,
              variant === 'ghost'
                ? {
                    backgroundColor: 'transparent',
                    borderColor: `${colors.primary}22`,
                  }
                : {
                    backgroundColor: colors.card,
                    borderColor: `${colors.primary}18`,
                  },
            ]}
          >
            {content}
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    minHeight: 56,
    borderRadius: 18,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  secondary: {
    minHeight: 56,
    borderRadius: 18,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderWidth: 1,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 12,
    marginTop: 2,
  },
  iconSlot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});