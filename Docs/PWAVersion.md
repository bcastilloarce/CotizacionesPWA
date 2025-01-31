# CotizacionesPWA - Sistema de Gestión de Cotizaciones (Progressive Web App)

## Descripción General

CotizacionesPWA es una Progressive Web App que adapta las funcionalidades de iCotizaciones a una aplicación web moderna, accesible desde cualquier dispositivo. Desarrollada con React y TypeScript, siguiendo las mejores prácticas de PWA para ofrecer una experiencia similar a una aplicación nativa.

## Arquitectura

### Stack Tecnológico

- **Frontend:**
  - React + TypeScript
  - Material-UI (MUI) para componentes
  - Redux Toolkit para estado global
  - React Router para navegación
  - Workbox para PWA features

- **Backend:**
  - Node.js + Express
  - TypeScript
  - PostgreSQL (alojado en Railway)
  - Prisma como ORM
  - JWT para autenticación

### Estructura del Proyecto

```txt
cotizaciones-pwa/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── quotes/
│   │   │   ├── QuoteForm.tsx
│   │   │   ├── QuoteList.tsx
│   │   │   └── QuoteDetail.tsx
│   │   └── shared/
│   │       ├── Layout.tsx
│   │       └── Navbar.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Home.tsx
│   │   ├── NewQuote.tsx
│   │   └── History.tsx
│   ├── services/
│   │   ├── auth.ts
│   │   ├── quotes.ts
│   │   └── pdf.ts
│   ├── utils/
│   │   └── constants.ts
│   ├── assets/
│   │   └── react.svg
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── public/
│   ├── manifest.json
│   ├── service-worker.js
│   └── vite.svg
├── Docs/
│   ├── GenerarPDF.md
│   ├── PWAVersion.md
│   └── iOSVersion.md
├── README.md
├── package.json
├── package-lock.json
├── vite.config.ts
├── eslint.config.js
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.node.json
```

## Características PWA

### Manifest.json

```json
{
  "name": "Cotizaciones PWA",
  "short_name": "Cotizaciones",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1976d2",
  "icons": [
    {
      "src": "icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    // ... otros tamaños de iconos
    {
      "src": "icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker

```javascript
// service-worker.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'script' ||
                 request.destination === 'style',
  new workbox.strategies.StaleWhileRevalidate()
);

// Caché de API calls
workbox.routing.registerRoute(
  ({url}) => url.pathname.startsWith('/api/'),
  new workbox.strategies.NetworkFirst()
);
```

## Autenticación

### Schema Prisma

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(USER)
  quotes    Quote[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}
```

### Configuración Railway

```env
DATABASE_URL="postgresql://user:password@containers-us-west-1.railway.app:5432/railway"
JWT_SECRET="dalecontodo_secret_key"
```

## API Endpoints

### Autenticación API

```typescript
// POST /api/auth/login
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: 'USER' | 'ADMIN';
  }
}
```

### Cotizaciones

```typescript
// GET /api/quotes
interface Quote {
  id: number;
  clientName: string;
  carBrand: string;
  carModel: string;
  year: number;
  licensePlate: string;
  validUntil: Date;
  items: QuoteItem[];
  total: number;
  status: 'ACTIVE' | 'EXPIRED';
}

// POST /api/quotes
interface CreateQuoteRequest {
  clientName: string;
  carBrand: string;
  carModel: string;
  year: number;
  licensePlate: string;
  validityDays: number;
  untilStockLasts: boolean;
  items: {
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
}
```

## Interfaz de Usuario

### Componentes Principales

1. **AuthLayout**
   - Login
   - Registro
   - Recuperación de contraseña

2. **MainLayout**
   - Navbar responsivo
   - Drawer lateral (en desktop)
   - Bottom Navigation (en mobile)

3. **QuotesModule**
   - Lista de cotizaciones
   - Formulario de nueva cotización
   - Vista detalle
   - Generación de PDF

4. **HistoryModule**
   - Historial de cotizaciones
   - Filtros y búsqueda
   - Exportación

### Características Offline

- Sincronización de datos cuando se recupera la conexión
- Almacenamiento local de cotizaciones pendientes
- Cache de recursos estáticos
- Indicador de estado de conexión

### Optimizaciones

1. **Performance**
   - Code splitting
   - Lazy loading de componentes
   - Compresión de imágenes
   - Minificación de assets

2. **SEO**
   - Meta tags
   - Sitemap
   - robots.txt

3. **Accesibilidad**
   - ARIA labels
   - Contraste de colores
   - Navegación por teclado

## Despliegue en Railway

### Configuración

1. **Base de Datos**

```bash
railway add postgresql
```

2.**Variables de Entorno**

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=${RAILWAY_DATABASE_URL}
JWT_SECRET=dalecontodo_secret_key
CORS_ORIGIN=https://tu-dominio.railway.app
```

1. **Dockerfile**

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Scripts de Despliegue

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "deploy": "railway up"
  }
}
```

## Seguridad

1. **Autenticación**
   - JWT con refresh tokens
   - Protección contra CSRF
   - Rate limiting

2. **Datos**
   - Encriptación en tránsito (HTTPS)
   - Sanitización de inputs
   - Validación de datos

3. **Headers**
   - CORS configurado
   - CSP
   - HSTS

## Monitoreo

1. **Logs**
   - Winston para logging
   - Sentry para error tracking

2. **Métricas**
   - Google Analytics
   - Performance monitoring
   - User behavior tracking

## Próximos Pasos

1. Implementación de notificaciones push
2. Integración con sistemas de pago
3. Módulo de reportes avanzados
4. Sincronización con sistemas externos
5. Implementación de chat en vivo

## iOS to PWA Design Adaptations

### Apple HIG Principles Maintained

1. **Visual Hierarchy**
   - Clear information hierarchy
   - Prominent primary actions
   - Consistent typography scale
   - Whitespace for clarity

2. **Navigation Patterns**
   - Back button in top-left
   - Large touch targets (min 44x44px)
   - Bottom navigation for primary actions
   - Pull-to-refresh for content updates

3. **Form Design**
   - Floating labels
   - Inline validation
   - Clear error states
   - Native-like input controls

### PDF Generation Adaptations

1. **Client-side PDF Generation**
   - Using jsPDF library
   - Maintaining exact specifications from GenerarPDF.md
   - Canvas-based signature capture
   - Blob storage for temporary files

2. **PDF Preview**
   - iframe preview before download
   - Mobile-optimized viewer
   - Share functionality using Web Share API
   - Download progress indicator

### Progressive Enhancement

1. **Offline Support**
   - IndexedDB for form data
   - Cache API for PDF templates
   - Background sync for uploads
   - Offline PDF generation

2. **iOS-specific Features**
   - Safari Add to Home Screen flow
   - iOS status bar theming
   - Apple touch icon support
   - iOS-specific gesture handling

### Form Component Adaptations

```typescript:frontend/src/components/QuoteForm/index.tsx
interface QuoteFormProps {
  onSubmit: (data: QuoteFormData) => void;
  initialData?: QuoteFormData;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit, initialData }) => {
  // Form implementation maintaining iOS UX patterns
  // Using Material-UI with iOS-inspired theming
};
```

### Deployment Options

1. **Vercel Deployment**
   - Zero-configuration setup
   - Automatic HTTPS
   - Edge functions support
   - Built-in CI/CD

2. **Railway Integration**
   - PostgreSQL database
   - Automatic backups
   - Connection pooling
   - Monitoring included

3. **Alternative Options**
   - Supabase (PostgreSQL + Auth)
   - PlanetScale (MySQL, generous free tier)
   - Firebase (NoSQL + hosting)

### iOS-Specific PWA Optimizations

```javascript:frontend/public/service-worker.js
// ... existing service worker code ...

// iOS-specific touch handling
self.addEventListener('fetch', (event) => {
  if (event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          return caches.open('pwa-cache').then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
    );
  }
});
```

### Testing Considerations

1. **iOS Safari Testing**
   - Home screen launch behavior
   - Offline functionality
   - Touch event handling
   - Form input behavior

2. **Cross-browser Testing**
   - Safari iOS
   - Chrome iOS
   - Firefox iOS
   - Native app comparison
