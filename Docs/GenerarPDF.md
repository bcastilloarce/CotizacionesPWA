# Especificaciones de las Cotizaciones generadas en PDF 📄

## Descripción General

Este documento especifica el formato y elementos de los PDFs de cotización generados por CotizacionesApp. El propósito es crear cotizaciones profesionales y estandarizadas para Repuestos Oyarce, permitiendo detallar productos automotrices con sus respectivos precios, información del cliente y condiciones comerciales.

## Estructura Visual

El PDF se compone de los siguientes elementos en orden descendente:

1. Logo
     - Imagen de logo
2. Título "Cotización" (subrayado)
3. Tabla de datos del cliente
   - Información básica y detalles del vehículo
4. Tabla de productos
   - Lista detallada con cantidades y precios
5. Total con IVA
6. Disponibilidad (cuando aplica)
7. Firma
      - Imagen de firma

## Espaciados Entre Elementos

1. Logo a Título:
   - 40 unidades de espaciado vertical

2. Título a Tabla Cliente:
   - 30 unidades de espaciado vertical

3. Tabla Cliente a Tabla Productos:
   - 60 unidades de espaciado vertical

4. Entre Filas de Productos:
   - 40 unidades de espaciado vertical

5. Tabla Productos a Total:
   - 40 unidades de espaciado vertical

## Formato Monetario

- Todos los montos se muestran en pesos chilenos ($)
- Sin decimales
- Separador de miles con punto (ejemplo: $1.234.567)
- Símbolo peso ($) precede al número

## Configuración General

- Tamaño de página: Letter (8.5" x 11")
- Márgenes: 20 unidades en todos los lados
- Ancho útil: Ancho total - (2 * margen)
- Alto útil: Alto total - (2 * margen)

## Logo

- Posición: Superior centrado
- Ancho: 926 unidades (ajustado al ancho útil de página)
- Alto: 272 unidades (mantiene proporción original)
- Espaciado posterior: 20 unidades

## Título

- Texto: "Cotización" (subrayado)
- Fuente: CustomTitle (basada en Heading1)
- Tamaño: 24pt
- Alineación: Centrada
- Espaciado posterior: 30 unidades

## Tabla de Datos del Cliente

- Ancho de columnas:
  - Etiquetas: 20% del ancho útil
  - Valores: 80% del ancho útil
- Campos obligatorios:
  - Cliente
  - Fecha
  - Marca
  - Modelo
  - Duración
    - Si "Hasta Agotar Stock" está activado, se agrega automáticamente la frase "o hasta agotar stock" después del período seleccionado
    - Ejemplo: "1 día o hasta agotar stock"
- Campos opcionales:
  - Año
  - Patente
  - Disponibilidad
  - Característica especial: Los campos opcionales sin contenido se omiten completamente del PDF, sin generar espacios vacíos ni filas adicionales. El documento se ajusta automáticamente como si estos campos no existieran.
- Estilo:
  - Fondo: Gris claro en columna de etiquetas
  - Borde: Negro en todas las celdas
  - Fuente etiquetas: Helvetica-Bold, 12pt
  - Fuente valores: Helvetica, 12pt
  - Padding inferior: 10 unidades
  - Alineación: Izquierda

## Tabla de Productos

- Encabezados: ["Producto", "Cantidad", "Precio", "Total"]
- Ancho de columnas:
  - Producto: 40% del ancho útil
  - Cantidad: 20% del ancho útil
  - Precio: 20% del ancho útil
  - Total: 20% del ancho útil
- Estilo:
  - Encabezados:
    - Fondo: Gris claro
    - Fuente: Helvetica-Bold, 12pt
  - Contenido:
    - Fuente: Helvetica, 12pt
    - Columna Producto: Alineación izquierda
    - Columnas numéricas: Alineación central
  - Bordes: Cuadrícula completa en negro
  - Padding: 10 unidades superior e inferior
  - Alineación vertical: Superior
  - Ajuste de texto: Automático en columna Producto

### Ajuste Automático de Texto

- La columna "Producto" implementa un sistema de ajuste automático de texto
- El texto largo se divide en múltiples líneas automáticamente
- El ancho de columna se mantiene fijo (40% del ancho útil)
- La altura de la fila se ajusta dinámicamente según el contenido
- Se mantiene la legibilidad del texto sin truncamiento

## Total con IVA

- Posición: Posterior a tabla de productos
- Alineación: Derecha
- Fuente: Helvetica-Bold, 14pt
- Formato: Moneda chilena con separador de miles

## Disponibilidad (Opcional)

- Posición: Posterior al Total
- Fuente: Helvetica-Bold, 12pt
- Alineación: Izquierda
- Espaciado superior: 10 unidades

## Firma

- Posición: Parte inferior
- Espaciado superior: 40 unidades
- Dos opciones:
  1. Imagen de firma:
     - Ancho: 110 unidades
     - Alto: 110 unidades
     - Alineación: Centrada
  2. Texto de firma (fallback):
     - Nombre: Helvetica-Bold, 12pt
     - Empresa y teléfono: Helvetica, 12pt
     - Alineación: Centrada

## Paginación y Continuidad

- Al exceder el contenido de una página:
  - Se genera automáticamente una nueva página
  - Los encabezados de tabla se repiten en cada página nueva
  - Se mantiene el formato y estilo consistente entre páginas
  - La numeración se agrega automáticamente
  - Se preserva la estructura de la cuadrícula

## Espaciado Dinámico

- Los campos opcionales omitidos no dejan espacios vacíos
- El documento se reajusta automáticamente:
  - Las secciones se acercan naturalmente
  - Se mantiene el espaciado proporcional entre elementos
  - No se generan saltos de página innecesarios
  - Se conserva la estética profesional del documento

## Numeración de Cotizaciones

- Formato de archivo: N001_nombrecliente.pdf
- Numeración secuencial:
  - Inicia en 001
  - Se incrementa automáticamente basado en cotizaciones existentes
  - Formato de 3 dígitos con ceros a la izquierda
- Tratamiento del nombre del cliente:
  - Se eliminan caracteres especiales
  - Los espacios se reemplazan por guiones bajos
  - Se mantiene la legibilidad del nombre original
  - Se asegura compatibilidad con sistemas de archivos
- Almacenamiento en carpeta "cotizaciones" dentro del directorio de salida llamado "output"
