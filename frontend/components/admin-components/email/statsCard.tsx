"use client"

import { Card, CardContent } from "@/components/user-components/ui/card";
import { Users, Loader2 } from "lucide-react";
import { useAllUsers } from "@/hooks/users/getAllUser";
import DataLoading from "@/components/user-components/layout/LoadingPage";
import ErrorState from "@/components/user-components/layout/ErrorPage";

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
                <DataLoading />
              ) : isError ? (
                <ErrorState />
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
