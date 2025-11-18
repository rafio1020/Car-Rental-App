import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  price_per_day: number;
  image_url: string;
  seats: number;
  transmission: string;
  fuel_type: string;
  available: boolean;
  created_at: string;
}

export interface Booking {
  id?: string;
  car_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_date: string;
  return_date: string;
  total_price: number;
  status?: string;
  created_at?: string;
}
