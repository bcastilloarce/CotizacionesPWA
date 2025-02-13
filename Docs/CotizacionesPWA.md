# Guía de Conversión: CotizacionesiOS a Progressive Web App

## Índice

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Pantalla Principal](#pantalla-principal)
3. [Nueva Cotización](#nueva-cotización)
4. [Historial](#historial)
5. [Generación de PDF](#generación-de-pdf)
6. [Servicios y Utilidades](#servicios-y-utilidades)

## Estructura del Proyecto

### Organización de Archivos (Basada en ContentView.swift)

```txt
CotizacionesPWA/
├── app/
│   ├── api/                    # Endpoints y lógica del servidor
│   ├── components/             # Componentes reutilizables
│   ├── dashboard/              # Vistas principales
│   └── providers/              # Proveedores de contexto
├── public/                     # Archivos estáticos
│   ├── assets/
│   │   ├── Logo.png           # Logo empresa
│   │   ├── Firma.png          # Imagen firma
│   │   └── LaunchImage.png    # Imagen inicio
└── types/                      # Definiciones de tipos
```

## Pantalla Principal

### Layout Principal (`app/dashboard/layout.tsx`)

Basado en `ContentView.swift`:

- NavigationStack con título "Cotizaciones Repuestos Oyarce"
- TabView con dos pestañas:
  - "Cotización" (systemImage: "doc.text.fill")
  - "Historial" (systemImage: "clock.fill")

## Nueva Cotización

### Formulario de Cotización (`app/dashboard/components/CotizacionView.tsx`)

Basado en los modelos existentes:

#### Sección Cliente

- Campo Cliente (obligatorio)
- Campo Fecha (automático, fecha actual)
- Selector Duración
  - Opciones predefinidas según `Constants.GUI.duracionOptions`:

    ```txt
    ["1 día", "2 días", "3 días", "4 días", "5 días",
     "6 días", "7 días", "10 días", "14 días", "21 días",
     "28 días", "30 días", "60 días"]
    ```

#### Sección Vehículo

- Selector Marca (datos desde `marcasymodelos.json`)
- Selector Modelo (dependiente de marca seleccionada)
- Selector Año (opcional)
- Campo Patente (opcional)
- Campo Disponibilidad (opcional)

#### Sección Productos

Basado en `CotizacionHistorial.swift`:

- Tabla de productos con:
  - Nombre producto
  - Cantidad
  - Precio unitario
  - Total calculado automáticamente
- Botón para agregar productos
- Cálculo automático del total con IVA

## Historial

### Vista Historial (`app/dashboard/historial/page.tsx`)

Basado en `HistorialService.swift`:

- Lista de cotizaciones ordenadas por fecha
  - Fecha
  - Cliente
  - Total con IVA
- Acciones por cotización:
  - Ver PDF
  - Editar cotización
  - Eliminar cotización

## Generación de PDF

### Servicio PDF (`app/api/pdf/pdfGenerator.ts`)

Basado en `PDFCotizaciones.md`:

#### Estructura del Documento

1. Logo corporativo (926x272)
2. Título "Cotización"
3. Información:
   - Cliente
   - Fecha
   - Marca y Modelo
   - Duración
   - Campos opcionales (si tienen valor):
     - Año
     - Patente
     - Disponibilidad
4. Tabla de productos
5. Total con IVA
6. Firma (110x110)

## Servicios y Utilidades

### Almacenamiento (`app/api/storage/quotes.ts`)

Basado en `HistorialService.swift`:

- Persistencia de cotizaciones
- Caché local
- Sincronización

### Estilos Globales (`app/globals.css`)

Basado en `Constants.swift`:

```css
:root {
  --primary-color: #007AFF;
  --secondary-color: #5856D6;
  --success-color: #34C759;
  --danger-color: #FF3B30;
  --warning-color: #FF9500;
  --background-light: #FFFFFF;
}
```

### Manifest PWA (`public/manifest.json`)

```json
{
  "name": "Cotizaciones Repuestos Oyarce",
  "short_name": "Cotizaciones",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#007AFF",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## Consideraciones de Implementación

### Responsive Design

- Adaptación del diseño iOS a web
- Mantenimiento de la experiencia de usuario
- Soporte para interacciones táctiles

### Offline Functionality

- Service Worker para caché
- Persistencia local de datos
- Sincronización cuando hay conexión

### Seguridad

- Protección de rutas
- Validación de datos
- Manejo seguro de PDFs

Esta estructura refleja fielmente la funcionalidad de la aplicación iOS original, manteniendo sus características específicas mientras aprovecha las capacidades web modernas.
