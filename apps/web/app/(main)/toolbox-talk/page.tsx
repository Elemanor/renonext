'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import {
  toolboxTemplates,
  getGroupedTemplates,
  meetingTypeOptions,
  weatherOptions,
  type ToolboxTopic,
} from '@/lib/data/toolbox-templates';

interface Attendee {
  id: string;
  name: string;
  trade: string;
}

export default function ToolboxTalkGenerator() {
  // Meeting info
  const [companyName, setCompanyName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('07:00');
  const [meetingType, setMeetingType] = useState('weekly');
  const [weather, setWeather] = useState('Clear');
  const [conductedBy, setConductedBy] = useState('');

  // Topic & agenda
  const [selectedTemplate, setSelectedTemplate] = useState<ToolboxTopic | null>(null);
  const [mainTopic, setMainTopic] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [discussionQuestions, setDiscussionQuestions] = useState('');
  const [meetingNotes, setMeetingNotes] = useState('');

  // Attendees
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [newAttendeeName, setNewAttendeeName] = useState('');
  const [newAttendeeTrade, setNewAttendeeTrade] = useState('');

  // Supervisor
  const [supervisorName, setSupervisorName] = useState('');

  const groupedTemplates = useMemo(() => getGroupedTemplates(), []);

  const handleSelectTemplate = (templateId: string) => {
    const template = toolboxTemplates.find((t) => t.id === templateId);
    if (!template) return;

    setSelectedTemplate(template);
    setMainTopic(template.title);

    // Build key points text
    const pointsText = template.keyPoints
      .map((point, idx) => `${idx + 1}. ${point}`)
      .join('\n');
    setKeyPoints(pointsText);

    // Build discussion questions text
    const questionsText = template.discussionQuestions
      .map((q, idx) => `${idx + 1}. ${q}`)
      .join('\n');
    setDiscussionQuestions(questionsText);
  };

  const handleAddAttendee = () => {
    if (!newAttendeeName.trim()) return;
    const newMember: Attendee = {
      id: `att-${Date.now()}`,
      name: newAttendeeName.trim(),
      trade: newAttendeeTrade.trim() || 'Worker',
    };
    setAttendees([...attendees, newMember]);
    setNewAttendeeName('');
    setNewAttendeeTrade('');
  };

  const handleRemoveAttendee = (id: string) => {
    setAttendees(attendees.filter((a) => a.id !== id));
  };

  const handleClearForm = () => {
    if (!confirm('Are you sure you want to clear the entire form?')) return;
    setCompanyName('');
    setProjectName('');
    setSiteAddress('');
    setDate(new Date().toISOString().split('T')[0]);
    setTime('07:00');
    setMeetingType('weekly');
    setWeather('Clear');
    setConductedBy('');
    setSelectedTemplate(null);
    setMainTopic('');
    setKeyPoints('');
    setDiscussionQuestions('');
    setMeetingNotes('');
    setAttendees([]);
    setSupervisorName('');
  };

  const handlePrint = () => {
    window.print();
  };

  const meetingTypeLabel = meetingTypeOptions.find((o) => o.value === meetingType)?.label || meetingType;

  return (
    <>
      {/* Print Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media print {
            @page {
              size: portrait;
              margin: 0.5in;
            }
            body {
              margin: 0;
              padding: 0;
              background: white !important;
            }
            .no-print {
              display: none !important;
            }
            .print-only {
              display: block !important;
            }
            .print-page-break {
              page-break-after: always;
            }
            .print-table {
              width: 100%;
              border-collapse: collapse;
              margin: 0.5rem 0;
            }
            .print-table th,
            .print-table td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
              font-size: 10pt;
            }
            .print-table th {
              background: #e5e7eb;
              font-weight: bold;
            }
            .print-header {
              text-align: center;
              margin-bottom: 1rem;
            }
            .print-header h1 {
              font-size: 18pt;
              font-weight: bold;
              margin: 0.5rem 0;
            }
            .print-header p {
              font-size: 10pt;
              margin: 0.25rem 0;
            }
            .print-section {
              margin: 0.75rem 0;
            }
            .print-section h2 {
              font-size: 12pt;
              font-weight: bold;
              margin: 0.5rem 0;
              background: #e5e7eb;
              padding: 4px 8px;
            }
            .print-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 0.5rem;
              margin: 0.5rem 0;
            }
            .print-grid-3 {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 0.5rem;
              margin: 0.5rem 0;
            }
            .print-field {
              border: 1px solid #000;
              padding: 4px 8px;
              font-size: 10pt;
            }
            .print-field strong {
              font-weight: bold;
            }
            .print-text-block {
              border: 1px solid #000;
              padding: 8px;
              font-size: 10pt;
              white-space: pre-wrap;
              min-height: 40px;
            }
            .print-signature-line {
              border-bottom: 1px solid #000;
              height: 30px;
              margin: 0.25rem 0;
            }
          }
          @media screen {
            .print-only {
              display: none;
            }
          }
        `,
        }}
      />

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SCREEN VIEW                                                        */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <div className="no-print min-h-screen bg-reno-cream py-12">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="material-symbols-outlined text-4xl text-blue-600"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                groups
              </span>
              <div>
                <h1 className="text-4xl font-bold text-reno-dark">
                  Toolbox Talk Generator
                </h1>
                <p className="text-lg text-gray-600 mt-1">
                  Create a professional Weekly Toolbox Safety Meeting form. Fill it out and print.
                </p>
              </div>
            </div>
            <Badge className="bg-blue-600 text-white hover:bg-blue-600">
              <span className="material-symbols-outlined text-sm mr-1">workspace_premium</span>
              Free Tool
            </Badge>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ── LEFT COLUMN ──────────────────────────────────────────── */}
            <div className="space-y-6">
              {/* Meeting Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="material-symbols-outlined">info</span>
                    Meeting Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="Enter project name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteAddress">Site Address</Label>
                    <Input
                      id="siteAddress"
                      value={siteAddress}
                      onChange={(e) => setSiteAddress(e.target.value)}
                      placeholder="Enter site address"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Meeting Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Meeting Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="meetingType">Meeting Type</Label>
                      <Select value={meetingType} onValueChange={setMeetingType}>
                        <SelectTrigger id="meetingType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {meetingTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="weather">Weather</Label>
                      <Select value={weather} onValueChange={setWeather}>
                        <SelectTrigger id="weather">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {weatherOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.icon} {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="conductedBy">Conducted By</Label>
                    <Input
                      id="conductedBy"
                      value={conductedBy}
                      onChange={(e) => setConductedBy(e.target.value)}
                      placeholder="Supervisor / Foreman name"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Topic Selection from Templates */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <span className="material-symbols-outlined">menu_book</span>
                    Safety Topic Template
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Select a pre-built topic to auto-populate key points and discussion questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="templateSelect">Choose a topic template</Label>
                    <Select onValueChange={handleSelectTemplate}>
                      <SelectTrigger id="templateSelect">
                        <SelectValue placeholder="Browse 35+ safety topics..." />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(groupedTemplates).map(([category, templates]) => (
                          <SelectGroup key={category}>
                            <SelectLabel>{category}</SelectLabel>
                            {templates.map((template) => (
                              <SelectItem key={template.id} value={template.id}>
                                {template.title}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedTemplate && (
                    <div className="p-3 bg-white rounded-lg border border-blue-200">
                      <p className="font-semibold text-blue-900">{selectedTemplate.title}</p>
                      <p className="text-sm text-blue-700 mt-1">{selectedTemplate.description}</p>
                      <Badge variant="outline" className="mt-2 text-blue-600 border-blue-300">
                        {selectedTemplate.category}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* ── RIGHT COLUMN ─────────────────────────────────────────── */}
            <div className="space-y-6">
              {/* Topic & Agenda */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="material-symbols-outlined">assignment</span>
                    Topic & Agenda
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="mainTopic">Main Topic</Label>
                    <Input
                      id="mainTopic"
                      value={mainTopic}
                      onChange={(e) => setMainTopic(e.target.value)}
                      placeholder="Enter meeting topic or select a template"
                    />
                  </div>
                  <div>
                    <Label htmlFor="keyPoints">Key Points</Label>
                    <Textarea
                      id="keyPoints"
                      value={keyPoints}
                      onChange={(e) => setKeyPoints(e.target.value)}
                      placeholder="Key safety points to discuss (auto-filled from template)..."
                      rows={6}
                    />
                  </div>
                  <div>
                    <Label htmlFor="discussionQuestions">Discussion Questions</Label>
                    <Textarea
                      id="discussionQuestions"
                      value={discussionQuestions}
                      onChange={(e) => setDiscussionQuestions(e.target.value)}
                      placeholder="Questions for crew discussion (auto-filled from template)..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="meetingNotes">Meeting Notes / Action Items</Label>
                    <Textarea
                      id="meetingNotes"
                      value={meetingNotes}
                      onChange={(e) => setMeetingNotes(e.target.value)}
                      placeholder="Additional notes, action items, or follow-ups..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Attendees */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="material-symbols-outlined">group</span>
                    Attendees
                  </CardTitle>
                  <CardDescription>
                    Add crew members who attended the meeting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        value={newAttendeeName}
                        onChange={(e) => setNewAttendeeName(e.target.value)}
                        placeholder="Name"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddAttendee();
                          }
                        }}
                      />
                    </div>
                    <div className="w-32">
                      <Input
                        value={newAttendeeTrade}
                        onChange={(e) => setNewAttendeeTrade(e.target.value)}
                        placeholder="Trade"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddAttendee();
                          }
                        }}
                      />
                    </div>
                    <Button onClick={handleAddAttendee}>
                      <span className="material-symbols-outlined">add</span>
                    </Button>
                  </div>

                  {attendees.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                      <span className="material-symbols-outlined text-4xl mb-2 opacity-50">
                        group_add
                      </span>
                      <p>No attendees added yet</p>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm text-gray-600">
                        {attendees.length} attendee{attendees.length !== 1 ? 's' : ''}
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {attendees.map((attendee) => (
                          <div
                            key={attendee.id}
                            className="flex items-center justify-between gap-2 p-2 border rounded"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{attendee.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {attendee.trade}
                              </Badge>
                            </div>
                            <Button
                              onClick={() => handleRemoveAttendee(attendee.id)}
                              variant="ghost"
                              size="sm"
                            >
                              <span className="material-symbols-outlined text-red-600 text-sm">
                                close
                              </span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <Separator />

                  <div>
                    <Label htmlFor="supervisorName">Supervisor Sign-Off</Label>
                    <Input
                      id="supervisorName"
                      value={supervisorName}
                      onChange={(e) => setSupervisorName(e.target.value)}
                      placeholder="Enter supervisor name for sign-off"
                      className="mt-1"
                    />
                    <div className="mt-2 border-b-2 border-gray-400 pb-1">
                      <p className="text-xs text-gray-500">Signature line (will show on print)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 lg:static lg:mt-8 lg:bg-transparent lg:border-0 lg:shadow-none">
            <div className="container mx-auto max-w-7xl flex gap-4 justify-end">
              <Button onClick={handleClearForm} variant="outline">
                <span className="material-symbols-outlined mr-2">delete_sweep</span>
                Clear Form
              </Button>
              <Button
                onClick={handlePrint}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
              >
                <span className="material-symbols-outlined mr-2">print</span>
                Print Toolbox Talk
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* PRINT VIEW                                                         */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <div className="print-only">
        {/* PAGE 1 */}
        <div className="print-header">
          <h1>WEEKLY TOOLBOX SAFETY MEETING</h1>
          <p>{companyName || '[Company Name]'}</p>
        </div>

        <div className="print-section">
          <h2>Meeting Information</h2>
          <div className="print-grid">
            <div className="print-field">
              <strong>Company:</strong> {companyName || '_________________'}
            </div>
            <div className="print-field">
              <strong>Date:</strong> {date}
            </div>
            <div className="print-field">
              <strong>Project:</strong> {projectName || '_________________'}
            </div>
            <div className="print-field">
              <strong>Time:</strong> {time}
            </div>
            <div className="print-field">
              <strong>Site Address:</strong> {siteAddress || '_________________'}
            </div>
            <div className="print-field">
              <strong>Meeting Type:</strong> {meetingTypeLabel}
            </div>
            <div className="print-field">
              <strong>Conducted By:</strong> {conductedBy || '_________________'}
            </div>
            <div className="print-field">
              <strong>Weather:</strong> {weather}
            </div>
          </div>
        </div>

        <div className="print-section">
          <h2>Safety Topic</h2>
          <div className="print-field" style={{ marginBottom: '0.5rem' }}>
            <strong>Topic:</strong> {mainTopic || '_________________'}
          </div>
          {selectedTemplate && (
            <div className="print-field" style={{ marginBottom: '0.5rem' }}>
              <strong>Category:</strong> {selectedTemplate.category}
            </div>
          )}
        </div>

        <div className="print-section">
          <h2>Key Points Discussed</h2>
          <div className="print-text-block">
            {keyPoints || 'No key points specified'}
          </div>
        </div>

        <div className="print-section">
          <h2>Discussion Questions</h2>
          <div className="print-text-block">
            {discussionQuestions || 'No discussion questions specified'}
          </div>
        </div>

        {meetingNotes && (
          <div className="print-section">
            <h2>Meeting Notes / Action Items</h2>
            <div className="print-text-block">
              {meetingNotes}
            </div>
          </div>
        )}

        <div className="print-page-break"></div>

        {/* PAGE 2 */}
        <div className="print-header">
          <h1>TOOLBOX TALK — ATTENDANCE & SIGN-OFF</h1>
          <p>
            {projectName || '[Project]'} — {date} — Topic: {mainTopic || '[Topic]'}
          </p>
        </div>

        <div className="print-section">
          <h2>Attendee Signatures</h2>
          {attendees.length === 0 ? (
            <div className="print-field">No attendees listed</div>
          ) : (
            <table className="print-table">
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>#</th>
                  <th style={{ width: '30%' }}>Name</th>
                  <th style={{ width: '20%' }}>Trade</th>
                  <th style={{ width: '30%' }}>Signature</th>
                  <th style={{ width: '15%' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((attendee, idx) => (
                  <tr key={attendee.id}>
                    <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                    <td>{attendee.name}</td>
                    <td>{attendee.trade}</td>
                    <td>
                      <div className="print-signature-line"></div>
                    </td>
                    <td>
                      <div className="print-signature-line"></div>
                    </td>
                  </tr>
                ))}
                {/* Extra blank rows for walk-ins */}
                {Array.from({ length: Math.max(3, 10 - attendees.length) }).map((_, idx) => (
                  <tr key={`blank-${idx}`}>
                    <td style={{ textAlign: 'center', color: '#999' }}>{attendees.length + idx + 1}</td>
                    <td>
                      <div className="print-signature-line"></div>
                    </td>
                    <td>
                      <div className="print-signature-line"></div>
                    </td>
                    <td>
                      <div className="print-signature-line"></div>
                    </td>
                    <td>
                      <div className="print-signature-line"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="print-section">
          <h2>Supervisor Sign-Off</h2>
          <div className="print-grid-3">
            <div className="print-field">
              <strong>NAME:</strong> {supervisorName || '_________________'}
            </div>
            <div className="print-field">
              <strong>SIGNATURE:</strong>
              <div className="print-signature-line"></div>
            </div>
            <div className="print-field">
              <strong>DATE:</strong>
              <div className="print-signature-line"></div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1rem', fontSize: '8pt', color: '#666', textAlign: 'center' }}>
          This toolbox talk record must be kept on file for a minimum of 3 years. All workers must sign to confirm attendance and understanding.
        </div>
      </div>
    </>
  );
}
