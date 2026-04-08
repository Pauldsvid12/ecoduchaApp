import React, { useContext, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '@/contexts/ThemeContext';
import { Stack } from 'expo-router';

const membres = [
  { nom: 'Paul Pinos', rol: 'Líder del Proyecto y Programador Principal' },
  { nom: 'Mateo Pinos', rol: 'Diseñador de Hardware y Firmware ESP32' },
];

const techs = [
  { nom: 'React Native', desc: 'Framework para el desarrollo de la app móvil.', icon: 'logo-react' },
  { nom: 'Expo', desc: 'Plataforma para facilitar el desarrollo y despliegue.', icon: 'cube-outline' },
  { nom: 'TypeScript', desc: 'Superset de JavaScript para un código más robusto.', icon: 'code-slash-outline' },
  { nom: 'ESP-IDF', desc: 'Framework oficial de Espressif para el ESP32.', icon: 'hardware-chip-outline' },
  { nom: 'MQTT', desc: 'Protocolo de mensajería para la comunicación IoT.', icon: 'sync-outline' },
  { nom: 'Supabase', desc: 'Backend como servicio para la base de datos y auth.', icon: 'server-outline' },
];

export default function AcercaScreen() {
  const { colors: Colors, theme } = useContext(ThemeContext);

  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background, paddingTop: 24 }, // Añadido paddingTop
    seccion: { marginTop: 0, marginBottom: 24 }, // Ajustado margen
    seccionTitulo: { fontSize: 18, fontWeight: '700', color: Colors.text, marginHorizontal: 16, marginBottom: 8 },
    card: {
      backgroundColor: Colors.card,
      marginHorizontal: 16,
      borderRadius: 12,
      padding: 16,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: Colors.textLight,
    },
    membreNom: { fontSize: 16, fontWeight: '700', color: Colors.text },
    membreRol: { fontSize: 14, color: Colors.text, opacity: 0.8 },
    techCard: {
      backgroundColor: Colors.card,
      marginHorizontal: 16,
      borderRadius: 12,
      padding: 16,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: Colors.textLight,
    },
    techIcon: { marginRight: 16 },
    techInfo: { flex: 1 },
    techNom: { fontSize: 16, fontWeight: '700', color: Colors.text },
    techDesc: { fontSize: 14, color: Colors.text, opacity: 0.8, marginTop: 2 },
  }), [Colors, theme]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen options={{ title: 'Acerca de', headerStyle: { backgroundColor: Colors.card }, headerTintColor: Colors.text, headerTitleStyle: { color: Colors.text } }} />
      <ScrollView style={styles.container}>
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Equipo de Desarrollo</Text>
          {membres.map((membre, i) => (
            <View style={styles.card} key={i}>
              <Text style={styles.membreNom}>{membre.nom}</Text>
              <Text style={styles.membreRol}>{membre.rol}</Text>
            </View>
          ))}
        </View>

        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Tecnologías Utilizadas</Text>
          {techs.map((tech, i) => (
            <View style={styles.techCard} key={i}>
              <Ionicons name={tech.icon as any} size={28} color={Colors.primary} style={styles.techIcon} />
              <View style={styles.techInfo}>
                <Text style={styles.techNom}>{tech.nom}</Text>
                <Text style={styles.techDesc}>{tech.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
