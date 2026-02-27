import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { isDemoMode } from '@renonext/shared/utils/demo-mode';
import { Layout } from '@/pages/layout';
import { LoginPage } from '@/pages/login';
import { PinLoginPage } from '@/pages/pin-login';
import { DashboardPage } from '@/pages/dashboard';
import { AttendancePage } from '@/pages/attendance';
import { SafetyFormsListPage } from '@/pages/safety-forms/index';
import { SafetyFormEditorPage } from '@/pages/safety-forms/form-editor';
import { ToolboxMeetingPage } from '@/pages/safety-forms/toolbox-meeting';
import { ScissorLiftInspectionPage } from '@/pages/safety-forms/scissor-lift-inspection';
import { ForkliftInspectionPage } from '@/pages/safety-forms/forklift-inspection';
import { FallProtectionPlanPage } from '@/pages/safety-forms/fall-protection-plan';
import { WorkAreasListPage } from '@/pages/work-areas/index';
import { WorkAreaDetailPage } from '@/pages/work-areas/detail';
import { SchedulePage } from '@/pages/schedule';
import { ConcretePage } from '@/pages/concrete';
import { RFIsPage } from '@/pages/rfis';
import { MaterialsPage } from '@/pages/materials';
import { SafetyCompliancePage } from '@/pages/safety/index';
import { CreateOrgPage, InviteTeamPage, BillingPage } from '@/pages/onboarding';
import { OrganizationSettingsPage } from '@/pages/settings/organization';
import { BillingSettingsPage } from '@/pages/settings/billing';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, membership, loading } = useAuth();

  // In demo mode, skip auth entirely
  if (isDemoMode()) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to onboarding if user has no organization
  if (!membership) {
    return <Navigate to="/onboarding/create-org" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/pin-login" element={<PinLoginPage />} />

      {/* Onboarding routes (no layout shell) */}
      <Route path="/onboarding/create-org" element={<CreateOrgPage />} />
      <Route path="/onboarding/invite-team" element={<InviteTeamPage />} />
      <Route path="/onboarding/billing" element={<BillingPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="safety-forms" element={<SafetyFormsListPage />} />
        <Route path="safety-forms/new" element={<SafetyFormEditorPage />} />
        <Route path="safety-forms/toolbox-meeting" element={<ToolboxMeetingPage />} />
        <Route path="safety-forms/scissor-lift" element={<ScissorLiftInspectionPage />} />
        <Route path="safety-forms/forklift" element={<ForkliftInspectionPage />} />
        <Route path="safety-forms/fall-protection" element={<FallProtectionPlanPage />} />
        <Route path="safety-forms/:id" element={<SafetyFormEditorPage />} />
        <Route path="work-areas" element={<WorkAreasListPage />} />
        <Route path="work-areas/:id" element={<WorkAreaDetailPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="concrete" element={<ConcretePage />} />
        <Route path="rfis" element={<RFIsPage />} />
        <Route path="materials" element={<MaterialsPage />} />
        <Route path="safety" element={<SafetyCompliancePage />} />
        <Route path="settings" element={<OrganizationSettingsPage />} />
        <Route path="settings/billing" element={<BillingSettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
