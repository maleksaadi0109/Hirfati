import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import DashboardLayout from '../../layouts/DashboardLayout'; // Adjusted import path
import {
    MapPin,
    Calendar,
    CheckCircle,
    Edit,
    MessageSquare,
    Mail,
    Phone,
    Star,
    Briefcase,
    Award,
    Clock,
    DollarSign,
    Share2,
    Grid,
    List
} from 'lucide-react';

// Types for our user prop
interface User {
    id: number;
    name: string;
    role: 'worker' | 'client';
    email: string;
    phone?: string;
    avatar_url?: string;
    cover_url?: string;
    location?: string;
    joined_date: string;
    is_verified: boolean;
    bio?: string;
    skills?: string[]; // Worker only
    hourly_rate?: number; // Worker only
    rating?: number;
    review_count?: number;
}

interface Review {
    id: number;
    reviewer_name: string;
    reviewer_avatar?: string;
    rating: number;
    comment: string;
    date: string;
}

interface Project {
    id: number;
    title: string;
    image: string;
    category: string;
}

interface JobPost {
    id: number;
    title: string;
    status: 'active' | 'closed' | 'in_progress';
    posted_date: string;
    budget: string;
}

export default function UserProfile({ user: propUser }: { user?: User }) { // Accept user as prop or rely on mock if missing
    // --- Mock Data (Fallback if no prop provided) ---
    const mockUser: User = {
        id: 1,
        name: "Ali Ahmed",
        role: "worker",
        email: "ali.ahmed@example.com",
        phone: "+218 91 123 4567",
        avatar_url: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        // Using a reliable Unsplash ID for a modern home interior/architecture
        cover_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2666&auto=format&fit=crop",
        location: "Tripoli, Libya",
        joined_date: "January 2024",
        is_verified: true,
        bio: "Professional electrician with over 5 years of experience in residential and commercial installations. Specialized in smart home setups and emergency repairs. I prioritize safety and quality in every job.",
        skills: ["Electrical Wiring", "Smart Home", "Lighting Installation", "Circuit Repair", "AC Maintenance"],
        hourly_rate: 45,
        rating: 4.8,
        review_count: 124,
    };

    const currentUser = propUser || mockUser;
    const isOwnProfile = true;

    // Determine available tabs based on role
    const tabs = ['overview'];
    if (currentUser.role === 'worker') {
        tabs.push('portfolio');
    } else {
        tabs.push('jobs');
    }
    // Logic changed: Reviews are now shown for everyone as per user request
    tabs.push('reviews');

    const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'jobs' | 'reviews'>('overview');

    // Mock Data for Tabs
    const reviews: Review[] = [
        { id: 1, reviewer_name: "Mohammed K.", rating: 5, comment: "Excellent work! Fixed my wiring issue in under an hour.", date: "2 days ago", reviewer_avatar: "https://i.pravatar.cc/150?u=1" },
        { id: 2, reviewer_name: "Fatima S.", rating: 4, comment: "Very professional and polite. Arrived on time.", date: "1 week ago", reviewer_avatar: "https://i.pravatar.cc/150?u=2" },
        { id: 3, reviewer_name: "Omar B.", rating: 5, comment: "Highly recommended for any electrical work.", date: "2 weeks ago", reviewer_avatar: "https://i.pravatar.cc/150?u=3" }
    ];

    const portfolio: Project[] = [
        { id: 1, title: "Modern Villa Lighting", category: "Installation", image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1974&auto=format&fit=crop" },
        { id: 2, title: "Smart Home Integration", category: "Smart Home", image: "https://images.unsplash.com/photo-1558002038-1091a1661116?q=80&w=2070&auto=format&fit=crop" },
        { id: 3, title: "Office Circuit Upgrade", category: "Commercial", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" },
    ];

    const postedJobs: JobPost[] = [
        { id: 1, title: "Plumbing repair for kitchen sink", status: "active", posted_date: "2 hours ago", budget: "50-100 LYD" },
        { id: 2, title: "Wall painting - 2 bedrooms", status: "in_progress", posted_date: "5 days ago", budget: "300 LYD" },
        { id: 3, title: "AC Cleaning Service", status: "closed", posted_date: "1 month ago", budget: "80 LYD" },
    ];

    return (
        <DashboardLayout title={`${currentUser.name} - Profile`}>
            {/* --- Header Section (Shared) --- */}
            <div className="relative bg-white rounded-3xl shadow-sm border border-slate-100/60 overflow-hidden mb-6">
                {/* Banner */}
                <div className="h-48 md:h-64 w-full bg-slate-100 overflow-hidden relative group">
                    <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2666&auto=format&fit=crop"
                        alt="Cover"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-all"></div>
                </div>

                <div className="px-6 lg:px-10 pb-8">
                    <div className="relative -mt-16 flex flex-col sm:flex-row items-center sm:items-end gap-6">

                        {/* Avatar */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-orange-500 blur-md opacity-20 rounded-full group-hover:opacity-30 transition-opacity"></div>
                            <img
                                src={currentUser.avatar_url}
                                alt={currentUser.name}
                                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-[6px] border-white shadow-xl object-cover bg-white relative z-10"
                            />
                            {currentUser.is_verified && (
                                <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1.5 rounded-full shadow-lg border-4 border-white z-20" title="Verified User">
                                    <CheckCircle size={16} fill="currentColor" className="text-white" />
                                </div>
                            )}
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center sm:text-left mb-2">
                            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center justify-center sm:justify-start gap-3">
                                {currentUser.name}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-slate-500 font-medium">
                                {currentUser.role === 'worker' && (
                                    <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-bold border border-orange-100/50">
                                        <Star size={14} fill="currentColor" /> {currentUser.rating} ({currentUser.review_count} reviews)
                                    </span>
                                )}
                                <span className="flex items-center gap-1.5 text-sm">
                                    <MapPin size={16} className="text-slate-400" />
                                    {currentUser.location}
                                </span>
                                <span className="flex items-center gap-1.5 text-sm">
                                    <Calendar size={16} className="text-slate-400" />
                                    Joined {currentUser.joined_date}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 w-full sm:w-auto pb-2">
                            {isOwnProfile ? (
                                <Link
                                    href="/profile/edit"
                                    className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all shadow-sm"
                                >
                                    <Edit size={18} />
                                    Edit Profile
                                </Link>
                            ) : (
                                <>
                                    <button className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all">
                                        <MessageSquare size={18} />
                                        Contact
                                    </button>
                                    <button className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all bg-white shadow-sm">
                                        <Share2 size={20} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Main Layout --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Bio Card */}
                    <div className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100/60 h-fit sticky top-24">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            About
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            {currentUser.bio || "No bio information provided."}
                        </p>

                        <div className="mt-8 space-y-4 pt-8 border-t border-slate-100">
                            <div className="flex items-center gap-4 text-slate-600 group hover:text-orange-600 transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-orange-50 flex items-center justify-center text-slate-400 group-hover:text-orange-600 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <span className="text-sm font-medium truncate">{isOwnProfile ? currentUser.email : "Email hidden"}</span>
                            </div>
                            <div className="flex items-center gap-4 text-slate-600 group hover:text-orange-600 transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-orange-50 flex items-center justify-center text-slate-400 group-hover:text-orange-600 transition-colors">
                                    <Phone size={18} />
                                </div>
                                <span className="text-sm font-medium">{isOwnProfile ? currentUser.phone : "Phone hidden"}</span>
                            </div>
                            {currentUser.role === 'worker' && currentUser.hourly_rate && (
                                <div className="flex items-center gap-4 text-slate-900 font-bold">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                        <DollarSign size={18} />
                                    </div>
                                    <span className="text-sm">{currentUser.hourly_rate} LYD / hr</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills Card (Worker Only) */}
                    {currentUser.role === 'worker' && currentUser.skills && (
                        <div className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100/60">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                Skills & Expertise
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {currentUser.skills.map(skill => (
                                    <span key={skill} className="px-4 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl border border-slate-100 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-100 transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Content Area */}
                <div className="lg:col-span-8">
                    {/* Tabs Navigation */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100/60 mb-6 overflow-hidden">
                        <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar p-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`flex-1 py-3 px-6 text-sm font-bold text-center whitespace-nowrap rounded-2xl transition-all relative ${activeTab === tab
                                        ? 'bg-slate-900 text-white shadow-md'
                                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                                        }`}
                                >
                                    {tab === 'jobs' ? 'Posted Jobs' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    {tab === 'reviews' && <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>{reviews.length}</span>}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-8 min-h-[400px]">

                            {/* OVERVIEW TAB */}
                            {activeTab === 'overview' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-2xl font-extrabold text-slate-900 mb-6">Professional Overview</h3>
                                    <p className="text-slate-600 leading-loose mb-8">
                                        {currentUser.role === 'worker'
                                            ? "Qualified and dedicated professional committed to delivering high-quality workmanship. I strongly believe in transparency, punctuality, and customer satisfaction."
                                            : "A valued member of the Hirfati community, regularly hiring professionals for home improvement projects."}
                                    </p>

                                    {currentUser.role === 'worker' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-2xl border border-blue-100/50">
                                                <div className="flex items-center gap-4 mb-3">
                                                    <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600"><Award size={24} /></div>
                                                    <span className="font-bold text-blue-900 text-lg">Certified Pro</span>
                                                </div>
                                                <p className="text-sm text-blue-700/80 font-medium">Verified credentials and passed background checks.</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-2xl border border-green-100/50">
                                                <div className="flex items-center gap-4 mb-3">
                                                    <div className="p-2 bg-white rounded-lg shadow-sm text-green-600"><Clock size={24} /></div>
                                                    <span className="font-bold text-green-900 text-lg">Fast Responder</span>
                                                </div>
                                                <p className="text-sm text-green-700/80 font-medium">Usually replies to inquiries within 30 minutes.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* PORTFOLIO TAB (Worker) */}
                            {activeTab === 'portfolio' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {portfolio.map(item => (
                                        <div key={item.id} className="group relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm cursor-pointer hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
                                            <div className="aspect-video bg-slate-100 overflow-hidden">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">{item.category}</span>
                                                <h4 className="font-bold text-white text-lg">{item.title}</h4>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer text-slate-400 hover:text-slate-600 group">
                                        <div className="text-center group-hover:scale-105 transition-transform">
                                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 group-hover:bg-slate-200 transition-colors">
                                                <Grid size={24} />
                                            </div>
                                            <span className="text-sm font-bold">View All Projects</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* JOB POSTS TAB (Client) */}
                            {activeTab === 'jobs' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {postedJobs.map(job => (
                                        <div key={job.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-slate-100 rounded-2xl bg-white hover:border-orange-200 hover:shadow-md hover:shadow-orange-100 transition-all group">
                                            <div>
                                                <h4 className="font-bold text-lg text-slate-900 group-hover:text-orange-600 transition-colors cursor-pointer">{job.title}</h4>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 font-medium">
                                                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {job.posted_date}</span>
                                                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold">Budget: {job.budget}</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 md:mt-0 flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${job.status === 'active' ? 'bg-green-100 text-green-700' :
                                                    job.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                                                    }`}>
                                                    {job.status.replace('_', ' ')}
                                                </span>
                                                <Link href="#" className="p-2.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all">
                                                    <Share2 size={18} />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* REVIEWS TAB (Redesigned) */}
                            {activeTab === 'reviews' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {/* Rating Summary */}
                                    <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-20 pointer-events-none -mr-20 -mt-20"></div>

                                        <div className="flex items-center gap-6 z-10">
                                            <div className="w-24 h-24 rounded-2xl bg-white/10 flex flex-col items-center justify-center backdrop-blur-sm border border-white/10">
                                                <span className="text-4xl font-extrabold">{currentUser.rating}</span>
                                                <span className="text-xs text-slate-300 font-medium uppercase tracking-wider mt-1">out of 5</span>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold mb-2">Excellent Reputation</h3>
                                                <div className="flex items-center gap-1 mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={20} fill={i < Math.floor(currentUser.rating || 0) ? "#f97316" : "none"} className={i < Math.floor(currentUser.rating || 0) ? "text-orange-500" : "text-slate-600"} />
                                                    ))}
                                                </div>
                                                <p className="text-slate-400 text-sm">Based on {currentUser.review_count} verified reviews</p>
                                            </div>
                                        </div>

                                        <button className="z-10 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-orange-50 transition-colors">
                                            Write a Review
                                        </button>
                                    </div>

                                    {/* Reviews Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {reviews.map(review => (
                                            <div key={review.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/40 transition-all group">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={review.reviewer_avatar} alt={review.reviewer_name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100" />
                                                        <div>
                                                            <h5 className="font-bold text-slate-900 leading-tight">{review.reviewer_name}</h5>
                                                            <span className="text-xs text-slate-400 font-medium">{review.date}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bg-orange-50 px-2 py-1 rounded-lg flex items-center gap-1">
                                                        <span className="font-bold text-orange-600 text-sm">{review.rating}.0</span>
                                                        <Star size={12} fill="currentColor" className="text-orange-500" />
                                                    </div>
                                                </div>
                                                <p className="text-slate-600 text-sm leading-relaxed italic">"{review.comment}"</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
