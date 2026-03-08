import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase, MapPin, Calendar, DollarSign, Camera,
    ChevronRight, CheckCircle, AlertCircle, X, ChevronLeft
} from 'lucide-react';
import { Head, Link } from '@inertiajs/react';

export default function CreateJob() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        location: '',
        date: '',
        time: '',
        budgetType: 'fixed', // fixed or hourly
        budget: '',
        images: [] as string[]
    });

    const categories = [
        "Plumbing", "Electrical", "Cleaning", "Carpentry",
        "Painting", "AC Repair", "Moving", "General Handyman"
    ];

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Placeholder for image handling logic
        if (e.target.files && e.target.files.length > 0) {
            // simpler simulation
            setFormData({ ...formData, images: [...formData.images, "https://via.placeholder.com/150"] });
        }
    };

    return (
        <DashboardLayout title="Post a Job">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Post a New Job</h1>
                    <p className="text-slate-500 dark:text-slate-400">Tell us what you need done, and we'll connect you with the best pros.</p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8 max-w-2xl">
                    <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'text-orange-600' : 'text-slate-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${step >= 1 ? 'border-orange-600 bg-orange-50 dark:bg-orange-900/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'}`}>
                            {step > 1 ? <CheckCircle size={20} /> : '1'}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider">Job Details</span>
                    </div>
                    <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-orange-200 dark:bg-orange-900' : 'bg-slate-100 dark:bg-slate-800'}`}></div>

                    <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'text-orange-600' : 'text-slate-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${step >= 2 ? 'border-orange-600 bg-orange-50 dark:bg-orange-900/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'}`}>
                            {step > 2 ? <CheckCircle size={20} /> : '2'}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider">Location & Time</span>
                    </div>
                    <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-orange-200 dark:bg-orange-900' : 'bg-slate-100 dark:bg-slate-800'}`}></div>

                    <div className={`flex flex-col items-center gap-2 ${step >= 3 ? 'text-orange-600' : 'text-slate-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${step >= 3 ? 'border-orange-600 bg-orange-50 dark:bg-orange-900/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'}`}>
                            3
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider">Budget</span>
                    </div>
                </div>

                {/* Form Content */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm min-h-[500px] relative">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <label className="block">
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Job Title</span>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="e.g., Fix leaking kitchen sink"
                                            className="mt-1 w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:text-slate-900 dark:focus:text-white font-medium transition-all outline-none"
                                        />
                                    </label>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <label className="block">
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Category</span>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="mt-1 w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:text-slate-900 dark:focus:text-white font-medium transition-all outline-none"
                                            >
                                                <option value="">Select a Category</option>
                                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            </select>
                                        </label>
                                    </div>

                                    <label className="block">
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Description</span>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Describe the issue in detail..."
                                            rows={5}
                                            className="mt-1 w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:text-slate-900 dark:focus:text-white font-medium transition-all outline-none resize-none"
                                        />
                                    </label>

                                    <div>
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">Photos (Optional)</span>
                                        <div className="grid grid-cols-4 gap-4">
                                            {formData.images.map((img, idx) => (
                                                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                                                    <img src={img} alt="Upload" className="w-full h-full object-cover" />
                                                    <button className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                            <label className="aspect-square border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all cursor-pointer">
                                                <Camera size={24} />
                                                <span className="text-xs font-bold mt-2">Add Photo</span>
                                                <input type="file" className="hidden" onChange={handleImageUpload} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-6">
                                    <label className="block">
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Job Location</span>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                            <input
                                                type="text"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                placeholder="Enter address or city..."
                                                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:text-slate-900 dark:focus:text-white font-medium transition-all outline-none"
                                            />
                                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold bg-white text-slate-600 px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 hover:text-orange-600">
                                                Current Location
                                            </button>
                                        </div>
                                    </label>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <label className="block">
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Date</span>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                                <input
                                                    type="date"
                                                    value={formData.date}
                                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 text-slate-600 dark:text-slate-300 font-medium transition-all outline-none"
                                                />
                                            </div>
                                        </label>
                                        <label className="block">
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Time</span>
                                            <select
                                                value={formData.time}
                                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 text-slate-600 dark:text-slate-300 font-medium transition-all outline-none"
                                            >
                                                <option value="">Any Time</option>
                                                <option value="morning">Morning (8am - 12pm)</option>
                                                <option value="afternoon">Afternoon (1pm - 5pm)</option>
                                                <option value="evening">Evening (6pm - 9pm)</option>
                                            </select>
                                        </label>
                                    </div>

                                    <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl flex gap-3 text-orange-800 dark:text-orange-200 text-sm">
                                        <AlertCircle className="shrink-0" size={20} />
                                        <p>Ideally, please provide at least 24 hours notice for optimal service provider matching.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div
                                            onClick={() => setFormData({ ...formData, budgetType: 'fixed' })}
                                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all text-center ${formData.budgetType === 'fixed' ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-900/10' : 'border-slate-100 dark:border-slate-800 hover:border-orange-200'}`}
                                        >
                                            <div className="w-12 h-12 mx-auto bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-green-500 shadow-sm mb-3">
                                                <DollarSign size={24} />
                                            </div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">Fixed Price</h3>
                                            <p className="text-xs text-slate-500 mt-1">Set a total budget for the project</p>
                                        </div>
                                        <div
                                            onClick={() => setFormData({ ...formData, budgetType: 'hourly' })}
                                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all text-center ${formData.budgetType === 'hourly' ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-900/10' : 'border-slate-100 dark:border-slate-800 hover:border-orange-200'}`}
                                        >
                                            <div className="w-12 h-12 mx-auto bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-500 shadow-sm mb-3">
                                                <Briefcase size={24} />
                                            </div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">Hourly Rate</h3>
                                            <p className="text-xs text-slate-500 mt-1">Pay based on hours worked</p>
                                        </div>
                                    </div>

                                    <label className="block">
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">
                                            {formData.budgetType === 'fixed' ? 'Total Budget (LYD)' : 'Hourly Rate (LYD/hr)'}
                                        </span>
                                        <input
                                            type="number"
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            placeholder="0.00"
                                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 text-3xl font-bold text-slate-900 dark:text-white transition-all outline-none"
                                        />
                                    </label>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center">
                        {step > 1 ? (
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            >
                                <ChevronLeft size={20} /> Back
                            </button>
                        ) : (
                            <div></div>
                        )}

                        <button
                            onClick={step < 3 ? handleNext : () => console.log('Submit', formData)}
                            className="flex items-center gap-2 px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-all hover:scale-105"
                        >
                            {step < 3 ? 'Next Step' : 'Post Job Now'} <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
