// driver-app/src/types/index.ts

export interface BackendUser {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'DRIVER' | 'CUSTOMER';
  first_name: string;
  last_name: string;
}

// --- THIS IS THE NEW SHAPE FOR THE JOB LIST ---
export interface ShipmentListItem {
  id: string; // This is the Shipment's ID
  job_id: string;
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED';
  customer_name: string;
  pickup_address: string;
  delivery_address: string;
  requested_pickup_date: string; // ISO 8601 String
}

// We will need a more detailed Job type for the detail screen later
export interface JobDetail {
    // ...
}