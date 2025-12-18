'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Package,
    MapPin,
    CreditCard,
    Settings,
    LayoutDashboard,
    LogOut,
    User
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Orders', href: '/dashboard/orders', icon: Package },
    { name: 'Addresses', href: '/dashboard/addresses', icon: MapPin },
    { name: 'Payment Methods', href: '/dashboard/payment', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-muted/20 pt-20">
            {/* Top Header removed in favor of global Header */}


            <div className="container mx-auto px-6 py-8 max-w-7xl">
                <div className="grid lg:grid-cols-[240px_1fr] gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="hidden lg:block">
                        <nav className="bg-card rounded-xl border border-border p-4 sticky top-24 shadow-sm">
                            <ul className="space-y-1">
                                {navigation.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;

                                    return (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                                                    isActive
                                                        ? 'bg-primary/10 text-primary font-semibold'
                                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                                )}
                                            >
                                                <Icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-muted-foreground')} />
                                                {item.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="min-h-[600px]">
                        {children}
                    </main>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
                <div className="grid grid-cols-5 gap-1 p-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors',
                                    isActive
                                        ? 'text-primary bg-primary/10'
                                        : 'text-muted-foreground hover:bg-muted'
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="text-xs font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
