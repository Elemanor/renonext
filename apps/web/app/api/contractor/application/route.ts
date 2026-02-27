import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify user is a pro
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'pro') {
    return NextResponse.json(
      { error: 'Only professional accounts can submit applications' },
      { status: 403 }
    );
  }

  const body = await request.json();

  const {
    // Business info
    company_name,
    business_type,
    business_number,
    years_experience,
    address,
    city,
    province,
    phone,
    bio,
    headline,
    // Credentials
    license_number,
    license_type,
    license_province,
    license_expiry,
    bcin,
    // Insurance
    insurance_provider,
    insurance_policy_number,
    insurance_coverage_amount,
    insurance_expiry,
    insurance_certificate_url,
    // WSIB
    wsib_number,
    wsib_status,
    wsib_certificate_url,
    // Portfolio & rates
    hourly_rate_min,
    hourly_rate_max,
    service_radius_km,
    portfolio_urls,
  } = body;

  // Update pro_profiles
  const { error: proError } = await supabase
    .from('pro_profiles')
    .update({
      company_name,
      business_type,
      business_number,
      years_experience: years_experience ? Number(years_experience) : null,
      address,
      city,
      province: province || 'ON',
      bio,
      headline,
      license_number,
      license_type,
      license_province: license_province || 'ON',
      license_expiry: license_expiry || null,
      bcin: bcin || null,
      insurance_provider,
      insurance_policy_number,
      insurance_coverage_amount: insurance_coverage_amount
        ? Number(insurance_coverage_amount)
        : null,
      insurance_expiry: insurance_expiry || null,
      insurance_certificate_url,
      wsib_number,
      wsib_status,
      wsib_certificate_url,
      hourly_rate_min: hourly_rate_min ? Number(hourly_rate_min) : null,
      hourly_rate_max: hourly_rate_max ? Number(hourly_rate_max) : null,
      service_radius_km: service_radius_km ? Number(service_radius_km) : 50,
      portfolio_urls: portfolio_urls || [],
      application_status: 'pending_review',
      application_submitted_at: new Date().toISOString(),
    })
    .eq('user_id', user.id);

  if (proError) {
    return NextResponse.json(
      { error: proError.message },
      { status: 500 }
    );
  }

  // Update phone on profiles table
  if (phone) {
    await supabase
      .from('profiles')
      .update({ phone })
      .eq('id', user.id);
  }

  return NextResponse.json({ success: true });
}
