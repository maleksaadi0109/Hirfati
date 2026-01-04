import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { motion } from 'framer-motion';
import {
    Briefcase, TrendingUp, MessageSquare, ArrowUpRight,
    User, ChevronRight, Check, Star, Filter, Sparkles, MapPin
} from 'lucide-react';
import { StatCard, StatusBadge } from '../dashboard/components/DashboardComponents';

// --- Mock Data for Client ---
const MOCK_ORDERS = [
    { id: 1, service: "AC Repair", status: "In Progress", date: "Oct 24", price: "120 LYD", pro: "Ahmed Ben Ali" },
    { id: 2, service: "House Cleaning", status: "Completed", date: "Oct 20", price: "80 LYD", pro: "Sara Khaled" },
    { id: 3, service: "Plumbing", status: "Pending", date: "Oct 25", price: "45 LYD", pro: "Mahmoud Fathi" },
];

const RECOMMENDED_PROS = [
    { id: 1, name: "Ahmed Ben Ali", profession: "Plumber", rating: 4.8, jobs: 120, verified: true },
    { id: 2, name: "Sara Khaled", profession: "Interior Designer", rating: 4.9, jobs: 45, verified: true },
    { id: 3, name: "Mahmoud Fathi", profession: "Electrician", rating: 4.7, jobs: 89, verified: false },
];

export default function ClientDashboard() {
    return (
        <DashboardLayout title="Client Dashboard">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Active Requests" value="3"
                    icon={<Briefcase />}
                    trend="+2 this week" trendUp={true}
                    color="blue" delay={0.1}
                />
                <StatCard
                    title="Total Spent" value="450 LYD"
                    icon={<TrendingUp />}
                    trend="+12% vs last month" trendUp={false}
                    color="green" delay={0.2}
                />
                <StatCard
                    title="Unread Messages" value="5"
                    icon={<MessageSquare />}
                    trend="Response time: 2h"
                    color="orange" delay={0.3}
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Recent Activity Section */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible" className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                            <button className="text-orange-600 text-sm font-bold hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors">View All</button>
                        </div>

                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left bg-white">
                                    <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                                        <tr>
                                            <th className="p-6">Service</th>
                                            <th className="p-6">Professional</th>
                                            <th className="p-6">Date</th>
                                            <th className="p-6">Status</th>
                                            <th className="p-6 text-right">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {MOCK_ORDERS.map((order, idx) => (
                                            <motion.tr
                                                key={order.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="transition-colors group cursor-pointer hover:bg-slate-50/80"
                                            >
                                                <td className="p-6">
                                                    <div className="font-bold text-slate-800 group-hover:text-orange-600 transition-colors text-base">{order.service}</div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                                            {order.pro[0]}
                                                        </div>
                                                        <span className="text-slate-600 text-sm font-medium">{order.pro}</span>
                                                    </div>
                                                </td>
                                                <td className="p-6 text-slate-500 text-sm font-medium">{order.date}</td>
                                                <td className="p-6"><StatusBadge status={order.status} /></td>
                                                <td className="p-6 font-extrabold text-slate-800 text-right">{order.price}</td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>

                    {/* Banner */}
                    <motion.div
                        variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
                        initial="hidden" animate="visible"
                        className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 text-white shadow-2xl shadow-slate-900/20 group"
                    >
                        <div className="relative z-10 flex flex-col items-start gap-6">
                            <div>
                                <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-[10px] font-black uppercase tracking-widest border border-orange-500/30 mb-3 backdrop-blur-sm">New AI Feature</span>
                                <h3 className="text-3xl font-extrabold mb-2 leading-tight">Instant AI <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Price Estimation</span></h3>
                                <p className="text-slate-400 max-w-md text-lg leading-relaxed">Simply upload a photo of your repair needs and get an instant, accurate budget range.</p>
                            </div>
                            <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-orange-50 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group/btn">
                                <Sparkles className="w-5 h-5 text-orange-500" /> Try Now <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-orange-500/30 transition-colors duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover:bg-blue-600/30 transition-colors duration-700"></div>

                        {/* 3D Floating Elements (Optimized) */}
                        <div
                            className="absolute right-10 top-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 rotate-12"
                        />
                    </motion.div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
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
                        <button className="w-full mt-8 py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-[1.5rem] font-bold shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 transition-all active:scale-95 group">
                            <Briefcase className="w-5 h-5 group-hover:animate-bounce" /> Post New Request
                        </button>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    );
}
