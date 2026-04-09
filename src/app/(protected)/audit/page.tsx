"use client";

import { useState, useMemo } from "react";
import { Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAuditEvents } from "@/lib/mockData";

const ALL_DEPTS = ["All", "Finance", "HR", "IT", "Legal"] as const;
const ALL_PATTERNS = [
  "All", "CREDIT_CARD", "US_SSN", "EU_IBAN", "API_KEY",
  "IP_ADDRESS", "MAC_ADDRESS", "ENV_VALUE", "IN_AADHAAR", "NG_NIN", "NDA_KEYWORD",
];
const ALL_ACTIONS = ["All", "BLOCKED", "REDACTED", "ALLOWED"];

function ActionBadge({ action }: { action: string }) {
  if (action === "BLOCKED") return <Badge variant="destructive">{action}</Badge>;
  if (action === "REDACTED") return <Badge variant="default">{action}</Badge>;
  return <Badge variant="secondary">{action}</Badge>;
}

export default function AuditPage() {
  const [dept, setDept] = useState("All");
  const [pattern, setPattern] = useState("All");
  const [action, setAction] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filtered = useMemo(() => {
    return mockAuditEvents.filter((e) => {
      if (dept !== "All" && e.department !== dept) return false;
      if (pattern !== "All" && e.patternType !== pattern) return false;
      if (action !== "All" && e.action !== action) return false;
      if (dateFrom && e.timestamp < dateFrom) return false;
      if (dateTo && e.timestamp > dateTo + " 23:59") return false;
      return true;
    });
  }, [dept, pattern, action, dateFrom, dateTo]);

  const handleExport = () => {
    const header = "Timestamp,User Email,Department,Pattern Type,Action,Site\n";
    const rows = filtered
      .map((e) => `${e.timestamp},${e.userEmail},${e.department},${e.patternType},${e.action},${e.site}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "safepaste-audit.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Audit Log</h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} events matching current filters</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-gray-600 font-semibold">
            <Filter className="w-4 h-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">From</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">To</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Department</label>
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {ALL_DEPTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Pattern Type</label>
              <select
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {ALL_PATTERNS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Action</label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {ALL_ACTIONS.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setDept("All"); setPattern("All"); setAction("All"); setDateFrom(""); setDateTo(""); }}
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">#</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Timestamp</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">User Email</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Department</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Pattern</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Site</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((event, idx) => (
                  <tr key={event.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-xs text-gray-400">{idx + 1}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{event.timestamp}</td>
                    <td className="px-4 py-3 text-xs font-medium text-gray-700">{event.userEmail}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{event.department}</td>
                    <td className="px-4 py-3">
                      <code className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">{event.patternType}</code>
                    </td>
                    <td className="px-4 py-3">
                      <ActionBadge action={event.action} />
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{event.site}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <p className="text-sm">No events match the selected filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
