import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '@/contexts/ThemeContext';

interface SensorCardProps {
  titulo: string;
  valor: string | number;
  unidad: string;
  icono: keyof typeof Ionicons.glyphMap;
  color: string;
}

export function SensorCard({ titulo, valor, unidad, icono, color }: SensorCardProps) {
  const { colors: Colors, theme } = useContext(ThemeContext);

  const styles = useMemo(() => StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: Colors.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: Colors.textLight, // Corregido
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: theme === 'dark' ? 0.15 : 0.04,
      shadowRadius: 2,
      elevation: 2,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: Colors.text,
    },
    cardBody: {
      marginTop: 8,
    },
    valorUnidad: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    valor: {
      fontSize: 28,
      fontWeight: '800',
      color: Colors.text,
    },
    unidad: {
      fontSize: 14,
      fontWeight: '700',
      color: Colors.text,
      marginLeft: 4,
      marginBottom: 4, 
      opacity: 0.6,
    },
  }), [Colors, theme]);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{titulo}</Text>
        <Ionicons name={icono} size={20} color={color} />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.valorUnidad}>
          <Text style={styles.valor}>{valor}</Text>
          <Text style={styles.unidad}>{unidad}</Text>
        </View>
      </View>
    </View>
  );
}
