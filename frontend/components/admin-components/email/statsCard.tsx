"use client"

import { Card, CardContent } from "@/components/user-components/ui/card";
import { Users, Loader2 } from "lucide-react";
import { useAllUsers } from "@/hooks/users/getAllUser";

export default function StatsCard() {

  const { data: users, isError, isLoading } = useAllUsers();
  const customerUsers = users?.filter((u) => u.role === "customer") ?? [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Users className="h-4 w-4 text-blue-600" />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-600">
                Total Subscribers
              </p>

              {isLoading ? (
                <div className="flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">Loading...</span>
                </div>
              ) : isError ? (
                <p className="text-sm text-red-600">Error loading count</p>
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {customerUsers ? customerUsers.length : "100"}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
