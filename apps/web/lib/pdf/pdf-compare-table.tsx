import { View, Text } from '@react-pdf/renderer';
import { styles, colors } from './pdf-styles';
import { COMPARE_CAPTION } from '@/lib/ui/copy';

interface PdfCompareTableProps {
  stepCount: number;
  inspectionCount: number;
  gateCount: number;
  hasCodeReferences: boolean;
  holdbackPercent: number;
  hasBcin: boolean;
}

export function PdfCompareTable({
  stepCount,
  inspectionCount,
  gateCount,
  hasCodeReferences,
  holdbackPercent,
  hasBcin,
}: PdfCompareTableProps) {
  const rows = [
    { label: 'Defined Steps', value: String(stepCount) },
    { label: 'City Inspections', value: String(inspectionCount) },
    { label: 'Quality Checkpoints', value: String(gateCount) },
    { label: 'Code Compliance', value: hasCodeReferences ? 'Referenced' : 'Not referenced' },
    { label: 'Payment Holdback', value: `${holdbackPercent}%` },
    { label: 'BCIN Licensed', value: hasBcin ? 'Yes' : 'No' },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>What&apos;s Included</Text>
      <Text style={styles.sectionSubtitle}>{COMPARE_CAPTION}</Text>

      {/* Table header */}
      <View style={styles.tableHeader}>
        <Text style={{ ...styles.tableHeaderText, flex: 1 }}>Feature</Text>
        <Text style={{ ...styles.tableHeaderText, width: 100, textAlign: 'right' }}>
          This Proposal
        </Text>
      </View>

      {/* Table rows */}
      {rows.map((row) => (
        <View key={row.label} style={styles.tableRow}>
          <Text style={{ ...styles.tableCell, flex: 1 }}>{row.label}</Text>
          <Text
            style={{
              ...styles.tableCell,
              width: 100,
              textAlign: 'right',
              fontFamily: 'Helvetica-Bold',
            }}
          >
            {row.value}
          </Text>
        </View>
      ))}
    </View>
  );
}
