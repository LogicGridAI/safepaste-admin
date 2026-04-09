export type Seat = {
  id: string;
  email: string;
  name: string;
  department: "Finance" | "HR" | "IT" | "Legal";
  status: "Active" | "Inactive";
  lastActive: string;
};

export type AuditEvent = {
  id: string;
  timestamp: string;
  userEmail: string;
  department: "Finance" | "HR" | "IT" | "Legal";
  patternType: string;
  action: "BLOCKED" | "REDACTED" | "ALLOWED";
  site: string;
};

export type DepartmentPolicy = {
  department: "Finance" | "HR" | "IT" | "Legal";
  patterns: Record<string, boolean>;
};

export const mockSeats: Seat[] = [
  { id: "1", email: "sarah.chen@acme.com", name: "Sarah Chen", department: "Finance", status: "Active", lastActive: "2026-04-09 09:14" },
  { id: "2", email: "michael.torres@acme.com", name: "Michael Torres", department: "Finance", status: "Active", lastActive: "2026-04-09 10:32" },
  { id: "3", email: "jessica.park@acme.com", name: "Jessica Park", department: "HR", status: "Active", lastActive: "2026-04-09 08:55" },
  { id: "4", email: "david.okafor@acme.com", name: "David Okafor", department: "HR", status: "Inactive", lastActive: "2026-04-02 14:20" },
  { id: "5", email: "emily.zhang@acme.com", name: "Emily Zhang", department: "IT", status: "Active", lastActive: "2026-04-09 11:05" },
  { id: "6", email: "ryan.murphy@acme.com", name: "Ryan Murphy", department: "IT", status: "Active", lastActive: "2026-04-09 10:47" },
  { id: "7", email: "priya.sharma@acme.com", name: "Priya Sharma", department: "IT", status: "Active", lastActive: "2026-04-09 09:30" },
  { id: "8", email: "james.whitfield@acme.com", name: "James Whitfield", department: "Legal", status: "Active", lastActive: "2026-04-09 08:10" },
  { id: "9", email: "lisa.nakamura@acme.com", name: "Lisa Nakamura", department: "Legal", status: "Active", lastActive: "2026-04-08 16:45" },
  { id: "10", email: "carlos.mendez@acme.com", name: "Carlos Mendez", department: "Finance", status: "Inactive", lastActive: "2026-03-28 11:00" },
];

const sites = [
  "docs.google.com", "notion.so", "slack.com", "github.com",
  "confluence.acme.com", "outlook.office.com", "jira.acme.com",
  "trello.com", "linear.app", "figma.com",
];

const patterns = ["CREDIT_CARD", "US_SSN", "EU_IBAN", "API_KEY", "IP_ADDRESS", "MAC_ADDRESS", "ENV_VALUE", "IN_AADHAAR", "NG_NIN", "NDA_KEYWORD"];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function daysAgo(n: number): string {
  const d = new Date("2026-04-09");
  d.setDate(d.getDate() - n);
  const h = Math.floor(Math.random() * 14) + 8;
  const m = Math.floor(Math.random() * 60);
  return `${d.toISOString().slice(0, 10)} ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

const departments: ("Finance" | "HR" | "IT" | "Legal")[] = ["Finance", "HR", "IT", "Legal"];
const actions: ("BLOCKED" | "REDACTED" | "ALLOWED")[] = ["BLOCKED", "REDACTED", "REDACTED", "REDACTED", "ALLOWED"];

export const mockAuditEvents: AuditEvent[] = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  timestamp: daysAgo(Math.floor(i / 7)),
  userEmail: mockSeats[i % mockSeats.length].email,
  department: mockSeats[i % mockSeats.length].department,
  patternType: randomFrom(patterns),
  action: randomFrom(actions),
  site: randomFrom(sites),
})).sort((a, b) => b.timestamp.localeCompare(a.timestamp));

export const mockNdaKeywords: string[] = [
  "Project Nexus", "Acquisition Target", "Merger Terms", "Confidential Salary",
  "Board Approval", "Term Sheet", "Valuation Cap", "Non-Compete",
];

export const mockDepartmentPolicies: DepartmentPolicy[] = [
  {
    department: "Finance",
    patterns: {
      CREDIT_CARD: true,
      EU_IBAN: true,
      US_SSN: true,
      API_KEY: false,
      IP_ADDRESS: false,
      MAC_ADDRESS: false,
      ENV_VALUE: false,
      IN_AADHAAR: false,
      NG_NIN: false,
      NDA_KEYWORD: true,
    },
  },
  {
    department: "HR",
    patterns: {
      CREDIT_CARD: false,
      EU_IBAN: false,
      US_SSN: true,
      API_KEY: false,
      IP_ADDRESS: false,
      MAC_ADDRESS: false,
      ENV_VALUE: false,
      IN_AADHAAR: true,
      NG_NIN: true,
      NDA_KEYWORD: true,
    },
  },
  {
    department: "IT",
    patterns: {
      CREDIT_CARD: false,
      EU_IBAN: false,
      US_SSN: false,
      API_KEY: true,
      IP_ADDRESS: true,
      MAC_ADDRESS: true,
      ENV_VALUE: true,
      IN_AADHAAR: false,
      NG_NIN: false,
      NDA_KEYWORD: false,
    },
  },
  {
    department: "Legal",
    patterns: {
      CREDIT_CARD: true,
      EU_IBAN: true,
      US_SSN: true,
      API_KEY: false,
      IP_ADDRESS: false,
      MAC_ADDRESS: false,
      ENV_VALUE: false,
      IN_AADHAAR: false,
      NG_NIN: false,
      NDA_KEYWORD: true,
    },
  },
];
