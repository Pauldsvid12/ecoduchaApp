import React, { useContext } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';
import { ThemeContext } from '@/contexts/ThemeContext';

interface SectionCardProps {
  titulo: string;
  subtitulo?: string;
  Icon?: LucideIcon;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function SectionCard({
  titulo,
  subtitulo,
  Icon,
  children,
  style,
}: SectionCardProps) {
  const { colors } = useContext(ThemeContext);

  return (
    <Animated.View
      entering={FadeInDown.springify()}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: `${colors.primary}22`,
          shadowColor: colors.primary,
        },
        style,
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          {Icon ? (
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: `${colors.primary}18` },
              ]}
            >
              <Icon size={18} color={colors.primary} strokeWidth={2.2} />
            </View>
          ) : null}

          <View style={styles.textWrap}>
            <Text style={[styles.titulo, { color: colors.text }]}>{titulo}</Text>
            {subtitulo ? (
              <Text style={[styles.subtitulo, { color: colors.textLight }]}>
                {subtitulo}
              </Text>
            ) : null}
          </View>
        </View>
      </View>

      <View>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  header: {
    marginBottom: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  subtitulo: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },
});