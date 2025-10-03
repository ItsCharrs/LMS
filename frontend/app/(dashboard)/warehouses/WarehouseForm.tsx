"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import apiClient from "../../../lib/api";
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

interface Warehouse {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
}

interface WarehouseFormProps {
  onSuccess: () => void;
  initialData?: Warehouse | null;
}

export function WarehouseForm({ onSuccess, initialData }: WarehouseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData;

  // Fix: Use WarehouseFormData as the generic type for useForm
  const form = useForm<WarehouseFormData>({
    resolver: zodResolver(warehouseSchema),
    defaultValues: initialData || {
      name: "",
      address: "",
      city: "",
      country: "",
    },
  });
  
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  // Fix: Use WarehouseFormData as the parameter type
  async function onSubmit(values: WarehouseFormData) {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await apiClient.put(`/warehouses/${initialData!.id}/`, values); 
        toast.success("Warehouse updated successfully!");
      } else {
        await apiClient.post('/warehouses/', values);
        toast.success("Warehouse created successfully!");
      }
      onSuccess();
    } catch (error) {
      console.error("Failed to save warehouse:", error);
      toast.error("Failed to save warehouse. Please try again.");
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