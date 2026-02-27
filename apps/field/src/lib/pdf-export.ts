import jsPDF from 'jspdf';

// ============================================================================
// Type Definitions
// ============================================================================

export interface JSAPdfData {
  formNumber: string;
  date: string;
  projectName: string;
  siteAddress: string;
  crewSupervisor: string;
  crewSafetyRep: string;
  weather: string;
  temperature: string;
  description: string;
  tools: string[];
  ppe: string[];
  steps: Array<{
    sequence: number;
    operation: string;
    hazards: string[];
    safetyControls: string[];
    riskLevel: 'A' | 'B' | 'C';
  }>;
}

export interface ToolboxPdfData {
  date: string;
  time: string;
  location: string;
  facilitator: string;
  projectName: string;
  weather: string;
  topic: string;
  discussionPoints: string;
  hazards: string[];
  correctiveActions: string;
  attendees: Array<{ name: string; company: string; signed: boolean }>;
  safetyReminders: string[];
}

export interface InspectionPdfData {
  type: 'forklift' | 'scissor-lift';
  date: string;
  inspector: string;
  equipmentId: string;
  model: string;
  hourmeter: string;
  items: Array<{
    section: string;
    label: string;
    status: 'pass' | 'fail' | 'na' | null;
    notes?: string;
  }>;
  overallResult: 'pass' | 'fail';
  comments: string;
}

// ============================================================================
// Constants
// ============================================================================

const COLORS = {
  headerBlue: '#1e3a5f',
  sectionBlue: '#3b82f6',
  darkGray: '#374151',
  lightGray: '#9ca3af',
  red: '#ef4444',
  amber: '#f59e0b',
  green: '#10b981',
  black: '#000000',
  white: '#ffffff',
};

const MARGINS = {
  left: 20,
  right: 20,
  top: 20,
  bottom: 20,
};

const PAGE_WIDTH = 210; // A4 width in mm
const PAGE_HEIGHT = 297; // A4 height in mm
const CONTENT_WIDTH = PAGE_WIDTH - MARGINS.left - MARGINS.right;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Downloads a PDF document
 */
export function downloadPdf(doc: jsPDF, filename: string): void {
  doc.save(filename);
}

/**
 * Adds a page header with title and optional subtitle
 */
function addHeader(
  doc: jsPDF,
  title: string,
  subtitle?: string
): number {
  let y = MARGINS.top;

  // Header bar
  doc.setFillColor(COLORS.headerBlue);
  doc.rect(MARGINS.left, y, CONTENT_WIDTH, 15, 'F');

  // Title
  doc.setTextColor(COLORS.white);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(title, PAGE_WIDTH / 2, y + 10, { align: 'center' });

  y += 15;

  // Subtitle if provided
  if (subtitle) {
    y += 2;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.darkGray);
    doc.text(subtitle, PAGE_WIDTH / 2, y + 4, { align: 'center' });
    y += 6;
  }

  return y + 5;
}

/**
 * Adds a section header
 */
function addSectionHeader(
  doc: jsPDF,
  text: string,
  y: number
): number {
  doc.setFillColor(COLORS.sectionBlue);
  doc.rect(MARGINS.left, y, CONTENT_WIDTH, 7, 'F');

  doc.setTextColor(COLORS.white);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(text, MARGINS.left + 2, y + 5);

  doc.setTextColor(COLORS.black);
  return y + 7;
}

/**
 * Adds a horizontal line
 */
function addLine(doc: jsPDF, y: number): number {
  doc.setDrawColor(COLORS.lightGray);
  doc.setLineWidth(0.5);
  doc.line(MARGINS.left, y, PAGE_WIDTH - MARGINS.right, y);
  return y + 3;
}

/**
 * Wraps text to fit within a maximum width
 */
function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
  return doc.splitTextToSize(text, maxWidth);
}

/**
 * Adds wrapped text and returns new Y position
 */
function addWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight = 5
): number {
  const lines = wrapText(doc, text, maxWidth);
  lines.forEach((line, index) => {
    doc.text(line, x, y + index * lineHeight);
  });
  return y + lines.length * lineHeight;
}

/**
 * Checks if we need a new page
 */
function checkPageBreak(doc: jsPDF, currentY: number, neededSpace: number): number {
  if (currentY + neededSpace > PAGE_HEIGHT - MARGINS.bottom) {
    doc.addPage();
    return MARGINS.top;
  }
  return currentY;
}

/**
 * Adds a key-value pair in a two-column layout
 */
function addKeyValue(
  doc: jsPDF,
  key: string,
  value: string,
  x: number,
  y: number,
  keyWidth = 40
): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(key + ':', x, y);

  doc.setFont('helvetica', 'normal');
  doc.text(value, x + keyWidth, y);

  return y + 6;
}

/**
 * Draws a checkbox
 */
function drawCheckbox(
  doc: jsPDF,
  x: number,
  y: number,
  checked: boolean,
  size = 4
): void {
  doc.setDrawColor(COLORS.darkGray);
  doc.setLineWidth(0.3);
  doc.rect(x, y - size + 1, size, size);

  if (checked) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('✓', x + 1, y);
  }
}

// ============================================================================
// JSA PDF Generation
// ============================================================================

export function generateJSAPdf(data: JSAPdfData): jsPDF {
  const doc = new jsPDF();

  // Header
  let y = addHeader(doc, 'JOB SAFETY ANALYSIS');

  // Form info
  y += 3;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Form #: ${data.formNumber}`, MARGINS.left, y);
  doc.text(`Date: ${data.date}`, PAGE_WIDTH - MARGINS.right - 40, y);
  y += 8;

  // Project Information Section
  y = addSectionHeader(doc, 'PROJECT INFORMATION', y);
  y += 5;

  const col1X = MARGINS.left + 5;
  const col2X = PAGE_WIDTH / 2 + 5;

  doc.setFontSize(10);
  y = addKeyValue(doc, 'Project Name', data.projectName, col1X, y);
  y -= 6;
  y = addKeyValue(doc, 'Weather', data.weather, col2X, y);

  y = addKeyValue(doc, 'Site Address', data.siteAddress, col1X, y);
  y -= 6;
  y = addKeyValue(doc, 'Temperature', data.temperature, col2X, y);

  y = addKeyValue(doc, 'Crew Supervisor', data.crewSupervisor, col1X, y);
  y -= 6;
  y = addKeyValue(doc, 'Safety Rep', data.crewSafetyRep, col2X, y);

  y += 5;

  // Description Section
  y = checkPageBreak(doc, y, 30);
  y = addSectionHeader(doc, 'JOB DESCRIPTION', y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  y = addWrappedText(doc, data.description, MARGINS.left + 5, y, CONTENT_WIDTH - 10);
  y += 5;

  // PPE & Tools Section
  y = checkPageBreak(doc, y, 40);
  y = addSectionHeader(doc, 'REQUIRED PPE & TOOLS', y);
  y += 5;

  const ppeX = MARGINS.left + 5;
  const toolsX = PAGE_WIDTH / 2 + 5;

  doc.setFont('helvetica', 'bold');
  doc.text('Personal Protective Equipment:', ppeX, y);
  doc.text('Tools & Equipment:', toolsX, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  const maxItems = Math.max(data.ppe.length, data.tools.length);
  for (let i = 0; i < maxItems; i++) {
    if (data.ppe[i]) {
      doc.text('• ' + data.ppe[i], ppeX + 2, y);
    }
    if (data.tools[i]) {
      doc.text('• ' + data.tools[i], toolsX + 2, y);
    }
    y += 5;
  }

  y += 3;

  // Job Steps Section
  y = checkPageBreak(doc, y, 50);
  y = addSectionHeader(doc, 'JOB STEPS ANALYSIS', y);
  y += 5;

  // Table headers
  const tableX = MARGINS.left + 2;
  const colWidths = {
    seq: 8,
    operation: 45,
    hazards: 45,
    controls: 50,
    risk: 15,
  };

  doc.setFillColor('#e5e7eb');
  doc.rect(tableX, y - 5, CONTENT_WIDTH - 4, 7, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('#', tableX + 2, y);
  doc.text('Operation', tableX + colWidths.seq + 2, y);
  doc.text('Hazards', tableX + colWidths.seq + colWidths.operation + 2, y);
  doc.text('Safety Controls', tableX + colWidths.seq + colWidths.operation + colWidths.hazards + 2, y);
  doc.text('Risk', tableX + colWidths.seq + colWidths.operation + colWidths.hazards + colWidths.controls + 2, y);

  y += 3;
  doc.setFont('helvetica', 'normal');

  // Table rows
  data.steps.forEach((step, index) => {
    const rowStartY = y;
    y = checkPageBreak(doc, y, 20);

    // Draw borders
    doc.setDrawColor(COLORS.lightGray);
    doc.line(tableX, y, PAGE_WIDTH - MARGINS.right - 2, y);

    // Sequence number
    doc.setFontSize(9);
    doc.text(step.sequence.toString(), tableX + 3, y + 5);

    // Operation
    const opLines = wrapText(doc, step.operation, colWidths.operation - 4);
    let lineY = y + 5;
    opLines.forEach((line) => {
      doc.text(line, tableX + colWidths.seq + 2, lineY);
      lineY += 4;
    });

    // Hazards
    const hazardText = step.hazards.join('; ');
    const hazardLines = wrapText(doc, hazardText, colWidths.hazards - 4);
    lineY = y + 5;
    hazardLines.forEach((line) => {
      doc.text(line, tableX + colWidths.seq + colWidths.operation + 2, lineY);
      lineY += 4;
    });

    // Safety Controls
    const controlText = step.safetyControls.join('; ');
    const controlLines = wrapText(doc, controlText, colWidths.controls - 4);
    lineY = y + 5;
    controlLines.forEach((line) => {
      doc.text(line, tableX + colWidths.seq + colWidths.operation + colWidths.hazards + 2, lineY);
      lineY += 4;
    });

    // Risk Level
    const riskColor = step.riskLevel === 'A' ? COLORS.red : step.riskLevel === 'B' ? COLORS.amber : COLORS.green;
    doc.setTextColor(riskColor);
    doc.setFont('helvetica', 'bold');
    doc.text(step.riskLevel, tableX + colWidths.seq + colWidths.operation + colWidths.hazards + colWidths.controls + 5, y + 5);
    doc.setTextColor(COLORS.black);
    doc.setFont('helvetica', 'normal');

    // Calculate row height
    const maxLines = Math.max(opLines.length, hazardLines.length, controlLines.length);
    y += maxLines * 4 + 4;
  });

  // Bottom border
  doc.line(tableX, y, PAGE_WIDTH - MARGINS.right - 2, y);
  y += 10;

  // Signature area
  y = checkPageBreak(doc, y, 20);
  y = addLine(doc, y);
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Supervisor Signature: ___________________________', MARGINS.left + 5, y);
  doc.text('Date: _______________', PAGE_WIDTH - MARGINS.right - 50, y);

  y += 8;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(COLORS.lightGray);
  doc.text('This JSA must be reviewed with all crew members before starting work.', PAGE_WIDTH / 2, y, { align: 'center' });

  return doc;
}

// ============================================================================
// Toolbox Meeting PDF Generation
// ============================================================================

export function generateToolboxPdf(data: ToolboxPdfData): jsPDF {
  const doc = new jsPDF();

  // Header
  let y = addHeader(doc, 'WEEKLY TOOLBOX MEETING', `${data.date} at ${data.time}`);

  // Meeting Details Section
  y += 3;
  y = addSectionHeader(doc, 'MEETING DETAILS', y);
  y += 5;

  const col1X = MARGINS.left + 5;
  const col2X = PAGE_WIDTH / 2 + 5;

  doc.setFontSize(10);
  y = addKeyValue(doc, 'Location', data.location, col1X, y);
  y -= 6;
  y = addKeyValue(doc, 'Weather', data.weather, col2X, y);

  y = addKeyValue(doc, 'Facilitator', data.facilitator, col1X, y);
  y = addKeyValue(doc, 'Project', data.projectName, col1X, y);

  y += 5;

  // Topic Section
  y = checkPageBreak(doc, y, 30);
  y = addSectionHeader(doc, 'TOPIC', y);
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  y = addWrappedText(doc, data.topic, MARGINS.left + 5, y, CONTENT_WIDTH - 10);
  y += 5;

  // Discussion Points
  y = checkPageBreak(doc, y, 30);
  y = addSectionHeader(doc, 'DISCUSSION POINTS', y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  y = addWrappedText(doc, data.discussionPoints, MARGINS.left + 5, y, CONTENT_WIDTH - 10);
  y += 5;

  // Hazards Discussed
  y = checkPageBreak(doc, y, 30);
  y = addSectionHeader(doc, 'HAZARDS DISCUSSED', y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  data.hazards.forEach((hazard) => {
    y = checkPageBreak(doc, y, 10);
    doc.text('• ' + hazard, MARGINS.left + 5, y);
    y += 5;
  });

  y += 3;

  // Safety Reminders
  if (data.safetyReminders.length > 0) {
    y = checkPageBreak(doc, y, 30);
    y = addSectionHeader(doc, 'SAFETY REMINDERS', y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    data.safetyReminders.forEach((reminder) => {
      y = checkPageBreak(doc, y, 10);
      drawCheckbox(doc, MARGINS.left + 5, y, false);
      doc.text(reminder, MARGINS.left + 12, y);
      y += 6;
    });

    y += 3;
  }

  // Corrective Actions
  y = checkPageBreak(doc, y, 30);
  y = addSectionHeader(doc, 'CORRECTIVE ACTIONS', y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  if (data.correctiveActions) {
    y = addWrappedText(doc, data.correctiveActions, MARGINS.left + 5, y, CONTENT_WIDTH - 10);
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(COLORS.lightGray);
    doc.text('None required', MARGINS.left + 5, y);
    doc.setTextColor(COLORS.black);
    y += 5;
  }

  y += 5;

  // Attendee List
  y = checkPageBreak(doc, y, 50);
  y = addSectionHeader(doc, 'ATTENDEE LIST', y);
  y += 5;

  // Table headers
  const tableX = MARGINS.left + 2;
  const nameColWidth = 70;
  const companyColWidth = 70;

  doc.setFillColor('#e5e7eb');
  doc.rect(tableX, y - 5, CONTENT_WIDTH - 4, 7, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Name', tableX + 2, y);
  doc.text('Company', tableX + nameColWidth + 2, y);
  doc.text('Signature', tableX + nameColWidth + companyColWidth + 2, y);

  y += 3;
  doc.setFont('helvetica', 'normal');

  // Table rows
  data.attendees.forEach((attendee, index) => {
    y = checkPageBreak(doc, y, 8);

    doc.setDrawColor(COLORS.lightGray);
    doc.line(tableX, y, PAGE_WIDTH - MARGINS.right - 2, y);

    doc.setFontSize(9);
    doc.text(attendee.name, tableX + 2, y + 5);
    doc.text(attendee.company, tableX + nameColWidth + 2, y + 5);

    if (attendee.signed) {
      doc.setFont('helvetica', 'italic');
      doc.text('Signed', tableX + nameColWidth + companyColWidth + 2, y + 5);
      doc.setFont('helvetica', 'normal');
    } else {
      doc.setTextColor(COLORS.lightGray);
      doc.text('Not signed', tableX + nameColWidth + companyColWidth + 2, y + 5);
      doc.setTextColor(COLORS.black);
    }

    y += 7;
  });

  // Bottom border
  doc.line(tableX, y, PAGE_WIDTH - MARGINS.right - 2, y);
  y += 10;

  // Signature area
  y = checkPageBreak(doc, y, 20);
  y = addLine(doc, y);
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Facilitator Signature: ___________________________', MARGINS.left + 5, y);
  doc.text('Date: _______________', PAGE_WIDTH - MARGINS.right - 50, y);

  return doc;
}

// ============================================================================
// Inspection PDF Generation
// ============================================================================

export function generateInspectionPdf(data: InspectionPdfData): jsPDF {
  const doc = new jsPDF();

  // Title based on type
  const title = data.type === 'forklift'
    ? 'FORKLIFT PRE-SHIFT INSPECTION'
    : 'SCISSOR LIFT PRE-USE INSPECTION';

  // Header
  let y = addHeader(doc, title);

  // Equipment Information Section
  y += 3;
  y = addSectionHeader(doc, 'EQUIPMENT INFORMATION', y);
  y += 5;

  const col1X = MARGINS.left + 5;
  const col2X = PAGE_WIDTH / 2 + 5;

  doc.setFontSize(10);
  y = addKeyValue(doc, 'Date', data.date, col1X, y);
  y -= 6;
  y = addKeyValue(doc, 'Equipment ID', data.equipmentId, col2X, y);

  y = addKeyValue(doc, 'Inspector', data.inspector, col1X, y);
  y -= 6;
  y = addKeyValue(doc, 'Model', data.model, col2X, y);

  y = addKeyValue(doc, 'Hourmeter', data.hourmeter, col1X, y);

  y += 5;

  // Inspection Checklist Section
  y = checkPageBreak(doc, y, 50);
  y = addSectionHeader(doc, 'INSPECTION CHECKLIST', y);
  y += 5;

  // Group items by section
  const sections = new Map<string, typeof data.items>();
  data.items.forEach((item) => {
    if (!sections.has(item.section)) {
      sections.set(item.section, []);
    }
    sections.get(item.section)!.push(item);
  });

  // Table setup
  const tableX = MARGINS.left + 2;
  const itemColWidth = 100;
  const statusColWidth = 15;

  // Render each section
  sections.forEach((items, sectionName) => {
    y = checkPageBreak(doc, y, 15);

    // Section name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(COLORS.sectionBlue);
    doc.text(sectionName, tableX + 2, y);
    doc.setTextColor(COLORS.black);
    y += 5;

    // Section items
    items.forEach((item) => {
      y = checkPageBreak(doc, y, 10);

      doc.setDrawColor(COLORS.lightGray);
      doc.line(tableX, y, PAGE_WIDTH - MARGINS.right - 2, y);

      // Item label
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(item.label, tableX + 2, y + 5);

      // Status checkboxes
      const statusX = tableX + itemColWidth;
      drawCheckbox(doc, statusX, y + 5, item.status === 'pass');
      doc.text('Pass', statusX + 6, y + 5);

      drawCheckbox(doc, statusX + 25, y + 5, item.status === 'fail');
      doc.text('Fail', statusX + 31, y + 5);

      drawCheckbox(doc, statusX + 50, y + 5, item.status === 'na');
      doc.text('N/A', statusX + 56, y + 5);

      y += 7;

      // Notes if present
      if (item.notes) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(COLORS.darkGray);
        const noteLines = wrapText(doc, `Notes: ${item.notes}`, CONTENT_WIDTH - 10);
        noteLines.forEach((line) => {
          doc.text(line, tableX + 5, y);
          y += 4;
        });
        doc.setTextColor(COLORS.black);
        y += 2;
      }
    });

    y += 3;
  });

  // Bottom border
  doc.line(tableX, y, PAGE_WIDTH - MARGINS.right - 2, y);
  y += 10;

  // Overall Result
  y = checkPageBreak(doc, y, 20);
  y = addSectionHeader(doc, 'OVERALL RESULT', y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  const resultText = data.overallResult === 'pass' ? 'PASS' : 'FAIL';
  const resultColor = data.overallResult === 'pass' ? COLORS.green : COLORS.red;
  doc.setTextColor(resultColor);
  doc.text(resultText, PAGE_WIDTH / 2, y, { align: 'center' });
  doc.setTextColor(COLORS.black);

  y += 10;

  // Comments Section
  if (data.comments) {
    y = checkPageBreak(doc, y, 30);
    y = addSectionHeader(doc, 'COMMENTS', y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    y = addWrappedText(doc, data.comments, MARGINS.left + 5, y, CONTENT_WIDTH - 10);
    y += 5;
  }

  // Signature area
  y = checkPageBreak(doc, y, 20);
  y = addLine(doc, y);
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Inspector Signature: ___________________________', MARGINS.left + 5, y);
  doc.text('Date: _______________', PAGE_WIDTH - MARGINS.right - 50, y);

  y += 8;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(COLORS.lightGray);
  const disclaimer = data.overallResult === 'fail'
    ? 'Equipment FAILED inspection. Do not operate until repairs are completed and re-inspection is passed.'
    : 'Equipment PASSED inspection and is safe for operation.';
  doc.text(disclaimer, PAGE_WIDTH / 2, y, { align: 'center' });

  return doc;
}
