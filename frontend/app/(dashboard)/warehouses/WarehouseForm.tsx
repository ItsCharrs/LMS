"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Restoring path aliases for external component and utility imports
import { warehouseSchema, WarehouseFormData } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import apiClient from "../../../lib/api"; // Keeping relative path for apiClient
import { useState, useEffect } from "react";

// --- 1. Define the shape of a Warehouse object ---
interface Warehouse {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
}

interface WarehouseFormProps {
  onSuccess: () => void;
  // --- 2. Add an optional prop to pass in existing data for editing ---
  initialData?: Warehouse | null;
}

export function WarehouseForm({ onSuccess, initialData }: WarehouseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData; // Check if we are in edit mode

  const form = useForm<WarehouseFormData>({
    resolver: zodResolver(warehouseSchema),
    // --- 3. Set default values from initialData if it exists ---
    defaultValues: initialData || {
      name: "",
      address: "",
      city: "",
      country: "",
    },
  });
  
  // --- 4. Use useEffect to reset the form if initialData changes ---
  // This ensures the form fields update when a new 'initialData' object is passed (e.g., when editing a different warehouse).
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  async function onSubmit(values: WarehouseFormData) {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        // --- 5. If editing, send a PUT request to the detail URL ---
        // Use non-null assertion since isEditMode guarantees initialData is present
        await apiClient.put(`/warehouses/${initialData!.id}/`, values); 
        console.log("Warehouse updated successfully!");
      } else {
        // If creating, send a POST request
        await apiClient.post('/warehouses/', values);
        console.log("Warehouse created successfully!");
      }
      onSuccess();
    } catch (error) {
      console.error("Failed to save warehouse:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warehouse Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Main Distribution Center" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Logistics Lane" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Metropolis" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="USA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting 
            ? (isEditMode ? "Saving..." : "Creating...") 
            : (isEditMode ? "Save Changes" : "Create Warehouse")}
        </Button>
      </form>
    </Form>
  );
}
