# CotizacionesiOS - Sistema de Gestión de Cotizaciones para iOS

## Descripción General

CotizacionesiOS es una aplicación iOS nativa desarrollada en Swift que permite la gestión de cotizaciones de repuestos automotrices. La aplicación ofrece una interfaz moderna y fluida, siguiendo los patrones de diseño y guías de estilo de iOS.

## Arquitectura

### Patrones de Diseño

- MVVM (Model-View-ViewModel)
- Singleton para servicios compartidos
- Repository Pattern para datos
- Observer Pattern (usando @Published y ObservableObject)

### Estructura del Proyecto

```txt
CotizacionesiOS/
├── Views/
│   ├── CotizacionView/
│   │   ├── CotizacionView.swift
│   │   ├── NuevaCotizacionView.swift
│   │   └── Components/
│   │       ├── AgregarProductoView.swift
│   │       ├── ModeloPickerView.swift
│   │       └── PDFPreviewView.swift
│   └── HistorialView/
│       └── HistorialView.swift
├── Models/
│   ├── Item.swift
│   └── CotizacionHistorial.swift
├── Services/
│   ├── PDFServices.swift
│   └── HistorialService.swift
├── Resources/
│   └── Config/
│       ├── Constants.swift
│       └── marcasymodelos.swift
├── Assets.xcassets/
│   ├── Logo.imageset/
│   ├── Firma.imageset/
│   ├── LaunchImage.imageset/
│   └── AppIcon.appiconset/
├── Docs/
│   ├── DocumentoTecnico.md
│   └── PDFCotizaciones.md
├── ContentView.swift
├── CotizacionesiOSApp.swift
├── LaunchScreen.storyboard
└── Info.plist
```

## Vistas Principales

### CotizacionView

Vista principal para la gestión de cotizaciones:

- Interfaz limpia con botón prominente para nueva cotización
- Navegación integrada usando NavigationStack
- Acceso rápido a nueva cotización mediante botón flotante y botón principal
- Lista de cotizaciones existentes

### NuevaCotizacionView

Vista para crear nuevas cotizaciones:

#### Secciones del Formulario

1. Información del Cliente
   - Cliente (TextField, obligatorio)
     - Campo de texto libre
     - Requerido para generar PDF

2. Datos del Vehículo
   - Marca (Picker, obligatorio)
     - Selector desplegable
     - Valor inicial: "Selecciona Marca"
     - Opciones cargadas desde archivo de configuración
   - Modelo (Picker, obligatorio)
     - Selector desplegable dependiente de la marca seleccionada
     - Valor inicial: "Selecciona Modelo"
     - Opciones actualizadas según la marca elegida
   - Año (Picker, obligatorio)
     - Selector numérico
     - Rango: 1995-2025 en orden descendente
     - Valor predeterminado: año actual
   - Patente (TextField, opcional)
     - Campo de texto con autoconversión a mayúsculas
     - Formato libre

3. Condiciones
   - Fecha (DatePicker, obligatorio)
     - Selector de fecha nativo
     - Valor predeterminado: fecha actual
   - Duración (Picker, obligatorio)
     - Selector con opciones predefinidas
     - Valor predeterminado: "1 día"
   - Hasta agotar stock (Toggle)
     - Interruptor de activación/desactivación
     - Valor predeterminado: activado
   - Disponibilidad (TextField, opcional)
     - Campo de texto libre
     - Información adicional sobre disponibilidad

4. Productos
   - Lista de productos agregados
     - Visualización de nombre, cantidad y precio
     - Subtotal por producto
     - Opciones de edición y eliminación
   - Total con IVA (calculado)
     - Actualización automática
     - Formato de moneda

#### Acciones Principales

- Botón "Generar PDF" (habilitado solo si el formulario es válido)
- Botón "Cancelar" (cierra la vista)
- Gestión de productos (agregar/editar/eliminar)

#### Validaciones

- Campos obligatorios deben estar completos
- Marca y modelo deben ser selecciones válidas
- Al menos un producto debe estar agregado
- Validación en tiempo real del formulario

### PDFPreviewView

Vista de previsualización del PDF:

- Integración nativa con PDFKit
- Visualización del documento generado
- Controles de zoom y navegación
- Opciones para compartir y guardar

## Servicios Principales

### HistorialService

Singleton que gestiona el historial de cotizaciones:

- Almacenamiento persistente usando UserDefaults
- Operaciones CRUD para cotizaciones:
  - Agregar nueva cotización
  - Eliminar cotización existente
  - Cargar historial al inicio
  - Guardar cambios automáticamente
- Publicación de cambios usando @Published
- Ordenamiento cronológico inverso (más reciente primero)

### PDFService

Servicio asíncrono de generación de PDFs:

- Generación asíncrona usando async/await
- Manejo de errores robusto
- Características del PDF:
  - Logo corporativo
  - Información detallada del cliente y vehículo
  - Tabla de productos con formato profesional
  - Cálculos de subtotales y total con IVA
  - Firma digital
  - Información de validez y disponibilidad
- Constantes configurables para márgenes y estilos
- Carga optimizada de recursos (imágenes)
- Notificación de estado de generación

## Modelos de Datos

### Producto

```swift
struct Producto: Identifiable, Codable {
    let id: UUID
    var nombre: String
    var cantidad: Int
    var precioUnitario: Double

    var subtotal: Double {
        Double(cantidad) * precioUnitario
    }
}
```

### Cotizacion

```swift
struct Cotizacion: Codable {
    let cliente: String
    let marca: String
    let modelo: String
    let año: Int
    let patente: String
    let fecha: Date
    let duracion: String
    let hastaAgotarStock: Bool
    let productos: [Producto]
    let disponibilidad: String
    let totalConIVA: Double
}
```

### VehicleData

Estructura para manejo de datos de vehículos:

- Datos de marcas y modelos definidos en archivo Swift de configuración
- Estructura jerárquica:

  ```swift
  struct Marca {
      let nombre: String
      let modelos: [String]
  }
  ```

- Métodos estáticos para acceso y filtrado de datos
- Carga eficiente desde configuración estática
- Validación de datos al cargar

## Características de Seguridad y Persistencia

- Validación de datos en entrada
- Manejo seguro de errores en generación de PDF
- Persistencia automática de historial
- Backup implícito en UserDefaults
- Manejo seguro de recursos del sistema

## Interfaz de Usuario

- Diseño nativo de iOS
- Navegación intuitiva
- Feedback visual en acciones importantes
- Previsualización antes de generar PDF
- Validación en tiempo real
- Mensajes de error descriptivos

## Gestión de Recursos

### Constantes y Configuración

- Estructura organizada en Constants.swift
- Separación por dominios (GUI, PDF, iOS, etc.)
- Configuración de estilos y formatos

### Datos Predefinidos

- Catálogo completo de marcas y modelos en marcasymodelos.swift
- Formato estructurado para fácil mantenimiento
- Soporte para múltiples marcas y variantes

## Generación de PDF

### Características

- Diseño profesional y consistente
- Logo corporativo
- Información detallada del cliente y vehículo
- Tabla de productos con subtotales
- Firma digital
- Numeración automática

### Formato

- Tamaño carta (8.5" x 11")
- Márgenes configurables
- Fuentes corporativas
- Estilos definidos para encabezados y contenido

## Almacenamiento

### Persistencia de Datos

- SwiftData para el modelo de datos principal
- Sistema de archivos para PDFs generados
- Assets.xcassets para recursos gráficos

### Formato de Archivos

- PDFs: N001_nombrecliente.pdf
- Datos: JSON codificado para historial
- Recursos: Assets.xcassets para imágenes

## Requisitos Técnicos

### Versión iOS

- iOS 15.0 o superior
- Orientación: Portrait
- Dispositivos: iPhone y iPad

### Dependencias

- SwiftUI para UI
- PDFKit para generación de documentos
- SwiftData para modelo de datos
