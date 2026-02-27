import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Search, Layers, GripVertical, Download } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useAutoSave } from '@/hooks/use-auto-save';
import { supabase } from '@/lib/supabase';
import { SignatureCanvas } from '@/components/signature-canvas';
import { CrewSignOff, type CrewMember } from '@/components/crew-sign-off';
import { generateJSAPdf, downloadPdf } from '@/lib/pdf-export';
import {
  jobStepTemplates,
  commonTools,
  commonPPE,
  templateCategories,
  searchTemplates,
} from '@/data/construction-data';
import type { RiskLevel } from '@renonext/shared/types/field';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface StepDraft {
  id?: string;
  _key: string; // Unique key for drag-and-drop
  sequence: number;
  operation: string;
  hazards: string[];
  safety_controls: string[];
  risk_level: RiskLevel;
  notes: string | null;
}

interface FormDraft {
  form_number: string;
  date: string;
  site_address: string;
  project_name: string;
  crew_supervisor: string;
  crew_safety_rep: string;
  weather: string;
  temperature: string;
  formwork: string;
  description: string;
  tools: string[];
  ppe: string[];
}

export function SafetyFormEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, membership } = useAuth();
  const isNew = !id || id === 'new';

  const [formData, setFormData] = useState<FormDraft>({
    form_number: `JSA-${format(new Date(), 'yyyyMMdd')}-001`,
    date: format(new Date(), 'yyyy-MM-dd'),
    site_address: '',
    project_name: '',
    crew_supervisor: '',
    crew_safety_rep: '',
    weather: '',
    temperature: '',
    formwork: '',
    description: '',
    tools: [],
    ppe: [],
  });

  const [steps, setSteps] = useState<StepDraft[]>([
    {
      _key: crypto.randomUUID(),
      sequence: 1,
      operation: '',
      hazards: [],
      safety_controls: [],
      risk_level: 'B',
      notes: null,
    },
  ]);

  const [showSignature, setShowSignature] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  // Template picker state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Crew sign-off state
  const [crewMembers, setCrewMembers] = useState<CrewMember[]>([]);

  // Drag-and-drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { autoSave, isSaving } = useAutoSave(isNew ? null : id!, {
    table: 'safety_forms',
    debounceMs: 2000,
    queryKey: ['safety-forms'],
  });

  // Load existing form
  useEffect(() => {
    if (isNew) {
      // Initialize with sample crew for new forms (can be removed for production)
      setCrewMembers([
        {
          id: crypto.randomUUID(),
          name: 'Mike Johnson',
          trade: 'Foreman',
          signed: false,
        },
        {
          id: crypto.randomUUID(),
          name: 'Sarah Chen',
          trade: 'Electrician',
          signed: false,
        },
        {
          id: crypto.randomUUID(),
          name: 'Carlos Rodriguez',
          trade: 'Carpenter',
          signed: false,
        },
      ]);
      return;
    }
    (async () => {
      const { data: form } = await supabase
        .from('safety_forms')
        .select('*')
        .eq('id', id)
        .single();
      if (form) {
        setFormData({
          form_number: form.form_number,
          date: form.date,
          site_address: form.site_address ?? '',
          project_name: form.project_name ?? '',
          crew_supervisor: form.crew_supervisor ?? '',
          crew_safety_rep: form.crew_safety_rep ?? '',
          weather: form.weather ?? '',
          temperature: form.temperature ?? '',
          formwork: form.formwork ?? '',
          description: form.description ?? '',
          tools: form.tools ?? [],
          ppe: form.ppe ?? [],
        });
      }
      const { data: stepData } = await supabase
        .from('safety_form_steps')
        .select('*')
        .eq('form_id', id)
        .order('sequence');
      if (stepData?.length) {
        setSteps(
          stepData.map((s) => ({
            id: s.id,
            _key: crypto.randomUUID(), // Generate key for loaded steps
            sequence: s.sequence,
            operation: s.operation,
            hazards: s.hazards as string[],
            safety_controls: s.safety_controls as string[],
            risk_level: s.risk_level as RiskLevel,
            notes: s.notes,
          }))
        );
      }
      // Load crew signatures
      const { data: sigData } = await supabase
        .from('safety_form_signatures')
        .select('*')
        .eq('form_id', id)
        .eq('signature_type', 'crew')
        .order('created_at');
      if (sigData?.length) {
        setCrewMembers(
          sigData.map((sig) => ({
            id: sig.id,
            name: sig.signer_name,
            trade: sig.signer_role ?? 'Crew',
            signed: true,
            signatureUrl: sig.signature_url,
          }))
        );
      }
    })();
  }, [id, isNew]);

  // Auto-save form data on change
  useEffect(() => {
    if (isNew) return;
    autoSave(formData as unknown as Record<string, unknown>);
  }, [formData, isNew, autoSave]);

  const updateField = useCallback(
    <K extends keyof FormDraft>(key: K, value: FormDraft[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  function addStep() {
    setSteps((prev) => [
      ...prev,
      {
        _key: crypto.randomUUID(),
        sequence: prev.length + 1,
        operation: '',
        hazards: [],
        safety_controls: [],
        risk_level: 'B',
        notes: null,
      },
    ]);
  }

  function removeStep(key: string) {
    setSteps((prev) =>
      prev
        .filter((s) => s._key !== key)
        .map((s, i) => ({ ...s, sequence: i + 1 }))
    );
  }

  function updateStep(key: string, updates: Partial<StepDraft>) {
    setSteps((prev) =>
      prev.map((s) => (s._key === key ? { ...s, ...updates } : s))
    );
  }

  function toggleArrayItem(
    key: string,
    field: 'hazards' | 'safety_controls',
    item: string
  ) {
    setSteps((prev) =>
      prev.map((s) => {
        if (s._key !== key) return s;
        const arr = s[field];
        return {
          ...s,
          [field]: arr.includes(item)
            ? arr.filter((v) => v !== item)
            : [...arr, item],
        };
      })
    );
  }

  function handleTemplateSelect(templateId: string) {
    const template = jobStepTemplates.find((t) => t.id === templateId);
    if (!template) return;

    // Add new step with template data
    const newStep: StepDraft = {
      _key: crypto.randomUUID(),
      sequence: steps.length + 1,
      operation: template.name,
      hazards: [...template.hazards],
      safety_controls: [...template.safetyControls],
      risk_level: template.riskLevel,
      notes: null,
    };

    setSteps((prev) => [...prev, newStep]);

    // Add template tools to form (union, no duplicates)
    setFormData((prev) => ({
      ...prev,
      tools: [...new Set([...prev.tools, ...template.requiredTools])],
    }));

    // Add template PPE to form (union, no duplicates)
    setFormData((prev) => ({
      ...prev,
      ppe: [...new Set([...prev.ppe, ...template.requiredPPE])],
    }));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setSteps((items) => {
      const oldIndex = items.findIndex((s) => s._key === active.id);
      const newIndex = items.findIndex((s) => s._key === over.id);

      // Reorder array
      const reordered = arrayMove(items, oldIndex, newIndex);

      // Update sequence numbers
      return reordered.map((s, i) => ({ ...s, sequence: i + 1 }));
    });
  }

  async function handleSave(submit = false) {
    if (!user || !membership?.organization_id) return;
    setSaving(true);
    try {
      let formId = id;
      if (isNew) {
        const { data: inserted, error } = await supabase
          .from('safety_forms')
          .insert({
            organization_id: membership.organization_id,
            created_by_id: user.id,
            ...formData,
            status: submit ? 'pending_signatures' : 'draft',
          })
          .select('id')
          .single();
        if (error) throw error;
        formId = inserted.id;
      } else {
        const { error } = await supabase
          .from('safety_forms')
          .update({
            ...formData,
            status: submit ? 'pending_signatures' : 'in_progress',
          })
          .eq('id', formId);
        if (error) throw error;
      }

      // Upsert steps
      for (const step of steps) {
        if (step.id) {
          await supabase
            .from('safety_form_steps')
            .update({
              operation: step.operation,
              hazards: step.hazards,
              safety_controls: step.safety_controls,
              risk_level: step.risk_level,
              notes: step.notes,
              sequence: step.sequence,
            })
            .eq('id', step.id);
        } else {
          await supabase.from('safety_form_steps').insert({
            form_id: formId,
            sequence: step.sequence,
            operation: step.operation,
            hazards: step.hazards,
            safety_controls: step.safety_controls,
            risk_level: step.risk_level,
            notes: step.notes,
          });
        }
      }

      navigate(`/safety-forms/${formId}`);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  }

  function handleSignatureSave(dataUrl: string) {
    // Store supervisor signature
    if (!id) return;
    supabase
      .from('safety_form_signatures')
      .insert({
        form_id: id,
        user_id: user?.id ?? null,
        signer_name: formData.crew_supervisor || 'Supervisor',
        signature_url: dataUrl,
        signature_type: 'supervisor',
      })
      .then(() => setShowSignature(false));
  }

  function handleCrewSign(memberId: string, signatureUrl: string) {
    // Update local state
    setCrewMembers((prev) =>
      prev.map((m) =>
        m.id === memberId ? { ...m, signed: true, signatureUrl } : m
      )
    );

    // Store in database if form is saved
    if (!isNew && id) {
      const member = crewMembers.find((m) => m.id === memberId);
      if (member) {
        supabase.from('safety_form_signatures').insert({
          form_id: id,
          user_id: user?.id ?? null,
          signer_name: member.name,
          signer_role: member.trade,
          signature_url: signatureUrl,
          signature_type: 'crew',
        });
      }
    }
  }

  function handleAddCrewMember(name: string, trade: string) {
    const newMember: CrewMember = {
      id: crypto.randomUUID(),
      name,
      trade,
      signed: false,
    };
    setCrewMembers((prev) => [...prev, newMember]);
  }

  function handleRemoveCrewMember(memberId: string) {
    setCrewMembers((prev) => prev.filter((m) => m.id !== memberId));
    // Also delete from database if it exists
    if (!isNew && id) {
      supabase
        .from('safety_form_signatures')
        .delete()
        .eq('id', memberId);
    }
  }

  const toggleFormCheckbox = (
    field: 'tools' | 'ppe',
    item: string
  ) => {
    setFormData((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(item)
          ? arr.filter((v) => v !== item)
          : [...arr, item],
      };
    });
  };

  function handleDownloadPdf() {
    setGeneratingPdf(true);
    try {
      const doc = generateJSAPdf({
        formNumber: formData.form_number,
        date: formData.date,
        projectName: formData.project_name,
        siteAddress: formData.site_address,
        crewSupervisor: formData.crew_supervisor,
        crewSafetyRep: formData.crew_safety_rep,
        weather: formData.weather,
        temperature: formData.temperature,
        description: formData.description,
        tools: formData.tools,
        ppe: formData.ppe,
        steps: steps.map((s) => ({
          sequence: s.sequence,
          operation: s.operation,
          hazards: s.hazards,
          safetyControls: s.safety_controls,
          riskLevel: s.risk_level,
        })),
      });
      downloadPdf(doc, `${formData.form_number}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setGeneratingPdf(false);
    }
  }

  // Filter templates based on category and search
  const filteredTemplates = (() => {
    let templates = jobStepTemplates;

    // Filter by category
    if (selectedCategory !== 'All') {
      templates = templates.filter((t) => t.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      templates = searchTemplates(searchQuery);
      // Re-apply category filter if needed
      if (selectedCategory !== 'All') {
        templates = templates.filter((t) => t.category === selectedCategory);
      }
    }

    return templates;
  })();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">
          {isNew ? 'New Safety Form' : `Edit ${formData.form_number}`}
        </h1>
        <div className="flex gap-2">
          {isSaving && (
            <span className="text-xs text-slate-400">Saving...</span>
          )}
          <button
            onClick={handleDownloadPdf}
            disabled={generatingPdf}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 flex items-center gap-1.5"
          >
            <Download className="h-4 w-4" />
            {generatingPdf ? 'Generating...' : 'Download PDF'}
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="rounded-md border px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
          >
            Submit for Signatures
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <section className="mt-6 rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">Form Details</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="Form Number" value={formData.form_number} onChange={(v) => updateField('form_number', v)} />
          <Field label="Date" value={formData.date} onChange={(v) => updateField('date', v)} type="date" />
          <Field label="Project Name" value={formData.project_name} onChange={(v) => updateField('project_name', v)} />
          <Field label="Site Address" value={formData.site_address} onChange={(v) => updateField('site_address', v)} />
          <Field label="Crew Supervisor" value={formData.crew_supervisor} onChange={(v) => updateField('crew_supervisor', v)} />
          <Field label="Safety Representative" value={formData.crew_safety_rep} onChange={(v) => updateField('crew_safety_rep', v)} />
          <Field label="Weather" value={formData.weather} onChange={(v) => updateField('weather', v)} />
          <Field label="Temperature" value={formData.temperature} onChange={(v) => updateField('temperature', v)} />
        </div>
        <div className="mt-3">
          <Field label="Description" value={formData.description} onChange={(v) => updateField('description', v)} multiline />
        </div>
      </section>

      {/* PPE Checklist */}
      <section className="mt-4 rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">PPE Required</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {commonPPE.map((item) => (
            <label key={item} className="flex items-center gap-1.5 text-sm">
              <input
                type="checkbox"
                checked={formData.ppe.includes(item)}
                onChange={() => toggleFormCheckbox('ppe', item)}
                className="rounded border-slate-300"
              />
              {item}
            </label>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="mt-4 rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">Tools / Equipment</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {commonTools.map((item) => (
            <label key={item} className="flex items-center gap-1.5 text-sm">
              <input
                type="checkbox"
                checked={formData.tools.includes(item)}
                onChange={() => toggleFormCheckbox('tools', item)}
                className="rounded border-slate-300"
              />
              {item}
            </label>
          ))}
        </div>
      </section>

      {/* Template Picker */}
      <section className="mt-4 rounded-lg border bg-white p-4">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-slate-500" />
          <h2 className="text-sm font-semibold text-slate-900">Job Step Templates</h2>
          <span className="text-xs text-slate-400">
            ({filteredTemplates.length})
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Select a template to quickly add a pre-configured job step with hazards, controls, and required PPE/tools.
        </p>

        {/* Search */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full rounded-md border border-slate-200 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          {templateCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => {
            const riskColors = {
              A: 'bg-red-100 text-red-700 border-red-200',
              B: 'bg-amber-100 text-amber-700 border-amber-200',
              C: 'bg-green-100 text-green-700 border-green-200',
            };

            return (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                className="group rounded-lg border border-slate-200 bg-white p-3 text-left transition-all hover:border-blue-500 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                    {template.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded border px-1.5 py-0.5 text-xs font-medium ${
                      riskColors[template.riskLevel]
                    }`}
                  >
                    {template.riskLevel}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                    {template.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {template.hazards.length} hazard{template.hazards.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                  <span>+{template.requiredTools.length} tools</span>
                  <span>•</span>
                  <span>+{template.requiredPPE.length} PPE</span>
                </div>
              </button>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="mt-4 text-center text-sm text-slate-400">
            No templates found matching your search.
          </div>
        )}
      </section>

      {/* Job Steps with Drag-and-Drop */}
      <section className="mt-4 rounded-lg border bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            Job Steps ({steps.length})
          </h2>
          <button
            onClick={addStep}
            className="text-sm font-medium text-primary-600 hover:underline"
          >
            + Add Step
          </button>
        </div>
        <div className="mt-3 space-y-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={steps.map((s) => s._key)}
              strategy={verticalListSortingStrategy}
            >
              {steps.map((step) => (
                <SortableStepCard
                  key={step._key}
                  step={step}
                  onUpdate={updateStep}
                  onRemove={removeStep}
                  canRemove={steps.length > 1}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </section>

      {/* Supervisor Signature */}
      {!isNew && (
        <section className="mt-4 rounded-lg border bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Supervisor Signature
          </h2>
          {showSignature ? (
            <div className="mt-2">
              <SignatureCanvas
                title={`${formData.crew_supervisor || 'Supervisor'} — Sign below`}
                onSave={handleSignatureSave}
                onCancel={() => setShowSignature(false)}
              />
            </div>
          ) : (
            <button
              onClick={() => setShowSignature(true)}
              className="mt-2 text-sm font-medium text-primary-600 hover:underline"
            >
              Add Signature
            </button>
          )}
        </section>
      )}

      {/* Crew Sign-Off */}
      {!isNew && (
        <section className="mt-4">
          <CrewSignOff
            crewMembers={crewMembers}
            onSign={handleCrewSign}
            onAddMember={handleAddCrewMember}
            onRemoveMember={handleRemoveCrewMember}
          />
        </section>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sortable Step Card with Drag Handle                               */
/* ------------------------------------------------------------------ */
function SortableStepCard({
  step,
  onUpdate,
  onRemove,
  canRemove,
}: {
  step: StepDraft;
  onUpdate: (key: string, updates: Partial<StepDraft>) => void;
  onRemove: (key: string) => void;
  canRemove: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step._key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded border bg-white"
    >
      <div className="flex gap-2 p-3">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="flex cursor-grab items-start pt-1 active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5 text-slate-400 hover:text-slate-600" />
        </div>

        {/* Step Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Step {step.sequence}
            </span>
            <div className="flex items-center gap-2">
              <select
                value={step.risk_level}
                onChange={(e) =>
                  onUpdate(step._key, { risk_level: e.target.value as RiskLevel })
                }
                className="rounded border px-2 py-1 text-xs"
              >
                <option value="A">A - High</option>
                <option value="B">B - Medium</option>
                <option value="C">C - Low</option>
              </select>
              {canRemove && (
                <button
                  onClick={() => onRemove(step._key)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
          <input
            value={step.operation}
            onChange={(e) => onUpdate(step._key, { operation: e.target.value })}
            placeholder="Operation / Activity"
            className="mt-2 w-full rounded border px-3 py-1.5 text-sm"
          />
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-slate-500">
                Hazards
              </label>
              <TagInput
                items={step.hazards}
                onChange={(hazards) => onUpdate(step._key, { hazards })}
                placeholder="Add hazard..."
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">
                Safety Controls
              </label>
              <TagInput
                items={step.safety_controls}
                onChange={(safety_controls) =>
                  onUpdate(step._key, { safety_controls })
                }
                placeholder="Add control..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Simple reusable input                                              */
/* ------------------------------------------------------------------ */
function Field({
  label,
  value,
  onChange,
  type = 'text',
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
}) {
  const cls =
    'mt-1 w-full rounded-md border px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={cls}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tag input (chips)                                                  */
/* ------------------------------------------------------------------ */
function TagInput({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}) {
  const [input, setInput] = useState('');

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      onChange([...items, input.trim()]);
      setInput('');
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-xs"
          >
            {item}
            <button
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="text-slate-400 hover:text-red-500"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="mt-1 w-full rounded border px-2 py-1 text-xs"
      />
    </div>
  );
}
