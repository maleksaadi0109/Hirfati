import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Search, MapPin, Heart, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Favorites() {
    const [favorites, setFavorites] = useState([
        {
            id: 1,
            name: "Ahmed Electrician",
            service: "Electrical Wiring",
            rating: 4.9,
            reviews: 120,
            location: "Gargresh, Tripoli",
            price: "50 LYD/hr",
            image: "https://i.pravatar.cc/150?u=12",
            isOnline: true
        },
        {
            id: 2,
            name: "Fatima Cleaners",
            service: "Deep Cleaning",
            rating: 4.8,
            reviews: 85,
            location: "Ben Ashour",
            price: "On Quote",
            image: "https://i.pravatar.cc/150?u=22",
            isOnline: false
        },
        {
            id: 3,
            name: "Pro Plumbers Co.",
            service: "Plumbing Services",
            rating: 4.7,
            reviews: 210,
            location: "Zawiyat Dahmani",
            price: "40 LYD/hr",
            image: "https://i.pravatar.cc/150?u=33",
            isOnline: true
        }
    ]);

    const removeFavorite = (id: number) => {
        setFavorites(favorites.filter(fav => fav.id !== id));
    };

    return (
        <DashboardLayout title="My Favorites">
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Saved Professionals</h2>
                    <p className="text-slate-500 dark:text-slate-400">Quickly access your favorite service providers.</p>
                </div>

                {favorites.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map((pro, idx) => (
                            <motion.div
                                key={pro.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group relative"
                            >
                                <button
                                    onClick={() => removeFavorite(pro.id)}
                                    className="absolute top-4 right-4 text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/10 p-2 rounded-full transition-colors z-10"
                                >
                                    <Heart size={18} className="fill-current" />
                                </button>

                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative">
                                        <img src={pro.image} alt={pro.name} className="w-16 h-16 rounded-2xl object-cover" />
                                        {pro.isOnline && (
                                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">{pro.name}</h3>
                                        <p className="text-xs text-orange-600 font-medium">{pro.service}</p>
                                        <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                                            <Star size={12} className="text-yellow-400 fill-current" />
                                            <span className="font-bold text-slate-700 dark:text-slate-300">{pro.rating}</span>
                                            <span>({pro.reviews})</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <MapPin size={16} className="text-slate-400" />
                                        {pro.location}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                                    <span className="font-bold text-slate-900 dark:text-white">{pro.price}</span>
                                    <button className="flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">
                                        Book Now <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
                            <Heart size={40} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No favorites yet</h3>
                        <p className="text-slate-500 max-w-md mx-auto mt-2 mb-6">Start browsing professionals and click the heart icon to save them here for later.</p>
                        <button className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20">
                            Find Pros
                        </button>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
