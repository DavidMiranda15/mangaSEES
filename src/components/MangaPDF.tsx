import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import type { Manga } from '../types';

const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: '#ffffff' },
  section: { margin: 10, padding: 10, borderBottom: '1px solid #EEE' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20, color: '#0891b2' },
  label: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  value: { fontSize: 14, marginBottom: 10 }
});

const MyDocument = ({ manga }: { manga: Manga }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Recibo de Renta - MangaSEES</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Manga:</Text>
        <Text style={styles.value}>{manga.nombre}</Text>
        
        <Text style={styles.label}>Cliente:</Text>
        <Text style={styles.value}>{manga.cliente}</Text>
        
        <Text style={styles.label}>Fecha de Entrega:</Text>
        <Text style={styles.value}>{new Date(manga.fechaFin).toLocaleDateString()}</Text>
      </View>
      <Text style={{ fontSize: 10, textAlign: 'center', marginTop: 20 }}>
        Gracias por su preferencia. Conserve este recibo para la devolución.
      </Text>
    </Page>
  </Document>
);

export const DownloadPDF = ({ manga }: { manga: Manga }) => (
  <PDFDownloadLink document={<MyDocument manga={manga} />} fileName={`Recibo_${manga.nombre}.pdf`}>
    {({ loading }) => (loading ? '...' : 'PDF')}
  </PDFDownloadLink>
);