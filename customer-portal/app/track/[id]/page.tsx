// customer-portal/app/track/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import { useApi } from '@/hooks/useApi'; // Now this will work
import { Shipment } from '@/types';     // Now this will work
import { Truck, PackageCheck, AlertCircle, Hourglass } from 'lucide-react';
import React from 'react';

const StatusStep = ({ icon: Icon, title, description, isActive }: { icon: React.ElementType, title: string, description: string, isActive: boolean }) => (
    <div className={`flex items-start gap-4 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
        <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${isActive ? 'bg-blue-600' : 'bg-gray-700'}`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
            <h3 className={`font-semibold text-lg transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
    </div>
);

export default function TrackingDetailPage() {
  const params = useParams();
  const jobId = params.id as string;

  // --- THIS IS THE CHANGE: Use our hook to fetch live data ---
  const { data: shipments, error, isLoading } = useApi<Shipment[]>(jobId ? `/shipments/?job_id=${jobId}` : null);
  
  const currentShipment = shipments && shipments.length > 0 ? shipments[0] : null;

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center text-gray-300">Loading tracking information...</div>;
    }
    if (error || !currentShipment) {
      return (
        <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Tracking ID Not Found</h2>
            <p className="text-gray-400 mt-2">Please check your Job ID and try again.</p>
        </div>
      );
    }

    const status = currentShipment.status;
    return (
        <div className="space-y-8">
            <StatusStep 
                title="Job Pending" 
                description="Your booking is confirmed and is waiting for a driver and vehicle to be assigned."
                icon={Hourglass}
                isActive={status === 'PENDING' || status === 'IN_TRANSIT' || status === 'DELIVERED'}
            />
            <StatusStep 
                title="In Transit" 
                description={`Assigned to ${currentShipment.driver?.user.first_name || 'driver'} with vehicle ${currentShipment.vehicle?.license_plate || ''}. Your delivery is on its way.`}
                icon={Truck}
                isActive={status === 'IN_TRANSIT' || status === 'DELIVERED'}
            />
            <StatusStep 
                title="Delivered" 
                description="Your items have been successfully delivered."
                icon={PackageCheck}
                isActive={status === 'DELIVERED'}
            />
        </div>
    );
  };

  return (
    <div className="relative bg-gray-900 text-white min-h-[calc(100vh-144px)] flex items-center justify-center py-12">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero-background.jpg')" }}></div>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl">
            <h1 className="text-3xl font-bold mb-2">Delivery Status</h1>
            <p className="text-sm text-gray-400 mb-8">For Job ID: <span className="font-mono">{jobId}</span></p>
            {renderContent()}
        </div>
      </div>
    </div>
  );
}