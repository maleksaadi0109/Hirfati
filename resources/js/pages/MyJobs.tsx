import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Briefcase, Calendar, Clock, MapPin, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MyJobs() {
    const [filter, setFilter] = useState('active');

    const jobs = [
        {
            id: 1,
            title: "Fix Leaking Sink",
            client: "Sarah Connor",
            location: "Downtown, Tripoli",
            date: "Today, 2:00 PM",
            status: "active",
            price: "150 LYD",
            urgent: true
        },
        {
            id: 2,
            title: "Install Ceiling Fan",
            client: "John Smith",
            location: "Gargaresh, Tripoli",
            date: "Tomorrow, 10:00 AM",
            status: "scheduled",
            price: "80 LYD",
            urgent: false
        },
        {
            id: 3,
            title: "Replace Electrical Outlet",
            client: "Mike Johnson",
            location: "Ben Ashour",
            date: "Yesterday",
            status: "completed",
            price: "45 LYD",
            urgent: false
        }
    ];

    const filteredJobs = jobs.filter(job =>
        filter === 'all' ||
        (filter === 'active' && listStatus(job.status)) ||
        job.status === filter
    );

    function listStatus(status) {
        return ['active', 'scheduled'].includes(status);
    }

    return (
        <DashboardLayout title="My Jobs">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">my Jobs</h2>
                        <p className="text-slate-500 dark:text-slate-400">Manage your current and past tasks.</p>
                    </div>
                    <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <button
                            onClick={() => setFilter('active')}
                            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${filter === 'active' ? 'bg-white dark:bg-slate-700 shadow-sm text-orange-600' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setFilter('completed')}
                            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${filter === 'completed' ? 'bg-white dark:bg-slate-700 shadow-sm text-orange-600' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${filter === 'all' ? 'bg-white dark:bg-slate-700 shadow-sm text-orange-600' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                        >
                            All
                        </button>
                    </div>
                </div>

                <div className="grid gap-4">
                    {filteredJobs.map((job) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${job.status === 'completed' ? 'bg-green-50 text-green-600 dark:bg-green-900/20' : 'bg-orange-50 text-orange-600 dark:bg-orange-900/20'}`}>
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">
                                            {job.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{job.client}</span>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <MapPin size={12} /> {job.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{job.price}</p>
                                        <p className={`text-xs font-semibold capitalize ${job.status === 'completed' ? 'text-green-600' :
                                                job.status === 'active' ? 'text-blue-600' : 'text-slate-500'
                                            }`}>
                                            {job.status}
                                        </p>
                                    </div>
                                    <ChevronRight className="text-slate-300" />
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center gap-4 text-sm text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={14} />
                                    {job.date}
                                </div>
                                {job.urgent && (
                                    <div className="flex items-center gap-1.5 text-red-500 font-medium">
                                        <AlertCircle size={14} />
                                        Urgent
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
