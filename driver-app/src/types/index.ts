// src/types/index.ts

// Reusable status type
export type ShipmentStatus =
  | 'ORDER_PLACED'
  | 'PENDING'
  | 'ASSIGNED'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED';

export interface JobTimelineEntry {
  id: string;
  status: ShipmentStatus;
  status_display: string;
  timestamp: string;
  location: string;
  description: string;
  completed: boolean;
  is_current: boolean;
}

export interface ShipmentListItem {
  id: string; // The URL/UUID
  job_id: number;
  job_number?: number; // Backend uses job_number
  status: ShipmentStatus;
  pickup_address: string;
  pickup_city: string;
  delivery_address: string;
  delivery_city: string;
  requested_pickup_date: string;
  customer_name: string;
  service_type?: string;
  cargo_description?: string;
}

export interface JobDetail {
  id: string; // The shipment ID or Job ID depending on usage
  job_id: number; // The visible numeric ID
  job_number?: number; // Backend field
  service_type: string;
  status: ShipmentStatus;
  customer_name: string;
  customer_phone?: string;
  cargo_description: string;
  pickup_address: string;
  pickup_city: string;
  pickup_contact_person: string;
  pickup_contact_phone: string;
  delivery_address: string;
  delivery_city: string;
  delivery_contact_person: string;
  delivery_contact_phone: string;
  requested_pickup_date: string;
  estimated_delivery?: string;
  created_at?: string;
  updated_at?: string;
  proof_of_delivery_image?: string | null;
  timeline?: JobTimelineEntry[]; // Job timeline from backend
  assigned_driver?: string;
}

export interface BackendUser {
  id: number | string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'DRIVER' | 'CUSTOMER' | 'ADMIN' | 'MANAGER' | string;
  driver_id?: string; // Optional Driver ID (e.g. "#8291")
}

export interface EarningsData {
  total_earnings: number;
  completed_jobs: number;
  pending_payment: number;
  jobs: Array<{
    job_number: number;
    date: string;
    amount: number;
    status: 'paid' | 'pending';
  }>;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'job_assigned' | 'status_update' | 'message' | 'system';
  read: boolean;
  created_at: string;
  job_id?: number;
}

export interface VehicleInfo {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  capacity: number;
  type: string;
}

export interface DriverStats {
  total_deliveries: number;
  on_time_percentage: number;
  average_rating: number;
  total_earnings: number;
  this_week: {
    deliveries: number;
    earnings: number;
  };
  this_month: {
    deliveries: number;
    earnings: number;
  };
}

// Django REST Framework paginated response
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type Job = JobDetail;