# SafePaste Enterprise — Admin Dashboard

Enterprise control panel for IT directors managing SafePaste Enterprise deployments across their organization. Hosted at [admin.safepaste.app](https://admin.safepaste.app).

SafePaste Enterprise automatically redacts secrets, PII, and sensitive data from employee clipboards before they reach unintended destinations — without disrupting workflows. This dashboard gives IT and compliance teams full visibility and control over that process.

---

## Features

- **Dashboard** — at-a-glance metrics for secrets redacted, high-risk events blocked, active users today, and seat utilization
- **Seat management** — provision and remove employee seats, organized by department (Finance, HR, IT, Legal)
- **Department policy profiles** — configure which detection patterns are active per department; enable `CREDIT_CARD` for Finance, `API_KEY` for IT, `US_SSN` for HR, and so on
- **NDA keyword management** — push custom redaction terms (e.g. "Project Nexus", "Acquisition Target") to all seats instantly
- **Audit log** — searchable log with filters for date range, department, pattern type, and action (BLOCKED / REDACTED / ALLOWED)
- **CSV export** — one-click compliance export for SOC 2, HIPAA, and ISO 27001 audits
- **Deployment health** — monitor extension sync status, policy push state, audit streaming, and SSO connectivity

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Icons | lucide-react |

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/dashboard`.

### Routes

| Route | Description |
|---|---|
| `/login` | Admin login |
| `/dashboard` | Metrics overview and recent events |
| `/seats` | Seat provisioning and management |
| `/policies` | Department detection profiles and NDA keywords |
| `/audit` | Full audit log with filters and CSV export |
| `/settings` | Org config, notifications, SSO, and API key |

---

## Part of SafePaste Enterprise

This admin dashboard is one component of the SafePaste Enterprise platform:

| Product | Link |
|---|---|
| Marketing site | [safepaste.app](https://safepaste.app) |
| Browser extension | [github.com/LogicGridAI/safepaste](https://github.com/LogicGridAI/safepaste) |
| React SDK | [github.com/LogicGridAI/safepaste-sdk](https://github.com/LogicGridAI/safepaste-sdk) |
| Python package | `pip install safepaste-enterprise` |
| Docker image | `docker pull logicgridai/safepaste` |

---

Built by [LogicGrid AI](https://safepaste.app)
