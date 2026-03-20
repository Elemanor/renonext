import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

interface CertificatePDFProps {
  fullName: string;
  companyName?: string;
  score: number;
  total: number;
  completionDate: string;
  certificateNumber: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  // Top teal accent bar
  accentBar: {
    height: 12,
    backgroundColor: '#0fbabd',
  },
  container: {
    padding: 50,
    paddingTop: 30,
    flex: 1,
  },
  // Header
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  brand: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#0fbabd',
    letterSpacing: 1,
  },
  certNumber: {
    fontSize: 8,
    color: '#999999',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 30,
  },
  // Certificate body
  titleSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleLabel: {
    fontSize: 10,
    color: '#999999',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#102122',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 1.5,
  },
  // Recipient
  recipientSection: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
    paddingVertical: 20,
    borderTop: '1 solid #0fbabd',
    borderBottom: '1 solid #0fbabd',
  },
  presentedTo: {
    fontSize: 9,
    color: '#999999',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  recipientName: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: '#102122',
    textAlign: 'center',
  },
  companyName: {
    fontSize: 13,
    color: '#666666',
    marginTop: 6,
    textAlign: 'center',
  },
  // Details
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: 10,
    marginBottom: 24,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 8,
    color: '#999999',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#102122',
  },
  // Course info
  courseInfo: {
    backgroundColor: '#f6f8f8',
    borderRadius: 8,
    padding: 20,
    marginBottom: 24,
  },
  courseTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#102122',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 9,
    color: '#666666',
    lineHeight: 1.6,
  },
  outcomesList: {
    marginTop: 8,
  },
  outcomeItem: {
    fontSize: 9,
    color: '#666666',
    lineHeight: 1.8,
  },
  // Disclaimer
  disclaimer: {
    marginTop: 'auto',
    paddingTop: 16,
    borderTop: '1 solid #e5e7eb',
  },
  disclaimerText: {
    fontSize: 7,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 1.5,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  footerText: {
    fontSize: 7,
    color: '#bbbbbb',
  },
});

export function CertificatePDF({
  fullName,
  companyName,
  score,
  total,
  completionDate,
  certificateNumber,
}: CertificatePDFProps) {
  const scorePercent = Math.round((score / total) * 100);

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Teal accent bar */}
        <View style={styles.accentBar} />

        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.brand}>RENONEXT</Text>
            <Text style={styles.certNumber}>Certificate #{certificateNumber}</Text>
          </View>
          <View style={styles.divider} />

          {/* Title */}
          <View style={styles.titleSection}>
            <Text style={styles.titleLabel}>Certificate of Completion</Text>
            <Text style={styles.title}>
              WHMIS 2015 Training
            </Text>
            <Text style={styles.subtitle}>
              Workplace Hazardous Materials Information System{'\n'}
              Generic Education — Aligned with the Globally Harmonized System (GHS)
            </Text>
          </View>

          {/* Recipient */}
          <View style={styles.recipientSection}>
            <Text style={styles.presentedTo}>Presented To</Text>
            <Text style={styles.recipientName}>{fullName}</Text>
            {companyName && <Text style={styles.companyName}>{companyName}</Text>}
          </View>

          {/* Details row */}
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{completionDate}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Score</Text>
              <Text style={styles.detailValue}>
                {score}/{total} ({scorePercent}%)
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Modules</Text>
              <Text style={styles.detailValue}>7 of 7 Completed</Text>
            </View>
          </View>

          {/* Course info */}
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>Learning Outcomes Achieved:</Text>
            <View style={styles.outcomesList}>
              <Text style={styles.outcomeItem}>
                {'\u2022'} Identified all 9 GHS hazard pictograms and their meanings
              </Text>
              <Text style={styles.outcomeItem}>
                {'\u2022'} Interpreted supplier and workplace WHMIS labels
              </Text>
              <Text style={styles.outcomeItem}>
                {'\u2022'} Navigated the 16-section Safety Data Sheet (SDS) format
              </Text>
              <Text style={styles.outcomeItem}>
                {'\u2022'} Understood hazard classification for physical and health hazards
              </Text>
              <Text style={styles.outcomeItem}>
                {'\u2022'} Selected appropriate Personal Protective Equipment (PPE)
              </Text>
              <Text style={styles.outcomeItem}>
                {'\u2022'} Recognized worker rights and responsibilities under WHMIS
              </Text>
            </View>
          </View>

          {/* Disclaimer */}
          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>
              This certificate confirms completion of generic WHMIS 2015 education as defined under the Hazardous Products Act.
              Workplace-specific training on hazardous products present at the worker&apos;s particular workplace must be provided by the employer.
              This training does not replace employer-provided site-specific WHMIS training.
            </Text>
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Generated by RenoNext — renonext.com</Text>
              <Text style={styles.footerText}>Certificate #{certificateNumber}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
