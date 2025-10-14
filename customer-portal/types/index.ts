export interface Shipment {
  id: string;
  job: string; // The Job ID
  driver: {
    user: {
      first_name: string;
      last_name: string;
    }
  } | null;
  vehicle: {
    license_plate: string;
    make: string;
    model: string;
  } | null;
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED';
}

export interface BackendUser {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'DRIVER' | 'CUSTOMER';
  first_name: string;
  last_name: string;
  customer_type: 'ONE_TIME' | 'REGULAR';
}

// types/firebase.ts

export interface FirebaseError extends Error {
  code: string;
  message: string;
  name: string;
}

export interface AuthError extends FirebaseError {
  code: string;
  message: string;
  name: string;
}
