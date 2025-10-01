// frontend/app/(dashboard)/dashboard/page.tsx
"use client";

import { useApi } from "@/hooks/useApi";
import { DashboardSummary } from "@/types";
import { StatCard } from "@/components/shared/StatCard";
import { Users, Package, ShoppingCart, Truck } from "lucide-react";

export default function DashboardPage() {
  const { data: summary, error, isLoading } = useApi<DashboardSummary>('/reports/summary/');

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center max-w-sm p-6">
          <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Data Unavailable</h3>
          <p className="text-muted-foreground text-sm">
            Unable to load dashboard data. Please check your connection.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading || !summary) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="space-y-3">
          <div className="h-8 bg-muted rounded-lg animate-pulse w-64"></div>
          <div className="h-4 bg-muted rounded-lg animate-pulse w-80"></div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="bg-card border border-border rounded-lg p-5 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-6 bg-muted rounded w-1/2"></div>
                </div>
                <div className="w-10 h-10 bg-muted rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Key metrics and performance indicators for your logistics operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Revenue (30d)"
          value={`$${summary.recent_revenue_30d.toLocaleString()}`}
          icon={ShoppingCart}
          className="bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
          iconClassName="text-blue-600"
        />
        <StatCard 
          title="Shipments In Transit"
          value={summary.shipments_in_transit.toString()}
          icon={Truck}
          className="bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
          iconClassName="text-green-600"
        />
        <StatCard 
          title="Total Customers"
          value={summary.total_customers.toString()}
          icon={Users}
          className="bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
          iconClassName="text-purple-600"
        />
        <StatCard 
          title="Total Products"
          value={summary.total_products.toString()}
          icon={Package}
          className="bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
          iconClassName="text-orange-600"
        />
      </div>

      {/* Analytics Placeholder */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Analytics & Charts
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Interactive charts and analytics will be displayed here to visualize your logistics data.
          </p>
        </div>
      </div>
    </div>
  );
}