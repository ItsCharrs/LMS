// frontend/app/(dashboard)/layout.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { 
  LayoutDashboard, 
  Warehouse, 
  Package, 
  ShoppingCart, 
  Users, 
  LogOut,
  User,
  LucideIcon
} from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { backendUser, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !backendUser) {
      router.push('/login');
    }
  }, [backendUser, loading, router]);

  if (loading || !backendUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S&S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">S&S Logistics</h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem href="/warehouses" icon={Warehouse} label="Warehouses" />
          <NavItem href="/products" icon={Package} label="Products" />
          <NavItem href="/orders" icon={ShoppingCart} label="Orders" />
          <NavItem href="/users" icon={Users} label="Users" />
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {backendUser.first_name || backendUser.username}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {backendUser.email || 'User'}
              </p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0">
        {/* Top Navbar */}
        <header className="bg-card border-b border-border px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">System Online</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                Welcome back, {backendUser.first_name || backendUser.username}!
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <button 
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-muted/30 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

// Navigation Item Component with proper TypeScript typing
interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

function NavItem({ href, icon: Icon, label }: NavItemProps) {
  return (
    <a 
      href={href}
      className="flex items-center space-x-3 px-3 py-3 text-muted-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 group"
    >
      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
      <span className="font-medium">{label}</span>
    </a>
  );
}