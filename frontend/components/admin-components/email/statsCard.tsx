"use client"

import { Card, CardContent } from "@/components/user-components/ui/card";
import { Users, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// API service function - updated for your response format
const fetchUserCount = async (): Promise<number> => {
  const response = await fetch("http://localhost:5000/users/all");

  if (!response.ok) {
    throw new Error("Failed to fetch user count");
  }

  const data = await response.json();

  // Extract totalUsers from the response object
  if (data && typeof data.totalUsers === "number") {
    return data.totalUsers;
  }

  // Fallback if the structure is unexpected
  console.warn("Unexpected API response structure:", data);
  return 0;
};

export default function StatsCard() {
  // TanStack Query hook
  const {
    data: userCount,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["userCount"],
    queryFn: fetchUserCount,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

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
                  {userCount?.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
