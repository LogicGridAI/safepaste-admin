"use client";

import {
  Users,
  ShieldOff,
  AlertTriangle,
  Activity,
  Plus,
  Download,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAuditEvents } from "@/lib/mockData";

const metrics = [
  {
    label: "Total Seats",
    value: "47 / 50",
    sub: "3 seats available",
    icon: Users,
    accent: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Secrets Redacted This Week",
    value: "1,247",
    sub: "+18% vs last week",
    icon: ShieldOff,
    accent: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "High-Risk Events Blocked",
    value: "23",
    sub: "Requires review",
    icon: AlertTriangle,
    accent: "text-red-600",
    bg: "bg-red-50",
  },
  {
    label: "Active Users Today",
    value: "31",
    sub: "of 47 provisioned",
    icon: Activity,
    accent: "text-purple-600",
    bg: "bg-purple-50",
  },
];

function ActionBadge({ action }: { action: string }) {
  if (action === "BLOCKED") return <Badge variant="destructive">{action}</Badge>;
  if (action === "REDACTED") return <Badge variant="default">{action}</Badge>;
  return <Badge variant="secondary">{action}</Badge>;
}

const recentEvents = mockAuditEvents.slice(0, 8);

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Overview of your SafePaste Enterprise deployment</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{m.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{m.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{m.sub}</p>
                </div>
                <div className={`p-2 rounded-lg ${m.bg}`}>
                  <m.icon className={`w-5 h-5 ${m.accent}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom row: Events table + Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Events */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Events</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Timestamp</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">User</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Pattern</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Site</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{event.timestamp}</td>
                        <td className="px-4 py-3 text-xs font-medium text-gray-700 whitespace-nowrap">{event.userEmail}</td>
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
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Plus className="w-4 h-4 text-green-600" />
                Add NDA Keyword
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Download className="w-4 h-4 text-green-600" />
                Export Audit CSV
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <ExternalLink className="w-4 h-4 text-green-600" />
                View All Events
              </Button>

              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Deployment Health</p>
                <div className="space-y-2">
                  {[
                    { label: "Extension Active", ok: true },
                    { label: "Policy Sync", ok: true },
                    { label: "Audit Streaming", ok: true },
                    { label: "SSO Connected", ok: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{item.label}</span>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${item.ok ? "text-green-600" : "text-yellow-600"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.ok ? "bg-green-500" : "bg-yellow-500"}`} />
                        {item.ok ? "OK" : "Setup required"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
