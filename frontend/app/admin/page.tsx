import QuickAction from "@/components/admin-components/page/quickAction";
import StatsGrid from "@/components/admin-components/page/statsGrid";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Quick Actions */}
      <QuickAction />
    </div>
  );
}
