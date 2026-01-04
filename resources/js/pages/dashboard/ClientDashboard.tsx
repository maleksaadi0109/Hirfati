import React from 'react';
import { motion } from 'framer-motion';
import {
    Briefcase, TrendingUp, MessageSquare, ArrowUpRight,
    User, ChevronRight, Check, Star, Filter
} from 'lucide-react';
import { StatCard, StatusBadge } from './components/DashboardComponents';

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
        <>
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
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                            <button className="text-orange-600 text-sm font-bold hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors">View All</button>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left bg-white">
                                    <thead className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500">
                                        <tr>
                                            <th className="p-5 font-semibold">Service</th>
                                            <th className="p-5 font-semibold">Professional</th>
                                            <th className="p-5 font-semibold">Date</th>
                                            <th className="p-5 font-semibold">Status</th>
                                            <th className="p-5 font-semibold text-right">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {MOCK_ORDERS.map((order, idx) => (
                                            <motion.tr
                                                key={order.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                                            >
                                                <td className="p-5">
                                                    <div className="font-bold text-slate-800 group-hover:text-orange-600 transition-colors">{order.service}</div>
                                                </td>
                                                <td className="p-5 text-slate-600 text-sm">{order.pro}</td>
                                                <td className="p-5 text-slate-500 text-sm">{order.date}</td>
                                                <td className="p-5"><StatusBadge status={order.status} /></td>
                                                <td className="p-5 font-bold text-slate-800 text-right">{order.price}</td>
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
                        className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl"
                    >
                        <div className="relative z-10 flex flex-col items-start gap-4">
                            <div>
                                <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold border border-orange-500/30 mb-2">New Feature</span>
                                <h3 className="text-2xl font-bold">Try our AI Estimation Tool</h3>
                                <p className="text-slate-400 max-w-md">Get an instant price estimate for your home repairs by uploading a photo.</p>
                            </div>
                            <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors flex items-center gap-2">
                                Try Now <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    </motion.div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-900">Recommended Pros</h2>
                            <button className="p-1 text-slate-400 hover:text-slate-600"><Filter className="w-4 h-4" /></button>
                        </div>
                        <div className="space-y-4">
                            {RECOMMENDED_PROS.map((pro, idx) => (
                                <motion.div
                                    key={pro.id}
                                    whileHover={{ y: -4, shadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                                    className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4 transition-all cursor-pointer"
                                >
                                    <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 relative flex-shrink-0">
                                        <User className="w-6 h-6" />
                                        {pro.verified && (
                                            <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-0.5 rounded-full border-2 border-white">
                                                <Check className="w-3 h-3" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-slate-900 truncate">{pro.name}</h3>
                                        <p className="text-xs text-slate-500 truncate">{pro.profession} • {pro.jobs} Jobs</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star className="w-3 h-3 text-orange-400 fill-current" />
                                            <span className="text-xs font-bold text-slate-700">{pro.rating}</span>
                                        </div>
                                    </div>
                                    <button className="p-2 bg-slate-50 hover:bg-orange-50 text-slate-400 hover:text-orange-600 rounded-xl transition-colors">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 transition-all active:scale-95">
                            <Briefcase className="w-5 h-5" /> Post New Request
                        </button>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
