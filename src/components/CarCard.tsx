import { Car, Users, Fuel, Settings } from 'lucide-react';
import type { Car as CarType } from '../lib/supabase';

interface CarCardProps {
  car: CarType;
  onBook: (car: CarType) => void;
}

export default function CarCard({ car, onBook }: CarCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="relative h-56 overflow-hidden">
        <img
          src={car.image_url}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${car.price_per_day}/day
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-slate-900">
            {car.brand} {car.model}
          </h3>
          <p className="text-slate-500 text-sm">{car.year} • {car.category}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="w-4 h-4" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4" />
            <span>{car.category}</span>
          </div>
        </div>

        <button
          onClick={() => onBook(car)}
          disabled={!car.available}
          className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${
            car.available
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {car.available ? 'Book Now' : 'Not Available'}
        </button>
      </div>
    </div>
  );
}
