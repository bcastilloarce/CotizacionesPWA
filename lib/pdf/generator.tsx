import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import type { Quote, Product } from '@prisma/client';

// Register custom fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: '/fonts/Helvetica.ttf' },
    { src: '/fonts/Helvetica-Bold.ttf', fontWeight: 'bold' },
  ],
});

// Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  logo: {
    width: 926,
    height: 272,
    marginBottom: 40,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    textDecoration: 'underline',
    fontFamily: 'Helvetica-Bold',
  },
  clientTable: {
    marginBottom: 60,
    width: '100%',
  },
  clientRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderColor: '#000',
    paddingVertical: 10,
  },
  clientLabel: {
    width: '20%',
    backgroundColor: '#f0f0f0',
    padding: 5,
    fontFamily: 'Helvetica-Bold',
  },
  clientValue: {
    width: '80%',
    padding: 5,
  },
  productsTable: {
    marginBottom: 40,
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottom: 1,
    borderColor: '#000',
    fontFamily: 'Helvetica-Bold',
    padding: 10,
  },
  productCol: {
    width: '40%',
    textAlign: 'left',
  },
  quantityCol: {
    width: '20%',
    textAlign: 'center',
  },
  priceCol: {
    width: '20%',
    textAlign: 'center',
  },
  totalCol: {
    width: '20%',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderColor: '#000',
    padding: 10,
  },
  total: {
    marginTop: 20,
    textAlign: 'right',
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
  },
  availability: {
    marginTop: 10,
    fontFamily: 'Helvetica-Bold',
  },
  signature: {
    marginTop: 40,
    alignItems: 'center',
  },
  signatureImage: {
    width: 110,
    height: 110,
  },
  signatureText: {
    marginTop: 10,
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontSize: 10,
  },
});

// Format currency in CLP
const formatCurrency = (amount: number) => {
  return `$${amount.toLocaleString('es-CL')}`;
};

interface QuoteDocumentProps {
  quote: Quote & { products: Product[] };
  signatureUrl?: string;
}

export const QuoteDocument = ({ quote, signatureUrl }: QuoteDocumentProps) => {
  const durationText = quote.untilStockLasts
    ? `${quote.duration} o hasta agotar stock`
    : quote.duration;

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Image src="/logo.png" style={styles.logo} />
        <Text style={styles.title}>Cotización</Text>

        {/* Client Information */}
        <View style={styles.clientTable}>
          <View style={styles.clientRow}>
            <Text style={styles.clientLabel}>Cliente</Text>
            <Text style={styles.clientValue}>{quote.client}</Text>
          </View>
          <View style={styles.clientRow}>
            <Text style={styles.clientLabel}>Fecha</Text>
            <Text style={styles.clientValue}>
              {new Date(quote.date).toLocaleDateString('es-CL')}
            </Text>
          </View>
          <View style={styles.clientRow}>
            <Text style={styles.clientLabel}>Marca</Text>
            <Text style={styles.clientValue}>{quote.brand}</Text>
          </View>
          <View style={styles.clientRow}>
            <Text style={styles.clientLabel}>Modelo</Text>
            <Text style={styles.clientValue}>{quote.model}</Text>
          </View>
          {quote.year && (
            <View style={styles.clientRow}>
              <Text style={styles.clientLabel}>Año</Text>
              <Text style={styles.clientValue}>{quote.year}</Text>
            </View>
          )}
          {quote.licensePlate && (
            <View style={styles.clientRow}>
              <Text style={styles.clientLabel}>Patente</Text>
              <Text style={styles.clientValue}>{quote.licensePlate}</Text>
            </View>
          )}
          <View style={styles.clientRow}>
            <Text style={styles.clientLabel}>Duración</Text>
            <Text style={styles.clientValue}>{durationText}</Text>
          </View>
        </View>

        {/* Products Table */}
        <View style={styles.productsTable}>
          <View style={styles.tableHeader}>
            <Text style={styles.productCol}>Producto</Text>
            <Text style={styles.quantityCol}>Cantidad</Text>
            <Text style={styles.priceCol}>Precio</Text>
            <Text style={styles.totalCol}>Total</Text>
          </View>
          {quote.products.map((product: Product, index: number) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.productCol}>{product.name}</Text>
              <Text style={styles.quantityCol}>{product.quantity}</Text>
              <Text style={styles.priceCol}>{formatCurrency(product.unitPrice)}</Text>
              <Text style={styles.totalCol}>{formatCurrency(product.subtotal)}</Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <Text style={styles.total}>
          Total con IVA: {formatCurrency(quote.totalWithTax)}
        </Text>

        {/* Availability */}
        {quote.availability && (
          <Text style={styles.availability}>
            Disponibilidad: {quote.availability}
          </Text>
        )}

        {/* Signature */}
        <View style={styles.signature}>
          {signatureUrl ? (
            <Image src={signatureUrl} style={styles.signatureImage} />
          ) : (
            <>
              <Text style={styles.signatureText}>Repuestos Oyarce</Text>
              <Text>Teléfono: +56 X XXXX XXXX</Text>
            </>
          )}
        </View>

        {/* Page Number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
};

export const generateQuotePDF = async (quote: Quote & { products: Product[] }) => {
  return QuoteDocument({ quote });
};
