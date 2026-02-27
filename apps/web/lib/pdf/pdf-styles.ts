import { StyleSheet } from '@react-pdf/renderer';

// Colors — mapped from project design tokens
export const colors = {
  violet600: '#7c3aed',
  emerald600: '#059669',
  amber600: '#d97706',
  blue600: '#2563eb',
  gray900: '#111827',
  gray700: '#374151',
  gray500: '#6b7280',
  gray400: '#9ca3af',
  gray200: '#e5e7eb',
  gray100: '#f3f4f6',
  gray50: '#f9fafb',
  white: '#ffffff',
  red600: '#dc2626',
} as const;

export const tierColors: Record<string, string> = {
  HIGH: colors.emerald600,
  MEDIUM: colors.amber600,
  LOW: colors.red600,
};

export const styles = StyleSheet.create({
  // Page
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: colors.gray900,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: colors.gray400,
  },

  // Section
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colors.gray900,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 9,
    color: colors.gray500,
    marginBottom: 12,
  },

  // Card-like container
  card: {
    border: `1 solid ${colors.gray200}`,
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
  },

  // Table
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.gray50,
    borderBottom: `1 solid ${colors.gray200}`,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: `1 solid ${colors.gray100}`,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  tableHeaderText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableCell: {
    fontSize: 9,
    color: colors.gray700,
  },

  // Badge
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },

  // Typography
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: colors.gray900,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: colors.gray500,
    marginBottom: 2,
  },
  body: {
    fontSize: 9,
    lineHeight: 1.5,
    color: colors.gray700,
  },
  label: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  caption: {
    fontSize: 8,
    color: colors.gray400,
  },

  // Utilities
  row: {
    flexDirection: 'row',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    borderBottom: `1 solid ${colors.gray200}`,
    marginVertical: 10,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
});
