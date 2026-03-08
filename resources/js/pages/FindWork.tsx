import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Search, MapPin, Filter, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FindWork() {
    const opportunities = [
        {
            id: 1,
            title: "Full Home Electrical Wiring",
            location: "Gargresh, Tripoli",
            budget: "850 - 1200 LYD",
            time: "Starts in 2 days",
            posted: "20 min ago",
            tags: ["Electrical", "Large Project"],
            verified: true
        },
        {
            id: 2,
            title: "Emergency Pipe Fix",
            location: "Zawiyat Dahmani",
            budget: "100 - 150 LYD",
            time: "ASAP",
            posted: "1 hour ago",
            tags: ["Plumbing", "Urgent"],
            verified: true
        },
        {
            id: 3,
            title: "Garden Landscaping",
            location: "Ain Zara",
            budget: "300 - 500 LYD",
            time: "Weekend",
            posted: "3 hours ago",
            tags: ["Gardening", "Maintenance"],
            verified: false
        },
        {
            id: 4,
            title: "AC Maintenance (3 Units)",
            location: "Hay Al Andalus",
            budget: "200 LYD",
            time: "Wednesday",
            posted: "5 hours ago",
            tags: ["HVAC", "Maintenance"],
            verified: true
        }
    ];

    return (
        <DashboardLayout title="Find Work">
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-xl">
                        <h2 className="text-3xl font-bold mb-3">Find your next big project</h2>
                        <p className="text-slate-300 mb-6">Browse hundreds of local service requests updated in real-time.</p>

                        <div className="bg-white/10 backdrop-blur-sm p-2 rounded-2xl flex items-center gap-2 border border-white/20">
                            <Search className="w-5 h-5 text-slate-300 ml-2" />
                            <input
                                type="text"
                                placeholder="Search tasks (e.g., Plumbing, Wiring)..."
                                className="bg-transparent border-none outline-none text-white placeholder:text-slate-400 w-full text-sm"
                            />
                            <button className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all">
                                Search
                            </button>
                        </div>
                    </div>
                    {/* Abstract shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Opportunities</h3>
                    <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-orange-600 transition-colors">
                        <Filter size={16} />
                        Filter Result
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {opportunities.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-900 shadow-sm hover:shadow-lg transition-all group relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-2">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-xs font-medium text-slate-400">{item.posted}</span>
                            </div>

                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors">{item.title}</h4>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <MapPin size={16} className="text-slate-400" />
                                    {item.location}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Clock size={16} className="text-slate-400" />
                                    {item.time}
                                </div>
                                {item.verified && (
                                    <div className="flex items-center gap-2 text-sm text-blue-600 font-medium bg-blue-50 dark:bg-blue-900/20 w-fit px-2 py-0.5 rounded-full">
                                        <ShieldCheck size={14} />
                                        Verified Client
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Budget</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">{item.budget}</p>
                                </div>
                                <button className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
                                    <ArrowUpRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
