import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
    Briefcase,
    MapPin,
    Calendar,
    DollarSign,
    Image as ImageIcon,
    AlertCircle,
    Check,
    ChevronRight,
    Zap,
    PenTool,
    Wrench,
    Truck,
    Home,
    Paintbrush,
    ChevronDown
} from 'lucide-react';

export default function CreateOrder() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [step, setStep] = useState(1);
    const [budgetType, setBudgetType] = useState<'fixed' | 'hourly'>('fixed');

    const categories = [
        { id: 'electrical', name: 'Electrical', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100' },
        { id: 'plumbing', name: 'Plumbing', icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
        { id: 'moving', name: 'Moving', icon: Truck, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
        { id: 'cleaning', name: 'Cleaning', icon: Home, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
        { id: 'painting', name: 'Painting', icon: Paintbrush, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100' },
        { id: 'other', name: 'Other', icon: PenTool, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100' },
    ];

    return (
        <DashboardLayout title="Post a New Request">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-10 text-center max-w-2xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        What service do you need?
                    </h1>
                    <p className="text-slate-500 text-lg">
                        Tell us about your project and we'll match you with the best professionals in your area.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Main Form Area */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 1. Category Selection */}
                        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">1</div>
                                <h2 className="text-xl font-bold text-slate-900">Choose a Category</h2>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all duration-200 group/btn ${selectedCategory === cat.id
                                                ? `border-orange-500 bg-orange-50/50 ring-4 ring-orange-500/10`
                                                : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover/btn:scale-110 ${cat.bg} ${cat.color}`}>
                                            <cat.icon size={24} />
                                        </div>
                                        <span className={`font-bold text-sm ${selectedCategory === cat.id ? 'text-slate-900' : 'text-slate-600'}`}>
                                            {cat.name}
                                        </span>
                                        {selectedCategory === cat.id && (
                                            <div className="absolute top-2 right-2 text-orange-500 animate-in zoom-in duration-200">
                                                <Check size={16} strokeWidth={4} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* 2. Project Details */}
                        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">2</div>
                                <h2 className="text-xl font-bold text-slate-900">Project Details</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Project Title</label>
                                    <input
                                        type="text"
                                        placeholder="E.g., Fix leaking kitchen sink"
                                        className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Describe what you need done in detail..."
                                        className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 resize-none"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Add Photos (Optional)</label>
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer group">
                                        <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-white group-hover:text-orange-500 group-hover:shadow-md transition-all">
                                            <ImageIcon size={24} />
                                        </div>
                                        <p className="text-sm font-bold text-slate-600">Click to upload photos</p>
                                        <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. Location & Budget */}
                        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">3</div>
                                <h2 className="text-xl font-bold text-slate-900">Location & Budget</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                                    <div className="relative">
                                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Tripoli, Libya"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-slate-900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
                                    <div className="relative">
                                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="date"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-slate-900"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Estimated Budget</label>
                                    <div className="bg-slate-50 p-1.5 rounded-xl inline-flex mb-4 border border-slate-200">
                                        <button
                                            onClick={() => setBudgetType('fixed')}
                                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${budgetType === 'fixed' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            Fixed Price
                                        </button>
                                        <button
                                            onClick={() => setBudgetType('hourly')}
                                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${budgetType === 'hourly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            Hourly Rate
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">LYD</span>
                                        <input
                                            type="number"
                                            placeholder={budgetType === 'fixed' ? "e.g., 500" : "e.g., 40"}
                                            className="w-full pl-14 pr-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-slate-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-2xl hover:bg-slate-800 focus:ring-4 focus:ring-slate-900/20 active:scale-[0.99] transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 group">
                                Post Job Request
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                    </div>

                    {/* Sidebar / Help info */}
                    <div className="lg:col-span-1 space-y-6 sticky top-24">
                        {/* Trust Card */}
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg shadow-orange-500/20">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <AlertCircle size={24} className="text-white" />
                                </div>
                                <h3 className="font-bold text-lg">Hiring Tips</h3>
                            </div>
                            <ul className="space-y-3 text-orange-50 text-sm font-medium">
                                <li className="flex gap-2 items-start">
                                    <Check size={16} className="mt-0.5 shrink-0" /> Be specific about your project details.
                                </li>
                                <li className="flex gap-2 items-start">
                                    <Check size={16} className="mt-0.5 shrink-0" /> add photos to get accurate quotes.
                                </li>
                                <li className="flex gap-2 items-start">
                                    <Check size={16} className="mt-0.5 shrink-0" /> Check reviews before hiring.
                                </li>
                            </ul>
                        </div>

                        {/* Summary Card */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4">Why use Hirfati?</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Fast & Easy</h4>
                                        <p className="text-xs text-slate-500 mt-1">Get quotes from pros within minutes.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Verified Pros</h4>
                                        <p className="text-xs text-slate-500 mt-1">We verify identity and skills of every worker.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

// Helper icons
import { CheckCircle } from 'lucide-react';
