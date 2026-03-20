import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { type ContractFormData, type ContractSection, type ContractTemplate } from '@/lib/data/contracts';

interface ContractPDFProps {
  formData: ContractFormData;
  sections: ContractSection[];
  referenceNumber: string;
  holdback: { holdbackAmount: number; holdbackPercent: number; releaseNote: string };
  hstInfo: { hst: number; total: number };
  template: ContractTemplate;
}

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #0fbabd',
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 11,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  refNumberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  refNumber: {
    fontSize: 9,
    color: '#999',
  },
  date: {
    fontSize: 9,
    color: '#999',
  },
  disclaimer: {
    fontSize: 8,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  complianceText: {
    fontSize: 7,
    color: '#999',
    textAlign: 'center',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#0fbabd',
    marginTop: 16,
    marginBottom: 6,
  },
  sectionContent: {
    fontSize: 10,
    color: '#333',
    marginBottom: 8,
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  table: {
    marginTop: 8,
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottom: '1 solid #999',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottom: '0.5 solid #ddd',
  },
  tableRowBold: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#f9f9f9',
    borderTop: '1 solid #666',
    borderBottom: '2 solid #666',
  },
  tableCell: {
    fontSize: 9,
  },
  tableCellBold: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
  },
  tableCellHeader: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#333',
  },
  colMilestone: { width: '60%' },
  colPercent: { width: '15%', textAlign: 'right' },
  colAmount: { width: '25%', textAlign: 'right' },
  colItem: { width: '60%' },
  colLabourWarranty: { width: '20%', textAlign: 'center' },
  colMaterialWarranty: { width: '20%', textAlign: 'center' },
  notice: {
    marginTop: 20,
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#fff9e6',
    border: '2 solid #0fbabd',
    borderRadius: 4,
  },
  noticeTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#0fbabd',
    marginBottom: 4,
  },
  noticeContent: {
    fontSize: 9,
    color: '#333',
    lineHeight: 1.5,
  },
  signatureSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTop: '1 solid #999',
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  signatureBlock: {
    width: '45%',
  },
  signatureLabel: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  signatureName: {
    fontSize: 10,
    marginBottom: 16,
  },
  signatureLine: {
    borderBottom: '1 solid #333',
    marginBottom: 4,
    paddingBottom: 2,
  },
  signatureLineLabel: {
    fontSize: 8,
    color: '#666',
    marginBottom: 16,
  },
  signatureAcknowledgment: {
    fontSize: 9,
    textAlign: 'center',
    color: '#666',
    marginTop: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: '#999',
    borderTop: '0.5 solid #ddd',
    paddingTop: 8,
  },
  footerLeft: {
    width: '33%',
  },
  footerCenter: {
    width: '34%',
    textAlign: 'center',
  },
  footerRight: {
    width: '33%',
    textAlign: 'right',
  },
});

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount);
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export function ContractPDF({
  formData,
  sections,
  referenceNumber,
  holdback,
  hstInfo,
  template,
}: ContractPDFProps) {
  const currentDate = formatDate(new Date());

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>RENOVATION CONTRACT</Text>
          <Text style={styles.subtitle}>
            Ontario-Compliant Residential Renovation Agreement
          </Text>
          <View style={styles.refNumberRow}>
            <Text style={styles.refNumber}>Contract #: {referenceNumber}</Text>
            <Text style={styles.date}>Date: {currentDate}</Text>
          </View>
          <Text style={styles.disclaimer}>
            Generated by RenoNext — renonext.com
          </Text>
          <Text style={styles.complianceText}>
            This contract was prepared using RenoNext's contract generator and complies with Ontario's Consumer Protection Act, 2002 and the Construction Act, R.S.O. 1990.
          </Text>
        </View>

        {/* Contract Sections */}
        {sections.map((section, index) => {
          // Special handling for Payment Schedule
          if (section.title === 'Payment Schedule' && formData.milestones && formData.milestones.length > 0) {
            return (
              <View key={index} wrap={false}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionContent}>{section.content}</Text>

                <View style={styles.table}>
                  <View style={styles.tableHeader}>
                    <Text style={[styles.tableCellHeader, styles.colMilestone]}>
                      Milestone
                    </Text>
                    <Text style={[styles.tableCellHeader, styles.colPercent]}>
                      %
                    </Text>
                    <Text style={[styles.tableCellHeader, styles.colAmount]}>
                      Amount
                    </Text>
                  </View>

                  {formData.milestones.map((milestone, idx) => (
                    <View key={idx} style={styles.tableRow}>
                      <Text style={[styles.tableCell, styles.colMilestone]}>
                        {milestone.name}
                      </Text>
                      <Text style={[styles.tableCell, styles.colPercent]}>
                        {milestone.percentage}%
                      </Text>
                      <Text style={[styles.tableCell, styles.colAmount]}>
                        {formatCurrency(milestone.amount)}
                      </Text>
                    </View>
                  ))}

                  {/* Subtotal */}
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCellBold, styles.colMilestone]}>
                      Subtotal
                    </Text>
                    <Text style={[styles.tableCell, styles.colPercent]}></Text>
                    <Text style={[styles.tableCellBold, styles.colAmount]}>
                      {formatCurrency(formData.totalPrice)}
                    </Text>
                  </View>

                  {/* HST */}
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.colMilestone]}>
                      HST (13%)
                    </Text>
                    <Text style={[styles.tableCell, styles.colPercent]}></Text>
                    <Text style={[styles.tableCell, styles.colAmount]}>
                      {formatCurrency(hstInfo.hst)}
                    </Text>
                  </View>

                  {/* Holdback */}
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.colMilestone]}>
                      10% Statutory Holdback
                    </Text>
                    <Text style={[styles.tableCell, styles.colPercent]}></Text>
                    <Text style={[styles.tableCell, styles.colAmount]}>
                      {formatCurrency(holdback.holdbackAmount)}
                    </Text>
                  </View>

                  {/* Grand Total */}
                  <View style={styles.tableRowBold}>
                    <Text style={[styles.tableCellBold, styles.colMilestone]}>
                      Grand Total (incl. HST, less Holdback)
                    </Text>
                    <Text style={[styles.tableCell, styles.colPercent]}></Text>
                    <Text style={[styles.tableCellBold, styles.colAmount]}>
                      {formatCurrency(hstInfo.total - holdback.holdbackAmount)}
                    </Text>
                  </View>
                </View>

                <Text style={styles.sectionContent}>
                  {holdback.releaseNote}
                </Text>
              </View>
            );
          }

          // Warranty section — rendered as text (warranty terms are a formatted string)
          // No special handling needed, falls through to regular section rendering

          // Regular sections
          return (
            <View key={index}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          );
        })}

        {/* CPA Compliance Notice */}
        <View style={styles.notice} wrap={false}>
          <Text style={styles.noticeTitle}>CONSUMER PROTECTION ACT NOTICE</Text>
          <Text style={styles.noticeContent}>
            Under Ontario's Consumer Protection Act, 2002, you have a 10-day cooling-off period for contracts signed at your home. During this period, you may cancel the contract without penalty by providing written notice to the contractor. This right cannot be waived. The cooling-off period begins on the day the contract is signed.
          </Text>
        </View>

        {/* Signature Block */}
        <View style={styles.signatureSection} wrap={false}>
          <View style={styles.signatureRow}>
            {/* Homeowner */}
            <View style={styles.signatureBlock}>
              <Text style={styles.signatureLabel}>Homeowner</Text>
              <Text style={styles.signatureName}>
                {formData.homeowner.fullName || '________________________________'}
              </Text>
              <View style={styles.signatureLine}>
                <Text> </Text>
              </View>
              <Text style={styles.signatureLineLabel}>Signature</Text>
              <View style={styles.signatureLine}>
                <Text> </Text>
              </View>
              <Text style={styles.signatureLineLabel}>Date</Text>
            </View>

            {/* Contractor */}
            <View style={styles.signatureBlock}>
              <Text style={styles.signatureLabel}>Contractor</Text>
              <Text style={styles.signatureName}>
                {formData.contractor.businessName || '________________________________'}
              </Text>
              <View style={styles.signatureLine}>
                <Text> </Text>
              </View>
              <Text style={styles.signatureLineLabel}>Signature</Text>
              <View style={styles.signatureLine}>
                <Text> </Text>
              </View>
              <Text style={styles.signatureLineLabel}>Date</Text>
            </View>
          </View>

          <Text style={styles.signatureAcknowledgment}>
            Both parties acknowledge receipt of a copy of this contract.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerLeft}>{referenceNumber}</Text>
          <Text style={styles.footerCenter}>
            RenoNext — Ontario-Compliant Contract
          </Text>
          <Text
            style={styles.footerRight}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
