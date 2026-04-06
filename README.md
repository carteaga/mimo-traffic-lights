# Semaforo Virtual Educativo

Aplicacion web mobile-first construida con Vite, React y TypeScript para simular un semaforo virtual con fines pedagogicos. Incluye modo manual y automatico, contador regresivo, sonido activable, persistencia local y control remoto por QR usando un backend separado.

## Caracteristicas

- Luces roja, amarilla y verde en formato vertical.
- Duraciones configurables para cada estado.
- Controles de iniciar, pausar y reiniciar.
- Cambio entre modo manual y automatico.
- Sonido sintetizado con Web Audio API.
- Configuracion persistida en `localStorage`.
- SEO on-page orientado a busquedas como `semaforo virtual`.
- PWA instalable con manifest y service worker base.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

## Documentation

- Product spec: [`docs/product-spec.md`](/home/land/projects/mimo-traffic-lights/docs/product-spec.md)
- UI rules: [`docs/ui-rules.md`](/home/land/projects/mimo-traffic-lights/docs/ui-rules.md)
- Acceptance criteria: [`docs/acceptance-criteria.md`](/home/land/projects/mimo-traffic-lights/docs/acceptance-criteria.md)

## Desarrollo local

1. Copia `.env.example` a `.env.local`.
2. Define `VITE_REMOTE_API_URL=http://localhost:8787`.
3. Ejecuta este frontend con `npm run dev`.
4. Levanta el backend separado del proyecto `mimo-traffic-lights-backend`.

## Despliegue

### Frontend en Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Variable de entorno:
  - `VITE_REMOTE_API_URL=https://tu-backend-remoto.com`

El archivo [`netlify.toml`](/home/land/projects/mimo-traffic-lights/netlify.toml) ya deja configurado el build y el fallback SPA para rutas como `/remote/:sessionId`.

### Backend remoto

El backend ya no vive en este repo. Debe desplegarse desde el proyecto separado `mimo-traffic-lights-backend` en un proveedor con soporte para Node persistente y WebSocket, como Render, Railway o Fly.io.

### Flujo en produccion

- El display abre la app en Netlify.
- El frontend crea la sesion contra el backend remoto usando `VITE_REMOTE_API_URL`.
- El QR apunta al dominio Netlify en `/remote/:sessionId`.
- El controller abre esa URL en Netlify.
- Display y controller se conectan al backend WebSocket externo.

## Nota

La app debe presentarse como simulacion educativa. No reemplaza senalizacion oficial ni control de transito real.
