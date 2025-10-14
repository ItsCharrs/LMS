// customer-portal/app/book/page.tsx
"use client";

import React, { useState } from 'react';
import { useForm, FormProvider, useFormContext, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, ArrowRight } from 'lucide-react';

const bookingSchema = z.object({
  service_type: z.enum(['RESIDENTIAL_MOVING', 'OFFICE_RELOCATION', 'PALLET_DELIVERY', 'SMALL_DELIVERIES']),
  cargo_description: z.string().min(10, "Please provide a more detailed description."),
  pickup_address: z.string().min(5, "Pickup address is required."),
  delivery_address: z.string().min(5, "Delivery address is required."),
  requested_pickup_date: z.string().refine((val) => val && !isNaN(Date.parse(val)), {
    message: "Please select a valid date and time.",
  }),
});
type BookingFormData = z.infer<typeof bookingSchema>;

const steps = [
  { id: 1, name: 'Service Details', fields: ['service_type', 'cargo_description'] as const },
  { id: 2, name: 'Location & Schedule', fields: ['pickup_address', 'delivery_address', 'requested_pickup_date'] as const },
  { id: 3, name: 'Confirm Booking' },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  
  const methods = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onTouched',
    // --- THIS IS FIX #1 ---
    defaultValues: {
      service_type: 'SMALL_DELIVERIES',
      cargo_description: "",
      pickup_address: "",
      delivery_address: "",
      requested_pickup_date: "",
    },
  });
  const { trigger, getValues } = methods;

  const nextStep = async () => {
    const fields = steps[currentStep - 1].fields;
    const output = await trigger(fields, { shouldFocus: true });
    if (!output) return;

    if (currentStep === 2) {
      const values = getValues();
      let price = 50.00;
      if (values.service_type === 'RESIDENTIAL_MOVING') price += 250.00;
      if (values.service_type === 'OFFICE_RELOCATION') price += 400.00;
      if (values.service_type === 'PALLET_DELIVERY') price += 100.00;
      setEstimatedPrice(price);
    }
    
    if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="relative bg-gray-900 text-white min-h-[calc(100vh-80px)] flex items-center justify-center py-12">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero-background.jpg')" }}></div>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <FormProvider {...methods}>
          <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-center mb-2">Book Your Service</h1>
              <p className="text-center text-gray-300">Step {currentStep} of {steps.length}: {steps[currentStep - 1].name}</p>
            </div>
            
            <div className="p-8 border-t border-white/10">
              {currentStep === 1 && <Step1ServiceDetails />}
              {currentStep === 2 && <Step2Location />}
              {currentStep === 3 && <Step3Confirm price={estimatedPrice} />}
              
              <div className="mt-10 flex justify-between items-center">
                <Button variant="ghost" onClick={prevStep} disabled={currentStep === 1} className="text-white hover:bg-white/10 hover:text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                {currentStep < steps.length && (
                  <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}

const GlassFormField = ({ name, label, children }: { name: keyof BookingFormData, label: string, children: (field: ControllerRenderProps<BookingFormData, keyof BookingFormData>) => React.ReactNode }) => {
    const { control } = useFormContext<BookingFormData>();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-gray-300">{label}</FormLabel>
                    <FormControl>{children(field)}</FormControl>
                    <FormMessage className="text-red-400" />
                </FormItem>
            )}
        />
    )
}

function Step1ServiceDetails() {
  return (
    <div className="space-y-6">
      <GlassFormField name="service_type" label="Service Type">
        {(field) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Select a service type" />
            </SelectTrigger>
            {/* --- THIS IS FIX #2 --- */}
            <SelectContent className="bg-gray-800/90 backdrop-blur-lg border-white/20 text-white">
              <SelectItem value="RESIDENTIAL_MOVING">Residential Moving</SelectItem>
              <SelectItem value="OFFICE_RELOCATION">Office Relocation</SelectItem>
              <SelectItem value="PALLET_DELIVERY">Pallet Delivery</SelectItem>
              <SelectItem value="SMALL_DELIVERIES">Small Deliveries</SelectItem>
            </SelectContent>
          </Select>
        )}
      </GlassFormField>
      <GlassFormField name="cargo_description" label="Describe the Items to be Moved">
        {(field) => (
            <Textarea rows={5} placeholder="e.g., 10 moving boxes, 1 large sofa..." {...field} className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"/>
        )}
      </GlassFormField>
    </div>
  );
}

function Step2Location() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-white">Pickup Details</h3>
            <GlassFormField name="pickup_address" label="Pickup Address">
                {(field) => <Input placeholder="123 Main St, Anytown, USA" {...field} className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"/>}
            </GlassFormField>
            <h3 className="text-lg font-medium text-white pt-4">Delivery Details</h3>
            <GlassFormField name="delivery_address" label="Delivery Address">
                {(field) => <Input placeholder="456 Oak Ave, Othertown, USA" {...field} className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"/>}
            </GlassFormField>
            <h3 className="text-lg font-medium text-white pt-4">Schedule</h3>
            <GlassFormField name="requested_pickup_date" label="Requested Pickup Date & Time">
                {(field) => <Input type="datetime-local" {...field} className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"/>}
            </GlassFormField>
        </div>
    );
}

function Step3Confirm({ price }: { price: number | null }) {
    const { getValues } = useFormContext<BookingFormData>();
    const { backendUser, googleLogin } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const values = getValues();

    const handleConfirmBooking = async () => {
        if (!backendUser) {
            toast('Please log in to complete your booking.', { icon: '🔒' });
            try { await googleLogin(); } catch (e) { console.error("Login failed", e); }
            return;
        }
        setIsSubmitting(true);
        try {
            const jobPayload = {
                ...values,
                customer_id: backendUser.id,
                pickup_city: "City",
                pickup_contact_person: `${backendUser.first_name} ${backendUser.last_name}`,
                pickup_contact_phone: 'N/A',
                delivery_city: "City",
                delivery_contact_person: "Recipient",
                delivery_contact_phone: 'N/A',
            };
            await apiClient.post('/jobs/', jobPayload);
            toast.success("Booking successful! A manager will be in touch shortly.");
            router.push('/');
        } catch (error) {
            toast.error("Booking failed. Please try again or contact support.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="p-4 border border-white/20 rounded-md space-y-2 bg-white/5 text-white">
                <p><strong>Service:</strong> <span className="font-medium">{values.service_type?.replace(/_/g, ' ')}</span></p>
                <p><strong>Pickup:</strong> <span className="font-medium">{values.pickup_address}</span></p>
                <p><strong>Delivery:</strong> <span className="font-medium">{values.delivery_address}</span></p>
                <p><strong>Date:</strong> <span className="font-medium">{values.requested_pickup_date ? new Date(values.requested_pickup_date).toLocaleString() : ''}</span></p>
            </div>
            <div className="text-center py-4">
                <p className="text-gray-300">Estimated Price</p>
                <p className="text-4xl font-bold text-white">${price ? price.toFixed(2) : 'Calculating...'}</p>
            </div>
            <Button onClick={handleConfirmBooking} disabled={isSubmitting} className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700">
                {isSubmitting ? "Confirming Booking..." : (backendUser ? "Confirm & Book Now" : "Login & Book Now")}
            </Button>
            { !backendUser && <p className="text-center text-sm text-gray-400 mt-2">You will be prompted to log in to continue.</p>}
        </div>
    );
}