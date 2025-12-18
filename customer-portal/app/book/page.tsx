// customer-portal/app/book/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, useFormContext, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
// 💡 REQUIRED IMPORT FOR THE ERROR FIX
import { AxiosError } from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, ArrowRight, Truck, MapPin, CheckCircle, Package, Building2, Home, Calendar } from 'lucide-react';
import AuthModal from '@/components/Auth/AuthModal';

const bookingSchema = z.object({
  service_type: z.enum(['RESIDENTIAL_MOVING', 'OFFICE_RELOCATION', 'PALLET_DELIVERY', 'SMALL_DELIVERIES']),
  cargo_description: z.string().min(10, "Please provide a more detailed description."),

  // Pickup fields
  pickup_address: z.string().min(5, "Pickup address is required."),
  pickup_contact_person: z.string().min(2, { message: "Contact person's name is required." }),
  pickup_contact_phone: z.string().min(10, { message: "A valid phone number is required." }),

  // Delivery fields
  delivery_address: z.string().min(5, "Delivery address is required."),
  delivery_contact_person: z.string().min(2, { message: "Contact person's name is required." }),
  delivery_contact_phone: z.string().min(10, { message: "A valid phone number is required." }),

  requested_pickup_date: z.string().refine((val) => val && !isNaN(Date.parse(val)), {
    message: "Please select a valid date and time.",
  }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const steps = [
  { id: 1, name: 'Service', fields: ['service_type', 'cargo_description'] as const, icon: Package },
  { id: 2, name: 'Logistics', fields: ['pickup_address', 'pickup_contact_person', 'pickup_contact_phone', 'delivery_address', 'delivery_contact_person', 'delivery_contact_phone', 'requested_pickup_date'] as const, icon: MapPin },
  { id: 3, name: 'Confirm', icon: CheckCircle },
];

const serviceOptions = {
  RESIDENTIAL_MOVING: { name: "Residential Moving", icon: Home },
  OFFICE_RELOCATION: { name: "Office Relocation", icon: Building2 },
  PALLET_DELIVERY: { name: "Pallet Delivery", icon: Package },
  SMALL_DELIVERIES: { name: "Small Deliveries", icon: Truck },
};

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const methods = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onTouched',
    defaultValues: {
      service_type: undefined,
      cargo_description: "",
      pickup_address: "",
      pickup_contact_person: "",
      pickup_contact_phone: "",
      delivery_address: "",
      delivery_contact_person: "",
      delivery_contact_phone: "",
      requested_pickup_date: "",
    },
  });
  const { trigger, getValues } = methods;

  // Debugging and safety measures
  useEffect(() => {
    console.log('🚀 Booking Page mounted - initial modal state:', isAuthModalOpen);
  }, [isAuthModalOpen]);

  useEffect(() => {
    console.log('🔍 Booking Page - AuthModal state changed:', isAuthModalOpen);
    console.log('🔍 Booking Page - Current step:', currentStep);
  }, [isAuthModalOpen, currentStep]);

  // Force close modal on mount as safety measure
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthModalOpen) {
        console.log('🛠️ Safety: Forcing AuthModal closed on booking page mount');
        setIsAuthModalOpen(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const nextStep = async () => {
    const fields = steps[currentStep - 1].fields;
    if (fields) {
      const output = await trigger(fields, { shouldFocus: true });
      if (!output) return;
    }

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

  const handleAuthModalClose = () => {
    console.log('Closing AuthModal from booking page');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="fixed inset-0 bg-gradient-to-br from-background to-muted/30 -z-10"></div>

      {/* Conditional AuthModal rendering */}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={handleAuthModalClose}
        />
      )}

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-grow items-center justify-center pt-24 pb-8">
        <FormProvider {...methods}>
          <div className="w-full max-w-2xl mx-auto bg-card backdrop-blur-sm rounded-2xl border border-border shadow-2xl overflow-hidden my-8 transition-all duration-300">
            <div className="p-6 border-b border-border bg-muted/20">
              <div className="flex justify-between items-center">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;

                  return (
                    <React.Fragment key={step.id}>
                      <div className="flex flex-col items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${isCompleted ? 'bg-green-500 border-green-500 text-white' : isActive ? 'bg-primary border-primary text-primary-foreground' : 'bg-muted border-input text-muted-foreground'}`}>
                          {isCompleted ? <CheckCircle className="h-5 w-5" /> : <StepIcon className="h-5 w-5" />}
                        </div>
                        <span className={`mt-2 text-xs font-medium ${isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>{step.name}</span>
                      </div>
                      {index < steps.length - 1 && <div className="flex-1 h-px bg-border mx-4"></div>}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="p-8">
              <div className="mb-6 text-left">
                <h2 className="text-2xl font-bold text-foreground">Step {currentStep}: {steps[currentStep - 1].name}</h2>
              </div>

              {currentStep === 1 && <Step1ServiceDetails />}
              {currentStep === 2 && <Step2Location />}
              {currentStep === 3 && (
                <Step3Confirm
                  price={estimatedPrice}
                  onLoginRequired={() => {
                    console.log('Login required triggered from Step3');
                    setIsAuthModalOpen(true);
                  }}
                />
              )}

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex justify-between items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="border-input hover:bg-muted text-foreground disabled:opacity-50"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  {currentStep < steps.length && (
                    <Button
                      onClick={nextStep}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold group"
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

const ThemeFormField = ({ name, label, children }: { name: keyof BookingFormData, label: string, children: (field: ControllerRenderProps<BookingFormData, keyof BookingFormData>) => React.ReactNode }) => {
  const { control } = useFormContext<BookingFormData>();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel className="text-foreground font-medium text-sm">{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          <FormMessage className="text-destructive text-sm mt-1" />
        </FormItem>
      )}
    />
  )
}

function Step1ServiceDetails() {
  return (
    <div className="space-y-4">
      <ThemeFormField name="service_type" label="Which service do you need?">
        {(field) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="bg-background border-input text-foreground h-12 text-base">
              <SelectValue placeholder="Select a service type" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border text-popover-foreground">
              {Object.entries(serviceOptions).map(([key, { name, icon: Icon }]) => (
                <SelectItem key={key} value={key} className="focus:bg-accent focus:text-accent-foreground">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </ThemeFormField>
      <ThemeFormField name="cargo_description" label="Briefly describe the items">
        {(field) => (
          <Textarea
            rows={4}
            placeholder="e.g., 10 moving boxes, 1 large sofa, electronics..."
            {...field}
            className="bg-background border-input text-foreground placeholder:text-muted-foreground resize-none"
          />
        )}
      </ThemeFormField>
    </div>
  );
}

function Step2Location() {
  return (
    <div className="space-y-6">
      <div className="bg-card/50 rounded-xl border border-border p-4">
        <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-500" />
          Pickup Details
        </h3>
        <ThemeFormField name="pickup_address" label="Pickup Address">
          {(field) => <Input placeholder="123 Main St, Anytown, USA" {...field} className="bg-background border-input text-foreground placeholder:text-muted-foreground h-12" />}
        </ThemeFormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <ThemeFormField name="pickup_contact_person" label="Contact Person">
            {(field) => <Input placeholder="John Doe" {...field} className="bg-background border-input text-foreground placeholder:text-muted-foreground h-12" />}
          </ThemeFormField>
          <ThemeFormField name="pickup_contact_phone" label="Contact Phone">
            {(field) => <Input placeholder="(123) 456-7890" {...field} className="bg-background border-input text-foreground placeholder:text-muted-foreground h-12" />}
          </ThemeFormField>
        </div>
      </div>

      <div className="bg-card/50 rounded-xl border border-border p-4">
        <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-green-500" />
          Delivery Details
        </h3>
        <ThemeFormField name="delivery_address" label="Delivery Address">
          {(field) => <Input placeholder="456 Oak Ave, Othertown, USA" {...field} className="bg-background border-input text-foreground placeholder:text-muted-foreground h-12" />}
        </ThemeFormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <ThemeFormField name="delivery_contact_person" label="Contact Person">
            {(field) => <Input placeholder="Jane Smith" {...field} className="bg-background border-input text-foreground placeholder:text-muted-foreground h-12" />}
          </ThemeFormField>
          <ThemeFormField name="delivery_contact_phone" label="Contact Phone">
            {(field) => <Input placeholder="(987) 654-3210" {...field} className="bg-background border-input text-foreground placeholder:text-muted-foreground h-12" />}
          </ThemeFormField>
        </div>
      </div>

      <div className="bg-card/50 rounded-xl border border-border p-4">
        <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-amber-500" />
          Schedule
        </h3>
        <ThemeFormField name="requested_pickup_date" label="Requested Pickup Date & Time">
          {(field) => <Input type="datetime-local" {...field} className="bg-background border-input text-foreground placeholder:text-muted-foreground h-12" />}
        </ThemeFormField>
      </div>
    </div>
  );
}

function Step3Confirm({ price, onLoginRequired }: { price: number | null; onLoginRequired: () => void }) {
  const { getValues } = useFormContext<BookingFormData>();
  const { backendUser } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const values = getValues();

  // Debugging for Step3
  useEffect(() => {
    console.log('🔍 Step3Confirm - backendUser:', backendUser);
    console.log('🔍 Step3Confirm - isSubmitting:', isSubmitting);
  }, [backendUser, isSubmitting]);

  const handleConfirmBooking = async () => {
    console.log('Confirm booking clicked, backendUser:', backendUser);

    if (!backendUser) {
      console.log('No user logged in, triggering login modal');
      toast('Please log in to complete your booking.', { icon: '🔒' });
      onLoginRequired();
      return;
    }

    setIsSubmitting(true);
    try {
      // Extract cities from addresses (simple implementation)
      const extractCity = (address: string): string => {
        const parts = address.split(',');
        if (parts.length > 1) {
          return parts[parts.length - 2]?.trim() || "City";
        }
        return "City";
      };

      const jobPayload = {
        ...values,
        customer_id: backendUser.id,
        pickup_city: extractCity(values.pickup_address),
        delivery_city: extractCity(values.delivery_address),
      };

      console.log('🔍 Full booking payload:', jobPayload);

      const response = await apiClient.post('/book/', jobPayload);
      console.log('✅ Booking successful, response:', response.data);

      toast.success("Booking successful! A manager will be in touch shortly.");
      router.push('/');
    } catch (error) { // 💡 The 'any' is removed, defaulting to 'unknown'
      console.error('❌ Full booking error:', error);

      // Check if the error is an Axios error for structured response handling
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        console.error('❌ Error data:', axiosError.response.data);
        console.error('❌ Error status:', axiosError.response.status);

        const errorData = axiosError.response.data;
        let errorMessage = "Booking failed. Please try again.";

        // Enhanced type-safe error message extraction
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (typeof errorData === 'object' && errorData !== null) {
          if ('detail' in errorData && typeof errorData.detail === 'string') {
            errorMessage = errorData.detail;
          } else if ('error' in errorData && typeof errorData.error === 'string') {
            errorMessage = errorData.error;
          } else if ('non_field_errors' in errorData && Array.isArray(errorData.non_field_errors)) {
            errorMessage = errorData.non_field_errors.join(', ');
          }
        }

        toast.error(errorMessage);
      } else if (error instanceof Error) {
        // Handle standard JavaScript/Network errors
        toast.error(`Request failed: ${error.message}`);
      } else {
        // Handle unknown error types
        toast.error("An unknown error occurred during booking. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 border border-border rounded-xl space-y-2 bg-muted/20 text-foreground">
        <h3 className="text-lg font-bold text-center mb-4">Review Your Details</h3>
        <p><strong>Service:</strong> <span className="font-medium">{serviceOptions[values.service_type]?.name}</span></p>
        <p><strong>Pickup:</strong> <span className="font-medium">{values.pickup_address}</span></p>
        <p><strong>Pickup Contact:</strong> <span className="font-medium">{values.pickup_contact_person} - {values.pickup_contact_phone}</span></p>
        <p><strong>Delivery:</strong> <span className="font-medium">{values.delivery_address}</span></p>
        <p><strong>Delivery Contact:</strong> <span className="font-medium">{values.delivery_contact_person} - {values.delivery_contact_phone}</span></p>
        <p><strong>Date:</strong> <span className="font-medium">{values.requested_pickup_date ? new Date(values.requested_pickup_date).toLocaleString() : ''}</span></p>
      </div>
      <div className="text-center py-4">
        <p className="text-muted-foreground">Estimated Price</p>
        <p className="text-4xl font-black text-foreground">${price ? price.toFixed(2) : '--.--'}</p>
      </div>
      <Button
        onClick={handleConfirmBooking}
        disabled={isSubmitting}
        className="w-full text-lg py-6 bg-primary hover:bg-primary/90 font-bold disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground"
      >
        {isSubmitting ? "Confirming..." : (backendUser ? "Confirm & Book Now" : "Login & Book Now")}
      </Button>
      {!backendUser && (
        <p className="text-center text-sm text-muted-foreground mt-2">
          You will be prompted to log in to continue.
        </p>
      )}
    </div>
  );
}