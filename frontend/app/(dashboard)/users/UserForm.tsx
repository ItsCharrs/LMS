"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserFormData } from "@/lib/validators";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "@/lib/api";
import { useState } from "react";
import { AxiosError } from "axios"; // Import AxiosError for type checking

interface UserFormProps {
  onSuccess: () => void;
}

export function UserForm({ onSuccess }: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "CUSTOMER", // Default role for new users
    },
  });

  async function onSubmit(values: UserFormData) {
    setIsSubmitting(true);
    setError(null);
    try {
      await apiClient.post('/users/create/', values);
      console.log("User created successfully!");
      onSuccess();
    } catch (err: unknown) { // FIX: Changed 'err: any' to 'err: unknown'
      console.error("Failed to create user:", err);

      // FIX: Safely check for Axios error structure
      if (err instanceof AxiosError) {
        // Check for specific error object returned by Django/DRF
        if (err.response && err.response.data && typeof err.response.data.error === 'string') {
          setError(err.response.data.error);
        } else {
          // Fallback for general validation errors (e.g., email field validation)
          setError("An error occurred. Check input fields or console for details.");
        }
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField name="first_name" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField name="last_name" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <FormField name="email" control={form.control} render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField name="password" control={form.control} render={({ field }) => (
            <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField name="role" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="MANAGER">Manager</SelectItem>
                  <SelectItem value="DRIVER">Driver</SelectItem>
                  <SelectItem value="CUSTOMER">Customer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
        )} />
        
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating User..." : "Create User"}
        </Button>
      </form>
    </Form>
  );
}