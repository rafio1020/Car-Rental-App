import { Calendar, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Premium Car Rentals
            <span className="block text-amber-400">For Every Journey</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Discover our fleet of luxury and economy vehicles. Book instantly and hit the road with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>Multiple Locations</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>Flexible Booking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
