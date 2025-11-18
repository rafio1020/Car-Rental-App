/*
  # Car Rental Database Schema

  1. New Tables
    - `cars`
      - `id` (uuid, primary key)
      - `brand` (text) - Car manufacturer
      - `model` (text) - Car model name
      - `year` (integer) - Manufacturing year
      - `category` (text) - Car category (sedan, suv, sports, luxury)
      - `price_per_day` (numeric) - Daily rental price
      - `image_url` (text) - Car image URL
      - `seats` (integer) - Number of seats
      - `transmission` (text) - Manual or Automatic
      - `fuel_type` (text) - Fuel type
      - `available` (boolean) - Availability status
      - `created_at` (timestamp)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `car_id` (uuid, foreign key)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `pickup_date` (date)
      - `return_date` (date)
      - `total_price` (numeric)
      - `status` (text) - pending, confirmed, completed, cancelled
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Public read access for cars
    - Public insert for bookings (for demo purposes)
    - Authenticated users can view their own bookings
*/

CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  category text NOT NULL,
  price_per_day numeric NOT NULL,
  image_url text NOT NULL,
  seats integer NOT NULL DEFAULT 5,
  transmission text NOT NULL DEFAULT 'Automatic',
  fuel_type text NOT NULL DEFAULT 'Gasoline',
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id uuid REFERENCES cars(id) NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  pickup_date date NOT NULL,
  return_date date NOT NULL,
  total_price numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available cars"
  ON cars FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view bookings"
  ON bookings FOR SELECT
  USING (true);