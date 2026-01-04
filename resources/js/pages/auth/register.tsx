import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Mail, Lock, Eye, EyeOff, Sparkles, Shield, Users, Star, Award, CheckCircle, TrendingUp, Zap, User } from 'lucide-react';
import InputError from '@/components/input-error';

// Helper declaration for Ziggy routes
declare function route(name: string, params?: any, absolute?: boolean): string;

// Enhanced 3D Floating Shapes Component
const FloatingShapes = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Large animated gradient orbs */}
            <motion.div
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -80, 80, 0],
                    scale: [1, 1.3, 0.9, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{ willChange: 'transform' }}
                className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/40 to-pink-500/40 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x: [0, -120, 80, 0],
                    y: [0, 100, -60, 0],
                    scale: [1, 1.2, 1.1, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{ willChange: 'transform' }}
                className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x: [0, 60, -80, 0],
                    y: [0, -100, 50, 0],
                    scale: [1, 1.4, 0.8, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{ willChange: 'transform' }}
                className="absolute bottom-20 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-yellow-500/25 to-orange-500/25 rounded-full blur-3xl"
            />

            {/* Floating geometric shapes with 3D effect */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        rotate: [0, 360],
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 8 + Math.random() * 12,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeInOut"
                    }}
                >
                    <div
                        className={`${i % 3 === 0
                            ? 'bg-gradient-to-br from-orange-400/30 to-pink-400/30'
                            : i % 3 === 1
                                ? 'bg-gradient-to-br from-blue-400/30 to-purple-400/30'
                                : 'bg-gradient-to-br from-yellow-400/30 to-orange-400/30'
                            } ${i % 2 === 0 ? 'rounded-full' : 'rounded-lg rotate-45'} shadow-2xl`}
                        style={{
                            width: `${20 + Math.random() * 60}px`,
                            height: `${20 + Math.random() * 60}px`,
                        }}
                    />
                </motion.div>
            ))}

            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>
        </div>
    );
};

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] } }
};

const scaleIn = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
};

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // 3D tilt effect for form
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

    const springConfig = { stiffness: 150, damping: 20 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    useEffect(() => {
        let rect: DOMRect | undefined;
        const updateRect = () => {
            rect = document.getElementById('register-form')?.getBoundingClientRect();
        };

        // Update rect initially and on resize
        updateRect();
        window.addEventListener('resize', updateRect);

        const handleMouseMove = (e: globalThis.MouseEvent) => {
            if (!rect) return;
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            mouseX.set(e.clientX - centerX);
            mouseY.set(e.clientY - centerY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', updateRect);
        };
    }, [mouseX, mouseY]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-slate-50 via-white to-orange-50/30 font-sans selection:bg-orange-200 relative">
            <Head title="Sign Up - Hirfati" />

            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.015]">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Left Side - Enhanced Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 lg:p-16 xl:p-24 relative z-10 bg-white min-h-screen">
                <motion.div
                    id="register-form"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    style={{
                        perspective: '1000px',
                    }}
                    className="max-w-md mx-auto w-full py-10"
                >
                    {/* Enhanced Logo & Back Link */}
                    <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
                        <Link href="/" className="flex items-center gap-3 group">
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                                <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-xl ring-2 ring-orange-200 group-hover:ring-orange-400 transition-all">
                                    <img
                                        src="/images/hirfati-logo.jpg"
                                        alt="Hirfati Logo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>
                            <div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-orange-900 bg-clip-text text-transparent tracking-tight">
                                    Hirfati
                                </span>
                                <div className="text-[10px] text-orange-600 font-semibold -mt-0.5">حرفتي</div>
                            </div>
                        </Link>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-all group text-sm font-semibold bg-gradient-to-br from-slate-50 to-slate-100 hover:from-orange-50 hover:to-orange-100 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-orange-200 shadow-sm hover:shadow-md"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span>Back</span>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Enhanced Header */}
                    <motion.div variants={fadeInLeft} className="mb-8">
                        <motion.div
                            className="flex items-center gap-3 mb-6"
                            initial={{ width: 0 }}
                            animate={{ width: 'auto' }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <div className="h-1 w-12 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 rounded-full shadow-lg shadow-orange-500/50" />
                            <span className="text-orange-600 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Start your journey
                            </span>
                        </motion.div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight leading-[1.1]">
                            Create your<br />
                            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                                account
                            </span>
                        </h1>
                        <p className="text-slate-600 text-lg font-medium">
                            Join thousands of professionals and grow your business today.
                        </p>
                    </motion.div>

                    {/* Enhanced Form with 3D effect */}
                    <motion.form
                        variants={scaleIn}
                        onSubmit={submit}
                        className="space-y-5"
                        style={{
                            rotateX: rotateXSpring,
                            rotateY: rotateYSpring,
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {/* Name Field */}
                        <motion.div
                            className="space-y-2"
                            whileHover={{ z: 20 }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <Label htmlFor="name" className="text-slate-700 font-bold text-sm flex items-center gap-2">
                                <User className="w-4 h-4 text-orange-500" />
                                Full Name
                            </Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    >
                                        <User className="w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                                    </motion.div>
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="w-full h-14 pl-12 pr-4 border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl bg-white transition-all text-slate-900 placeholder:text-slate-400 font-medium shadow-sm hover:shadow-md focus:shadow-lg outline-none"
                                    autoComplete="name"
                                    autoFocus
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <InputError message={errors.name} />
                        </motion.div>

                        {/* Email Field */}
                        <motion.div
                            className="space-y-2"
                            whileHover={{ z: 20 }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <Label htmlFor="email" className="text-slate-700 font-bold text-sm flex items-center gap-2">
                                <Mail className="w-4 h-4 text-orange-500" />
                                Email Address
                            </Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    >
                                        <Mail className="w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                                    </motion.div>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full h-14 pl-12 pr-4 border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl bg-white transition-all text-slate-900 placeholder:text-slate-400 font-medium shadow-sm hover:shadow-md focus:shadow-lg outline-none"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            <InputError message={errors.email} />
                        </motion.div>

                        {/* Password Field */}
                        <motion.div
                            className="space-y-2"
                            whileHover={{ z: 20 }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <Label htmlFor="password" className="text-slate-700 font-bold text-sm flex items-center gap-2">
                                <Lock className="w-4 h-4 text-orange-500" />
                                Password
                            </Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                    <Lock className="w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    className="w-full h-14 pl-12 pr-12 border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl bg-white transition-all text-slate-900 placeholder:text-slate-400 font-medium shadow-sm hover:shadow-md focus:shadow-lg outline-none"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowPassword(!showPassword);
                                    }}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center z-50 cursor-pointer text-slate-400 hover:text-orange-600 transition-colors"
                                    style={{ transform: 'translateZ(10px)' }}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <InputError message={errors.password} />
                        </motion.div>

                        {/* Confirm Password Field */}
                        <motion.div
                            className="space-y-2"
                            whileHover={{ z: 20 }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <Label htmlFor="password_confirmation" className="text-slate-700 font-bold text-sm flex items-center gap-2">
                                <Shield className="w-4 h-4 text-orange-500" />
                                Confirm Password
                            </Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                    <Lock className="w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                                </div>
                                <input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="w-full h-14 pl-12 pr-12 border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl bg-white transition-all text-slate-900 placeholder:text-slate-400 font-medium shadow-sm hover:shadow-md focus:shadow-lg outline-none"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowConfirmPassword(!showConfirmPassword);
                                    }}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center z-50 cursor-pointer text-slate-400 hover:text-orange-600 transition-colors"
                                    style={{ transform: 'translateZ(10px)' }}
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <InputError message={errors.password_confirmation} />
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                            whileHover={{ scale: 1.02, z: 30 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="pt-2"
                        >
                            <Button
                                disabled={processing}
                                className="relative w-full h-14 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 hover:from-orange-700 hover:via-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-xl shadow-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/50 transition-all text-lg disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {processing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Creating account...
                                        </>
                                    ) : (
                                        <>
                                            Sign Up
                                            <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                                {/* Animated gradient overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600"
                                    initial={{ x: '100%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                {/* Shine effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                    style={{ transform: 'skewX(-20deg)' }}
                                />
                            </Button>
                        </motion.div>

                        {/* Login Link */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-slate-500 font-semibold">Already have an account?</span>
                            </div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href={route('onboarding')}
                                className="group relative w-full h-14 flex items-center justify-center border-2 border-slate-200 hover:border-orange-300 text-slate-700 hover:text-orange-600 font-bold rounded-xl transition-all hover:bg-gradient-to-br from-orange-50 to-pink-50 shadow-sm hover:shadow-lg overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Sign In
                                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                </span>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                            </Link>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>

            {/* Right Side - Enhanced 3D Visuals */}
            <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden sticky top-0 h-screen">
                {/* 3D Background */}
                <div className="absolute inset-0">
                    <FloatingShapes />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-orange-900/40 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-600/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-12 xl:p-20 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center gap-4 flex-wrap"
                    >
                        {[
                            { icon: Users, value: '10K+', label: 'Users', color: 'from-orange-400 to-orange-600' },
                            { icon: Shield, value: 'Secure', label: 'Platform', color: 'from-green-400 to-green-600' },
                            { icon: Star, value: '4.9/5', label: 'Rating', color: 'from-yellow-400 to-yellow-600' }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.7 + idx * 0.1 }}
                                whileHover={{ y: -5, scale: 1.05 }}
                                className="relative group"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
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

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="max-w-lg"
                    >
                        <div className="mb-10">
                            <motion.div
                                initial={{ scale: 0, x: -50 }}
                                animate={{ scale: 1, x: 0 }}
                                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                                whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/30 to-pink-500/30 backdrop-blur-xl px-5 py-3 rounded-full mb-8 border border-orange-500/30 shadow-2xl"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                    <Sparkles className="w-5 h-5 text-orange-300" />
                                </motion.div>
                                <span className="text-orange-200 text-sm font-bold uppercase tracking-wider">Libya's #1 Service Platform</span>
                                <TrendingUp className="w-5 h-5 text-orange-300" />
                            </motion.div>

                            <motion.h2
                                className="text-5xl xl:text-6xl font-bold text-white mb-6 leading-[1.1]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                Join the elite.<br />
                                <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">
                                    Start today.
                                </span>
                            </motion.h2>

                            <motion.p
                                className="text-slate-300 text-xl leading-relaxed font-medium"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                Connect with top clients, showcase your skills, and take your career to new heights with Hirfati.
                            </motion.p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 }}
                        className="flex items-center gap-4 text-slate-400 text-sm"
                    >
                        <span>&copy; 2025 Hirfati Inc.</span>
                        <span className="w-1 h-1 bg-slate-600 rounded-full" />
                        {['Privacy', 'Terms', 'Support'].map((link, idx) => (
                            <motion.a
                                key={link}
                                href="#"
                                whileHover={{ color: '#fff', scale: 1.05 }}
                                className="hover:text-white transition-colors"
                            >
                                {link}
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
