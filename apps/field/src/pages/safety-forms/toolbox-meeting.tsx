import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { SignatureCanvas } from '@/components/signature-canvas';
import { Plus, Trash2, Check, Users, Search, Download } from 'lucide-react';
import { generateToolboxPdf, downloadPdf } from '@/lib/pdf-export';
import {
  toolboxMeetingTemplates,
  toolboxMeetingCategories,
  getTemplatesByCategory,
  searchToolboxTemplates,
  type ToolboxTopic,
} from '@/data/toolbox-meeting-templates';

interface Attendee {
  name: string;
  company: string;
  signatureUrl: string | null;
}

const SAFETY_REMINDERS = [
  'Report all incidents immediately',
  'Wear required PPE at all times',
  'Know your emergency exits',
  'Stay hydrated',
  'Follow LOTO procedures',
  'Maintain 3-point contact on ladders',
];

export function ToolboxMeetingPage() {
  const navigate = useNavigate();
  const { user, membership } = useAuth();

  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    time: format(new Date(), 'HH:mm'),
    location: '',
    facilitator: '',
    projectName: '',
    weather: '',
    topic: '',
    discussionPoints: '',
    correctiveActions: '',
  });

  const [hazards, setHazards] = useState<string[]>([]);
  const [selectedReminders, setSelectedReminders] = useState<string[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([
    { name: '', company: '', signatureUrl: null },
  ]);

  const [showSignature, setShowSignature] = useState(false);
  const [signingAttendeeIndex, setSigningAttendeeIndex] = useState<
    number | null
  >(null);
  const [showSupervisorSignature, setShowSupervisorSignature] = useState(false);
  const [supervisorSignatureUrl, setSupervisorSignatureUrl] = useState<
    string | null
  >(null);
  const [saving, setSaving] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  // Template browser state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ToolboxTopic | null>(null);
  const [discussedQuestions, setDiscussedQuestions] = useState<Set<number>>(new Set());

  function updateField<K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function selectTemplate(template: ToolboxTopic) {
    setSelectedTemplate(template);
    updateField('topic', template.title);

    // Format key points as bullet list
    const bulletPoints = template.keyPoints.map((point) => `• ${point}`).join('\n');
    updateField('discussionPoints', bulletPoints);

    // Reset discussed questions
    setDiscussedQuestions(new Set());
  }

  function toggleDiscussedQuestion(index: number) {
    setDiscussedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  function updateAttendee(index: number, field: keyof Attendee, value: string) {
    setAttendees((prev) =>
      prev.map((a, i) =>
        i === index ? { ...a, [field]: value } : a
      )
    );
  }

  function addAttendee() {
    setAttendees((prev) => [
      ...prev,
      { name: '', company: '', signatureUrl: null },
    ]);
  }

  function removeAttendee(index: number) {
    setAttendees((prev) => prev.filter((_, i) => i !== index));
  }

  function openAttendeeSignature(index: number) {
    setSigningAttendeeIndex(index);
    setShowSignature(true);
  }

  function handleAttendeeSignatureSave(dataUrl: string) {
    if (signingAttendeeIndex !== null) {
      setAttendees((prev) =>
        prev.map((a, i) =>
          i === signingAttendeeIndex ? { ...a, signatureUrl: dataUrl } : a
        )
      );
    }
    setShowSignature(false);
    setSigningAttendeeIndex(null);
  }

  function handleSupervisorSignatureSave(dataUrl: string) {
    setSupervisorSignatureUrl(dataUrl);
    setShowSupervisorSignature(false);
  }

  function toggleReminder(reminder: string) {
    setSelectedReminders((prev) =>
      prev.includes(reminder)
        ? prev.filter((r) => r !== reminder)
        : [...prev, reminder]
    );
  }

  // Get filtered templates based on category and search
  function getFilteredTemplates(): ToolboxTopic[] {
    let templates = toolboxMeetingTemplates;

    // Filter by category
    if (selectedCategory !== 'All') {
      templates = getTemplatesByCategory(selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      templates = searchToolboxTemplates(searchQuery);
    }

    return templates;
  }

  async function handleSave(isDraft = false) {
    if (!user || !membership?.organization_id) return;
    setSaving(true);
    try {
      // Insert toolbox meeting
      const { data: meeting, error: meetingError } = await supabase
        .from('toolbox_meetings')
        .insert({
          organization_id: membership.organization_id,
          created_by_id: user.id,
          meeting_date: formData.date,
          topic: formData.topic || 'Weekly Toolbox Meeting',
          description: formData.discussionPoints,
          location: formData.location,
          hazards_discussed: hazards,
          corrective_actions: formData.correctiveActions || null,
        })
        .select('id')
        .single();

      if (meetingError) throw meetingError;

      // Insert attendees
      const attendeesToInsert = attendees
        .filter((a) => a.name.trim())
        .map((a) => ({
          meeting_id: meeting.id,
          attendee_name: a.name,
          company: a.company || null,
          signature_url: a.signatureUrl,
          signed_at: a.signatureUrl ? new Date().toISOString() : null,
        }));

      if (attendeesToInsert.length > 0) {
        const { error: attendeesError } = await supabase
          .from('toolbox_meeting_attendees')
          .insert(attendeesToInsert);
        if (attendeesError) throw attendeesError;
      }

      navigate('/safety');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save toolbox meeting. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDownloadPdf() {
    setGeneratingPdf(true);
    try {
      const doc = generateToolboxPdf({
        date: formData.date,
        time: formData.time,
        location: formData.location,
        facilitator: formData.facilitator,
        projectName: formData.projectName,
        weather: formData.weather,
        topic: formData.topic,
        discussionPoints: formData.discussionPoints,
        hazards: hazards,
        correctiveActions: formData.correctiveActions,
        attendees: attendees.filter(a => a.name.trim()).map(a => ({
          name: a.name,
          company: a.company,
          signed: !!a.signatureUrl,
        })),
        safetyReminders: selectedReminders,
      });
      downloadPdf(doc, `toolbox-meeting-${formData.date}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setGeneratingPdf(false);
    }
  }

  const filteredTemplates = getFilteredTemplates();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">
          Weekly Toolbox Meeting
        </h1>
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
            onClick={() => handleSave(true)}
            disabled={saving}
            className="rounded-md border px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <section className="mt-6 rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">Meeting Details</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field
            label="Date"
            value={formData.date}
            onChange={(v) => updateField('date', v)}
            type="date"
          />
          <Field
            label="Time"
            value={formData.time}
            onChange={(v) => updateField('time', v)}
            type="time"
          />
          <Field
            label="Location/Site"
            value={formData.location}
            onChange={(v) => updateField('location', v)}
          />
          <Field
            label="Facilitator Name"
            value={formData.facilitator}
            onChange={(v) => updateField('facilitator', v)}
          />
          <Field
            label="Project Name"
            value={formData.projectName}
            onChange={(v) => updateField('projectName', v)}
          />
          <Field
            label="Weather Conditions"
            value={formData.weather}
            onChange={(v) => updateField('weather', v)}
          />
        </div>
      </section>

      {/* Topic Browser */}
      <section className="mt-4 rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">Meeting Topic</h2>

        {/* Search */}
        <div className="mt-3 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics..."
            className="w-full rounded-md border pl-9 pr-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="mt-3 -mx-4 px-4 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {toolboxMeetingCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Cards Grid */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {filteredTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => selectTemplate(template)}
              className={`text-left rounded-lg border p-3 transition-all hover:shadow-md ${
                selectedTemplate?.id === template.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-sm text-slate-900 line-clamp-1">
                  {template.title}
                </h3>
                <span className="flex-shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-600">
                  {template.category}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                {template.description}
              </p>
            </button>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="mt-4 text-center py-6 text-sm text-slate-500">
            No topics found. Try a different search or category.
          </div>
        )}

        {/* Custom Topic */}
        <div className="mt-4 pt-4 border-t">
          <Field
            label="Custom Topic (if not listed above)"
            value={formData.topic}
            onChange={(v) => {
              updateField('topic', v);
              setSelectedTemplate(null);
            }}
          />
        </div>
      </section>

      {/* Discussion Points */}
      <section className="mt-4 rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Discussion Points
        </h2>
        <div className="mt-3">
          <Field
            label="Key points discussed during the meeting"
            value={formData.discussionPoints}
            onChange={(v) => updateField('discussionPoints', v)}
            multiline
          />
        </div>
      </section>

      {/* Discussion Questions */}
      {selectedTemplate && selectedTemplate.discussionQuestions.length > 0 && (
        <section className="mt-4 rounded-lg border bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Discussion Questions
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Mark which questions were discussed during the meeting
          </p>
          <div className="mt-3 space-y-2">
            {selectedTemplate.discussionQuestions.map((question, idx) => (
              <label
                key={idx}
                className="flex items-start gap-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={discussedQuestions.has(idx)}
                  onChange={() => toggleDiscussedQuestion(idx)}
                  className="mt-0.5 rounded border-slate-300"
                />
                <span className="text-slate-700">
                  {idx + 1}. {question}
                </span>
              </label>
            ))}
          </div>
        </section>
      )}

      {/* Key Hazards Reviewed */}
      <section className="mt-4 rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Key Hazards Reviewed
        </h2>
        <div className="mt-3">
          <TagInput
            items={hazards}
            onChange={setHazards}
            placeholder="Type hazard and press Enter..."
          />
        </div>
      </section>

      {/* Safety Reminders */}
      <section className="mt-4 rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Safety Reminders
        </h2>
        <div className="mt-3 space-y-2">
          {SAFETY_REMINDERS.map((reminder) => (
            <label key={reminder} className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedReminders.includes(reminder)}
                onChange={() => toggleReminder(reminder)}
                className="mt-0.5 rounded border-slate-300"
              />
              <span className="text-slate-700">{reminder}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Corrective Actions */}
      <section className="mt-4 rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Corrective Actions
        </h2>
        <div className="mt-3">
          <Field
            label="Actions to be taken based on discussion"
            value={formData.correctiveActions}
            onChange={(v) => updateField('correctiveActions', v)}
            multiline
          />
        </div>
      </section>

      {/* Attendee List */}
      <section className="mt-4 rounded-lg border bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-900">
              Attendee List ({attendees.length})
            </h2>
          </div>
          <button
            onClick={addAttendee}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Attendee
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {attendees.map((attendee, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 rounded border p-2"
            >
              <div className="grid flex-1 gap-2 sm:grid-cols-2">
                <input
                  value={attendee.name}
                  onChange={(e) =>
                    updateAttendee(idx, 'name', e.target.value)
                  }
                  placeholder="Attendee Name"
                  className="rounded border px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  value={attendee.company}
                  onChange={(e) =>
                    updateAttendee(idx, 'company', e.target.value)
                  }
                  placeholder="Company/Trade"
                  className="rounded border px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-1">
                {attendee.signatureUrl ? (
                  <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                    <Check className="h-3.5 w-3.5" />
                    Signed
                  </span>
                ) : (
                  <button
                    onClick={() => openAttendeeSignature(idx)}
                    disabled={!attendee.name.trim()}
                    className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 disabled:opacity-50"
                  >
                    Sign
                  </button>
                )}
                {attendees.length > 1 && (
                  <button
                    onClick={() => removeAttendee(idx)}
                    className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Supervisor Signature */}
      <section className="mt-4 rounded-lg border bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Supervisor Signature
        </h2>
        {showSupervisorSignature ? (
          <div className="mt-3">
            <SignatureCanvas
              title={`${formData.facilitator || 'Supervisor'} — Sign below`}
              onSave={handleSupervisorSignatureSave}
              onCancel={() => setShowSupervisorSignature(false)}
            />
          </div>
        ) : supervisorSignatureUrl ? (
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                Supervisor signed
              </span>
              <button
                onClick={() => setShowSupervisorSignature(true)}
                className="ml-auto text-xs text-blue-600 hover:underline"
              >
                Re-sign
              </button>
            </div>
            <img
              src={supervisorSignatureUrl}
              alt="Supervisor signature"
              className="mt-2 h-20 rounded border bg-white object-contain"
            />
          </div>
        ) : (
          <button
            onClick={() => setShowSupervisorSignature(true)}
            className="mt-2 text-sm font-medium text-blue-600 hover:underline"
          >
            Add Signature
          </button>
        )}
      </section>

      {/* Attendee Signature Modal */}
      {showSignature && signingAttendeeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md">
            <SignatureCanvas
              title={`${attendees[signingAttendeeIndex].name} — Sign below`}
              onSave={handleAttendeeSignatureSave}
              onCancel={() => {
                setShowSignature(false);
                setSigningAttendeeIndex(null);
              }}
            />
          </div>
        </div>
      )}
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
    'mt-1 w-full rounded-md border px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';
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
        className="mt-1 w-full rounded border px-2 py-1 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
