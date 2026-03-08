import DashboardLayout from '@/layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { Camera, Image, Lock, Mail, MapPin, Phone, Save, User as UserIcon, Plus } from 'lucide-react';
import { useState } from 'react';

// Use same type as other pages
interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar_url: string;
    location: string;
    bio: string;
}

export default function EditProfile({ user }: { user: User }) {
    const [activeTab, setActiveTab] = useState<'details' | 'posts'>('details');

    return (
        <DashboardLayout title="Edit Profile">
            <Head title="Edit Profile" />

            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900">Edit Profile</h1>
                <p className="text-slate-500 mt-2">Manage your public presence and content.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Sidebar / Tabs */}
                <div className="lg:w-64 flex-shrink-0 space-y-2">
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'details'
                            ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
                            }`}
                    >
                        <UserIcon size={18} />
                        Profile Details
                    </button>

                    <div className="pt-4 border-t border-slate-100 mt-4">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Account</p>
                        <a href="/settings" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                            <Lock size={18} />
                            Security Settings
                        </a>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">

                    {/* DETAILS TAB */}
                    {activeTab === 'details' && (
                        <div className="space-y-6">

                            {/* Visual Identity Card */}
                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
                                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Camera className="w-5 h-5 text-orange-500" />
                                    Visual Identity
                                </h3>

                                <div className="space-y-8">
                                    {/* Cover Photo */}
                                    <div>
                                        <div className="flex justify-between items-end mb-2">
                                            <h4 className="font-bold text-slate-900">Cover Photo</h4>
                                            <div className="flex gap-2">
                                                <button className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors">
                                                    Change Cover
                                                </button>
                                                <button className="px-3 py-1.5 text-red-500 text-xs font-bold rounded-lg hover:bg-red-50 transition-colors">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                        <div className="h-32 w-full rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 overflow-hidden relative group cursor-pointer hover:border-orange-300 transition-colors">
                                            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2666&auto=format&fit=crop" alt="Cover" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera className="text-white drop-shadow-md" />
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-2">Recommended 1200x300px.</p>
                                    </div>

                                    {/* Profile Photo */}
                                    <div className="flex flex-col items-center sm:flex-row gap-8 pt-6 border-t border-slate-50">
                                        <div className="relative">
                                            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-xl bg-slate-100 ring-1 ring-slate-100">
                                                <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                            </div>
                                            <button className="absolute bottom-0 right-0 bg-slate-900 text-white p-2.5 rounded-full shadow-lg border-4 border-white hover:bg-orange-500 transition-colors">
                                                <Camera size={16} />
                                            </button>
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <h4 className="font-bold text-slate-900 mb-1">Profile Photo</h4>
                                            <p className="text-xs text-slate-500 mb-4 max-w-xs">Recommended 400x400px. JPG or PNG.</p>
                                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                                <button className="px-4 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors">
                                                    Change Photo
                                                </button>
                                                <button className="px-4 py-2 text-red-500 text-xs font-bold rounded-lg hover:bg-red-50 transition-colors">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Info Card */}
                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-6">Basic Information</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Full Name</label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input type="text" defaultValue={user.name} className="w-full pl-12 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-orange-500/20 font-medium text-slate-900" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input type="text" defaultValue={user.location} className="w-full pl-12 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-orange-500/20 font-medium text-slate-900" />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Bio</label>
                                        <textarea rows={4} defaultValue={user.bio} className="w-full p-4 bg-slate-50 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-orange-500/20 font-medium text-slate-900 resize-none" placeholder="Tell us about yourself..." />
                                        <p className="text-xs text-right text-slate-400">0 / 500 characters</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Info Card */}
                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-6">Public Contact Details</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input type="email" defaultValue={user.email} className="w-full pl-12 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-orange-500/20 font-medium text-slate-900" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input type="tel" defaultValue={user.phone} className="w-full pl-12 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-orange-500/20 font-medium text-slate-900" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 transition-all active:scale-95">
                                    <Save size={18} />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}



                    {/* POSTS TAB - Removed as requested */}

                </div>
            </div>
        </DashboardLayout>
    );
}
