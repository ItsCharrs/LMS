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
import { ArrowLeft, ArrowRight, Truck, Calendar, MapPin, CheckCircle, Package, Building2, Home } from 'lucide-react';

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
  { id: 1, name: 'Service Details', fields: ['service_type', 'cargo_description'] as const, icon: Package },
  { id: 2, name: 'Location & Schedule', fields: ['pickup_address', 'delivery_address', 'requested_pickup_date'] as const, icon: MapPin },
  { id: 3, name: 'Confirm Booking', icon: CheckCircle },
];

const serviceIcons = {
  RESIDENTIAL_MOVING: Home,
  OFFICE_RELOCATION: Building2,
  PALLET_DELIVERY: Package,
  SMALL_DELIVERIES: Truck,
};

const serviceNames = {
  RESIDENTIAL_MOVING: "Residential Moving",
  OFFICE_RELOCATION: "Office Relocation",
  PALLET_DELIVERY: "Pallet Delivery",
  SMALL_DELIVERIES: "Small Deliveries",
};

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  
  const methods = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onTouched',
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
    <div className="relative bg-gray-900 text-white min-h-screen pt-20 pb-8"> {/* Added pt-20 for header space */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero-background.jpg')" }}></div>
      <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow animation-delay-2000"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        <FormProvider {...methods}>
          {/* Reduced max-width and added max-height for better control */}
          <div className="w-full max-w-lg mx-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden my-8"> {/* Added my-8 for vertical spacing */}
            {/* Header Section */}
            <div className="p-6 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-b border-white/10">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20 mb-3">
                  <Truck className="h-4 w-4 text-blue-300" />
                  <span className="text-xs font-semibold text-blue-300">BOOK YOUR SERVICE</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">Get Your Quote</h1>
                <p className="text-sm text-gray-300">Simple, fast, and transparent pricing</p>
              </div>

              {/* Progress Steps */}
              <div className="mt-6 flex justify-between items-center">
                {steps.map((step) => {
                  const StepIcon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center flex-1">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : isActive 
                            ? 'bg-blue-500 border-blue-500 text-white' 
                            : 'bg-white/10 border-white/30 text-gray-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <StepIcon className="h-4 w-4" />
                        )}
                      </div>
                      <span className={`mt-2 text-xs font-medium transition-colors ${
                        isActive || isCompleted ? 'text-white' : 'text-gray-400'
                      }`}>
                        {step.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Form Content */}
            <div className="p-6">
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-white">
                  Step {currentStep}: {steps[currentStep - 1].name}
                </h2>
              </div>

              {currentStep === 1 && <Step1ServiceDetails />}
              {currentStep === 2 && <Step2Location />}
              {currentStep === 3 && <Step3Confirm price={estimatedPrice} />}
              
              {/* Navigation Buttons - Fixed spacing */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center gap-4">
                  <Button 
                    variant="outline" 
                    onClick={prevStep} 
                    disabled={currentStep === 1} 
                    className="border-white/30 bg-white/5 hover:bg-white/10 text-white hover:text-white disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  {currentStep < steps.length && (
                    <Button 
                      onClick={nextStep} 
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg group flex-1 sm:flex-none"
                    >
                      Next Step <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                </div>
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
                <FormItem className="mb-4">
                    <FormLabel className="text-gray-300 font-medium text-sm uppercase tracking-wide">{label}</FormLabel>
                    <FormControl>{children(field)}</FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                </FormItem>
            )}
        />
    )
}

function Step1ServiceDetails() {
  return (
    <div className="space-y-4">
      <GlassFormField name="service_type" label="Service Type">
        {(field) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white h-12 rounded-xl hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Select a service type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800/95 backdrop-blur-lg border-white/20 text-white rounded-xl">
              <SelectItem value="RESIDENTIAL_MOVING" className="hover:bg-white/10 focus:bg-white/10">
                <div className="flex items-center gap-3">
                  <Home className="h-4 w-4" />
                  Residential Moving
                </div>
              </SelectItem>
              <SelectItem value="OFFICE_RELOCATION" className="hover:bg-white/10 focus:bg-white/10">
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4" />
                  Office Relocation
                </div>
              </SelectItem>
              <SelectItem value="PALLET_DELIVERY" className="hover:bg-white/10 focus:bg-white/10">
                <div className="flex items-center gap-3">
                  <Package className="h-4 w-4" />
                  Pallet Delivery
                </div>
              </SelectItem>
              <SelectItem value="SMALL_DELIVERIES" className="hover:bg-white/10 focus:bg-white/10">
                <div className="flex items-center gap-3">
                  <Truck className="h-4 w-4" />
                  Small Deliveries
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      </GlassFormField>
      
      <GlassFormField name="cargo_description" label="Describe Your Items">
        {(field) => (
            <Textarea 
              rows={4} 
              placeholder="e.g., 10 moving boxes, 1 large sofa, electronics, fragile items..." 
              {...field} 
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl resize-none focus:bg-white/10 transition-colors"
            />
        )}
      </GlassFormField>
    </div>
  );
}

function Step2Location() {
    return (
        <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    Pickup Details
                </h3>
                <GlassFormField name="pickup_address" label="Pickup Address">
                    {(field) => (
                      <Input 
                        placeholder="123 Main St, Anytown, USA" 
                        {...field} 
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl focus:bg-white/10 transition-colors"
                      />
                    )}
                </GlassFormField>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-400" />
                    Delivery Details
                </h3>
                <GlassFormField name="delivery_address" label="Delivery Address">
                    {(field) => (
                      <Input 
                        placeholder="456 Oak Ave, Othertown, USA" 
                        {...field} 
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl focus:bg-white/10 transition-colors"
                      />
                    )}
                </GlassFormField>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-amber-400" />
                    Schedule
                </h3>
                <GlassFormField name="requested_pickup_date" label="Requested Pickup Date & Time">
                    {(field) => (
                      <Input 
                        type="datetime-local" 
                        {...field} 
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl focus:bg-white/10 transition-colors"
                      />
                    )}
                </GlassFormField>
            </div>
        </div>
    );
}

function Step3Confirm({ price }: { price: number | null }) {
    const { getValues } = useFormContext<BookingFormData>();
    const { backendUser, googleLogin } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const values = getValues();

    const ServiceIcon = serviceIcons[values.service_type];

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
            {/* Booking Summary */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4">
                <h3 className="text-lg font-bold text-white mb-3 text-center">Booking Summary</h3>
                
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2">
                            <ServiceIcon className="h-4 w-4 text-blue-400" />
                            <span className="text-gray-300 text-sm">Service Type</span>
                        </div>
                        <span className="font-semibold text-white text-sm">{serviceNames[values.service_type]}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-green-400" />
                            <span className="text-gray-300 text-sm">Pickup</span>
                        </div>
                        <span className="font-semibold text-white text-sm text-right max-w-[140px] truncate">{values.pickup_address}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-amber-400" />
                            <span className="text-gray-300 text-sm">Delivery</span>
                        </div>
                        <span className="font-semibold text-white text-sm text-right max-w-[140px] truncate">{values.delivery_address}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-purple-400" />
                            <span className="text-gray-300 text-sm">Scheduled For</span>
                        </div>
                        <span className="font-semibold text-white text-sm">
                            {values.requested_pickup_date ? new Date(values.requested_pickup_date).toLocaleString() : 'Not set'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Price Display */}
            <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 backdrop-blur-lg rounded-xl border border-white/10 p-4 text-center">
                <p className="text-gray-300 text-xs uppercase tracking-wide">Estimated Price</p>
                <p className="text-3xl font-black text-white my-2">
                    ${price ? price.toFixed(2) : '--.--'}
                </p>
                <p className="text-gray-400 text-xs">Final price may vary based on specific requirements</p>
            </div>

            {/* Confirm Button */}
            <Button 
                onClick={handleConfirmBooking} 
                disabled={isSubmitting} 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 text-base rounded-xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:hover:scale-100"
            >
                {isSubmitting ? (
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        {backendUser ? "Confirm & Book Now" : "Login & Book Now"}
                    </div>
                )}
            </Button>
            
            {!backendUser && (
                <p className="text-center text-xs text-gray-400">
                    You&apos;ll be prompted to log in to complete your booking
                </p>
            )}
        </div>
    );
}