import { View, Text } from '@react-pdf/renderer';
import { styles, colors } from './pdf-styles';
import { GLOSSARY, DISCLAIMER_COPY } from '@/lib/ui/copy';

export function PdfTerms() {
  const glossaryEntries = Object.entries(GLOSSARY) as [string, string][];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Terms &amp; Definitions</Text>

      {/* Glossary */}
      {glossaryEntries.map(([term, definition]) => (
        <View key={term} style={{ marginBottom: 6 }}>
          <Text
            style={{
              fontSize: 9,
              fontFamily: 'Helvetica-Bold',
              color: colors.gray900,
              textTransform: 'capitalize',
            }}
          >
            {term.replace(/([A-Z])/g, ' $1').trim()}
          </Text>
          <Text style={styles.body}>{definition}</Text>
        </View>
      ))}

      {/* Disclaimer */}
      <View style={{ ...styles.divider }} />
      <Text style={{ ...styles.caption, lineHeight: 1.4 }}>
        {DISCLAIMER_COPY}
      </Text>
    </View>
  );
}
