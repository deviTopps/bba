export type QuestionnaireQuestion = {
  id: string;
  question: string;
  type: "text" | "yesno" | "declaration";
};

export const serviceQuestionnaireTags: Record<string, string> = {
  "Tax & Revenue Advisory": "TAX",
  "Assurance & Risk Management": "ARM",
  "Audit, Assurance & Risk Management": "ARM",
  "Financial Advisory & Transaction Services": "FAT",
  "Management Consulting & Institutional Reform": "MCI",
  "Technology & Digital Transformation": "TDT",
  "Artificial Intelligence & Data Analytics": "AID",
  "Sustainability, ESG & Development Finance": "ESG",
};

export const universalQuestions: QuestionnaireQuestion[] = [
  { id: "A01", question: "What is the client’s full legal name, entity type, registration number and TIN?", type: "text" },
  { id: "A02", question: "Provide the principal business address, country of registration and main operating locations.", type: "text" },
  { id: "A03", question: "Who is the authorised contact for this engagement? Provide name, role, email and telephone number.", type: "text" },
  { id: "A04", question: "Briefly describe the client’s main business activities and industry.", type: "text" },
  { id: "A05", question: "List the directors, partners or trustees and the persons who ultimately own or control the client.", type: "text" },
  { id: "A06", question: "Is any owner, director, key officer or close associate a politically exposed person? If yes, give details.", type: "yesno" },
  { id: "A07", question: "Is the client regulated, listed, state-owned, public-sector or donor-funded? If yes, identify the regulator or funding body.", type: "yesno" },
  { id: "A08", question: "What service does the client require, why is it needed and what period or entities should it cover?", type: "text" },
  { id: "A09", question: "What output is required, who will use it and when is it required?", type: "text" },
  { id: "A10", question: "Has another adviser performed or been asked to perform this work? If yes, identify the adviser and explain the proposed change.", type: "yesno" },
  { id: "A11", question: "Is the client, its directors or owners involved in material litigation, regulatory investigation, fraud allegation, sanctions, insolvency or serious adverse publicity? If yes, give brief details.", type: "yesno" },
  { id: "A12", question: "Will the client give BBA timely access to the people, records, systems and explanations reasonably required?", type: "yesno" },
  { id: "A13", question: "State the approximate size relevant to the work: annual revenue or budget, total assets, transaction volume, employees and locations.", type: "text" },
  { id: "A14", question: "State the available budget or preferred fee arrangement, payment terms and the person or entity responsible for payment.", type: "text" },
  { id: "A15", question: "I confirm that the information provided is complete and accurate and that I am authorised to submit it.", type: "declaration" },
];

export const serviceQuestions: Record<string, QuestionnaireQuestion[]> = {
  TAX: [
    { id: "TAX01", question: "Which tax service and tax type(s) are required, and for which entity or person and period?", type: "text" },
    { id: "TAX02", question: "Are returns, payments or objections outstanding, and what are the applicable deadlines?", type: "text" },
    { id: "TAX03", question: "Are there current GRA audits, assessments, disputes, penalties or tax arrears?", type: "yesno" },
    { id: "TAX04", question: "Provide approximate annual revenue, payroll, import value and related-party transaction value, as relevant.", type: "text" },
    { id: "TAX05", question: "How many entities, tax types, returns, employees or years will BBA cover?", type: "text" },
  ],
  ARM: [
    { id: "ARM01", question: "Which audit, assurance, risk or compliance service is required, and what reporting framework or criteria apply?", type: "text" },
    { id: "ARM02", question: "What financial year or period, entities, branches, systems or programmes are within scope?", type: "text" },
    { id: "ARM03", question: "Provide approximate revenue, assets or expenditure, transaction volume, locations and key systems.", type: "text" },
    { id: "ARM04", question: "Were prior reports modified or were significant control, fraud, compliance or going-concern issues identified?", type: "yesno" },
    { id: "ARM05", question: "What is the reporting deadline, and are regulators, lenders, donors or other third parties intended users?", type: "text" },
  ],
  FAT: [
    { id: "FAT01", question: "Which advisory service is required and what transaction, asset, business or project is involved?", type: "text" },
    { id: "FAT02", question: "Identify the client, target or counterparty, principal funders and other advisers for conflict checking.", type: "text" },
    { id: "FAT03", question: "State the transaction or project value, funding requirement and current stage.", type: "text" },
    { id: "FAT04", question: "What financial information, forecasts, contracts or data room is available?", type: "text" },
    { id: "FAT05", question: "What decision and deadline must BBA’s work support?", type: "text" },
  ],
  MCI: [
    { id: "MCI01", question: "Which consulting service is required, what problem should it solve and what outcome is expected?", type: "text" },
    { id: "MCI02", question: "Which entities, departments, processes, locations or staff groups are in scope?", type: "text" },
    { id: "MCI03", question: "State the approximate number of staff, sites, processes, interviews, workshops or training participants.", type: "text" },
    { id: "MCI04", question: "Who sponsors the assignment and who will approve the deliverables and implementation decisions?", type: "text" },
    { id: "MCI05", question: "What deadline, funding or procurement condition or major implementation constraint applies?", type: "text" },
  ],
  TDT: [
    { id: "TDT01", question: "Which technology service is required and what business outcome should it achieve?", type: "text" },
    { id: "TDT02", question: "Identify the main systems or platforms, vendors, modules, locations and users within scope.", type: "text" },
    { id: "TDT03", question: "State approximate users, sites, systems, interfaces, data volume and transaction volume.", type: "text" },
    { id: "TDT04", question: "Does the work involve personal or sensitive data, cybersecurity testing, cloud migration or system access?", type: "yesno" },
    { id: "TDT05", question: "Is BBA expected to advise, procure, implement, manage or independently audit or assure the solution?", type: "text" },
  ],
  AID: [
    { id: "AID01", question: "Which AI or data service is required, what use case will it address and what output is expected?", type: "text" },
    { id: "AID02", question: "What data is available, for how many years or records, and in what systems or formats?", type: "text" },
    { id: "AID03", question: "Does the data include personal, sensitive, confidential or cross-border information?", type: "yesno" },
    { id: "AID04", question: "Will the output influence high-impact decisions such as credit, employment, health, pricing, enforcement or eligibility?", type: "yesno" },
    { id: "AID05", question: "Estimate the datasets, models, dashboards, users and required update frequency.", type: "text" },
  ],
  ESG: [
    { id: "ESG01", question: "Which ESG or sustainability service is required, and what reporting or financing purpose will it support?", type: "text" },
    { id: "ESG02", question: "Which entity, facilities, investments, value-chain activities and reporting period are within scope?", type: "text" },
    { id: "ESG03", question: "What framework, lender or donor requirement or regulation applies, if known?", type: "text" },
    { id: "ESG04", question: "What sustainability, emissions, impact or financial data is currently available?", type: "text" },
    { id: "ESG05", question: "Estimate the entities, sites, metrics, stakeholders or financing amount involved.", type: "text" },
  ],
};

export const statutoryAuditQuestions: QuestionnaireQuestion[] = [
  { id: "STAT01", question: "Name the retiring auditor and authorise BBA to communicate with that auditor before acceptance.", type: "text" },
  { id: "STAT02", question: "Why is the auditor being changed, and are there unresolved disagreements, scope restrictions or unpaid fees?", type: "text" },
  { id: "STAT03", question: "Provide the group or associated-company structure and identify whether the company is public, private, listed, regulated or a public-interest entity.", type: "text" },
  { id: "STAT04", question: "Who will formally appoint BBA, and has the required board, shareholder or regulatory approval been obtained or scheduled?", type: "text" },
];
