import React, { useContext } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';
import { ThemeContext } from '@/contexts/ThemeContext';

interface SwitchRowProps {
  titulo: string;
  descripcion?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  Icon?: LucideIcon;
}

export function SwitchRow({
  titulo,
  descripcion,
  value,
  onValueChange,
  Icon,
}: SwitchRowProps) {
  const { colors } = useContext(ThemeContext);

  return (
    <Animated.View
      entering={FadeInDown.springify()}
      style={[
        styles.row,
        {
          backgroundColor: colors.background,
          borderColor: `${colors.primary}16`,
        },
      ]}
    >
      <View style={styles.left}>
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
          <Text style={[styles.title, { color: colors.text }]}>{titulo}</Text>
          {descripcion ? (
            <Text style={[styles.description, { color: colors.textLight }]}>
              {descripcion}
            </Text>
          ) : null}
        </View>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? '#FFFFFF' : '#D4D4D8'}
        trackColor={{
          false: 'rgba(148,163,184,0.35)',
          true: colors.primary,
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 72,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
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
  title: {
    fontSize: 14,
    fontWeight: '800',
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },
});