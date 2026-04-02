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
  jobStepTemplates,
  getGroupedTemplates,
  hazardChecklist,
  criticalTaskOptions,
  weatherOptions,
  temperatureOptions,
  type JobStepTemplate,
} from '@/lib/data/jsa-templates';

interface JobStep {
  id: string;
  sequence: number;
  operation: string;
  hazards: string[];
  safetyControls: string[];
  requiredTools: string[];
  requiredPPE: string[];
  riskLevel: 'A' | 'B' | 'C';
  isCustom: boolean;
}

interface CrewMember {
  id: string;
  name: string;
}

export default function JSAFormGenerator() {
  const [companyName, setCompanyName] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [projectName, setProjectName] = useState('');
  const [workArea, setWorkArea] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [weather, setWeather] = useState('Clear');
  const [temperature, setTemperature] = useState('20');
  const [supervisor, setSupervisor] = useState('');
  const [safetyRep, setSafetyRep] = useState('');

  const [criticalTasks, setCriticalTasks] = useState<Record<string, boolean>>({});
  const [hazards, setHazards] = useState<Record<string, boolean>>({});
  const [otherHazard, setOtherHazard] = useState('');

  const [jobSteps, setJobSteps] = useState<JobStep[]>([]);
  const [crewMembers, setCrewMembers] = useState<CrewMember[]>([]);
  const [newCrewName, setNewCrewName] = useState('');
  const [supervisorApprovalName, setSupervisorApprovalName] = useState('');

  const groupedTemplates = useMemo(() => getGroupedTemplates(), []);

  // Auto-consolidated tools and PPE
  const consolidatedTools = useMemo(() => {
    const tools = new Set<string>();
    jobSteps.forEach((step) => {
      step.requiredTools.forEach((tool) => tools.add(tool));
    });
    return Array.from(tools).sort();
  }, [jobSteps]);

  const consolidatedPPE = useMemo(() => {
    const ppe = new Set<string>([
      'Hard hat',
      'Safety glasses',
      'Steel-toed boots',
      'High-visibility vest',
    ]);
    jobSteps.forEach((step) => {
      step.requiredPPE.forEach((item) => ppe.add(item));
    });
    return Array.from(ppe).sort();
  }, [jobSteps]);

  const handleAddTemplateStep = (templateId: string) => {
    const template = jobStepTemplates.find((t) => t.id === templateId);
    if (!template) return;

    const newStep: JobStep = {
      id: `step-${Date.now()}`,
      sequence: jobSteps.length + 1,
      operation: template.name,
      hazards: [...template.hazards],
      safetyControls: [...template.safetyControls],
      requiredTools: [...template.requiredTools],
      requiredPPE: [...template.requiredPPE],
      riskLevel: template.riskLevel,
      isCustom: false,
    };

    setJobSteps([...jobSteps, newStep]);
  };

  const handleAddCustomStep = () => {
    const newStep: JobStep = {
      id: `step-${Date.now()}`,
      sequence: jobSteps.length + 1,
      operation: 'Custom Step',
      hazards: [''],
      safetyControls: [''],
      requiredTools: [],
      requiredPPE: [],
      riskLevel: 'C',
      isCustom: true,
    };

    setJobSteps([...jobSteps, newStep]);
  };

  const handleRemoveStep = (id: string) => {
    const filtered = jobSteps.filter((step) => step.id !== id);
    // Re-sequence
    const resequenced = filtered.map((step, index) => ({
      ...step,
      sequence: index + 1,
    }));
    setJobSteps(resequenced);
  };

  const handleUpdateStep = (id: string, field: keyof JobStep, value: any) => {
    setJobSteps(
      jobSteps.map((step) => (step.id === id ? { ...step, [field]: value } : step))
    );
  };

  const handleAddCrewMember = () => {
    if (!newCrewName.trim()) return;
    const newMember: CrewMember = {
      id: `crew-${Date.now()}`,
      name: newCrewName.trim(),
    };
    setCrewMembers([...crewMembers, newMember]);
    setNewCrewName('');
  };

  const handleRemoveCrewMember = (id: string) => {
    setCrewMembers(crewMembers.filter((member) => member.id !== id));
  };

  const handleClearForm = () => {
    if (!confirm('Are you sure you want to clear the entire form?')) return;
    setCompanyName('');
    setSiteAddress('');
    setProjectName('');
    setWorkArea('');
    setDate(new Date().toISOString().split('T')[0]);
    setWeather('Clear');
    setTemperature('20');
    setSupervisor('');
    setSafetyRep('');
    setCriticalTasks({});
    setHazards({});
    setOtherHazard('');
    setJobSteps([]);
    setCrewMembers([]);
    setSupervisorApprovalName('');
  };

  const handlePrint = () => {
    window.print();
  };

  const getRiskBadgeColor = (level: 'A' | 'B' | 'C') => {
    switch (level) {
      case 'A':
        return 'bg-red-600 text-white hover:bg-red-600';
      case 'B':
        return 'bg-amber-600 text-white hover:bg-amber-600';
      case 'C':
        return 'bg-reno-green-600 text-white hover:bg-reno-green-600';
    }
  };

  return (
    <>
      {/* Print Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media print {
            @page {
              size: landscape;
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
            .print-section {
              margin: 1rem 0;
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
            .print-checkbox {
              display: inline-block;
              width: 12px;
              height: 12px;
              border: 1px solid #000;
              margin-right: 4px;
              text-align: center;
              line-height: 12px;
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

      {/* Screen View */}
      <div className="no-print min-h-screen bg-reno-cream py-12">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="material-symbols-outlined text-4xl text-reno-green"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
              <div>
                <h1 className="text-4xl font-bold text-reno-dark">JSA Form Generator</h1>
                <p className="text-lg text-slate-600 mt-1">
                  Generate a professional Job Safety Analysis form. Fill it out and print.
                </p>
              </div>
            </div>
            <Badge className="bg-reno-green-600 text-white hover:bg-reno-green-600">
              <span className="material-symbols-outlined text-sm mr-1">workspace_premium</span>
              Free Tool
            </Badge>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* Project Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="material-symbols-outlined">info</span>
                    Project Information
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
                    <Label htmlFor="siteAddress">Site/Project Address</Label>
                    <Input
                      id="siteAddress"
                      value={siteAddress}
                      onChange={(e) => setSiteAddress(e.target.value)}
                      placeholder="Enter site address"
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
                    <Label htmlFor="workArea">Work Area / Location</Label>
                    <Input
                      id="workArea"
                      value={workArea}
                      onChange={(e) => setWorkArea(e.target.value)}
                      placeholder="Enter work area"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
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
                    <Label htmlFor="temperature">Temperature</Label>
                    <Select value={temperature} onValueChange={setTemperature}>
                      <SelectTrigger id="temperature">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {temperatureOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="supervisor">Crew Supervisor</Label>
                    <Input
                      id="supervisor"
                      value={supervisor}
                      onChange={(e) => setSupervisor(e.target.value)}
                      placeholder="Enter supervisor name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="safetyRep">Crew Safety Rep.</Label>
                    <Input
                      id="safetyRep"
                      value={safetyRep}
                      onChange={(e) => setSafetyRep(e.target.value)}
                      placeholder="Enter safety rep name"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Critical Tasks */}
              <Card className="border-amber-600 bg-amber-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-900">
                    <span className="material-symbols-outlined">warning</span>
                    Additional Safety Measures Concerning Critical Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {criticalTaskOptions.map((task) => (
                    <div key={task.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={task.id}
                        checked={criticalTasks[task.id] || false}
                        onChange={(e) =>
                          setCriticalTasks({
                            ...criticalTasks,
                            [task.id]: e.target.checked,
                          })
                        }
                        className="h-4 w-4"
                      />
                      <Label htmlFor={task.id} className="text-sm font-medium cursor-pointer">
                        {task.label}
                      </Label>
                    </div>
                  ))}
                  <p className="text-red-700 text-sm font-semibold mt-4">
                    If any of the above CRITICAL TASKS apply, details of work steps and safety
                    controls MUST be listed in the JSA below
                  </p>
                </CardContent>
              </Card>

              {/* Anticipated Hazards */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="material-symbols-outlined">warning_amber</span>
                    Anticipated Hazards
                  </CardTitle>
                  <CardDescription>Check applicable anticipated or potential hazards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-2">
                    {hazardChecklist.map((hazard) => (
                      <div key={hazard.id} className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          id={hazard.id}
                          checked={hazards[hazard.id] || false}
                          onChange={(e) =>
                            setHazards({
                              ...hazards,
                              [hazard.id]: e.target.checked,
                            })
                          }
                          className="h-4 w-4 mt-1"
                        />
                        <Label htmlFor={hazard.id} className="text-sm cursor-pointer">
                          {hazard.label}
                        </Label>
                      </div>
                    ))}
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="otherHazard"
                        checked={hazards['otherHazard'] || false}
                        onChange={(e) =>
                          setHazards({
                            ...hazards,
                            otherHazard: e.target.checked,
                          })
                        }
                        className="h-4 w-4 mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor="otherHazard" className="text-sm cursor-pointer">
                          Other
                        </Label>
                        <Input
                          value={otherHazard}
                          onChange={(e) => setOtherHazard(e.target.value)}
                          placeholder="Describe other hazards"
                          className="mt-1"
                          disabled={!hazards['otherHazard']}
                        />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <p className="text-sm text-slate-600">
                    Ensure that all hazards identified are addressed in JSA below | Risk Levels:{' '}
                    <span className="font-semibold">A = High</span>{' '}
                    <span className="font-semibold">B = Medium</span>{' '}
                    <span className="font-semibold">C = Low</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* Job Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="material-symbols-outlined">list</span>
                    Job Steps Sequence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="addStep">Add job step from template</Label>
                    <Select onValueChange={handleAddTemplateStep}>
                      <SelectTrigger id="addStep">
                        <SelectValue placeholder="Select a template..." />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(groupedTemplates).map(([category, templates]) => (
                          <SelectGroup key={category}>
                            <SelectLabel>{category}</SelectLabel>
                            {templates.map((template) => (
                              <SelectItem key={template.id} value={template.id}>
                                {template.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleAddCustomStep}
                    variant="outline"
                    className="w-full"
                  >
                    <span className="material-symbols-outlined mr-2">add_circle</span>
                    Add Custom Step
                  </Button>

                  <Separator />

                  {jobSteps.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <span className="material-symbols-outlined text-5xl mb-2 opacity-50">
                        construction
                      </span>
                      <p>No job steps added yet. Select a template or add a custom step.</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {jobSteps.map((step) => (
                      <Card key={step.id} className="border-2">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="font-bold">
                                #{step.sequence}
                              </Badge>
                              {step.isCustom ? (
                                <Input
                                  value={step.operation}
                                  onChange={(e) =>
                                    handleUpdateStep(step.id, 'operation', e.target.value)
                                  }
                                  className="flex-1"
                                  placeholder="Operation name"
                                />
                              ) : (
                                <span className="font-semibold">{step.operation}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getRiskBadgeColor(step.riskLevel)}>
                                Risk {step.riskLevel}
                              </Badge>
                              <Button
                                onClick={() => handleRemoveStep(step.id)}
                                variant="ghost"
                                size="sm"
                              >
                                <span className="material-symbols-outlined text-red-600">
                                  delete
                                </span>
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <Label className="text-xs text-slate-600">Hazards</Label>
                              {step.isCustom ? (
                                <Textarea
                                  value={step.hazards.join('\n')}
                                  onChange={(e) =>
                                    handleUpdateStep(
                                      step.id,
                                      'hazards',
                                      e.target.value.split('\n')
                                    )
                                  }
                                  placeholder="List hazards (one per line)"
                                  className="text-sm"
                                  rows={3}
                                />
                              ) : (
                                <ul className="text-sm list-disc list-inside space-y-1">
                                  {step.hazards.map((hazard, idx) => (
                                    <li key={idx}>{hazard}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                            <div>
                              <Label className="text-xs text-slate-600">Safety Controls</Label>
                              {step.isCustom ? (
                                <Textarea
                                  value={step.safetyControls.join('\n')}
                                  onChange={(e) =>
                                    handleUpdateStep(
                                      step.id,
                                      'safetyControls',
                                      e.target.value.split('\n')
                                    )
                                  }
                                  placeholder="List safety controls (one per line)"
                                  className="text-sm"
                                  rows={3}
                                />
                              ) : (
                                <ul className="text-sm list-disc list-inside space-y-1">
                                  {step.safetyControls.map((control, idx) => (
                                    <li key={idx}>{control}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                            {step.isCustom && (
                              <div>
                                <Label className="text-xs text-slate-600">Risk Level</Label>
                                <Select
                                  value={step.riskLevel}
                                  onValueChange={(value) =>
                                    handleUpdateStep(step.id, 'riskLevel', value)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="A">A - High Risk</SelectItem>
                                    <SelectItem value="B">B - Medium Risk</SelectItem>
                                    <SelectItem value="C">C - Low Risk</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tools & Equipment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="material-symbols-outlined">build</span>
                    Tools & Equipment
                  </CardTitle>
                  <CardDescription>Auto-consolidated from job steps</CardDescription>
                </CardHeader>
                <CardContent>
                  {consolidatedTools.length === 0 ? (
                    <p className="text-slate-500 text-sm">Add job steps to see required tools</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {consolidatedTools.map((tool) => (
                        <Badge key={tool} variant="secondary">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Required PPE */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="material-symbols-outlined">shield</span>
                    Required PPE
                  </CardTitle>
                  <CardDescription>Auto-consolidated from job steps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {consolidatedPPE.map((ppe) => (
                      <Badge key={ppe} variant="secondary" className="bg-reno-green-100 text-reno-green-800">
                        {ppe}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Crew Members */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="material-symbols-outlined">group</span>
                    Crew Members
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newCrewName}
                      onChange={(e) => setNewCrewName(e.target.value)}
                      placeholder="Enter crew member name"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCrewMember();
                        }
                      }}
                    />
                    <Button onClick={handleAddCrewMember}>
                      <span className="material-symbols-outlined">add</span>
                    </Button>
                  </div>

                  {crewMembers.length === 0 ? (
                    <p className="text-slate-500 text-sm">No crew members added yet</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {crewMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between gap-2 p-2 border rounded"
                        >
                          <span className="text-sm font-medium">{member.name}</span>
                          <Button
                            onClick={() => handleRemoveCrewMember(member.id)}
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
                  )}

                  <Separator />

                  <div>
                    <Label htmlFor="supervisorApproval">Supervisor Approval</Label>
                    <Input
                      id="supervisorApproval"
                      value={supervisorApprovalName}
                      onChange={(e) => setSupervisorApprovalName(e.target.value)}
                      placeholder="Enter supervisor name for approval"
                      className="mt-1"
                    />
                    <div className="mt-2 border-b-2 border-slate-400 pb-1">
                      <p className="text-xs text-slate-500">Signature line (will show on print)</p>
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
                className="bg-gradient-to-r from-amber-600 to-reno-amber-700 hover:from-amber-700 hover:to-reno-amber-800"
              >
                <span className="material-symbols-outlined mr-2">print</span>
                Print JSA
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Print View */}
      <div className="print-only">
        {/* PAGE 1 */}
        <div className="print-header">
          <h1>JOB SAFETY ANALYSIS (JSA) FORM</h1>
          <p style={{ fontSize: '10pt', margin: '0.5rem 0' }}>
            {companyName || '[Company Name]'}
          </p>
        </div>

        <div className="print-section">
          <h2>Project Information</h2>
          <div className="print-grid">
            <div className="print-field">
              <strong>Company:</strong> {companyName || '_________________'}
            </div>
            <div className="print-field">
              <strong>Date:</strong> {date}
            </div>
            <div className="print-field">
              <strong>Site/Project Address:</strong> {siteAddress || '_________________'}
            </div>
            <div className="print-field">
              <strong>Project Name:</strong> {projectName || '_________________'}
            </div>
            <div className="print-field">
              <strong>Work Area:</strong> {workArea || '_________________'}
            </div>
            <div className="print-field">
              <strong>Weather:</strong> {weather}
            </div>
            <div className="print-field">
              <strong>Temperature:</strong> {temperature}°C
            </div>
            <div className="print-field">
              <strong>Supervisor:</strong> {supervisor || '_________________'}
            </div>
            <div className="print-field">
              <strong>Safety Rep:</strong> {safetyRep || '_________________'}
            </div>
          </div>
        </div>

        <div className="print-section">
          <h2>Critical Tasks</h2>
          <div className="print-field">
            {criticalTaskOptions.map((task) => (
              <div key={task.id} style={{ marginBottom: '0.25rem' }}>
                <span className="print-checkbox">
                  {criticalTasks[task.id] ? '✓' : ''}
                </span>
                {task.label}
              </div>
            ))}
            <p
              style={{
                color: '#b91c1c',
                fontWeight: 'bold',
                marginTop: '0.5rem',
                fontSize: '9pt',
              }}
            >
              If any of the above CRITICAL TASKS apply, details of work steps and safety controls
              MUST be listed in the JSA below
            </p>
          </div>
        </div>

        <div className="print-section">
          <h2>Anticipated Hazards</h2>
          <div className="print-grid-3">
            {hazardChecklist.map((hazard) => (
              <div key={hazard.id} className="print-field" style={{ fontSize: '9pt' }}>
                <span className="print-checkbox">{hazards[hazard.id] ? '✓' : ''}</span>
                {hazard.label}
              </div>
            ))}
            <div className="print-field" style={{ fontSize: '9pt' }}>
              <span className="print-checkbox">{hazards['otherHazard'] ? '✓' : ''}</span>
              Other: {otherHazard || '_________________'}
            </div>
          </div>
          <p style={{ fontSize: '9pt', marginTop: '0.5rem', fontWeight: 'bold' }}>
            Risk Levels: A = High | B = Medium | C = Low
          </p>
        </div>

        <div className="print-page-break"></div>

        {/* PAGE 2 */}
        <div className="print-section">
          <h2>Job Safety Analysis</h2>
          <table className="print-table">
            <thead>
              <tr>
                <th style={{ width: '5%' }}>#</th>
                <th style={{ width: '25%' }}>Sequence of Basic Job Steps</th>
                <th style={{ width: '30%' }}>Potential Hazards</th>
                <th style={{ width: '5%' }}>Risk</th>
                <th style={{ width: '35%' }}>Safety Controls</th>
              </tr>
            </thead>
            <tbody>
              {jobSteps.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: '#6b7280' }}>
                    No job steps defined
                  </td>
                </tr>
              ) : (
                jobSteps.map((step) => (
                  <tr key={step.id}>
                    <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{step.sequence}</td>
                    <td style={{ fontWeight: 'bold' }}>{step.operation}</td>
                    <td>
                      <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '9pt' }}>
                        {step.hazards.map((hazard, idx) => (
                          <li key={idx}>{hazard}</li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{step.riskLevel}</td>
                    <td>
                      <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '9pt' }}>
                        {step.safetyControls.map((control, idx) => (
                          <li key={idx}>{control}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="print-section">
          <h2>Tools & Equipment</h2>
          <div className="print-field">
            {consolidatedTools.length === 0
              ? 'No tools specified'
              : consolidatedTools.join(', ')}
          </div>
        </div>

        <div className="print-section">
          <h2>Required PPE</h2>
          <div className="print-field">
            {consolidatedPPE.join(', ')}
          </div>
        </div>

        <div className="print-section">
          <h2>Crew Acknowledgment & Signatures</h2>
          {crewMembers.length === 0 ? (
            <div className="print-field">No crew members listed</div>
          ) : (
            <table className="print-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Signature</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {crewMembers.map((member) => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
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
          <h2>Supervisor Approval</h2>
          <div className="print-grid">
            <div className="print-field">
              <strong>APPROVED BY:</strong> {supervisorApprovalName || '_________________'}
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
      </div>
    </>
  );
}
