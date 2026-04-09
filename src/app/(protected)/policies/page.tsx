"use client";

import { useState } from "react";
import { Plus, X, ShieldCheck, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { mockNdaKeywords, mockDepartmentPolicies, type DepartmentPolicy } from "@/lib/mockData";

const ALL_PATTERNS = [
  "CREDIT_CARD",
  "EU_IBAN",
  "US_SSN",
  "API_KEY",
  "IP_ADDRESS",
  "MAC_ADDRESS",
  "ENV_VALUE",
  "IN_AADHAAR",
  "NG_NIN",
  "NDA_KEYWORD",
];

const DEPT_COLORS: Record<string, string> = {
  Finance: "text-blue-600 bg-blue-50 border-blue-200",
  HR: "text-purple-600 bg-purple-50 border-purple-200",
  IT: "text-orange-600 bg-orange-50 border-orange-200",
  Legal: "text-yellow-600 bg-yellow-50 border-yellow-200",
};

export default function PoliciesPage() {
  const [keywords, setKeywords] = useState<string[]>(mockNdaKeywords);
  const [newKeyword, setNewKeyword] = useState("");
  const [policies, setPolicies] = useState<DepartmentPolicy[]>(mockDepartmentPolicies);
  const [saved, setSaved] = useState(false);

  const addKeyword = () => {
    const trimmed = newKeyword.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords((prev) => [...prev, trimmed]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (kw: string) => {
    setKeywords((prev) => prev.filter((k) => k !== kw));
  };

  const togglePattern = (dept: string, pattern: string) => {
    setPolicies((prev) =>
      prev.map((p) =>
        p.department === dept
          ? { ...p, patterns: { ...p.patterns, [pattern]: !p.patterns[pattern] } }
          : p
      )
    );
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Policies</h1>
          <p className="text-sm text-gray-500 mt-0.5">Configure redaction rules and department profiles</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      {/* NDA Keywords */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            NDA Keywords
          </CardTitle>
          <p className="text-xs text-gray-500 mt-0.5">These phrases will be redacted across all departments when found in clipboard content.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-800 text-xs font-medium rounded-full px-3 py-1"
              >
                {kw}
                <button
                  onClick={() => removeKeyword(kw)}
                  className="text-green-600 hover:text-green-900 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2 max-w-sm">
            <Input
              placeholder="Add keyword or phrase..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addKeyword()}
            />
            <Button onClick={addKeyword} size="sm" className="gap-1 shrink-0">
              <Plus className="w-3.5 h-3.5" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Department Profiles */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Department Profiles</CardTitle>
          <p className="text-xs text-gray-500 mt-0.5">Enable or disable specific detection patterns per department.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide min-w-[140px]">Pattern</th>
                  {policies.map((p) => (
                    <th key={p.department} className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wide min-w-[100px]">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${DEPT_COLORS[p.department]}`}>
                        {p.department}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ALL_PATTERNS.map((pattern) => (
                  <tr key={pattern} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <code className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">{pattern}</code>
                    </td>
                    {policies.map((p) => (
                      <td key={p.department} className="px-4 py-3 text-center">
                        <Switch
                          checked={!!p.patterns[pattern]}
                          onCheckedChange={() => togglePattern(p.department, pattern)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
