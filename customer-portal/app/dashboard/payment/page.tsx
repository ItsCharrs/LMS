'use client';

import React from 'react';
import { CreditCard, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentMethodsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Methods</h1>
                    <p className="text-gray-600">Manage your saved credit cards and billing details.</p>
                </div>
                <Button>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Add Payment Method
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wallet className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No payment methods saved</h3>
                <p className="text-gray-600 max-w-sm mx-auto mb-6">
                    You haven't saved any payment methods yet. Add a card to speed up your checkout process.
                </p>
                <div className="flex justify-center gap-3">
                    <div className="h-8 w-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-500">VISA</div>
                    <div className="h-8 w-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-500">MC</div>
                </div>
            </div>
        </div>
    );
}
