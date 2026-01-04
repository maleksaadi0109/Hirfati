import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, DollarSign, Filter, X, CheckCircle } from 'lucide-react';

interface ListingPageProps {
  searchQuery: string;
  category: string;
  onViewProfile: (providerId: string) => void;
  onBack: () => void;
}

const providers = [
  {
    id: '1',
    name: 'John Martinez',
    title: 'Licensed Plumber',
    image: 'https://images.unsplash.com/photo-1683815251677-8df20f826622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjcwNDY4Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 127,
    location: 'Downtown, LA',
    price: 'from $80/hr',
    verified: true,
    bio: 'Experienced plumber with 15+ years. Specializing in residential and commercial plumbing repairs.',
    category: 'maintenance',
    availability: 'available',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    title: 'Math & Science Tutor',
    image: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2NzEwNTIzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5.0,
    reviewCount: 89,
    location: 'West Side, LA',
    price: 'from $50/hr',
    verified: true,
    bio: 'Certified educator helping students excel in STEM subjects. Patient and results-driven approach.',
    category: 'education',
    availability: 'available',
  },
  {
    id: '3',
    name: 'Mike Davis',
    title: 'Master Electrician',
    image: 'https://images.unsplash.com/photo-1646227655718-dd721b681d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjcwNzYyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 203,
    location: 'East LA',
    price: 'from $90/hr',
    verified: true,
    bio: 'Licensed electrician specializing in home rewiring, installations, and emergency repairs.',
    category: 'electrical',
    availability: 'busy',
  },
  {
    id: '4',
    name: 'Carlos Ruiz',
    title: 'Professional Painter',
    image: 'https://images.unsplash.com/photo-1683815251677-8df20f826622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjcwNDY4Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 156,
    location: 'Santa Monica',
    price: 'from $60/hr',
    verified: true,
    bio: 'Expert in interior and exterior painting. Attention to detail and clean finish guaranteed.',
    category: 'painting',
    availability: 'available',
  },
  {
    id: '5',
    name: 'Emma Wilson',
    title: 'Home Renovation Specialist',
    image: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2NzEwNTIzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 178,
    location: 'Beverly Hills',
    price: 'from $100/hr',
    verified: true,
    bio: 'Full-service contractor for kitchen, bathroom, and whole-home renovations.',
    category: 'construction',
    availability: 'available',
  },
  {
    id: '6',
    name: 'David Chen',
    title: 'Carpenter & Woodworker',
    image: 'https://images.unsplash.com/photo-1683815251677-8df20f826622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjcwNDY4Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5.0,
    reviewCount: 94,
    location: 'Pasadena',
    price: 'from $75/hr',
    verified: true,
    bio: 'Custom furniture and cabinetry. Transforming spaces with quality craftsmanship.',
    category: 'construction',
    availability: 'available',
  },
  {
    id: '7',
    name: 'Lisa Anderson',
    title: 'Language Instructor',
    image: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2NzEwNTIzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 142,
    location: 'Hollywood',
    price: 'from $45/hr',
    verified: true,
    bio: 'Fluent in English, Spanish, and French. Making language learning fun and effective.',
    category: 'education',
    availability: 'available',
  },
  {
    id: '8',
    name: 'Robert Taylor',
    title: 'HVAC Technician',
    image: 'https://images.unsplash.com/photo-1646227655718-dd721b681d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjcwNzYyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 167,
    location: 'Long Beach',
    price: 'from $85/hr',
    verified: true,
    bio: 'Heating and cooling expert. Installation, maintenance, and repair services.',
    category: 'maintenance',
    availability: 'busy',
  },
];

export function ListingPage({ searchQuery, category, onViewProfile, onBack }: ListingPageProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [availability, setAvailability] = useState<string>('all');
  const [location, setLocation] = useState<string>('all');

  const filteredProviders = providers.filter((provider) => {
    // Category filter
    if (category !== 'all' && provider.category !== category) return false;

    // Search query filter
    if (searchQuery && !provider.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !provider.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    // Price filter
    if (priceRange !== 'all') {
      const hourlyRate = parseInt(provider.price.match(/\d+/)?.[0] || '0');
      if (priceRange === 'low' && hourlyRate > 60) return false;
      if (priceRange === 'medium' && (hourlyRate <= 60 || hourlyRate > 85)) return false;
      if (priceRange === 'high' && hourlyRate <= 85) return false;
    }

    // Availability filter
    if (availability !== 'all' && provider.availability !== availability) return false;

    return true;
  });

  return (
    <div className="flex flex-col bg-gray-50" style={{ flex: '1 0 auto' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-2xl text-gray-900">Service Providers</h1>
                <p className="text-gray-600">{filteredProviders.length} results found</p>
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-64 flex-shrink-0`}>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-3">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Locations</option>
                  <option value="downtown">Downtown</option>
                  <option value="westside">West Side</option>
                  <option value="eastside">East Side</option>
                  <option value="santa-monica">Santa Monica</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-3">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Price Range
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value="all"
                      checked={priceRange === 'all'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">All Prices</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value="low"
                      checked={priceRange === 'low'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">$ - Under $60/hr</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value="medium"
                      checked={priceRange === 'medium'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">$$ - $60-85/hr</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value="high"
                      checked={priceRange === 'high'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">$$$ - $85+/hr</span>
                  </label>
                </div>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-3">Availability</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value="all"
                      checked={availability === 'all'}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">All</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value="available"
                      checked={availability === 'available'}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Available Now</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value="busy"
                      checked={availability === 'busy'}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Busy</span>
                  </label>
                </div>
              </div>

              <button
                onClick={() => {
                  setPriceRange('all');
                  setAvailability('all');
                  setLocation('all');
                }}
                className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Provider Grid */}
          <div className="flex-1">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
                  onClick={() => onViewProfile(provider.id)}
                >
                  {/* Profile Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {provider.availability === 'available' && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                        Available
                      </div>
                    )}
                  </div>

                  {/* Provider Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl text-gray-900">{provider.name}</h3>
                          {provider.verified && (
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <p className="text-gray-600">{provider.title}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-900">{provider.rating}</span>
                      </div>
                      <span className="text-gray-500">({provider.reviewCount} reviews)</span>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-600 mb-4 line-clamp-2">{provider.bio}</p>

                    {/* Location & Price */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{provider.location}</span>
                      </div>
                      <div className="text-blue-600">{provider.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProviders.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Filter className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">No providers found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
