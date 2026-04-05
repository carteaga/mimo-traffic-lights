# AGENTS.md

## Propósito del proyecto

Este proyecto consiste en una aplicación web mobile-first que simula un semáforo virtual educativo. La app debe permitir que un estudiante use su teléfono como referencia visual y sonora para detenerse, avanzar o prepararse según el color mostrado.

La aplicación NO debe presentarse como un dispositivo oficial de control de tránsito. Debe describirse siempre como una simulación educativa o herramienta pedagógica.

---

## Objetivo del MVP

Construir una aplicación web usable desde teléfono móvil, desarrollada con Vite + React y preparada como PWA, que permita:

1. Mostrar un semáforo visual con tres estados:
   - rojo
   - amarillo
   - verde

2. Controlar la duración de cada estado:
   - tiempo rojo
   - tiempo amarillo
   - tiempo verde

3. Reproducir sonido asociado al estado del semáforo.

4. Permitir iniciar, pausar, reiniciar y cambiar entre modo manual y automático.

5. Guardar configuraciones localmente en el dispositivo del usuario.

6. Ofrecer una experiencia optimizada para móviles.

---

## Principios del proyecto

### 1. Mobile-first

Toda decisión de diseño debe priorizar pantallas móviles antes que desktop.

### 2. Claridad visual

El semáforo debe ser visible en pantalla completa o casi completa, con botones grandes, colores evidentes y alto contraste.

### 3. Simplicidad funcional

No agregar funciones complejas si no aportan al caso de uso principal: simular un semáforo educativo en el teléfono.

### 4. Accesibilidad

Considerar:

- buen contraste
- texto legible
- botones grandes
- audio activable/desactivable
- soporte opcional para vibración en futuras versiones

### 5. Persistencia local

Las configuraciones del usuario deben mantenerse entre sesiones usando almacenamiento local del navegador.

### 6. Seguridad comunicacional

No usar textos que sugieran homologación oficial, autorización municipal o validez legal en vía pública.

---

## Stack obligatorio

El proyecto debe desarrollarse con:

- Vite
- React
- JavaScript o TypeScript (preferencia: TypeScript si no agrega complejidad innecesaria)
- PWA
- localStorage para persistencia de configuraciones

Si el agente propone una alternativa, debe justificar claramente por qué mejora mantenibilidad o rendimiento sin salirse del alcance.

---

## Funcionalidades obligatorias del MVP

### Visualización

- Mostrar 3 luces del semáforo en formato vertical.
- Resaltar claramente solo un estado activo a la vez.
- Mostrar etiqueta del estado actual.
- Mostrar contador regresivo visible.

### Control de tiempo

- Permitir configurar duración en segundos para:
  - rojo
  - amarillo
  - verde
- Validar que los tiempos sean valores numéricos razonables.
- Aplicar los tiempos configurados al ciclo automático.

### Controles

- Botón iniciar
- Botón pausar
- Botón reiniciar
- Modo manual
- Modo automático

### Sonido

- Permitir activar o desactivar sonido.
- Reproducir sonido por cambio de estado o asociado al estado activo, según la implementación más estable en móviles.
- Considerar restricciones de autoplay del navegador: el audio debe activarse tras interacción del usuario.

### Persistencia local

Guardar en localStorage al menos:

- duración del rojo
- duración del amarillo
- duración del verde
- modo seleccionado
- estado de sonido activado/desactivado

Al cargar la app:

- leer configuración desde localStorage
- aplicar valores guardados
- usar valores por defecto si no existe configuración previa

---

## Funcionalidades deseables, no obligatorias

- Pantalla completa
- Vibración
- Indicador visual extra para modo activo
- PWA instalable con ícono y nombre personalizado
- Presets de tiempo
- Botón para restaurar valores por defecto
- Modo alto contraste

---

## Requisitos de UX

- Diseñar primero para móvil.
- Botones mínimos de 44x44 px o mayores.
- La vista principal debe ser operable con una sola mano.
- El color activo debe dominar visualmente.
- La configuración debe ser rápida de modificar.
- Evitar menús profundos o formularios largos.
- La app debe sentirse parecida a una app nativa cuando se instale como PWA.

---

## Requisitos técnicos

### Arquitectura general

- Separar lógica del temporizador de la interfaz.
- Mantener componentes simples y reutilizables.
- Evitar lógica dispersa en múltiples componentes sin necesidad.

### Estado

- El estado del semáforo debe ser claro y predecible.
- No hardcodear tiempos: deben provenir de configuración.
- El reinicio debe devolver la app a un estado consistente.

### Persistencia

- Centralizar acceso a localStorage en utilidades o hooks.
- Manejar errores de lectura/escritura de forma segura.
- Usar valores por defecto si localStorage falla o devuelve datos inválidos.

### Temporizadores

- Evitar memory leaks con intervalos o timers.
- Limpiar correctamente efectos y suscripciones.
- El contador visible debe coincidir con el estado activo.

### PWA

- Configurar manifest básico.
- Habilitar instalación en dispositivos compatibles.
- Permitir funcionamiento razonable como app instalada.
- No intentar resolver offline complejo si no es necesario para el MVP, pero dejar la base lista.

---

## Arquitectura sugerida

### Componentes

- `TrafficLight`
- `TrafficLightLamp`
- `TimerDisplay`
- `Controls`
- `SettingsPanel`
- `SoundToggle`

### Hooks / lógica

- `useTrafficLightController`
- `useCountdown`
- `useLocalStorage`
- `useSoundManager`

### Tipos sugeridos

- `TrafficLightState = "red" | "yellow" | "green"`
- `Mode = "manual" | "automatic"`

---

## Modelo de configuración sugerido

La configuración persistida puede seguir esta estructura:

```json
{
  "redDuration": 10,
  "yellowDuration": 3,
  "greenDuration": 8,
  "mode": "automatic",
  "soundEnabled": true
}
```
