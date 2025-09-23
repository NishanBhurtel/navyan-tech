"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/user-components/ui/card";
import { useCategories } from "@/hooks/categories/getCategories";
import { useAllOrders } from "@/hooks/order/getAllOrders";
import { useAllProducts } from "@/hooks/product/getAllProducts";
import { useAllUsers } from "@/hooks/users/getAllUser";
import { Package, Users, ShoppingCart, FolderTree } from "lucide-react";

export default function StatsGrid() {
  const { data: productResponse } = useAllProducts({});
  const { data: users } = useAllUsers();
  const { data: orders } = useAllOrders();
  const { data: categories, isLoading, error } = useCategories();

  const products = productResponse?.data;
  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // ---- Date helpers ----
  const now = new Date();
  const startLastMonth = new Date(now);
  startLastMonth.setMonth(now.getMonth() - 1);

  const startPrevMonth = new Date(now);
  startPrevMonth.setMonth(now.getMonth() - 2);

  const inRange = (date: Date | null, from: Date, to: Date) =>
    !!date && date >= from && date <= to;

  // ---- Generic helper for calculating counts and % change ----
  const calcStats = <T,>(
    items: T[] | undefined,
    getDate: (item: T) => Date | null
  ) => {
    if (!items) return { total: 0, changePct: 0 };

    const current = items.filter((i) =>
      inRange(getDate(i), startLastMonth, now)
    );
    const previous = items.filter((i) =>
      inRange(getDate(i), startPrevMonth, startLastMonth)
    );

    const total = items.length;
    const changePct =
      previous.length === 0
        ? 100
        : ((current.length - previous.length) / previous.length) * 100;

    return { total, changePct };
  };

  // ---- Products ----
  const productStats = calcStats(products, (p: any) =>
    p.createdAt
      ? p.createdAt.toDate
        ? p.createdAt.toDate()
        : new Date(p.createdAt)
      : null
  );

  // ---- Users (customers only for total) ----
  const customerUsers = users?.filter((u) => u.role === "customer") ?? [];
  const userStats = calcStats(customerUsers, (u: any) =>
    u.createdAt
      ? u.createdAt.toDate
        ? u.createdAt.toDate()
        : new Date(u.createdAt)
      : null
  );

  // ---- Orders ----
  const orderStats = calcStats(orders?.data, (o: any) =>
    o.createdAt
      ? o.createdAt.toDate
        ? o.createdAt.toDate()
        : new Date(o.createdAt)
      : null
  );

  // ---- Categories ----
  const categoryStats = calcStats(categories, (c: any) =>
    c.createdAt
      ? c.createdAt.toDate
        ? c.createdAt.toDate()
        : new Date(c.createdAt)
      : null
  );

  // ---- Build stats array ----
  const stats = [
    {
      title: "Total Products",
      value: productStats.total,
      change: `${productStats.changePct.toFixed(1)}%`,
      changeType: productStats.changePct >= 0 ? "positive" : "negative",
      icon: Package,
      bg: "bg-[#3450c9]",
    },
    {
      title: "Total Users",
      value: userStats.total,
      change: `${userStats.changePct.toFixed(1)}%`,
      changeType: userStats.changePct >= 0 ? "positive" : "negative",
      icon: Users,
      bg: "bg-[#4dc934]",
    },
    {
      title: "Order Inquiries",
      value: orderStats.total,
      change: `${orderStats.changePct.toFixed(1)}%`,
      changeType: orderStats.changePct >= 0 ? "positive" : "negative",
      icon: ShoppingCart,
      bg: "bg-[#c93e34]",
    },
    {
      title: "Categories",
      value: categoryStats.total,
      change: `${categoryStats.changePct.toFixed(1)}%`,
      changeType: categoryStats.changePct >= 0 ? "positive" : "negative",
      icon: FolderTree,
      bg: "bg-[#c9b834]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className={`${stat.bg} py-6 shadow-sm`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-5 w-5 text-gray-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-50">
              {stat.value}
            </div>
            <p
              className={`text-xs ${
                stat.changeType === "positive"
                  ? "text-gray-200"
                  : "text-red-200"
              }`}
            >
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
