import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Star, ThumbsUp, MessageCircle, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Reviews() {
    const reviews = [
        {
            id: 1,
            client: "Sarah Connor",
            date: "2 days ago",
            rating: 5,
            comment: "Excellent work! Arrived on time and fixed the leak quickly. Very professional.",
            service: "Plumbing Repair"
        },
        {
            id: 2,
            client: "Mike Johnson",
            date: "1 week ago",
            rating: 4,
            comment: "Good job overall, but arrived a bit later than expected. Work quality was great though.",
            service: "Electrical Outlet"
        },
        {
            id: 3,
            client: "Emily Davis",
            date: "2 weeks ago",
            rating: 5,
            comment: "Highly recommended! Very polite and cleaned up after the job.",
            service: "AC Cleaning"
        }
    ];

    return (
        <DashboardLayout title="My Reviews">
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Customer Reviews</h2>
                        <p className="text-slate-500 dark:text-slate-400">See what your clients are saying about you.</p>
                    </div>
                </div>

                {/* Rating Overview */}
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
                        <div className="text-5xl font-extrabold text-slate-900 dark:text-white mb-2">4.8</div>
                        <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={20} className="fill-orange-400 text-orange-400" />
                            ))}
                        </div>
                        <p className="text-sm text-slate-500">Based on 42 reviews</p>
                    </div>

                    <div className="md:col-span-3 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Rating Breakdown</h3>
                        <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-slate-600 w-3">{rating}</span>
                                    <div className="flex-1 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-orange-400 rounded-full"
                                            style={{ width: rating === 5 ? '70%' : rating === 4 ? '20%' : '5%' }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-slate-400 w-8 text-right">
                                        {rating === 5 ? '70%' : rating === 4 ? '20%' : '5%'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Review List */}
                <div className="space-y-4">
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white">Recent Feedback</h3>
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 font-bold">
                                        {review.client[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{review.client}</h4>
                                        <p className="text-xs text-slate-400">{review.date}</p>
                                    </div>
                                </div>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className={`${i < review.rating ? 'fill-orange-400 text-orange-400' : 'text-slate-200 dark:text-slate-700'}`} />
                                    ))}
                                </div>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                                "{review.comment}"
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                                <span className="text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
                                    Service: {review.service}
                                </span>
                                <div className="flex gap-4">
                                    <button className="text-slate-400 hover:text-orange-600 flex items-center gap-1 text-xs font-semibold transition-colors">
                                        <ThumbsUp size={14} /> Helpful
                                    </button>
                                    <button className="text-slate-400 hover:text-blue-600 flex items-center gap-1 text-xs font-semibold transition-colors">
                                        <MessageCircle size={14} /> Reply
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
