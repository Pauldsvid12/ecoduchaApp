// ─── Sesiones de prueba del prototipo ───────────────────────────────────────
export const sesiones = [
  { id: '1', fecha: '2026-04-14', hora: '07:30', duracion: 330, litros: 22.4, tempProm: 38.2, energia: 0.31, costo: 0.10, eficiente: true  },
  { id: '2', fecha: '2026-04-13', hora: '19:45', duracion: 430, litros: 34.8, tempProm: 40.1, energia: 0.48, costo: 0.15, eficiente: false },
  { id: '3', fecha: '2026-04-12', hora: '08:03', duracion: 295, litros: 19.7, tempProm: 36.5, energia: 0.27, costo: 0.09, eficiente: true  },
  { id: '4', fecha: '2026-04-11', hora: '07:58', duracion: 380, litros: 28.1, tempProm: 39.0, energia: 0.39, costo: 0.12, eficiente: true  },
  { id: '5', fecha: '2026-04-10', hora: '20:15', duracion: 485, litros: 41.3, tempProm: 42.0, energia: 0.57, costo: 0.18, eficiente: false },
  { id: '6', fecha: '2026-04-09', hora: '07:22', duracion: 310, litros: 21.8, tempProm: 37.1, energia: 0.30, costo: 0.09, eficiente: true  },
  { id: '7', fecha: '2026-04-08', hora: '18:50', duracion: 355, litros: 26.3, tempProm: 38.7, energia: 0.36, costo: 0.11, eficiente: true  },
];

// ─── Estadísticas mensuales ─────────────────────────────────────────────────
export const estadisticasMensuales = [
  { mes: 'Oct', litros: 890, kwh: 29.1 },
  { mes: 'Nov', litros: 820, kwh: 26.8 },
  { mes: 'Dic', litros: 950, kwh: 31.0 },
  { mes: 'Ene', litros: 780, kwh: 25.5 },
  { mes: 'Feb', litros: 860, kwh: 28.1 },
  { mes: 'Mar', litros: 420, kwh: 13.7 },
  { mes: 'Abr', litros: 194, kwh: 1.91 },
];

// ─── Sensores del sistema (del informe EcoDucha) ─────────────────────────────
export const sensores = [
  {
    id: 's1',
    nombre:      'DS18B20',
    tipo:        'Temperatura',
    protocolo:   '1-Wire',
    rango:       '-55°C a +125°C',
    precision:   '±0.5°C',
    descripcion: 'Sensor digital sumergible montado en la tubería de salida. Envía lecturas al ESP32 cada 750 ms mediante el protocolo 1-Wire. Permite al sistema decidir cuándo activar o reducir la resistencia calefactora.',
    color:       '#FB923C',
  },
  {
    id: 's2',
    nombre:      'YF-S201',
    tipo:        'Caudal',
    protocolo:   'Pulsos digitales',
    rango:       '1 – 30 L/min',
    precision:   '±3%',
    descripcion: 'Caudalímetro de efecto Hall. Genera pulsos eléctricos proporcionales al flujo de agua. El ESP32 cuenta los pulsos para calcular litros consumidos en tiempo real. Factor de conversión: 7.5 pulsos/L.',
    color:       '#22D3EE',
  },
  {
    id: 's3',
    nombre:      'ACS712 (30A)',
    tipo:        'Corriente',
    protocolo:   'Analógico (ADC)',
    rango:       '0 – 30 A AC/DC',
    precision:   '±1.5%',
    descripcion: 'Sensor de efecto Hall para corriente alterna. Mide la corriente que consume la resistencia eléctrica de la ducha (≈21 A). La lectura analógica del ESP32 permite estimar en tiempo real la potencia y energía usada.',
    color:       '#A78BFA',
  },
  {
    id: 's4',
    nombre:      'TRIAC BTA16',
    tipo:        'Actuador de potencia',
    protocolo:   'PWM (0-100%)',
    rango:       '0 – 4000 W',
    precision:   'Control ±5%',
    descripcion: 'Semiconductor de control de potencia AC disparado por un optoacoplador MOC3021. El ESP32 genera una señal PWM que controla el ángulo de disparo, regulando la potencia entregada a la resistencia calefactora.',
    color:       '#F43F5E',
  },
  {
    id: 's5',
    nombre:      'ESP32 WROOM-32',
    tipo:        'Microcontrolador',
    protocolo:   'Wi-Fi / BLE / UART',
    rango:       '3.3 V – 240 MHz',
    precision:   'N/A',
    descripcion: 'Cerebro del sistema. Lee los tres sensores, ejecuta el algoritmo de control, almacena sesiones en LittleFS, publica métricas por MQTT y expone una API REST local. Tiene 4 MB de flash y 520 KB de SRAM.',
    color:       '#4ADE80',
  },
  {
    id: 's6',
    nombre:      'Nextion NX3224T024',
    tipo:        'Pantalla táctil HMI',
    protocolo:   'UART (9600 bps)',
    rango:       '2.4" 320×240 px',
    precision:   'N/A',
    descripcion: 'Interfaz local del prototipo. Muestra temperatura en tiempo real, caudal, litros consumidos y estado del sistema. El usuario puede interactuar directamente en el panel de ducha sin necesitar el teléfono.',
    color:       '#FBBF24',
  },
  {
    id: 's7',
    nombre:      'LittleFS',
    tipo:        'Sistema de archivos',
    protocolo:   'Flash interna ESP32',
    rango:       'Hasta 4 MB',
    precision:   'N/A',
    descripcion: 'Sistema de archivos ligero montado en la flash del ESP32. Cada sesión de ducha se guarda como archivo JSON con métricas completas. Permite acceso offline al historial sin depender de conectividad Wi-Fi.',
    color:       '#67E8F9',
  },
];

// ─── Pasos del flujo del sistema ──────────────────────────────────────────────
export const pasosFlujo = [
  {
    numero: '01',
    titulo:     'El usuario activa la ducha',
    descripcion: 'El usuario presiona el botón físico o envía el comando desde la app. El ESP32 recibe la señal y arranca el ciclo de control.',
    color:       '#22D3EE',
  },
  {
    numero: '02',
    titulo:     'El ESP32 lee los sensores',
    descripcion: 'Cada 750 ms: DS18B20 reporta temperatura, YF-S201 envía pulsos de caudal y ACS712 entrega lectura de corriente por ADC.',
    color:       '#A78BFA',
  },
  {
    numero: '03',
    titulo:     'Algoritmo de control PID',
    descripcion: 'Con la temperatura actual y el objetivo configurado (por defecto 38°C), el algoritmo calcula el duty cycle PWM para el TRIAC.',
    color:       '#FB923C',
  },
  {
    numero: '04',
    titulo:     'El TRIAC regula la potencia',
    descripcion: 'El optoacoplador MOC3021 dispara el BTA16. El ángulo de fase controla cuánta energía recibe la resistencia calefactora (0–4000 W).',
    color:       '#F43F5E',
  },
  {
    numero: '05',
    titulo:     'Pantalla Nextion informa',
    descripcion: 'El ESP32 envía por UART los datos actualizados. La pantalla muestra temperatura, litros y estado al usuario directamente en la ducha.',
    color:       '#FBBF24',
  },
  {
    numero: '06',
    titulo:     'Datos guardados en LittleFS',
    descripcion: 'Al finalizar la sesión, el ESP32 escribe un archivo JSON local con todas las métricas. Sin Wi-Fi, los datos persisten en flash.',
    color:       '#4ADE80',
  },
  {
    numero: '07',
    titulo:     'Sincronización a la nube',
    descripcion: 'Con conexión disponible, el ESP32 publica las métricas por MQTT. La app las visualiza en tiempo real o las descarga del historial.',
    color:       '#67E8F9',
  },
];

// ─── Equipo EcoDucha ──────────────────────────────────────────────────────────
export const equipo = [
  {
    id: 'e1',
    nombre:  'Matías Campoverde',
    rol:     'Hardware & Electrónica',
    inicial: 'M',
    color:   '#22D3EE',
    bio:     'Diseño del circuito de potencia con TRIAC, optoacoplador y protecciones. Montaje en protoboard y PCB del prototipo final.',
  },
  {
    id: 'e2',
    nombre:  'Alejandro Mogrovejo',
    rol:     'Firmware & Control',
    inicial: 'A',
    color:   '#A78BFA',
    bio:     'Programación del ESP32: lectura de sensores, algoritmo PID, comunicación UART con Nextion y almacenamiento en LittleFS.',
  },
  {
    id: 'e3',
    nombre:  'Paúl Goldena',
    rol:     'App & Cloud',
    inicial: 'P',
    color:   '#4ADE80',
    bio:     'Desarrollo de la aplicación móvil con Expo/React Native, integración MQTT, visualización de métricas y diseño de la experiencia de usuario.',
  },
];

// ─── KPIs globales del prototipo ──────────────────────────────────────────────
export const kpisGlobales = {
  duchasRegistradas: 7,
  litrosTotales:     194.4,
  promedioLitros:    27.8,
  tempPromedio:      38.8,
  energiaTotal:      2.68,
  eficiencia:        71,      // % duchas dentro del objetivo
  ahorroPorDucha:    9.2,     // L respecto a ducha convencional (≈38 L)
};