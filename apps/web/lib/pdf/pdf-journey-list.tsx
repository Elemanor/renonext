import { View, Text } from '@react-pdf/renderer';
import { styles, colors } from './pdf-styles';
import { JOURNEY_CAPTION } from '@/lib/ui/copy';
import type { SequenceStep } from '@renonext/shared/types';

interface PdfJourneyListProps {
  steps: SequenceStep[];
}

export function PdfJourneyList({ steps }: PdfJourneyListProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Project Journey</Text>
      <Text style={styles.sectionSubtitle}>{JOURNEY_CAPTION}</Text>

      {steps.map((step) => (
        <View
          key={step.id}
          style={{
            marginBottom: 10,
            paddingLeft: 10,
            borderLeft: `2 solid ${colors.gray200}`,
          }}
          wrap={false}
        >
          {/* Step number + title + badges */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3, gap: 6 }}>
            <View
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: colors.blue600,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: colors.white }}>
                {step.step_number}
              </Text>
            </View>
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: colors.gray900, flex: 1 }}>
              {step.title}
            </Text>
            {step.expected_duration_days && (
              <Text
                style={{
                  ...styles.badge,
                  backgroundColor: colors.gray100,
                  color: colors.gray700,
                }}
              >
                {step.expected_duration_days}d
              </Text>
            )}
          </View>

          {/* Tags row */}
          <View style={{ flexDirection: 'row', gap: 4, marginBottom: 4, flexWrap: 'wrap' }}>
            {step.requires_inspection && (
              <Text style={{ ...styles.badge, backgroundColor: '#fef3c7', color: colors.amber600 }}>
                Inspection
              </Text>
            )}
            {step.is_milestone && (
              <Text style={{ ...styles.badge, backgroundColor: '#ede9fe', color: colors.violet600 }}>
                Milestone
              </Text>
            )}
            {step.is_critical_path && (
              <Text style={{ ...styles.badge, backgroundColor: '#fee2e2', color: colors.red600 }}>
                Critical Path
              </Text>
            )}
            {step.triggers_payment && (
              <Text style={{ ...styles.badge, backgroundColor: '#d1fae5', color: colors.emerald600 }}>
                Payment
              </Text>
            )}
          </View>

          {/* Summary */}
          {step.plain_language_summary && (
            <Text style={{ ...styles.body, marginBottom: 3 }}>
              {step.plain_language_summary}
            </Text>
          )}

          {/* What to expect */}
          {step.what_to_expect && (
            <View style={{ marginBottom: 3 }}>
              <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: colors.gray500 }}>
                What to Expect
              </Text>
              <Text style={styles.body}>{step.what_to_expect}</Text>
            </View>
          )}

          {/* Code reference */}
          {step.code_reference && (
            <Text style={{ fontSize: 8, color: colors.blue600 }}>
              Code: {step.code_reference}
            </Text>
          )}

          {/* Safety notes */}
          {step.safety_notes && (
            <Text style={{ fontSize: 8, color: colors.amber600 }}>
              Safety: {step.safety_notes}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}
