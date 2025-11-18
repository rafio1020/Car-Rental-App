import { useState } from 'react';
import { X, Calendar, User, Mail, Phone } from 'lucide-react';
import type { Car, Booking } from '../lib/supabase';
import { supabase } from '../lib/supabase';

interface BookingModalProps {
  car: Car;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BookingModal({ car, onClose, onSuccess }: BookingModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    pickup_date: '',
    return_date: '',
  });

  const calculateTotal = () => {
    if (!formData.pickup_date || !formData.return_date) return 0;
    const pickup = new Date(formData.pickup_date);
    const returnDate = new Date(formData.return_date);
    const days = Math.ceil((returnDate.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * car.price_per_day : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const booking: Booking = {
      car_id: car.id,
      ...formData,
      total_price: calculateTotal(),
      status: 'pending',
    };

    const { error } = await supabase.from('bookings').insert([booking]);

    setLoading(false);

    if (error) {
      alert('Booking failed: ' + error.message);
    } else {
      alert('Booking successful! We will contact you shortly.');
      onSuccess();
      onClose();
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Book Your Ride</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-slate-50 rounded-lg p-4 mb-6 flex items-center gap-4">
            <img
              src={car.image_url}
              alt={`${car.brand} ${car.model}`}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {car.brand} {car.model}
              </h3>
              <p className="text-slate-600">{car.year} • {car.category}</p>
              <p className="text-amber-600 font-semibold mt-1">
                ${car.price_per_day} per day
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.customer_email}
                onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={formData.customer_phone}
                onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Calendar className="w-4 h-4" />
                  Pickup Date
                </label>
                <input
                  type="date"
                  required
                  min={today}
                  value={formData.pickup_date}
                  onChange={(e) => setFormData({ ...formData, pickup_date: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Calendar className="w-4 h-4" />
                  Return Date
                </label>
                <input
                  type="date"
                  required
                  min={formData.pickup_date || today}
                  value={formData.return_date}
                  onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {calculateTotal() > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 font-medium">Total Amount:</span>
                  <span className="text-2xl font-bold text-amber-600">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-1">
                  {Math.ceil((new Date(formData.return_date).getTime() - new Date(formData.pickup_date).getTime()) / (1000 * 60 * 60 * 24))} days × ${car.price_per_day}/day
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || calculateTotal() === 0}
                className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
