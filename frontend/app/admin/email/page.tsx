"use client"
import EmailTab from "@/components/admin-components/email/emailTab";
import EmailHeader from "@/components/admin-components/email/header";
import StatsCard from "@/components/admin-components/email/statsCard";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";

export default function EmailMarketingPage() {
  const [activeTab, setActiveTab] = useState("compose");

  return (
    <div className="space-y-6">
      {/* Header */}
      <EmailHeader />

      {/* Stats Cards */}
      <StatsCard />

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex w-[685px]">
          <TabsTrigger value="compose">Compose Email</TabsTrigger>
        </TabsList>

        {/* Compose Email Tab */}
        <EmailTab />
      </Tabs>
    </div>
  );
}
