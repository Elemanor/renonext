import { View, Text } from '@react-pdf/renderer';
import { styles, colors, tierColors } from './pdf-styles';
import type { SCIResult } from '@/lib/utils/scope-confidence';

interface PdfSciGaugeProps {
  sci: SCIResult;
}

const breakdownLabels: Record<string, string> = {
  stepCoverage: 'Step Coverage',
  inspectionCoverage: 'Inspections',
  gateCoverage: 'Quality Gates',
  codeReferences: 'Code References',
  paymentStructure: 'Payment Structure',
  warrantyTerms: 'Warranty Terms',
  bcinBonus: 'BCIN Bonus',
};

export function PdfSciGauge({ sci }: PdfSciGaugeProps) {
  const percent = Math.round(sci.score * 100);
  const tierColor = tierColors[sci.tier] ?? colors.gray500;

  const entries = Object.entries(sci.breakdown) as [string, number][];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Scope Confidence Index</Text>

      {/* Score + tier */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 12,
          gap: 12,
        }}
      >
        <Text
          style={{
            fontSize: 36,
            fontFamily: 'Helvetica-Bold',
            color: tierColor,
          }}
        >
          {percent}%
        </Text>
        <View
          style={{
            ...styles.badge,
            backgroundColor: tierColor,
            color: colors.white,
            paddingHorizontal: 8,
            paddingVertical: 3,
          }}
        >
          <Text
            style={{
              fontSize: 8,
              fontFamily: 'Helvetica-Bold',
              color: colors.white,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {sci.tier} confidence
          </Text>
        </View>
      </View>

      {/* Breakdown grid — 2 columns */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {entries.map(([key, value]) => (
          <View
            key={key}
            style={{
              width: '48%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 3,
              paddingHorizontal: 6,
              backgroundColor: colors.gray50,
              borderRadius: 3,
            }}
          >
            <Text style={{ fontSize: 8, color: colors.gray700 }}>
              {breakdownLabels[key] ?? key}
            </Text>
            <Text
              style={{
                fontSize: 8,
                fontFamily: 'Helvetica-Bold',
                color: colors.gray900,
              }}
            >
              {Math.round(value * 100)}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
