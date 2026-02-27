import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { SignatureCanvas } from '@/components/signature-canvas';
import { Shield, AlertTriangle, CheckCircle2, Plus, Trash2 } from 'lucide-react';

interface WorkerTraining {
  name: string;
  trainingDate: string;
  isCompetentPerson: boolean;
}

interface EmergencyContact {
  name: string;
  phone: string;
}

interface EquipmentItem {
  checked: boolean;
  quantity: number;
}

interface ProtectionRequirement {
  title: string;
  oshaRef: string;
  description: string;
  equipment: string[];
  severity: 'critical' | 'important' | 'standard';
}

type WorkSurfaceType = 'roof' | 'floor_opening' | 'wall_opening' | 'scaffolding' | 'aerial_lift' | 'ladder' | 'steel_erection' | 'other';
type HeightRange = '<6ft' | '6-10ft' | '10-20ft' | '20-50ft' | '>50ft';
type RescueMethod = 'self_rescue' | 'assisted_rescue' | 'mechanical_rescue';

export function FallProtectionPlanPage() {
  const navigate = useNavigate();
  const { user, membership } = useAuth();

  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    projectName: '',
    siteAddress: '',
    supervisor: '',
    competentPersonName: '',
  });

  const [workLocation, setWorkLocation] = useState({
    workSurfaceType: 'roof' as WorkSurfaceType,
    heightOfWork: '6-10ft' as HeightRange,
    leadingEdgePresent: false,
    skylightsPresent: false,
    floorRoofOpenings: false,
    proximityToPowerLines: false,
    powerLineDistance: '',
  });

  const [equipment, setEquipment] = useState<Record<string, EquipmentItem>>({
    fullBodyHarness: { checked: false, quantity: 0 },
    shockAbsorbingLanyard: { checked: false, quantity: 0 },
    selfRetractingLifeline: { checked: false, quantity: 0 },
    guardrailSystems: { checked: false, quantity: 0 },
    safetyNets: { checked: false, quantity: 0 },
    warningLineSystem: { checked: false, quantity: 0 },
    holeCovers: { checked: false, quantity: 0 },
  });

  const [rescuePlan, setRescuePlan] = useState({
    rescueMethod: 'assisted_rescue' as RescueMethod,
    rescueHarness: false,
    retrievalSystem: false,
    firstAidKit: false,
    communicationDevices: false,
    nearestHospital: '',
    hospitalDistance: '',
  });

  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { name: '', phone: '' },
    { name: '', phone: '' },
    { name: '', phone: '' },
  ]);

  const [workers, setWorkers] = useState<WorkerTraining[]>([
    { name: '', trainingDate: '', isCompetentPerson: false },
  ]);

  const [showSignature, setShowSignature] = useState(false);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function updateField<K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function updateWorkLocation<K extends keyof typeof workLocation>(
    key: K,
    value: (typeof workLocation)[K]
  ) {
    setWorkLocation((prev) => ({ ...prev, [key]: value }));
  }

  function updateRescuePlan<K extends keyof typeof rescuePlan>(
    key: K,
    value: (typeof rescuePlan)[K]
  ) {
    setRescuePlan((prev) => ({ ...prev, [key]: value }));
  }

  function updateEquipment(key: string, field: keyof EquipmentItem, value: boolean | number) {
    setEquipment((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  }

  function updateEmergencyContact(index: number, field: keyof EmergencyContact, value: string) {
    setEmergencyContacts((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  }

  function updateWorker(index: number, field: keyof WorkerTraining, value: string | boolean) {
    setWorkers((prev) =>
      prev.map((w, i) => (i === index ? { ...w, [field]: value } : w))
    );
  }

  function addWorker() {
    setWorkers((prev) => [...prev, { name: '', trainingDate: '', isCompetentPerson: false }]);
  }

  function removeWorker(index: number) {
    setWorkers((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSignatureSave(dataUrl: string) {
    setSignatureUrl(dataUrl);
    setShowSignature(false);
  }

  // Auto-generate protection requirements based on work conditions
  const protectionRequirements = useMemo((): ProtectionRequirement[] => {
    const requirements: ProtectionRequirement[] = [];

    // Height-based requirements
    const heightValue = workLocation.heightOfWork;
    if (heightValue !== '<6ft') {
      requirements.push({
        title: 'Fall Protection System Required',
        oshaRef: 'OSHA 1926.501',
        description: 'Work is being performed at a height of 6 feet or greater. Fall protection system is mandatory.',
        equipment: ['Full body harness', 'Shock-absorbing lanyard', 'Anchorage point'],
        severity: 'critical',
      });

      // Height-specific equipment recommendations
      if (heightValue === '6-10ft') {
        requirements.push({
          title: 'Personal Fall Arrest System (6-10ft)',
          oshaRef: 'OSHA 1926.502(d)',
          description: 'Use full-body harness with shock-absorbing lanyard. Ensure anchorage point can support 5,000 lbs per person.',
          equipment: ['Full body harness', 'Shock-absorbing lanyard (6ft max)', 'D-ring anchorage'],
          severity: 'important',
        });
      } else if (heightValue === '10-20ft') {
        requirements.push({
          title: 'Enhanced Fall Protection (10-20ft)',
          oshaRef: 'OSHA 1926.502(d)',
          description: 'Self-retracting lifeline recommended for this height range. Maximum free-fall distance: 6 feet.',
          equipment: ['Self-retracting lifeline', 'Full body harness', 'Overhead anchorage'],
          severity: 'important',
        });
      } else if (heightValue === '20-50ft' || heightValue === '>50ft') {
        requirements.push({
          title: 'High-Elevation Fall Protection',
          oshaRef: 'OSHA 1926.502(d)',
          description: 'Extreme fall hazard. Self-retracting lifeline or vertical lifeline with rope grab required. Rescue plan must be in place before work begins.',
          equipment: ['Self-retracting lifeline', 'Vertical lifeline', 'Rope grab', 'Full body harness'],
          severity: 'critical',
        });
      }
    }

    // Leading edge
    if (workLocation.leadingEdgePresent) {
      requirements.push({
        title: 'Leading Edge Protection Required',
        oshaRef: 'OSHA 1926.501(b)(2)',
        description: 'Workers are exposed to unprotected sides/edges. Must use warning line system, guardrail system, or personal fall arrest system.',
        equipment: ['Warning line system (min 6ft from edge)', 'Guardrail system', 'OR Personal fall arrest'],
        severity: 'critical',
      });
    }

    // Skylights
    if (workLocation.skylightsPresent) {
      requirements.push({
        title: 'Skylight Protection',
        oshaRef: 'OSHA 1926.501(b)(4)',
        description: 'All skylights must be guarded by a screen or covered. Covers must support at least twice the weight of employees, equipment, and materials.',
        equipment: ['Skylight screens or covers', 'Warning signs', 'Guardrail around skylights'],
        severity: 'critical',
      });
    }

    // Floor/roof openings
    if (workLocation.floorRoofOpenings) {
      requirements.push({
        title: 'Floor & Roof Opening Protection',
        oshaRef: 'OSHA 1926.501(b)(4)',
        description: 'Guardrail system or cover required for all floor/roof openings. Covers must be color-coded or marked "HOLE" or "COVER".',
        equipment: ['Hole covers (2x weight capacity)', 'Guardrail systems', 'Warning signs'],
        severity: 'important',
      });
    }

    // Power lines
    if (workLocation.proximityToPowerLines) {
      const distance = parseFloat(workLocation.powerLineDistance) || 0;
      if (distance < 10) {
        requirements.push({
          title: 'CRITICAL: Power Line Clearance Violation',
          oshaRef: 'OSHA 1926.1408',
          description: `Minimum 10-foot clearance from power lines is required. Current distance: ${distance}ft. Work MUST NOT proceed until safe clearance is established or lines are de-energized.`,
          equipment: ['Stop work immediately', 'Contact utility company', 'Establish 10ft+ clearance'],
          severity: 'critical',
        });
      } else {
        requirements.push({
          title: 'Power Line Proximity Protocol',
          oshaRef: 'OSHA 1926.1408',
          description: 'Maintain minimum 10-foot clearance from power lines at all times. Use spotter when working near energized lines.',
          equipment: ['Spotter', 'Non-conductive tools', 'Warning barriers'],
          severity: 'important',
        });
      }
    }

    // Surface-specific requirements
    switch (workLocation.workSurfaceType) {
      case 'scaffolding':
        requirements.push({
          title: 'Scaffolding Guardrail System',
          oshaRef: 'OSHA 1926.451(g)',
          description: 'Full guardrail system required for scaffolds above 10 feet. Top rail: 42 inches, mid-rail: 21 inches. Must support 200 lbs force.',
          equipment: ['Guardrail system (top + mid + toe)', 'Scaffold planking (no gaps >1 inch)', 'Access ladder'],
          severity: 'important',
        });
        break;
      case 'aerial_lift':
        requirements.push({
          title: 'Aerial Lift Fall Protection',
          oshaRef: 'OSHA 1926.453',
          description: 'Body harness with lanyard attached to boom or basket required. Fall protection must be worn at all times when platform is elevated.',
          equipment: ['Full body harness', 'Lanyard attached to lift', 'Platform guardrails'],
          severity: 'critical',
        });
        break;
      case 'ladder':
        requirements.push({
          title: 'Ladder Safety Requirements',
          oshaRef: 'OSHA 1926.1053',
          description: 'Maintain 3-point contact. Ladder must extend 3 feet above landing. For fixed ladders over 24ft, fall protection system required.',
          equipment: ['Ladder cage or fall arrest (if >24ft)', '3:1 angle setup', 'Tie-off at top'],
          severity: 'standard',
        });
        break;
      case 'steel_erection':
        requirements.push({
          title: 'Steel Erection Fall Protection',
          oshaRef: 'OSHA 1926.760',
          description: 'Controlled Decking Zone (CDZ) or personal fall arrest required. Double-connections for climbing and positioning.',
          equipment: ['Personal fall arrest', 'Positioning device system', 'Safety monitoring system'],
          severity: 'critical',
        });
        break;
    }

    // Standard requirement for all scenarios with fall hazard
    if (requirements.length > 0) {
      requirements.push({
        title: 'Competent Person On-Site',
        oshaRef: 'OSHA 1926.502',
        description: 'A competent person must be present to identify hazards, authorize corrective measures, and inspect fall protection systems daily.',
        equipment: ['Competent person certification', 'Inspection checklist', 'Authority to stop work'],
        severity: 'standard',
      });
    }

    return requirements;
  }, [workLocation]);

  async function handleSave() {
    if (!user || !membership?.organization_id) return;
    setSaving(true);
    try {
      // Store fall protection plan data
      const planData = {
        organization_id: membership.organization_id,
        created_by_id: user.id,
        date: formData.date,
        project_name: formData.projectName,
        site_address: formData.siteAddress,
        supervisor: formData.supervisor,
        competent_person_name: formData.competentPersonName,
        work_location: workLocation,
        equipment_inventory: equipment,
        rescue_plan: rescuePlan,
        emergency_contacts: emergencyContacts,
        worker_training: workers,
        protection_requirements: protectionRequirements,
        signature_url: signatureUrl,
      };

      // For now, store in safety_forms table with form_type: 'fall_protection_plan'
      // In production, you might want a dedicated table
      const { error } = await supabase.from('safety_forms').insert({
        organization_id: membership.organization_id,
        created_by_id: user.id,
        form_number: `FPP-${format(new Date(), 'yyyyMMdd-HHmmss')}`,
        date: formData.date,
        project_name: formData.projectName,
        site_address: formData.siteAddress,
        crew_supervisor: formData.supervisor,
        form_data: planData,
        form_type: 'fall_protection_plan',
        status: 'completed',
      });

      if (error) throw error;

      navigate('/safety-forms');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save fall protection plan. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  const severityStyles = {
    critical: 'border-red-200 bg-red-50',
    important: 'border-amber-200 bg-amber-50',
    standard: 'border-green-200 bg-green-50',
  };

  const severityIconColors = {
    critical: 'text-red-600',
    important: 'text-amber-600',
    standard: 'text-green-600',
  };

  const severityIcons = {
    critical: AlertTriangle,
    important: Shield,
    standard: CheckCircle2,
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Fall Protection Plan Generator
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Auto-generates OSHA-compliant fall protection requirements
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !signatureUrl}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Plan'}
        </button>
      </div>

      {/* 1. Project Information */}
      <section className="rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">
          1. Project Information
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field
            label="Project Name"
            value={formData.projectName}
            onChange={(v) => updateField('projectName', v)}
          />
          <Field
            label="Site Address"
            value={formData.siteAddress}
            onChange={(v) => updateField('siteAddress', v)}
          />
          <Field
            label="Date"
            value={formData.date}
            onChange={(v) => updateField('date', v)}
            type="date"
          />
          <Field
            label="Supervisor"
            value={formData.supervisor}
            onChange={(v) => updateField('supervisor', v)}
          />
          <Field
            label="Competent Person Name"
            value={formData.competentPersonName}
            onChange={(v) => updateField('competentPersonName', v)}
          />
        </div>
      </section>

      {/* 2. Work Location Assessment */}
      <section className="rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">
          2. Work Location Assessment
        </h2>
        <div className="mt-3 space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-500">
              Work Surface Type
            </label>
            <select
              value={workLocation.workSurfaceType}
              onChange={(e) =>
                updateWorkLocation('workSurfaceType', e.target.value as WorkSurfaceType)
              }
              className="mt-1 w-full rounded-md border px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="roof">Roof</option>
              <option value="floor_opening">Floor Opening</option>
              <option value="wall_opening">Wall Opening</option>
              <option value="scaffolding">Scaffolding</option>
              <option value="aerial_lift">Aerial Lift</option>
              <option value="ladder">Ladder</option>
              <option value="steel_erection">Steel Erection</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500">
              Height of Work
            </label>
            <select
              value={workLocation.heightOfWork}
              onChange={(e) =>
                updateWorkLocation('heightOfWork', e.target.value as HeightRange)
              }
              className="mt-1 w-full rounded-md border px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="<6ft">&lt; 6 feet</option>
              <option value="6-10ft">6-10 feet</option>
              <option value="10-20ft">10-20 feet</option>
              <option value="20-50ft">20-50 feet</option>
              <option value=">50ft">&gt; 50 feet</option>
            </select>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <CheckboxField
              label="Leading Edge Present"
              checked={workLocation.leadingEdgePresent}
              onChange={(v) => updateWorkLocation('leadingEdgePresent', v)}
            />
            <CheckboxField
              label="Skylights Present"
              checked={workLocation.skylightsPresent}
              onChange={(v) => updateWorkLocation('skylightsPresent', v)}
            />
            <CheckboxField
              label="Floor/Roof Openings"
              checked={workLocation.floorRoofOpenings}
              onChange={(v) => updateWorkLocation('floorRoofOpenings', v)}
            />
            <CheckboxField
              label="Proximity to Power Lines"
              checked={workLocation.proximityToPowerLines}
              onChange={(v) => updateWorkLocation('proximityToPowerLines', v)}
            />
          </div>

          {workLocation.proximityToPowerLines && (
            <Field
              label="Distance to Power Lines (feet)"
              value={workLocation.powerLineDistance}
              onChange={(v) => updateWorkLocation('powerLineDistance', v)}
              type="number"
            />
          )}
        </div>
      </section>

      {/* 3. Auto-Generated Protection Requirements */}
      {protectionRequirements.length > 0 && (
        <section className="rounded-lg border bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-900">
            3. Auto-Generated Protection Requirements
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Based on your work location assessment, the following OSHA requirements apply
          </p>
          <div className="mt-4 space-y-3">
            {protectionRequirements.map((req, idx) => {
              const Icon = severityIcons[req.severity];
              return (
                <div
                  key={idx}
                  className={`rounded-lg border p-3 ${severityStyles[req.severity]}`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${severityIconColors[req.severity]}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-sm text-slate-900">
                          {req.title}
                        </h3>
                        <span className="shrink-0 rounded bg-white/70 px-2 py-0.5 text-xs font-medium text-slate-700">
                          {req.oshaRef}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-700">{req.description}</p>
                      <div className="mt-2">
                        <p className="text-xs font-medium text-slate-600">
                          Required Equipment:
                        </p>
                        <ul className="mt-1 space-y-0.5">
                          {req.equipment.map((item, i) => (
                            <li key={i} className="text-xs text-slate-600">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Fall Protection Equipment Inventory */}
      <section className="rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">
          4. Fall Protection Equipment Inventory
        </h2>
        <div className="mt-3 space-y-2">
          {Object.entries(equipment).map(([key, item]) => (
            <div key={key} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) => updateEquipment(key, 'checked', e.target.checked)}
                className="rounded border-slate-300"
              />
              <label className="flex-1 text-sm text-slate-700">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateEquipment(key, 'quantity', parseInt(e.target.value) || 0)}
                disabled={!item.checked}
                min="0"
                className="w-20 rounded border px-2 py-1 text-sm text-right disabled:bg-slate-50 disabled:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 5. Rescue Plan */}
      <section className="rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">5. Rescue Plan</h2>
        <div className="mt-3 space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-500">
              Rescue Method
            </label>
            <select
              value={rescuePlan.rescueMethod}
              onChange={(e) =>
                updateRescuePlan('rescueMethod', e.target.value as RescueMethod)
              }
              className="mt-1 w-full rounded-md border px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="self_rescue">Self-Rescue</option>
              <option value="assisted_rescue">Assisted Rescue</option>
              <option value="mechanical_rescue">Mechanical Rescue</option>
            </select>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">
              Rescue Equipment Available
            </p>
            <div className="space-y-2">
              <CheckboxField
                label="Rescue Harness"
                checked={rescuePlan.rescueHarness}
                onChange={(v) => updateRescuePlan('rescueHarness', v)}
              />
              <CheckboxField
                label="Retrieval System"
                checked={rescuePlan.retrievalSystem}
                onChange={(v) => updateRescuePlan('retrievalSystem', v)}
              />
              <CheckboxField
                label="First Aid Kit"
                checked={rescuePlan.firstAidKit}
                onChange={(v) => updateRescuePlan('firstAidKit', v)}
              />
              <CheckboxField
                label="Communication Devices"
                checked={rescuePlan.communicationDevices}
                onChange={(v) => updateRescuePlan('communicationDevices', v)}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Nearest Hospital Name"
              value={rescuePlan.nearestHospital}
              onChange={(v) => updateRescuePlan('nearestHospital', v)}
            />
            <Field
              label="Distance (miles)"
              value={rescuePlan.hospitalDistance}
              onChange={(v) => updateRescuePlan('hospitalDistance', v)}
              type="number"
            />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">
              Emergency Contacts
            </p>
            <div className="space-y-2">
              {emergencyContacts.map((contact, idx) => (
                <div key={idx} className="grid gap-2 sm:grid-cols-2">
                  <input
                    value={contact.name}
                    onChange={(e) => updateEmergencyContact(idx, 'name', e.target.value)}
                    placeholder={`Contact ${idx + 1} Name`}
                    className="rounded border px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    value={contact.phone}
                    onChange={(e) => updateEmergencyContact(idx, 'phone', e.target.value)}
                    placeholder="Phone Number"
                    type="tel"
                    className="rounded border px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Training Verification */}
      <section className="rounded-lg border bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            6. Training Verification
          </h2>
          <button
            onClick={addWorker}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Worker
          </button>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs font-medium text-slate-500">
                <th className="pb-2 pr-2">Worker Name</th>
                <th className="pb-2 pr-2">Training Date</th>
                <th className="pb-2 pr-2">Competent Person</th>
                <th className="pb-2 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {workers.map((worker, idx) => (
                <tr key={idx}>
                  <td className="py-2 pr-2">
                    <input
                      value={worker.name}
                      onChange={(e) => updateWorker(idx, 'name', e.target.value)}
                      placeholder="Worker name"
                      className="w-full rounded border px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      value={worker.trainingDate}
                      onChange={(e) => updateWorker(idx, 'trainingDate', e.target.value)}
                      type="date"
                      className="w-full rounded border px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-2 pr-2 text-center">
                    <input
                      type="checkbox"
                      checked={worker.isCompetentPerson}
                      onChange={(e) => updateWorker(idx, 'isCompetentPerson', e.target.checked)}
                      className="rounded border-slate-300"
                    />
                  </td>
                  <td className="py-2">
                    {workers.length > 1 && (
                      <button
                        onClick={() => removeWorker(idx)}
                        className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Signatures */}
      <section className="rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">
          7. Competent Person Signature
        </h2>
        {showSignature ? (
          <div className="mt-3">
            <SignatureCanvas
              title={`${formData.competentPersonName || 'Competent Person'} — Sign below`}
              onSave={handleSignatureSave}
              onCancel={() => setShowSignature(false)}
            />
          </div>
        ) : signatureUrl ? (
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                Signature captured
              </span>
              <button
                onClick={() => setShowSignature(true)}
                className="ml-auto text-xs text-blue-600 hover:underline"
              >
                Re-sign
              </button>
            </div>
            <img
              src={signatureUrl}
              alt="Competent person signature"
              className="mt-2 h-20 rounded border bg-white object-contain"
            />
          </div>
        ) : (
          <button
            onClick={() => setShowSignature(true)}
            className="mt-2 text-sm font-medium text-blue-600 hover:underline"
          >
            Add Signature
          </button>
        )}
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Helper Components                                                  */
/* ------------------------------------------------------------------ */
function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-slate-300"
      />
      <span className="text-slate-700">{label}</span>
    </label>
  );
}
