import { View, Text } from '@react-pdf/renderer';
import { styles, colors } from './pdf-styles';
import { MILESTONE_CAPTION } from '@/lib/ui/copy';
import type { PaymentMilestone } from '@/lib/utils/payment-milestones';

interface PdfPaymentTableProps {
  milestones: PaymentMilestone[];
  estimatedCost: number;
}

function formatCurrencyPdf(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PdfPaymentTable({ milestones, estimatedCost }: PdfPaymentTableProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment Schedule</Text>
      <Text style={styles.sectionSubtitle}>{MILESTONE_CAPTION}</Text>

      {/* Table header */}
      <View style={styles.tableHeader}>
        <Text style={{ ...styles.tableHeaderText, flex: 1 }}>Milestone</Text>
        <Text style={{ ...styles.tableHeaderText, width: 70, textAlign: 'right' }}>Amount</Text>
        <Text style={{ ...styles.tableHeaderText, width: 40, textAlign: 'right' }}>%</Text>
        <Text style={{ ...styles.tableHeaderText, width: 90, textAlign: 'right' }}>Due At</Text>
      </View>

      {/* Rows */}
      {milestones.map((m, i) => (
        <View key={i} style={styles.tableRow}>
          <Text style={{ ...styles.tableCell, flex: 1 }}>{m.label}</Text>
          <Text style={{ ...styles.tableCell, width: 70, textAlign: 'right' }}>
            {formatCurrencyPdf(m.amount)}
          </Text>
          <Text style={{ ...styles.tableCell, width: 40, textAlign: 'right' }}>
            {m.percent}%
          </Text>
          <Text style={{ ...styles.tableCell, width: 90, textAlign: 'right' }}>
            {m.dueAt}
          </Text>
        </View>
      ))}

      {/* Total row */}
      <View
        style={{
          ...styles.tableRow,
          borderBottom: 'none',
          backgroundColor: colors.gray50,
        }}
      >
        <Text style={{ ...styles.tableCell, flex: 1, fontFamily: 'Helvetica-Bold' }}>
          Total
        </Text>
        <Text
          style={{
            ...styles.tableCell,
            width: 70,
            textAlign: 'right',
            fontFamily: 'Helvetica-Bold',
          }}
        >
          {formatCurrencyPdf(estimatedCost)}
        </Text>
        <Text
          style={{
            ...styles.tableCell,
            width: 40,
            textAlign: 'right',
            fontFamily: 'Helvetica-Bold',
          }}
        >
          100%
        </Text>
        <Text style={{ ...styles.tableCell, width: 90 }} />
      </View>
    </View>
  );
}
