// frontend/lib/validators.ts
import { z } from 'zod';

export const warehouseSchema = z.object({
  // ... your existing warehouse schema ...
});

export type WarehouseFormData = z.infer<typeof warehouseSchema>;

// --- REPLACE THE OLD PRODUCT SCHEMA WITH THIS NEW ONE ---
export const productSchema = z.object({
  sku: z.string().min(3, { message: "SKU must be at least 3 characters." }),
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  description: z.string().optional(),
  
  // This is the key change. We create a pre-processing pipeline.
  weight_kg: z.preprocess(
    // The value from the form
    (val) => (String(val).trim() === '' ? undefined : Number(val)),
    // The validation to apply after pre-processing
    z.number().min(0, { message: "Weight must be a positive number." }).optional()
  ),
});

export type ProductFormData = z.infer<typeof productSchema>;

// New user schema for registration and user management
export const userSchema = z.object({
  first_name: z.string().min(2, { message: "First name is required." }),
  last_name: z.string().min(2, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  // We use z.enum to ensure the role is one of the valid choices
  role: z.enum(['ADMIN', 'MANAGER', 'DRIVER', 'CUSTOMER']),
});

export type UserFormData = z.infer<typeof userSchema>;