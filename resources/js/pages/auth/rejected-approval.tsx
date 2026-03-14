import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, Upload, AlertCircle, FileX, RefreshCw, Send, CheckCircle, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';

declare function route(name: string, params?: any, absolute?: boolean): string;

const FloatingShapes = () => (
    <div className="absolute inset-0 overflow-hidden">
        <motion.div
            animate={{ x: [0, -100, 50, 0], y: [0, 80, -80, 0], scale: [1, 1.3, 0.9, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: 'transform' }}
            className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-red-500/40 to-orange-500/40 rounded-full blur-3xl"
        />
        <motion.div
            animate={{ x: [0, 120, -80, 0], y: [0, -100, 60, 0], scale: [1, 1.2, 1.1, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: 'transform' }}
            className="absolute top-1/2 left-10 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/30 to-pink-500/30 rounded-full blur-3xl"
        />
        <motion.div
            animate={{ x: [0, -60, 80, 0], y: [0, 100, -50, 0], scale: [1, 1.4, 0.8, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: 'transform' }}
            className="absolute bottom-20 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-red-500/25 to-pink-500/25 rounded-full blur-3xl"
        />
        {[...Array(8)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute"
                style={{ left: `${((i * 17) % 100)}%`, top: `${((i * 23 + 10) % 100)}%` }}
                animate={{
                    y: [0, -40, 0],
                    x: [0, (i % 2 === 0 ? 10 : -10), 0],
                    rotate: [0, 360],
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            >
                <div
                    className={`${i % 3 === 0
                        ? 'bg-gradient-to-br from-red-400/30 to-orange-400/30'
                        : 'bg-gradient-to-br from-orange-400/30 to-pink-400/30'
                        } ${i % 2 === 0 ? 'rounded-full' : 'rounded-lg rotate-45'} shadow-2xl`}
                    style={{ width: `${20 + (i * 7) % 60}px`, height: `${20 + (i * 7) % 60}px` }}
                />
            </motion.div>
        ))}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }} />
        </div>
    </div>
);

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const fadeInLeft = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };

export default function RejectedApproval() {
    const { data, setData, post, processing, errors } = useForm({
        id_document: null as File | null,
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setSubmitError('Please upload a document to continue.');
            return;
        }

        setSubmitting(true);
        setSubmitError('');

        try {
            const formData = new FormData();
            formData.append('id_document', file);

            const token = localStorage.getItem('access_token');

            await axios.post('/api/provider/resubmit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            setIsSubmitted(true);
        } catch (error: any) {
            if (error.response?.data?.message) {
                setSubmitError(error.response.data.message);
            } else if (error.response?.data?.errors?.id_document) {
                setSubmitError(error.response.data.errors.id_document[0]);
            } else {
                setSubmitError('An error occurred during upload. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-slate-50 via-white to-red-50/30 font-sans selection:bg-red-200 relative">
            <Head title="Application Rejected - Hirfati" />

            <div className="absolute inset-0 opacity-[0.015]">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            {/* Left Side */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 lg:p-16 xl:p-24 relative z-10 bg-white min-h-screen">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ perspective: '1000px' }} className="max-w-md mx-auto w-full">

                    {/* Logo */}
                    <motion.div variants={fadeInUp} className="flex items-center justify-between mb-10">
                        <Link href="/" className="flex items-center gap-3 group">
                            <motion.div className="relative" whileHover={{ scale: 1.05, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                                <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-xl ring-2 ring-red-200 group-hover:ring-red-400 transition-all">
                                    <img src="/images/hirfati-logo.jpg" alt="Hirfati Logo" className="w-full h-full object-cover" />
                                </div>
                            </motion.div>
                            <div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-red-900 bg-clip-text text-transparent tracking-tight">Hirfati</span>
                                <div className="text-[10px] text-red-600 font-semibold -mt-0.5">حرفتي</div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <motion.div variants={fadeInLeft} className="mb-10">
                        <motion.div className="flex items-center gap-3 mb-6" initial={{ width: 0 }} animate={{ width: 'auto' }} transition={{ delay: 0.3, duration: 0.6 }}>
                            <div className="h-1 w-12 bg-gradient-to-r from-red-500 via-red-400 to-orange-300 rounded-full shadow-lg shadow-red-500/50" />
                            <span className="text-red-600 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" /> Action Required
                            </span>
                        </motion.div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight leading-[1.1]">
                            Application<br />
                            <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-500 bg-clip-text text-transparent">Declined</span>
                        </h1>
                        <p className="text-slate-600 text-lg font-medium">
                            We couldn't verify your previous document. Please re-upload a clear, valid verification ID to continue.
                        </p>
                    </motion.div>

                    {/* Main Re-Upload Card */}
                    <motion.div
                        variants={fadeInUp}
                        className="relative mb-8"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl blur-xl" />
                        <div className="relative bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-3xl border border-red-200/60 shadow-xl">

                            {!isSubmitted ? (
                                <>
                                    <div className="flex items-center justify-center mb-6">
                                        <motion.div
                                            className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/40"
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <FileX className="w-10 h-10 text-white" />
                                        </motion.div>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 text-center mb-6">Upload Verification ID</h3>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label htmlFor="id_document" className="text-slate-700 font-bold text-sm flex items-center justify-center gap-2 mb-2">
                                                <Upload className="w-4 h-4 text-red-500" /> Choose a new document
                                            </label>
                                            <div className="relative group flex justify-center">
                                                <input
                                                    id="id_document"
                                                    type="file"
                                                    required
                                                    onChange={e => {
                                                        setFile(e.target.files ? e.target.files[0] : null);
                                                        setSubmitError('');
                                                    }}
                                                    className="w-full text-center p-4 border-2 border-red-200 border-dashed focus:border-red-500 rounded-2xl bg-white/60 transition-all text-slate-600 font-medium shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-red-50 file:text-red-600 hover:file:bg-red-100 cursor-pointer"
                                                />
                                            </div>
                                            {submitError && <p className="text-red-500 text-sm font-semibold max-w-sm ml-2 mt-1">{submitError}</p>}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full h-14 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                            {submitting ? 'Submitting...' : 'Resubmit Application'}
                                        </motion.button>
                                    </form>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-6"
                                >
                                    <div className="flex items-center justify-center mb-6">
                                        <motion.div
                                            className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40"
                                            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 1 }}
                                        >
                                            <CheckCircle className="w-10 h-10 text-white" />
                                        </motion.div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Successfully Resubmitted</h3>
                                    <p className="text-slate-600 font-medium mb-6">
                                        Thank you! Your new document has been sent to our team for review. You will be notified shortly.
                                    </p>
                                    <button
                                        onClick={async () => {
                                            try {
                                                const token = localStorage.getItem('access_token');
                                                await axios.post('/web-logout', {}, {
                                                    headers: { Authorization: `Bearer ${token}` }
                                                });
                                            } catch (e) {
                                                // Ignore logout errors
                                            }
                                            localStorage.removeItem('access_token');
                                            localStorage.removeItem('user');
                                            window.location.href = '/login';
                                        }}
                                        className="inline-flex items-center justify-center w-full h-12 bg-white text-slate-700 hover:text-orange-600 border border-slate-200 font-bold rounded-xl transition-all shadow-sm group cursor-pointer"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Sign out for now
                                    </button>
                                </motion.div>
                            )}

                        </div>
                    </motion.div>

                    {/* Actions */}
                    {!isSubmitted && (
                        <motion.div variants={fadeInUp} className="space-y-4">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    href="/login"
                                    className="group relative w-full h-14 flex items-center justify-center border-2 border-slate-200 hover:border-red-300 text-slate-700 hover:text-red-600 font-bold rounded-xl transition-all hover:bg-gradient-to-br from-red-50 to-orange-50 shadow-sm hover:shadow-lg overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                        Back to Login
                                    </span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Right Side - Visuals */}
            <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden sticky top-0 h-screen">
                <div className="absolute inset-0">
                    <FloatingShapes />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-red-900/40 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-center p-12 xl:p-20 z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="max-w-lg">
                        <div className="mb-10">
                            <motion.div
                                initial={{ scale: 0, x: -50 }} animate={{ scale: 1, x: 0 }} transition={{ delay: 0.5, type: 'spring', stiffness: 200 }} whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/30 to-orange-500/30 backdrop-blur-xl px-5 py-3 rounded-full mb-8 border border-red-500/30 shadow-2xl"
                            >
                                <motion.div animate={{ rotate: 180 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                                    <RefreshCw className="w-5 h-5 text-red-300" />
                                </motion.div>
                                <span className="text-red-200 text-sm font-bold uppercase tracking-wider">Let's try again</span>
                            </motion.div>

                            <motion.h2 className="text-5xl xl:text-6xl font-bold text-white mb-6 leading-[1.1]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                                We want you on<br />
                                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-pink-300 bg-clip-text text-transparent">our platform.</span>
                            </motion.h2>
                            <motion.p className="text-slate-300 text-xl leading-relaxed font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                                Rejections usually happen due to blurred photos or expired documents. Please ensure your new upload is clear and valid.
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
