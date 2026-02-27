import { View, Text } from '@react-pdf/renderer';
import { styles, colors } from './pdf-styles';

interface PdfHeaderProps {
  title: string;
  contractorName: string;
  companyName: string;
  sentAt: string;
  expiresAt: string | null;
  coverLetter: string | null;
  plainLanguageSummary: string | null;
  estimatedCost: number;
  durationDays: number;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatCurrencyPdf(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PdfHeader({
  title,
  contractorName,
  companyName,
  sentAt,
  expiresAt,
  coverLetter,
  plainLanguageSummary,
  estimatedCost,
  durationDays,
}: PdfHeaderProps) {
  return (
    <View style={styles.section}>
      {/* Branding */}
      <Text
        style={{
          fontSize: 10,
          fontFamily: 'Helvetica-Bold',
          color: colors.blue600,
          marginBottom: 16,
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}
      >
        RenoNext Proposal
      </Text>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Contractor + dates */}
      <Text style={styles.subtitle}>
        Prepared by {contractorName}
        {companyName !== contractorName ? ` — ${companyName}` : ''}
      </Text>
      <Text style={{ fontSize: 9, color: colors.gray500, marginBottom: 12 }}>
        Sent {formatDate(sentAt)}
        {expiresAt ? ` · Valid until ${formatDate(expiresAt)}` : ''}
      </Text>

      {/* Key figures */}
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          marginBottom: 12,
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: colors.gray50,
          borderRadius: 6,
        }}
      >
        <View>
          <Text style={styles.label}>Estimated Cost</Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Helvetica-Bold',
              color: colors.gray900,
            }}
          >
            {formatCurrencyPdf(estimatedCost)}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Duration</Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Helvetica-Bold',
              color: colors.gray900,
            }}
          >
            {durationDays} days
          </Text>
        </View>
      </View>

      {/* Cover letter */}
      {coverLetter && (
        <View style={{ marginBottom: 8 }}>
          <Text style={{ ...styles.body, marginBottom: 4 }}>{coverLetter}</Text>
        </View>
      )}

      {/* Plain language summary */}
      {plainLanguageSummary && (
        <View
          style={{
            backgroundColor: colors.gray50,
            padding: 10,
            borderRadius: 4,
          }}
        >
          <Text style={styles.label}>In Plain Language</Text>
          <Text style={{ ...styles.body, marginTop: 4 }}>
            {plainLanguageSummary}
          </Text>
        </View>
      )}
    </View>
  );
}
