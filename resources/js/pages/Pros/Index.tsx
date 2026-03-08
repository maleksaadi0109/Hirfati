import { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
    Search,
    Filter,
    MapPin,
    Star,
    Shield,
    Heart,
    MessageSquare,
    ChevronRight,
    Award
} from 'lucide-react';

interface Pro {
    id: number;
    name: string;
    role: string;
    avatar: string;
    rating: number;
    reviews: number;
    hourly_rate: number;
    location: string;
    verified: boolean;
    skills: string[];
    completed_jobs: number;
}

export default function FindPros() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = ['All', 'Electrician', 'Plumber', 'Carpenter', 'Painter', 'Cleaner', 'Mover'];

    const mockPros: Pro[] = [
        {
            id: 1,
            name: "Ahmed Ben Ali",
            role: "Electrician",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            rating: 4.9,
            reviews: 124,
            hourly_rate: 45,
            location: "Tripoli, Libya",
            verified: true,
            skills: ["Wiring", "Smart Home", "Lighting"],
            completed_jobs: 312
        },
        {
            id: 2,
            name: "Sarah Mahmoud",
            role: "Interior Designer", // Added purely for variety in mock
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            rating: 4.8,
            reviews: 89,
            hourly_rate: 60,
            location: "Benghazi, Libya",
            verified: true,
            skills: ["3D Modeling", "Space Planning", "Decor"],
            completed_jobs: 145
        },
        {
            id: 3,
            name: "Omar Khaled",
            role: "Plumber",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026703d",
            rating: 4.6,
            reviews: 56,
            hourly_rate: 35,
            location: "Tripoli, Libya",
            verified: false,
            skills: ["Pipe Repair", "Installation", "Maintenance"],
            completed_jobs: 98
        },
        {
            id: 4,
            name: "Khaled Yousef",
            role: "Carpenter",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026701d",
            rating: 5.0,
            reviews: 210,
            hourly_rate: 55,
            location: "Misrata, Libya",
            verified: true,
            skills: ["Furniture", "Restoration", "Cabinets"],
            completed_jobs: 500
        }
    ];

    const filteredPros = useMemo(() => {
        return mockPros.filter(pro => {
            const matchesSearch = pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pro.role.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory && selectedCategory !== 'All' ? pro.role === selectedCategory : true;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <DashboardLayout title="Find Professionals">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* 1. Hero Search Section */}
                <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-slate-800 shadow-2xl p-8 md:p-16 text-center">
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 bg-orange-500 rounded-full blur-[80px] opacity-15 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 bg-blue-500 rounded-full blur-[80px] opacity-15 pointer-events-none"></div>

                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                                Hire the best <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Pros</span> near you.
                            </h1>
                            <p className="text-slate-400 text-lg">
                                Search for verified experts by name, skill, or category.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative group max-w-xl mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full blur opacity-25 group-focus-within:opacity-50 transition-opacity duration-500"></div>
                            <div className="relative flex items-center bg-white rounded-full p-2 shadow-xl">
                                <Search className="ml-4 text-slate-400 w-6 h-6" />
                                <input
                                    type="text"
                                    placeholder="e.g. Electrician, Painter, Ahmed..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-slate-900 placeholder:text-slate-400 font-medium text-lg"
                                />
                                <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Category Filter */}
                <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border ${selectedCategory === cat || (cat === 'All' && !selectedCategory)
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-orange-200 hover:bg-orange-50/50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* 3. Pros Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPros.length > 0 ? (
                        filteredPros.map((pro) => (
                            <div key={pro.id} className="group bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden">

                                {/* Top Badge */}
                                {pro.verified && (
                                    <div className="absolute top-6 right-6 z-10">
                                        <div className="bg-blue-50 text-blue-600 p-2 rounded-xl" title="Verified Pro">
                                            <Shield size={20} fill="currentColor" className="opacity-20" />
                                            <Shield size={20} className="absolute inset-0 m-2" />
                                        </div>
                                    </div>
                                )}

                                {/* Profile Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <img src={pro.avatar} alt={pro.name} className="w-20 h-20 rounded-2xl object-cover bg-slate-100 shadow-inner" />
                                    <div>
                                        <h3 className="font-bold text-xl text-slate-900 group-hover:text-orange-600 transition-colors cursor-pointer">{pro.name}</h3>
                                        <p className="text-slate-500 font-medium text-sm flex items-center gap-1">
                                            <Award size={14} className="text-orange-500" /> {pro.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Stats Row */}
                                <div className="flex items-center justify-between bg-slate-50/80 rounded-2xl p-4 mb-6">
                                    <div className="text-center">
                                        <div className="flex items-center gap-1 justify-center font-bold text-slate-900">
                                            <Star size={14} fill="currentColor" className="text-orange-500" />
                                            {pro.rating}
                                        </div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rating</div>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200"></div>
                                    <div className="text-center">
                                        <div className="font-bold text-slate-900">{pro.completed_jobs}</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Jobs</div>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200"></div>
                                    <div className="text-center">
                                        <div className="font-bold text-slate-900">{pro.hourly_rate} LYD</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">/hr</div>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {pro.skills.map((skill) => (
                                        <span key={skill} className="px-3 py-1 bg-white border border-slate-100 rounded-lg text-xs font-bold text-slate-600">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2 text-sm">
                                        View Profile
                                    </button>
                                    <button className="p-3.5 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all">
                                        <Heart size={20} />
                                    </button>
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-slate-400">
                            <p className="text-lg">No professionals found matching your search.</p>
                        </div>
                    )}
                </div>

            </div>
        </DashboardLayout>
    );
}
