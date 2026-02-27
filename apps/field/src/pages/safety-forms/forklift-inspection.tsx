import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { SignatureCanvas } from '@/components/signature-canvas';
import { CheckCircle2, XCircle, Minus, ShieldCheck, Download } from 'lucide-react';
import { generateInspectionPdf, downloadPdf } from '@/lib/pdf-export';

type ChecklistStatus = 'pass' | 'fail' | 'na' | null;

interface ChecklistItem {
  label: string;
  section: string;
}

interface EquipmentInfo {
  unitNumber: string;
  makeModel: string;
  serialNumber: string;
  hourMeter: string;
  date: string;
  operatorName: string;
  fuelType: 'propane' | 'diesel' | 'electric' | '';
}

const CHECKLIST_SECTIONS = [
  {
    title: 'Fluid Levels',
    color: 'bg-blue-500',
    items: [
      'Engine oil level adequate',
      'Coolant level adequate',
      'Hydraulic fluid level adequate',
      'Fuel level / Battery charge adequate',
      'No visible leaks under unit',
    ],
  },
  {
    title: 'Tires & Wheels',
    color: 'bg-green-500',
    items: [
      'Tire condition — no cuts, gouges, or excessive wear',
      'Tire pressure adequate (pneumatic)',
      'Lug nuts tight',
      'No damaged or missing wheel components',
    ],
  },
  {
    title: 'Mast & Forks',
    color: 'bg-purple-500',
    items: [
      'Fork tips not worn or broken',
      'Forks straight — no bending',
      'Fork locking pins in place',
      'Mast chains properly lubricated',
      'Chain tension correct',
      'Mast rollers smooth operation',
      'Carriage moves freely',
      'Backrest extension secure',
    ],
  },
  {
    title: 'Brakes & Steering',
    color: 'bg-orange-500',
    items: [
      'Service brake — stops and holds',
      'Parking brake — holds on grade',
      'Inching pedal functions correctly',
      'Steering — normal play, responsive',
      'Power steering fluid (if equipped)',
    ],
  },
  {
    title: 'Lights, Horn & Alarms',
    color: 'bg-yellow-500',
    items: [
      'Headlights operational',
      'Tail lights operational',
      'Strobe/warning light functional',
      'Horn works',
      'Backup alarm functional',
    ],
  },
  {
    title: 'Safety Equipment',
    color: 'bg-red-500',
    items: [
      'Seatbelt present and functional',
      'Overhead guard intact — no damage',
      'Rated capacity plate legible',
      'All warning labels intact',
      'Fire extinguisher charged (if required)',
      'Mirrors present and adjusted',
      'Operator manual available',
    ],
  },
];

export function ForkliftInspectionPage() {
  const navigate = useNavigate();
  const { membership } = useAuth();

  const [equipmentInfo, setEquipmentInfo] = useState<EquipmentInfo>({
    unitNumber: '',
    makeModel: '',
    serialNumber: '',
    hourMeter: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    operatorName: membership?.display_name ?? '',
    fuelType: '',
  });

  const [checklist, setChecklist] = useState<Record<string, ChecklistStatus>>({});
  const [overallResult, setOverallResult] = useState<'pass' | 'fail'>('pass');
  const [deficiencies, setDeficiencies] = useState('');
  const [showSignature, setShowSignature] = useState(false);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  // Calculate progress
  const totalItems = CHECKLIST_SECTIONS.reduce((sum, section) => sum + section.items.length, 0);
  const checkedItems = Object.values(checklist).filter((v) => v !== null).length;
  const failedItems = Object.values(checklist).filter((v) => v === 'fail').length;
  const progressPercent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  function handleChecklistChange(item: string, status: ChecklistStatus) {
    setChecklist((prev) => ({ ...prev, [item]: status }));
  }

  function handleSaveDraft() {
    const data = {
      equipmentInfo,
      checklist,
      overallResult,
      deficiencies,
      signatureUrl,
      status: 'draft',
      savedAt: new Date().toISOString(),
    };
    console.log('Saving draft:', data);
    alert('Draft saved successfully');
  }

  function handleSubmit() {
    // Validation
    if (!equipmentInfo.unitNumber || !equipmentInfo.operatorName) {
      alert('Please fill in Unit Number and Operator Name');
      return;
    }

    if (checkedItems < totalItems) {
      alert(`Please complete all checklist items (${checkedItems}/${totalItems} completed)`);
      return;
    }

    if (!signatureUrl) {
      alert('Please provide operator signature');
      return;
    }

    const data = {
      equipmentInfo,
      checklist,
      overallResult,
      deficiencies,
      signatureUrl,
      status: 'completed',
      submittedAt: new Date().toISOString(),
    };

    console.log('Submitting forklift inspection:', data);
    alert('Forklift inspection submitted successfully');
    navigate('/safety-forms');
  }

  function handleSignatureSave(dataUrl: string) {
    setSignatureUrl(dataUrl);
    setShowSignature(false);
  }

  async function handleDownloadPdf() {
    setGeneratingPdf(true);
    try {
      // Group checklist items by section
      const items = CHECKLIST_SECTIONS.flatMap((section) =>
        section.items.map((item) => ({
          section: section.title,
          label: item,
          status: checklist[item] ?? null,
          notes: undefined,
        }))
      );

      // Determine overall result based on any failures
      const hasFailures = Object.values(checklist).some((status) => status === 'fail');

      const doc = generateInspectionPdf({
        type: 'forklift',
        date: equipmentInfo.date,
        inspector: equipmentInfo.operatorName,
        equipmentId: equipmentInfo.unitNumber,
        model: equipmentInfo.makeModel,
        hourmeter: equipmentInfo.hourMeter,
        items: items,
        overallResult: hasFailures ? 'fail' : overallResult,
        comments: deficiencies,
      });

      downloadPdf(doc, `forklift-inspection-${equipmentInfo.date}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setGeneratingPdf(false);
    }
  }

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Forklift Pre-Shift Inspection
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              Daily equipment safety checklist
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPdf}
            disabled={generatingPdf}
            className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {generatingPdf ? 'Generating...' : 'PDF'}
          </button>
          <button
            onClick={handleSaveDraft}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="rounded-lg border bg-white p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">
            {checkedItems} of {totalItems} items checked
          </span>
          <span className="text-slate-500">{progressPercent}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {failedItems > 0 && (
          <p className="mt-2 text-xs font-medium text-red-600">
            {failedItems} item{failedItems > 1 ? 's' : ''} failed
          </p>
        )}
      </div>

      {/* Equipment Information */}
      <div className="rounded-lg border bg-white p-4">
        <h2 className="mb-3 text-base font-semibold text-slate-900">
          Equipment Information
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Unit Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={equipmentInfo.unitNumber}
              onChange={(e) =>
                setEquipmentInfo((prev) => ({ ...prev, unitNumber: e.target.value }))
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="FL-001"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Make / Model
            </label>
            <input
              type="text"
              value={equipmentInfo.makeModel}
              onChange={(e) =>
                setEquipmentInfo((prev) => ({ ...prev, makeModel: e.target.value }))
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Toyota 8FGU25"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Serial Number
            </label>
            <input
              type="text"
              value={equipmentInfo.serialNumber}
              onChange={(e) =>
                setEquipmentInfo((prev) => ({ ...prev, serialNumber: e.target.value }))
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="12345-67890"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Hour Meter Reading
            </label>
            <input
              type="text"
              value={equipmentInfo.hourMeter}
              onChange={(e) =>
                setEquipmentInfo((prev) => ({ ...prev, hourMeter: e.target.value }))
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="1250.5"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Date</label>
            <input
              type="date"
              value={equipmentInfo.date}
              onChange={(e) =>
                setEquipmentInfo((prev) => ({ ...prev, date: e.target.value }))
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Operator Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={equipmentInfo.operatorName}
              onChange={(e) =>
                setEquipmentInfo((prev) => ({ ...prev, operatorName: e.target.value }))
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Fuel Type
            </label>
            <select
              value={equipmentInfo.fuelType}
              onChange={(e) =>
                setEquipmentInfo((prev) => ({
                  ...prev,
                  fuelType: e.target.value as EquipmentInfo['fuelType'],
                }))
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select fuel type</option>
              <option value="propane">Propane</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inspection Checklist */}
      <div className="rounded-lg border bg-white p-4">
        <h2 className="mb-4 text-base font-semibold text-slate-900">
          Inspection Checklist
        </h2>

        <div className="space-y-6">
          {CHECKLIST_SECTIONS.map((section) => (
            <div key={section.title}>
              <div className="mb-3 flex items-center gap-2">
                <div className={`h-6 w-1 rounded ${section.color}`} />
                <h3 className="text-sm font-semibold text-slate-800">
                  {section.title}
                </h3>
              </div>

              <div className="space-y-2">
                {section.items.map((item) => (
                  <ChecklistRow
                    key={item}
                    label={item}
                    status={checklist[item] ?? null}
                    onChange={(status) => handleChecklistChange(item, status)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overall Result */}
      <div className="rounded-lg border bg-white p-4">
        <h2 className="mb-3 text-base font-semibold text-slate-900">Overall Result</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setOverallResult('pass')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-semibold transition-all ${
              overallResult === 'pass'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-green-300 hover:bg-green-50'
            }`}
          >
            <CheckCircle2 className="h-5 w-5" />
            Pass
          </button>
          <button
            onClick={() => setOverallResult('fail')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-semibold transition-all ${
              overallResult === 'fail'
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-red-300 hover:bg-red-50'
            }`}
          >
            <XCircle className="h-5 w-5" />
            Fail
          </button>
        </div>
      </div>

      {/* Deficiencies / Notes */}
      <div className="rounded-lg border bg-white p-4">
        <h2 className="mb-3 text-base font-semibold text-slate-900">
          Deficiencies / Notes
        </h2>
        <textarea
          value={deficiencies}
          onChange={(e) => setDeficiencies(e.target.value)}
          rows={5}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Describe any deficiencies, repairs needed, or additional notes..."
        />
      </div>

      {/* Operator Signature */}
      <div className="rounded-lg border bg-white p-4">
        <h2 className="mb-3 text-base font-semibold text-slate-900">
          Operator Signature <span className="text-red-500">*</span>
        </h2>

        {showSignature ? (
          <SignatureCanvas
            title="Operator Signature"
            onSave={handleSignatureSave}
            onCancel={() => setShowSignature(false)}
          />
        ) : signatureUrl ? (
          <div>
            <div className="overflow-hidden rounded-lg border">
              <img
                src={signatureUrl}
                alt="Operator signature"
                className="h-32 w-full bg-white object-contain"
              />
            </div>
            <button
              onClick={() => {
                setSignatureUrl(null);
                setShowSignature(true);
              }}
              className="mt-2 text-sm font-medium text-blue-600 hover:underline"
            >
              Clear and re-sign
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowSignature(true)}
            className="w-full rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-sm font-medium text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
          >
            Tap to sign
          </button>
        )}
      </div>
    </div>
  );
}

interface ChecklistRowProps {
  label: string;
  status: ChecklistStatus;
  onChange: (status: ChecklistStatus) => void;
}

function ChecklistRow({ label, status, onChange }: ChecklistRowProps) {
  return (
    <div className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 transition-colors hover:bg-slate-100">
      <span className="text-sm text-slate-700">{label}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange('pass')}
          className={`flex h-8 w-12 items-center justify-center rounded transition-all ${
            status === 'pass'
              ? 'bg-green-100 text-green-700 ring-2 ring-green-500'
              : 'bg-white text-slate-400 hover:bg-green-50 hover:text-green-600'
          }`}
          aria-label="Pass"
        >
          <CheckCircle2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => onChange('fail')}
          className={`flex h-8 w-12 items-center justify-center rounded transition-all ${
            status === 'fail'
              ? 'bg-red-100 text-red-700 ring-2 ring-red-500'
              : 'bg-white text-slate-400 hover:bg-red-50 hover:text-red-600'
          }`}
          aria-label="Fail"
        >
          <XCircle className="h-4 w-4" />
        </button>
        <button
          onClick={() => onChange('na')}
          className={`flex h-8 w-12 items-center justify-center rounded transition-all ${
            status === 'na'
              ? 'bg-slate-200 text-slate-700 ring-2 ring-slate-400'
              : 'bg-white text-slate-400 hover:bg-slate-100 hover:text-slate-600'
          }`}
          aria-label="Not applicable"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
