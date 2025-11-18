import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import type { Car } from './lib/supabase';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import CarCard from './components/CarCard';
import BookingModal from './components/BookingModal';
import { Car as CarIcon } from 'lucide-react';

function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('price_per_day', { ascending: true });

    if (error) {
      console.error('Error fetching cars:', error);
    } else {
      setCars(data || []);
    }
    setLoading(false);
  };

  const filteredCars = cars.filter((car) =>
    selectedCategory === 'All' || car.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <CarIcon className="w-8 h-8 text-amber-500" />
            <h1 className="text-2xl font-bold text-slate-900">DriveSelect</h1>
          </div>
        </div>
      </header>

      <Hero />

      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {selectedCategory === 'All' ? 'Our Fleet' : `${selectedCategory} Vehicles`}
          </h2>
          <p className="text-slate-600">
            {filteredCars.length} {filteredCars.length === 1 ? 'vehicle' : 'vehicles'} available
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg h-96 animate-pulse">
                <div className="bg-slate-200 h-56 rounded-t-xl"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-16">
            <CarIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-500">No vehicles found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} onBook={setSelectedCar} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CarIcon className="w-6 h-6 text-amber-500" />
                <h3 className="text-xl font-bold">DriveSelect</h3>
              </div>
              <p className="text-slate-400">
                Premium car rentals for every journey. Your trusted partner on the road.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li>About Us</li>
                <li>Our Fleet</li>
                <li>Locations</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-400">
                <li>support@driveselect.com</li>
                <li>1-800-DRIVE-NOW</li>
                <li>24/7 Customer Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 DriveSelect. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {selectedCar && (
        <BookingModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onSuccess={fetchCars}
        />
      )}
    </div>
  );
}

export default App;
