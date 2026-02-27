import { View, Text } from '@react-pdf/renderer';
import { styles, colors } from './pdf-styles';
import type { ContractorProfileResponse, ProProfileResponse } from '@/lib/supabase/types';

interface PdfContractorInfoProps {
  contractorProfile: ContractorProfileResponse;
  proProfile: ProProfileResponse | null;
}

export function PdfContractorInfo({
  contractorProfile,
  proProfile,
}: PdfContractorInfoProps) {
  const companyName = proProfile?.company_name ?? contractorProfile.full_name;

  const stats = [
    {
      label: 'Experience',
      value: proProfile?.years_experience ? `${proProfile.years_experience} years` : 'N/A',
    },
    {
      label: 'Jobs Completed',
      value: proProfile?.total_jobs_completed?.toString() ?? '0',
    },
    {
      label: 'Rating',
      value: proProfile?.avg_rating ? `${proProfile.avg_rating.toFixed(1)} / 5.0` : 'N/A',
    },
    {
      label: 'Reviews',
      value: proProfile?.total_reviews?.toString() ?? '0',
    },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Your Contractor</Text>

      {/* Name + company */}
      <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: colors.gray900, marginBottom: 2 }}>
        {contractorProfile.full_name}
      </Text>
      {companyName !== contractorProfile.full_name && (
        <Text style={{ fontSize: 9, color: colors.gray500, marginBottom: 8 }}>
          {companyName}
        </Text>
      )}

      {/* BCIN status */}
      {proProfile?.bcin_verified && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            marginBottom: 8,
          }}
        >
          <View
            style={{
              ...styles.badge,
              backgroundColor: '#d1fae5',
              color: colors.emerald600,
            }}
          >
            <Text
              style={{
                fontSize: 7,
                fontFamily: 'Helvetica-Bold',
                color: colors.emerald600,
                textTransform: 'uppercase',
              }}
            >
              BCIN Verified
            </Text>
          </View>
          {proProfile.bcin && (
            <Text style={{ fontSize: 8, color: colors.gray500 }}>
              #{proProfile.bcin}
            </Text>
          )}
        </View>
      )}

      {/* Stats grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {stats.map((stat) => (
          <View
            key={stat.label}
            style={{
              width: '46%',
              backgroundColor: colors.gray50,
              padding: 8,
              borderRadius: 4,
            }}
          >
            <Text style={styles.label}>{stat.label}</Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Helvetica-Bold',
                color: colors.gray900,
                marginTop: 2,
              }}
            >
              {stat.value}
            </Text>
          </View>
        ))}
      </View>

      {/* Bio */}
      {proProfile?.bio && (
        <View style={{ marginTop: 8 }}>
          <Text style={styles.label}>About</Text>
          <Text style={{ ...styles.body, marginTop: 4 }}>{proProfile.bio}</Text>
        </View>
      )}
    </View>
  );
}
