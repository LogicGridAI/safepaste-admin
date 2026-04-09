"use client";

import { useState } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockSeats, type Seat } from "@/lib/mockData";

export default function SeatsPage() {
  const [seats, setSeats] = useState<Seat[]>(mockSeats);

  const handleRemove = (id: string) => {
    setSeats((prev) => prev.filter((s) => s.id !== id));
  };

  const active = seats.filter((s) => s.status === "Active").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Seats</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {seats.length} provisioned · {active} active · {50 - seats.length} available of 50
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Seat
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="w-4 h-4 text-green-600" />
            Provisioned Seats
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Department</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Last Active</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {seats.map((seat) => (
                  <tr key={seat.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{seat.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{seat.name}</td>
                    <td className="px-4 py-3">
                      <DeptBadge dept={seat.department} />
                    </td>
                    <td className="px-4 py-3">
                      {seat.status === "Active" ? (
                        <Badge variant="default">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{seat.lastActive}</td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 gap-1"
                        onClick={() => handleRemove(seat.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {seats.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Users className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">No seats provisioned</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function DeptBadge({ dept }: { dept: string }) {
  const colors: Record<string, string> = {
    Finance: "bg-blue-100 text-blue-700",
    HR: "bg-purple-100 text-purple-700",
    IT: "bg-orange-100 text-orange-700",
    Legal: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[dept] ?? "bg-gray-100 text-gray-700"}`}>
      {dept}
    </span>
  );
}
