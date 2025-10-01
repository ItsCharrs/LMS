"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useApi } from "@/hooks/useApi";

interface ChartData {
  date: string;
  short_date: string;
  orders: number;
}

export function OrdersChart() {
  const { data: chartData, isLoading } = useApi<ChartData[]>('/reports/recent-orders-chart/?days=7');

  if (isLoading) {
    return <div className="h-[300px] w-full animate-pulse bg-gray-200 rounded-lg" />;
  }

  // FIX: Provide a default empty array ([]) if chartData is null or undefined
  const data = chartData ?? [];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="short_date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
            contentStyle={{ 
                background: "white", 
                border: "1px solid #ccc", 
                borderRadius: "0.5rem"
            }}
        />
        <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}