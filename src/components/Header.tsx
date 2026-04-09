"use client";

import { Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Header({ orgName = "Acme Corp" }: { orgName?: string }) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-600">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">SafePaste Enterprise</p>
          <p className="text-xs text-gray-500">{orgName}</p>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </header>
  );
}
