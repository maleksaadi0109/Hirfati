import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clock, Shield, ArrowLeft, Sparkles, Users, Star, Award, FileCheck, HelpCircle, TrendingUp } from 'lucide-react';

declare function route(name: string, params?: any, absolute?: boolean): string;

const FloatingShapes = () => (
    <div className="absolute inset-0 overflow-hidden">
        <motion.div
            animate={{ x: [0, 100, -50, 0], y: [0, -80, 80, 0], scale: [1, 1.3, 0.9, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: 'transform' }}
            className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/40 to-amber-500/40 rounded-full blur-3xl"
        />
        <motion.div
            animate={{ x: [0, -120, 80, 0], y: [0, 100, -60, 0], scale: [1, 1.2, 1.1, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: 'transform' }}
            className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/30 to-pink-500/30 rounded-full blur-3xl"
        />
        <motion.div
            animate={{ x: [0, 60, -80, 0], y: [0, -100, 50, 0], scale: [1, 1.4, 0.8, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: 'transform' }}
            className="absolute bottom-20 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-yellow-500/25 to-orange-500/25 rounded-full blur-3xl"
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
                        ? 'bg-gradient-to-br from-orange-400/30 to-amber-400/30'
                        : i % 3 === 1
                            ? 'bg-gradient-to-br from-orange-400/30 to-pink-400/30'
                            : 'bg-gradient-to-br from-yellow-400/30 to-orange-400/30'
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

export default function PendingApproval() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-slate-50 via-white to-orange-50/30 font-sans selection:bg-orange-200 relative">
            <Head title="Application Under Review - Hirfati" />

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
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                                <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-xl ring-2 ring-orange-200 group-hover:ring-orange-400 transition-all">
                                    <img src="/images/hirfati-logo.jpg" alt="Hirfati Logo" className="w-full h-full object-cover" />
                                </div>
                            </motion.div>
                            <div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-orange-900 bg-clip-text text-transparent tracking-tight">Hirfati</span>
                                <div className="text-[10px] text-orange-600 font-semibold -mt-0.5">حرفتي</div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <motion.div variants={fadeInLeft} className="mb-10">
                        <motion.div className="flex items-center gap-3 mb-6" initial={{ width: 0 }} animate={{ width: 'auto' }} transition={{ delay: 0.3, duration: 0.6 }}>
                            <div className="h-1 w-12 bg-gradient-to-r from-amber-500 via-orange-400 to-orange-300 rounded-full shadow-lg shadow-amber-500/50" />
                            <span className="text-amber-600 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Under Review
                            </span>
                        </motion.div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight leading-[1.1]">
                            Application<br />
                            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">under review</span>
                        </h1>
                        <p className="text-slate-600 text-lg font-medium">
                            Your provider application is being reviewed by our team. We'll notify you once it's approved.
                        </p>
                    </motion.div>

                    {/* Status Card */}
                    <motion.div
                        variants={fadeInUp}
                        className="relative mb-8"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl blur-xl" />
                        <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl border border-amber-200/60 shadow-xl">
                            {/* Animated clock icon */}
                            <div className="flex items-center justify-center mb-6">
                                <motion.div
                                    className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/40"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Clock className="w-10 h-10 text-white" />
                                    </motion.div>
                                </motion.div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 text-center mb-3">What happens next?</h3>

                            {/* Steps */}
                            <div className="space-y-4">
                                {[
                                    { icon: FileCheck, text: 'Our team reviews your verification document', status: 'in-progress' },
                                    { icon: Shield, text: 'Your credentials and experience are verified', status: 'pending' },
                                    { icon: Award, text: 'You get approved and can start offering services', status: 'pending' },
                                ].map((step, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + idx * 0.15 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${step.status === 'in-progress'
                                                ? 'bg-amber-500 shadow-lg shadow-amber-500/30'
                                                : 'bg-slate-200'
                                            }`}>
                                            {step.status === 'in-progress' ? (
                                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                                                    <step.icon className="w-5 h-5 text-white" />
                                                </motion.div>
                                            ) : (
                                                <step.icon className={`w-5 h-5 ${step.status === 'in-progress' ? 'text-white' : 'text-slate-400'}`} />
                                            )}
                                        </div>
                                        <span className={`text-sm font-medium ${step.status === 'in-progress' ? 'text-slate-900' : 'text-slate-500'}`}>
                                            {step.text}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Estimated time */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="mt-6 p-4 bg-white/70 rounded-2xl border border-amber-100 text-center"
                            >
                                <p className="text-sm text-slate-600">
                                    <span className="font-bold text-amber-700">Estimated review time:</span> 24-48 hours
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div variants={fadeInUp} className="space-y-4">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href="/"
                                className="group relative w-full h-14 flex items-center justify-center bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 hover:from-orange-700 hover:via-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-xl shadow-orange-500/40 hover:shadow-2xl transition-all text-lg overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    Back to Home
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                    style={{ transform: 'skewX(-20deg)' }}
                                />
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <a
                                href="mailto:support@hirfati.com"
                                className="group relative w-full h-14 flex items-center justify-center border-2 border-slate-200 hover:border-orange-300 text-slate-700 hover:text-orange-600 font-bold rounded-xl transition-all hover:bg-gradient-to-br from-orange-50 to-pink-50 shadow-sm hover:shadow-lg overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5" />
                                    Contact Support
                                </span>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-10 grid grid-cols-3 gap-4">
                        {[{ icon: Shield, label: 'Secure' }, { icon: Users, label: '10K+ Users' }, { icon: Award, label: 'Trusted' }].map((item, idx) => (
                            <motion.div key={idx} whileHover={{ y: -3, scale: 1.05 }} className="flex flex-col items-center gap-2 p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                                <item.icon className="w-5 h-5 text-orange-600" />
                                <span className="text-xs font-semibold text-slate-600">{item.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Right Side - Visuals */}
            <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden sticky top-0 h-screen">
                <div className="absolute inset-0">
                    <FloatingShapes />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-orange-900/40 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-600/20 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-between p-12 xl:p-20 z-10">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex items-center gap-4 flex-wrap">
                        {[
                            { icon: Users, value: '10K+', label: 'Users', color: 'from-orange-400 to-orange-600' },
                            { icon: Shield, value: 'Secure', label: 'Platform', color: 'from-green-400 to-green-600' },
                            { icon: Star, value: '4.9/5', label: 'Rating', color: 'from-yellow-400 to-yellow-600' }
                        ].map((stat, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, scale: 0.8, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.7 + idx * 0.1 }} whileHover={{ y: -5, scale: 1.05 }} className="relative group">
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                                <div className="relative bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 shadow-2xl">
                                    <div className="flex items-center gap-2">
                                        <stat.icon className="w-5 h-5 text-white" />
                                        <span className="text-white font-bold">{stat.value}</span>
                                        <span className="text-slate-300 text-sm">{stat.label}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="max-w-lg">
                        <div className="mb-10">
                            <motion.div
                                initial={{ scale: 0, x: -50 }} animate={{ scale: 1, x: 0 }} transition={{ delay: 0.5, type: 'spring', stiffness: 200 }} whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/30 to-orange-500/30 backdrop-blur-xl px-5 py-3 rounded-full mb-8 border border-amber-500/30 shadow-2xl"
                            >
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                                    <Clock className="w-5 h-5 text-amber-300" />
                                </motion.div>
                                <span className="text-amber-200 text-sm font-bold uppercase tracking-wider">Review In Progress</span>
                                <TrendingUp className="w-5 h-5 text-amber-300" />
                            </motion.div>

                            <motion.h2 className="text-5xl xl:text-6xl font-bold text-white mb-6 leading-[1.1]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                                We're reviewing<br />
                                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">your application.</span>
                            </motion.h2>
                            <motion.p className="text-slate-300 text-xl leading-relaxed font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                                Our team carefully verifies every provider to ensure the highest quality service for our clients. Hang tight!
                            </motion.p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="flex items-center gap-4 text-slate-400 text-sm">
                        <span>&copy; 2025 Hirfati Inc.</span>
                        <span className="w-1 h-1 bg-slate-600 rounded-full" />
                        {['Privacy', 'Terms', 'Support'].map((link) => (
                            <motion.a key={link} href="#" whileHover={{ color: '#fff', scale: 1.05 }} className="hover:text-white transition-colors">{link}</motion.a>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
