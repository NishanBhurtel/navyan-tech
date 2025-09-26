"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DataLoading from "@/components/user-components/layout/LoadingPage";

export default function InnerLayoutClient({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const sess = await getSession();
      setLoading(false);
      if (sess?.user?.role === "admin") {
        router.push("/");
      }
    };

    fetchSession();
  }, [router]);

  if (loading) return <DataLoading />;

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </QueryClientProvider>
  );
}
