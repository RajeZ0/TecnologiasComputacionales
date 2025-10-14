# UAEMEX Electronics

## 1. Antes de empezar
- Necesitamos Node.js 20.x (yo use la version 20.17.0) y npm 10+. Normalmente vienen juntos.
- Para confirmar que todo esta listo, corro:
  ```bash
  node -v
  npm -v
  ```
  Si la version de Node es muy vieja, conviene actualizarla porque Next 14 ya pide funciones nuevas.

## 2. Instalar dependencias
Dentro de la carpeta del proyecto ejecuto:
```bash
npm install
```
Con eso se descarga todo lo que usa el sitio. Como ya solo usamos npm, no hay que tocar pnpm ni yarn.

## 3. Correr en modo desarrollo
Para verlo mientras programo uso:
```bash
npm run dev -- --port 8080
```
Luego abro http://localhost:8080 y listo. Cada cambio se refresca solo. (Sin el flag `--port` el servidor usa el puerto 3000.)

## 4. Chequeos antes de entregar
Para asegurarme de que no rompa nada:
```bash
npm run lint    # revisa estilos y reglas de Next
npm run build   # compila y revisa TypeScript
```
Si ambos comandos pasan, significa que el Docker build tambien va a salir sin errores.

## 5. Imagen Docker lista para desplegar
El Dockerfile genera el modo `standalone` de Next y solo requiere Node dentro del contenedor. Los pasos que segui fueron:
```bash
docker build -t uaemex-electronics .
docker run -d -p 8080:8080 --name uaemex-electronics uaemex-electronics
```

## 6. Estructura rapida
- `app/`: rutas y secciones principales (App Router).
- `components/`: componentes reutilizables (cards, header, etc.).
- `public/`: imagenes estaticas.
- `styles/`: estilos de Tailwind.
- `prisma/`: esquema, seeds y base SQLite.
- `Dockerfile` y `.dockerignore`: necesarios para empaquetar la app.

## 7. Base de datos (Prisma + SQLite)
1. Instalar dependencias si aun no estan:
   ```bash
   npm install @prisma/client
   npm install -D prisma tsx
   ```
2. Generar el cliente de Prisma y asegurar que el archivo `lib/generated/prisma` exista:
   ```bash
   npx prisma generate
   ```
3. Crear la base de datos SQLite y las tablas definidas en `prisma/schema.prisma` (Category, Product, Order, OrderItem):
   ```bash
   npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script | Out-File prisma/schema.sql -Encoding utf8
   npx prisma db execute --schema prisma/schema.prisma --file prisma/schema.sql
   Remove-Item prisma/schema.sql
   ```
   > Si ya existia `prisma/dev.db`, puedes borrarlo antes (`Remove-Item prisma/dev.db`) para regenerar todo con la estrucutra nueva.
4. Poblar la base con los datos de catalogo, ofertas y un pedido de ejemplo:
   ```bash
   npx prisma db seed
   ```
5. Explorar datos con Prisma Studio:
   ```bash
   npx prisma studio
   ```
   Esto abre http://localhost:5555 para revisar `Product`, `Order`, etc.

## 8. Flujo de pedidos
- El carrito ahora llama a `POST /api/orders` para registrar compras en SQLite.
- Para cada pedido se guarda:
  - Datos basicos del cliente (por ahora `Invitado`).
  - Total, numero de articulos y estatus (`PENDING`).
  - Items ligados al producto real con precio y cantidad.
  - Ventana de entrega estimada (`shippingMinDays`, `shippingMaxDays`) y fecha aproximada de llegada (`estimatedDelivery`).
- Puedes verificar la insercion en Prisma Studio (tabla `Order` y relacion `OrderItem`).

## 9. Hacer una compra de prueba
1. Levanta el servidor: `npm run dev -- --port 8080`.
2. Abre el sitio y agrega productos al carrito.
3. Presiona **Finalizar Compra**. Veras la alerta con el numero de pedido `ORD-...`, el mensaje de entrega aproximada (2 a 3 dias habiles) y la fecha estimada calculada automaticamente.
4. Abre Prisma Studio (`npx prisma studio`) y revisa que aparezca el pedido en la tabla `Order`.

