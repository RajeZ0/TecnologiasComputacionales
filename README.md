# UAEMEX Electronics



## 1. Antes de empezar
- Necesitamos Node.js 20.x (yo usé la versión 20.17.0) y npm 10+. Normalmente vienen juntos.
- Para confirmar que todo está listo, corro:
  ```bash
  node -v
  npm -v
  ```
  Si la versión de Node es muy vieja, conviene actualizarla porque Next 14 ya pide funciones nuevas.

## 2. Instalar dependencias
Dentro de la carpeta del proyecto ejecuto:
```bash
npm install
```
Con eso se descarga todo lo que usa el sitio. Como ya solo usamos npm, no hay que tocar pnpm ni yarn.

## 3. Correr en modo desarrollo
Para verlo mientras programo uso:
```bash
npm run dev
```
Luego abro http://localhost:3000 y listo. Cada cambio se refresca solo.

## 4. Chequeos antes de entregar
Para asegurarme de que no rompa nada:
```bash
npm run lint    # revisa estilos y reglas de Next
npm run build   # compila y revisa TypeScript
```
Si ambos comandos pasan, significa que el Docker build también va a salir sin errores.

## 5. Imagen Docker lista para desplegar
El Dockerfile genera el modo `standalone` de Next y solo requiere Node dentro del contenedor. Los pasos que seguí fueron:
```bash
docker build -t uaemex-electronics .
docker run -d -p 8080:8080 --name uaemex-electronics uaemex-electronics
```

## 6. Estructura rápida
- `app/`: rutas y secciones principales (App Router).
- `components/`: componentes reutilizables (cards, header, etc.).
- `public/`: imágenes estáticas.
- `styles/`: estilos de Tailwind.
- `Dockerfile` y `.dockerignore`: necesarios para empaquetar la app.

No usamos variables de entorno, así que basta con seguir estos pasos y debería funcionar igual que en mi máquina. Cualquier duda la revisamos en clase.
