import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { motion } from 'framer-motion';
import {
    Briefcase, TrendingUp, MessageSquare, ArrowUpRight,
    User, ChevronRight, Check, Star, Filter, Sparkles, MapPin,
    Search, Zap, Droplets, Wind, Home, Clock, ArrowRight, Bell,
    Phone, MessageCircle
} from 'lucide-react';
import { StatCard, StatusBadge } from '../dashboard/components/DashboardComponents';

// --- Mock Data for Client ---
const ACTIVE_JOB = {
    id: 101,
    service: "AC Maintenance",
    pro: "Ahmed Ben Ali",
    status: "In Progress",
    arrival: "Tomorrow, 4:00 PM",
    icon: <Wind className="w-8 h-8 text-orange-500" />
};

const CATEGORIES = [
    { label: "Electricity", icon: <Zap />, color: "text-yellow-500 bg-yellow-50" },
    { label: "Plumbing", icon: <Droplets />, color: "text-blue-500 bg-blue-50" },
    { label: "Cleaning", icon: <Home />, color: "text-green-500 bg-green-50" },
    { label: "AC Repair", icon: <Wind />, color: "text-orange-500 bg-orange-50" },
];

const MOCK_ORDERS = [
    { id: 1, service: "AC Repair", status: "Completed", date: "Oct 24", price: "120 LYD", pro: "Ahmed Ben Ali" },
    { id: 2, service: "House Cleaning", status: "Completed", date: "Oct 20", price: "80 LYD", pro: "Sara Khaled" },
    { id: 3, service: "Plumbing", status: "Completed", date: "Oct 15", price: "45 LYD", pro: "Mahmoud Fathi" },
];

const PENDING_MESSAGES = [
    { id: 1, sender: "Ahmed Ben Ali", text: "I have sent you the quote for the AC repair.", time: "2h ago", unread: true },
    { id: 2, sender: "Sara Khaled", text: "Are you available on Tuesday?", time: "5h ago", unread: true },
];

const RECOMMENDED_PROS = [
    { id: 1, name: "Ahmed Ben Ali", profession: "Plumber", rating: 4.8, jobs: 120, verified: true },
    { id: 2, name: "Sara Khaled", profession: "Interior Designer", rating: 4.9, jobs: 45, verified: true },
    { id: 3, name: "Mahmoud Fathi", profession: "Electrician", rating: 4.7, jobs: 89, verified: false },
];

export default function ClientDashboard() {
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.get('/client/find-pros', { search: e.currentTarget.value });
        }
    };

    const handleCategoryClick = (label: string) => {
        router.get('/client/find-pros', { category: label });
    };

    return (
        <DashboardLayout title="Client Dashboard">
            {/* Header / Search Section */}
            <div className="mb-10 text-center max-w-2xl mx-auto space-y-6">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">How can we help you today?</h1>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <Search className="w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search for any service (e.g., plumbing, ac repair)..." 
                        onKeyDown={handleSearch}
                        className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-lg font-medium"
                    />
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    {CATEGORIES.map((cat, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => handleCategoryClick(cat.label)}
                            className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-50 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
                        >
                            <span className={`p-2 rounded-xl ${cat.color} group-hover:scale-110 transition-transform`}>
                                {React.cloneElement(cat.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
                            </span>
                            <span className="font-bold text-slate-700 text-sm">{cat.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Active Job Hero */}
                    {ACTIVE_JOB && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-900/30 group"
                        >
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-[1.5rem] bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20">
                                        {ACTIVE_JOB.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">{ACTIVE_JOB.status}</span>
                                        </div>
                                        <h3 className="text-2xl font-black mb-1">{ACTIVE_JOB.service} Request</h3>
                                        <p className="text-slate-400 flex items-center gap-2 font-medium">
                                            <Clock className="w-4 h-4" /> {ACTIVE_JOB.arrival}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                                    <button className="flex-1 md:flex-initial px-6 py-3.5 bg-orange-600 hover:bg-orange-700 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30">
                                        Track Progress <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <button title="Call Professional" className="flex-1 md:flex-initial p-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl font-bold transition-all border border-white/10 flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-white" />
                                        </button>
                                        <button title="WhatsApp" className="flex-1 md:flex-initial p-3.5 bg-green-500/20 hover:bg-green-500/30 backdrop-blur-md rounded-2xl font-bold transition-all border border-green-500/20 flex items-center justify-center group/wa">
                                            <MessageCircle className="w-5 h-5 text-green-400 group-hover/wa:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                        </motion.div>
                    )}

                    {/* Visual separation instead of redundant stats */}
                    <div className="h-4 sm:h-0" />

                    {/* Recent Activity Section */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible" className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black text-slate-900">Recent Services</h2>
                            <button className="text-slate-500 text-sm font-bold hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">View History</button>
                        </div>

                        <div className="space-y-4">
                            {MOCK_ORDERS.map((order, idx) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 flex-shrink-0">
                                            <Briefcase className="w-6 h-6" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-slate-800 text-base group-hover:text-orange-600 transition-colors truncate">
                                                {order.service}
                                            </h4>
                                            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                                                <span>{order.pro}</span>
                                                <span>•</span>
                                                <span>{order.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 flex-shrink-0">
                                        <div className="text-right hidden sm:block">
                                            <div className="font-extrabold text-slate-900">{order.price}</div>
                                            <div className="text-[10px] uppercase font-bold text-green-500">Completed</div>
                                        </div>
                                        <button className="px-5 py-2.5 bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white rounded-2xl font-black text-xs transition-all border border-orange-100/50 shadow-sm shadow-orange-500/5">
                                            Rebook
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    {/* Pending Chats / Quotes */}
                    <motion.div 
                        variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }} 
                        initial="hidden" animate="visible"
                        className="bg-white p-6 rounded-[2.5rem] border border-orange-100 shadow-xl shadow-orange-500/5 relative overflow-hidden"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
                                <Bell className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-black text-slate-900">Pending Quotes</h2>
                        </div>
                        <div className="space-y-4 relative z-10">
                            {PENDING_MESSAGES.map((msg, idx) => (
                                <div key={msg.id} className="p-4 bg-orange-50 rounded-2xl border border-orange-100 group cursor-pointer hover:bg-orange-100 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-bold text-slate-900 text-sm">{msg.sender}</span>
                                        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-tight">{msg.time}</span>
                                    </div>
                                    <p className="text-xs text-slate-900 font-medium mb-3 line-clamp-2 leading-relaxed">
                                        {msg.text}
                                    </p>
                                    <button className="w-full py-2 bg-white/80 hover:bg-white border border-orange-200/50 rounded-xl text-orange-600 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all">
                                        View Quote <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }} initial="hidden" animate="visible">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-900">Recommended Pros</h2>
                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"><Filter className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-4">
                            {RECOMMENDED_PROS.map((pro, idx) => (
                                <motion.div
                                    key={pro.id}
                                    className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm flex items-center gap-4 transition-all cursor-pointer group relative overflow-hidden hover:shadow-md hover:-translate-y-1"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 relative flex-shrink-0 overflow-hidden border border-slate-200">
                                        <User className="w-8 h-8" />
                                        {pro.verified && (
                                            <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-tl-lg shadow-sm">
                                                <Check className="w-3 h-3" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 py-1">
                                        <h3 className="font-extrabold text-slate-900 truncate text-lg group-hover:text-orange-600 transition-colors">{pro.name}</h3>
                                        <p className="text-xs text-slate-500 truncate font-medium">{pro.profession} • {pro.jobs} Jobs</p>
                                        <div className="flex items-center gap-1 mt-2">
                                            <div className="flex items-center text-orange-400">
                                                <Star className="w-3.5 h-3.5 fill-current" />
                                                <span className="text-xs font-black text-slate-800 ml-1">{pro.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-3 bg-slate-50 hover:bg-orange-50 text-slate-400 hover:text-orange-600 rounded-xl transition-colors self-center">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    );
}
