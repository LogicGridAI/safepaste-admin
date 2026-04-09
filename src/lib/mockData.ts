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

export const mockAuditEvents: AuditEvent[] = [
  { id: "1",  timestamp: "2026-04-09 20:29", userEmail: "sarah.chen@acme.com",      department: "Finance", patternType: "CREDIT_CARD",  action: "REDACTED", site: "docs.google.com" },
  { id: "2",  timestamp: "2026-04-09 18:50", userEmail: "michael.torres@acme.com",  department: "Finance", patternType: "US_SSN",       action: "BLOCKED",  site: "notion.so" },
  { id: "3",  timestamp: "2026-04-09 16:28", userEmail: "jessica.park@acme.com",    department: "HR",      patternType: "EU_IBAN",      action: "REDACTED", site: "slack.com" },
  { id: "4",  timestamp: "2026-04-09 15:21", userEmail: "david.okafor@acme.com",    department: "HR",      patternType: "API_KEY",      action: "REDACTED", site: "github.com" },
  { id: "5",  timestamp: "2026-04-09 13:34", userEmail: "emily.zhang@acme.com",     department: "IT",      patternType: "IP_ADDRESS",   action: "ALLOWED",  site: "confluence.acme.com" },
  { id: "6",  timestamp: "2026-04-09 10:51", userEmail: "ryan.murphy@acme.com",     department: "IT",      patternType: "MAC_ADDRESS",  action: "REDACTED", site: "outlook.office.com" },
  { id: "7",  timestamp: "2026-04-09 09:33", userEmail: "priya.sharma@acme.com",    department: "IT",      patternType: "ENV_VALUE",    action: "BLOCKED",  site: "jira.acme.com" },
  { id: "8",  timestamp: "2026-04-08 20:57", userEmail: "james.whitfield@acme.com", department: "Legal",   patternType: "IN_AADHAAR",   action: "REDACTED", site: "trello.com" },
  { id: "9",  timestamp: "2026-04-08 18:22", userEmail: "lisa.nakamura@acme.com",   department: "Legal",   patternType: "NG_NIN",       action: "REDACTED", site: "linear.app" },
  { id: "10", timestamp: "2026-04-08 16:45", userEmail: "carlos.mendez@acme.com",   department: "Finance", patternType: "NDA_KEYWORD",  action: "ALLOWED",  site: "figma.com" },
  { id: "11", timestamp: "2026-04-08 14:10", userEmail: "sarah.chen@acme.com",      department: "Finance", patternType: "US_SSN",       action: "REDACTED", site: "notion.so" },
  { id: "12", timestamp: "2026-04-08 12:33", userEmail: "michael.torres@acme.com",  department: "Finance", patternType: "CREDIT_CARD",  action: "BLOCKED",  site: "docs.google.com" },
  { id: "13", timestamp: "2026-04-08 10:08", userEmail: "jessica.park@acme.com",    department: "HR",      patternType: "IN_AADHAAR",   action: "REDACTED", site: "slack.com" },
  { id: "14", timestamp: "2026-04-08 09:22", userEmail: "david.okafor@acme.com",    department: "HR",      patternType: "US_SSN",       action: "REDACTED", site: "outlook.office.com" },
  { id: "15", timestamp: "2026-04-07 21:45", userEmail: "emily.zhang@acme.com",     department: "IT",      patternType: "API_KEY",      action: "BLOCKED",  site: "github.com" },
  { id: "16", timestamp: "2026-04-07 19:12", userEmail: "ryan.murphy@acme.com",     department: "IT",      patternType: "ENV_VALUE",    action: "REDACTED", site: "jira.acme.com" },
  { id: "17", timestamp: "2026-04-07 17:30", userEmail: "priya.sharma@acme.com",    department: "IT",      patternType: "MAC_ADDRESS",  action: "ALLOWED",  site: "confluence.acme.com" },
  { id: "18", timestamp: "2026-04-07 15:55", userEmail: "james.whitfield@acme.com", department: "Legal",   patternType: "EU_IBAN",      action: "REDACTED", site: "linear.app" },
  { id: "19", timestamp: "2026-04-07 13:20", userEmail: "lisa.nakamura@acme.com",   department: "Legal",   patternType: "CREDIT_CARD",  action: "REDACTED", site: "trello.com" },
  { id: "20", timestamp: "2026-04-07 11:44", userEmail: "carlos.mendez@acme.com",   department: "Finance", patternType: "NDA_KEYWORD",  action: "BLOCKED",  site: "figma.com" },
  { id: "21", timestamp: "2026-04-07 09:15", userEmail: "sarah.chen@acme.com",      department: "Finance", patternType: "EU_IBAN",      action: "REDACTED", site: "docs.google.com" },
  { id: "22", timestamp: "2026-04-06 20:38", userEmail: "michael.torres@acme.com",  department: "Finance", patternType: "IP_ADDRESS",   action: "ALLOWED",  site: "notion.so" },
  { id: "23", timestamp: "2026-04-06 18:05", userEmail: "jessica.park@acme.com",    department: "HR",      patternType: "NG_NIN",       action: "REDACTED", site: "outlook.office.com" },
  { id: "24", timestamp: "2026-04-06 16:22", userEmail: "david.okafor@acme.com",    department: "HR",      patternType: "NDA_KEYWORD",  action: "REDACTED", site: "slack.com" },
  { id: "25", timestamp: "2026-04-06 14:47", userEmail: "emily.zhang@acme.com",     department: "IT",      patternType: "MAC_ADDRESS",  action: "BLOCKED",  site: "github.com" },
  { id: "26", timestamp: "2026-04-06 12:10", userEmail: "ryan.murphy@acme.com",     department: "IT",      patternType: "API_KEY",      action: "REDACTED", site: "jira.acme.com" },
  { id: "27", timestamp: "2026-04-06 10:33", userEmail: "priya.sharma@acme.com",    department: "IT",      patternType: "ENV_VALUE",    action: "REDACTED", site: "confluence.acme.com" },
  { id: "28", timestamp: "2026-04-06 08:58", userEmail: "james.whitfield@acme.com", department: "Legal",   patternType: "US_SSN",       action: "ALLOWED",  site: "trello.com" },
  { id: "29", timestamp: "2026-04-05 21:22", userEmail: "lisa.nakamura@acme.com",   department: "Legal",   patternType: "EU_IBAN",      action: "REDACTED", site: "linear.app" },
  { id: "30", timestamp: "2026-04-05 19:45", userEmail: "carlos.mendez@acme.com",   department: "Finance", patternType: "CREDIT_CARD",  action: "BLOCKED",  site: "figma.com" },
  { id: "31", timestamp: "2026-04-05 17:08", userEmail: "sarah.chen@acme.com",      department: "Finance", patternType: "NDA_KEYWORD",  action: "REDACTED", site: "docs.google.com" },
  { id: "32", timestamp: "2026-04-05 15:33", userEmail: "michael.torres@acme.com",  department: "Finance", patternType: "IN_AADHAAR",   action: "REDACTED", site: "notion.so" },
  { id: "33", timestamp: "2026-04-05 13:50", userEmail: "jessica.park@acme.com",    department: "HR",      patternType: "US_SSN",       action: "REDACTED", site: "slack.com" },
  { id: "34", timestamp: "2026-04-05 11:15", userEmail: "david.okafor@acme.com",    department: "HR",      patternType: "NG_NIN",       action: "ALLOWED",  site: "outlook.office.com" },
  { id: "35", timestamp: "2026-04-05 09:40", userEmail: "emily.zhang@acme.com",     department: "IT",      patternType: "IP_ADDRESS",   action: "BLOCKED",  site: "github.com" },
  { id: "36", timestamp: "2026-04-04 20:55", userEmail: "ryan.murphy@acme.com",     department: "IT",      patternType: "API_KEY",      action: "REDACTED", site: "jira.acme.com" },
  { id: "37", timestamp: "2026-04-04 18:20", userEmail: "priya.sharma@acme.com",    department: "IT",      patternType: "MAC_ADDRESS",  action: "REDACTED", site: "confluence.acme.com" },
  { id: "38", timestamp: "2026-04-04 16:45", userEmail: "james.whitfield@acme.com", department: "Legal",   patternType: "CREDIT_CARD",  action: "BLOCKED",  site: "trello.com" },
  { id: "39", timestamp: "2026-04-04 14:10", userEmail: "lisa.nakamura@acme.com",   department: "Legal",   patternType: "NDA_KEYWORD",  action: "REDACTED", site: "linear.app" },
  { id: "40", timestamp: "2026-04-04 12:35", userEmail: "carlos.mendez@acme.com",   department: "Finance", patternType: "EU_IBAN",      action: "ALLOWED",  site: "figma.com" },
  { id: "41", timestamp: "2026-04-04 10:00", userEmail: "sarah.chen@acme.com",      department: "Finance", patternType: "US_SSN",       action: "REDACTED", site: "docs.google.com" },
  { id: "42", timestamp: "2026-04-04 08:25", userEmail: "michael.torres@acme.com",  department: "Finance", patternType: "IP_ADDRESS",   action: "BLOCKED",  site: "notion.so" },
  { id: "43", timestamp: "2026-04-03 21:50", userEmail: "jessica.park@acme.com",    department: "HR",      patternType: "IN_AADHAAR",   action: "REDACTED", site: "slack.com" },
  { id: "44", timestamp: "2026-04-03 19:15", userEmail: "david.okafor@acme.com",    department: "HR",      patternType: "NDA_KEYWORD",  action: "REDACTED", site: "outlook.office.com" },
  { id: "45", timestamp: "2026-04-03 17:40", userEmail: "emily.zhang@acme.com",     department: "IT",      patternType: "ENV_VALUE",    action: "BLOCKED",  site: "github.com" },
  { id: "46", timestamp: "2026-04-03 15:05", userEmail: "ryan.murphy@acme.com",     department: "IT",      patternType: "MAC_ADDRESS",  action: "REDACTED", site: "jira.acme.com" },
  { id: "47", timestamp: "2026-04-03 13:30", userEmail: "priya.sharma@acme.com",    department: "IT",      patternType: "API_KEY",      action: "ALLOWED",  site: "confluence.acme.com" },
  { id: "48", timestamp: "2026-04-03 10:55", userEmail: "james.whitfield@acme.com", department: "Legal",   patternType: "EU_IBAN",      action: "REDACTED", site: "trello.com" },
  { id: "49", timestamp: "2026-04-03 09:20", userEmail: "lisa.nakamura@acme.com",   department: "Legal",   patternType: "US_SSN",       action: "REDACTED", site: "linear.app" },
  { id: "50", timestamp: "2026-04-02 20:45", userEmail: "carlos.mendez@acme.com",   department: "Finance", patternType: "CREDIT_CARD",  action: "BLOCKED",  site: "figma.com" },
];

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
