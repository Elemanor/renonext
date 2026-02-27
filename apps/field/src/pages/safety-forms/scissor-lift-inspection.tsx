import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { SignatureCanvas } from '@/components/signature-canvas';
import { CheckCircle2, XCircle, Minus, ShieldCheck, Download } from 'lucide-react';
import { generateInspectionPdf, downloadPdf } from '@/lib/pdf-export';

type InspectionResult = 'pass' | 'fail' | 'na' | null;

interface ChecklistSection {
  title: string;
  color: string;
  items: string[];
}

const CHECKLIST_SECTIONS: ChecklistSection[] = [
  {
    title: 'Platform & Guardrails',
    color: 'bg-blue-500',
    items: [
      'Guardrails secure and undamaged',
      'Toe boards in place',
      'Access gate latches properly',
      'Platform deck clean and undamaged',
      'Extension deck secure (if equipped)',
    ],
  },
  {
    title: 'Controls & Operation',
    color: 'bg-purple-500',
    items: [
      'Ground controls function properly',
      'Platform controls function properly',
      'Emergency stop works (ground & platform)',
      'Drive/steer functions normal',
      'Horn/alarm operational',
    ],
  },
  {
    title: 'Structural Components',
    color: 'bg-indigo-500',
    items: [
      'No visible cracks in welds',
      'Pins and fasteners secure',
      'Hydraulic cylinders — no leaks',
      'Scissor arms — no damage',
      'Outriggers/stabilizers function (if equipped)',
    ],
  },
  {
    title: 'Tires & Wheels',
    color: 'bg-slate-500',
    items: [
      'Tire condition adequate',
      'Tire pressure normal',
      'Casters/wheels roll freely',
      'No flat spots or damage',
    ],
  },
  {
    title: 'Electrical & Battery',
    color: 'bg-amber-500',
    items: [
      'Battery charge adequate',
      'Battery connections tight and clean',
      'No damaged cables or wires',
      'Charger port undamaged',
    ],
  },
  {
    title: 'Safety Equipment',
    color: 'bg-emerald-500',
    items: [
      'Operator manual present',
      'Rated capacity plate legible',
      'All warning labels intact',
      'Fire extinguisher (if required)',
      'Fall protection anchor points (if required)',
    ],
  },
];

export function ScissorLiftInspectionPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [equipmentInfo, setEquipmentInfo] = useState({
    unitNumber: '',
    makeModel: '',
    serialNumber: '',
    hourMeter: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    inspectorName: user?.user_metadata?.full_name || '',
  });

  const [checklist, setChecklist] = useState<Record<string, InspectionResult>>(
    {}
  );

  const [overallResult, setOverallResult] = useState<'pass' | 'fail'>('pass');
  const [deficiencies, setDeficiencies] = useState('');
  const [showSignature, setShowSignature] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  // Calculate progress
  const allItems = CHECKLIST_SECTIONS.flatMap((section) => section.items);
  const totalItems = allItems.length;
  const checkedItems = allItems.filter((item) => checklist[item] != null).length;
  const progressPercent = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

  function updateEquipmentInfo<K extends keyof typeof equipmentInfo>(
    key: K,
    value: string
  ) {
    setEquipmentInfo((prev) => ({ ...prev, [key]: value }));
  }

  function setItemResult(item: string, result: InspectionResult) {
    setChecklist((prev) => ({ ...prev, [item]: result }));
  }

  function handleSignatureSave(dataUrl: string) {
    setSignature(dataUrl);
    setShowSignature(false);
  }

  function handleSubmit() {
    const inspectionData = {
      equipmentInfo,
      checklist,
      overallResult,
      deficiencies,
      signature,
      submittedAt: new Date().toISOString(),
      submittedBy: user?.id,
    };

    console.log('Scissor Lift Inspection submitted:', inspectionData);

    // Navigate back to safety forms list
    navigate('/safety-forms');
  }

  function handleSaveDraft() {
    console.log('Scissor Lift Inspection draft saved');
    navigate('/safety-forms');
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
        type: 'scissor-lift',
        date: equipmentInfo.date,
        inspector: equipmentInfo.inspectorName,
        equipmentId: equipmentInfo.unitNumber,
        model: equipmentInfo.makeModel,
        hourmeter: equipmentInfo.hourMeter,
        items: items,
        overallResult: hasFailures ? 'fail' : overallResult,
        comments: deficiencies,
      });

      downloadPdf(doc, `scissor-lift-inspection-${equipmentInfo.date}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setGeneratingPdf(false);
    }
  }

  const canSubmit =
    equipmentInfo.unitNumber &&
    equipmentInfo.makeModel &&
    equipmentInfo.inspectorName &&
    signature &&
    checkedItems === totalItems;

  return (
    <div className="mx-auto max-w-4xl pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary-600" />
          <h1 className="text-2xl font-bold text-slate-900">
            Scissor Lift Pre-Use Inspection
          </h1>
        </div>
        <div className="flex gap-2">
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
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 rounded-lg border bg-white p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">
            Inspection Progress
          </span>
          <span className="text-slate-500">
            {checkedItems} of {totalItems} items checked
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Equipment Information */}
      <section className="mt-4 rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Equipment Information
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field
            label="Unit Number"
            value={equipmentInfo.unitNumber}
            onChange={(v) => updateEquipmentInfo('unitNumber', v)}
            required
          />
          <Field
            label="Make / Model"
            value={equipmentInfo.makeModel}
            onChange={(v) => updateEquipmentInfo('makeModel', v)}
            required
          />
          <Field
            label="Serial Number"
            value={equipmentInfo.serialNumber}
            onChange={(v) => updateEquipmentInfo('serialNumber', v)}
          />
          <Field
            label="Hour Meter Reading"
            value={equipmentInfo.hourMeter}
            onChange={(v) => updateEquipmentInfo('hourMeter', v)}
          />
          <Field
            label="Date"
            value={equipmentInfo.date}
            onChange={(v) => updateEquipmentInfo('date', v)}
            type="date"
            required
          />
          <Field
            label="Inspector Name"
            value={equipmentInfo.inspectorName}
            onChange={(v) => updateEquipmentInfo('inspectorName', v)}
            required
          />
        </div>
      </section>

      {/* Inspection Checklist */}
      {CHECKLIST_SECTIONS.map((section, sectionIdx) => (
        <section
          key={sectionIdx}
          className="mt-4 rounded-lg border bg-white overflow-hidden"
        >
          <div className="flex items-center gap-3 p-4 bg-slate-50 border-b">
            <div className={`w-1 h-6 rounded-full ${section.color}`} />
            <h2 className="text-sm font-semibold text-slate-900">
              {section.title}
            </h2>
          </div>
          <div className="divide-y">
            {section.items.map((item, itemIdx) => (
              <ChecklistRow
                key={itemIdx}
                label={item}
                value={checklist[item] ?? null}
                onChange={(result) => setItemResult(item, result)}
              />
            ))}
          </div>
        </section>
      ))}

      {/* Overall Result */}
      <section className="mt-4 rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900 mb-3">
          Overall Result
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => setOverallResult('pass')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 font-medium transition-all ${
              overallResult === 'pass'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
            }`}
          >
            <CheckCircle2 className="h-5 w-5" />
            Pass
          </button>
          <button
            onClick={() => setOverallResult('fail')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 font-medium transition-all ${
              overallResult === 'fail'
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-red-300'
            }`}
          >
            <XCircle className="h-5 w-5" />
            Fail
          </button>
        </div>
      </section>

      {/* Deficiencies / Notes */}
      <section className="mt-4 rounded-lg border bg-white p-4">
        <label className="block text-sm font-semibold text-slate-900">
          Deficiencies / Notes
        </label>
        <textarea
          value={deficiencies}
          onChange={(e) => setDeficiencies(e.target.value)}
          rows={4}
          placeholder="List any deficiencies, corrective actions taken, or additional notes..."
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </section>

      {/* Inspector Signature */}
      <section className="mt-4 rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Inspector Signature
        </h2>
        {signature ? (
          <div className="mt-3">
            <img
              src={signature}
              alt="Inspector signature"
              className="h-32 rounded border bg-white"
            />
            <button
              onClick={() => {
                setSignature(null);
                setShowSignature(true);
              }}
              className="mt-2 text-sm font-medium text-primary-600 hover:underline"
            >
              Clear and re-sign
            </button>
          </div>
        ) : showSignature ? (
          <div className="mt-3">
            <SignatureCanvas
              title={`${equipmentInfo.inspectorName || 'Inspector'} — Sign below`}
              onSave={handleSignatureSave}
              onCancel={() => setShowSignature(false)}
            />
          </div>
        ) : (
          <button
            onClick={() => setShowSignature(true)}
            className="mt-2 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Add Signature
          </button>
        )}
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Field Component                                                    */
/* ------------------------------------------------------------------ */
function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Checklist Row Component                                            */
/* ------------------------------------------------------------------ */
function ChecklistRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: InspectionResult;
  onChange: (result: InspectionResult) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-slate-50">
      <span className="text-sm text-slate-700">{label}</span>
      <div className="flex gap-2">
        <RadioButton
          label="Pass"
          icon={CheckCircle2}
          color="emerald"
          selected={value === 'pass'}
          onClick={() => onChange('pass')}
        />
        <RadioButton
          label="Fail"
          icon={XCircle}
          color="red"
          selected={value === 'fail'}
          onClick={() => onChange('fail')}
        />
        <RadioButton
          label="N/A"
          icon={Minus}
          color="slate"
          selected={value === 'na'}
          onClick={() => onChange('na')}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Radio Button Component                                             */
/* ------------------------------------------------------------------ */
function RadioButton({
  label,
  icon: Icon,
  color,
  selected,
  onClick,
}: {
  label: string;
  icon: React.ElementType;
  color: 'emerald' | 'red' | 'slate';
  selected: boolean;
  onClick: () => void;
}) {
  const colorClasses = {
    emerald: selected
      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
      : 'border-slate-200 text-slate-400 hover:border-emerald-300 hover:text-emerald-600',
    red: selected
      ? 'border-red-500 bg-red-50 text-red-700'
      : 'border-slate-200 text-slate-400 hover:border-red-300 hover:text-red-600',
    slate: selected
      ? 'border-slate-400 bg-slate-50 text-slate-700'
      : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600',
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-all ${colorClasses[color]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
