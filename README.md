# 💧 EcoDucha
### *Inteligencia que fluye, energía que se cuida*

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![ESP32](https://img.shields.io/badge/Hardware-ESP32-blue.svg)](https://www.espressif.com/)
[![React Native](https://img.shields.io/badge/App-React%20Native%2FExpo-61DAFB.svg)](https://expo.dev/)
[![Estado](https://img.shields.io/badge/Estado-En%20desarrollo-yellow.svg)]()
[![Hecho en](https://img.shields.io/badge/Hecho%20en-Cuenca%2C%20Ecuador%20-orange.svg)]()

---

## ¿De donde proviene la EcoDucha?

EcoDucha nació de una pregunta simple: *¿cuánta agua y energía botamos cada vez que nos duchamos sin darnos cuenta?*

La respuesta nos sorprendió. Un ecuatoriano promedio usa entre **60 y 100 litros** en una sola ducha. Multiplicado por todos los días del año, es una cantidad brutal. Entonces decidimos hacer algo al respecto.

EcoDucha es un sistema IoT que se instala en cualquier ducha eléctrica existente y te permite **monitorear en tiempo real** la temperatura del agua, el caudal y el tiempo que llevas duchándote — todo desde tu celular. Si te pasas del límite que tú mismo configuras, el sistema actúa solo.

---

## El problema que resuelve

- Las facturas de luz y agua suben cada mes sin que sepamos exactamente por qué
- No tenemos retroalimentación en tiempo real mientras nos duchamos
- Las duchas eléctricas no tienen control inteligente de temperatura
- No hay datos históricos de nuestro consumo personal

---

## ¿Qué puede hacer EcoDucha?

- **Medir temperatura** en tiempo real con sensor DS18B20
- **Medir caudal** de agua con sensor YF-S201
- **Cronometrar** la ducha desde que abres el grifo
- **Cortar automáticamente** el agua cuando superas el tiempo/volumen límite
- **Mostrar todo en la app** móvil con gráficas y estadísticas
- **Guardar historial** de consumo por día, semana y mes
- **Enviar alertas** antes de que te corte (para que no te agarre enjabonado)

---

## Lo que usamos para construirlo

### Hardware

| Componente | Función |
|---|---|
| ESP32 | Cerebro del sistema, WiFi integrado |
| DS18B20 | Sensor de temperatura del agua |
| YF-S201 | Sensor de caudal |
| TRIAC BTA41-800B | Control de potencia de la ducha |
| MOC3011 | Optotriac de disparo, aislamiento |
| Resistencia 330Ω | Protección del gate del MOC |

### Software

| Tecnología | Uso |
|---|---|
| Arduino IDE  | Firmware del ESP32 |
| React Native + Expo | App móvil multiplataforma |
| Supabase | Base de datos y autenticación |
| MQTT / WebSockets | Comunicación ESP32 ↔ App |

---

## La app

La app tiene 6 pantallas principales:

1. **Dashboard** — Temperatura, caudal y timer en tiempo real
2. **Historial** — Gráficas de consumo por día/semana/mes
3. **Configuración** — Temperatura máxima, tiempo límite, alertas
4. **Estadísticas de ahorro** — "Has ahorrado X litros = $Y"
5. **Acerca de** — Info del proyecto y equipo

---

### Variables de entorno

Crea un archivo `.env` en la carpeta `/app`:

```env
SUPABASE_URL=tu_url_aqui
SUPABASE_ANON_KEY=tu_key_aqui
MQTT_BROKER=tu_broker_aqui
```

---

## El equipo

Somos tres estudiantes de Unidad Educativa Técnico Salesiano en Cuenca, Ecuador. Este proyecto es nuestra tesis integradora.

| Nombre | Rol |
|---|---|
| Paúl Juela | Hardware & Electrónica |
| Emiliano Jimenéz | Firmware & Backend |
| Matías Cabrera | App móvil & Diseño |

---

## 💬 Contacto

📸 @eco.ducha.ec
