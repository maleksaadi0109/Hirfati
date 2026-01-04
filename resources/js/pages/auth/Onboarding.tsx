import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase, MapPin, Check,
    ChevronLeft, Building2,
    UserCircle2, Sparkles, ArrowRight,
    User, Award, Star
} from 'lucide-react';
import { Head, router } from '@inertiajs/react';

// --- Types ---
type Role = 'client' | 'professional' | null;

interface FormData {
    firstName: string;
    lastName: string;
    city: string;
    address: string;
    role: Role;
    category: string;
    requestDetails: string;
    profession: string;
    yearsOfExperience: string;
    bio: string;
    referralSource: string;
}

// --- Constants ---
const CITIES = ['Tripoli', 'Benghazi', 'Misrata', 'Zawiya', 'Sabha', 'Tobruk', 'Zliten'];
const REFERRAL_SOURCES = ['Facebook', 'Instagram', 'Friend Recommendation', 'Google Search', 'Advertisement'];
const CATEGORIES = ['Plumbing', 'Electrical', 'Cleaning', 'Painting', 'Carpentry', 'Moving', 'AC Repair', 'General Maintenance'];
const PROFESSIONS = ['Plumber', 'Electrician', 'Cleaner', 'Painter', 'Carpenter', 'Mover', 'AC Technician', 'Handyman'];

export default function Onboarding() {
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [errors, setErrors] = useState<Partial<FormData> & { role?: string }>({});

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        city: '',
        address: '',
        role: null,
        category: '',
        requestDetails: '',
        profession: '',
        yearsOfExperience: '',
        bio: '',
        referralSource: ''
    });

    const totalSteps = 4;

    // --- Handlers ---
    const updateForm = (key: keyof FormData, value: any) => {
        setFormData(prev => {
            const newData = { ...prev, [key]: value };
            if (key === 'role') {
                if (value === 'client') {
                    newData.profession = '';
                    newData.yearsOfExperience = '';
                    newData.bio = '';
                } else {
                    newData.category = '';
                    newData.requestDetails = '';
                }
            }
            return newData;
        });
        if (errors[key] || (key === 'role' && errors.role)) {
            setErrors(prev => ({ ...prev, [key]: undefined, role: undefined }));
        }
    };

    const validateStep = (step: number): boolean => {
        const newErrors: Partial<FormData> & { role?: string } = {};
        let isValid = true;

        if (step === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        } else if (step === 2) {
            if (!formData.city) newErrors.city = 'Please select a city';
        } else if (step === 3) {
            if (!formData.role) {
                newErrors.role = 'Please select a role to continue';
                isValid = false;
            } else if (formData.role === 'client') {
                if (!formData.category) newErrors.category = 'Service category is required';
                if (!formData.requestDetails.trim()) newErrors.requestDetails = 'Please provide some details';
            } else if (formData.role === 'professional') {
                if (!formData.profession) newErrors.profession = 'Profession is required';
                if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of exp. required';
                if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
            }
        } else if (step === 4) {
            if (!formData.referralSource) newErrors.referralSource = 'Please tell us where you heard about us';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            isValid = false;
        }

        return isValid;
    };

    const handleNext = () => {
        if (!validateStep(currentStep)) return;
        if (currentStep < totalSteps) {
            setDirection(1);
            setCurrentStep(c => c + 1);
        } else {
            handleComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setDirection(-1);
            setCurrentStep(c => c - 1);
        }
    };

    const handleComplete = () => {
        localStorage.setItem('herfati_user_data', JSON.stringify(formData));
        localStorage.setItem('herfati_user_role', formData.role || 'client');
        router.visit('/client/dashboard');
    };

    // --- Animation Variants ---
    const slideVariants = {
        enter: (direction: number) => ({ x: direction > 0 ? 20 : -20, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (direction: number) => ({ x: direction < 0 ? 20 : -20, opacity: 0 })
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 font-sans bg-slate-50 selection:bg-orange-200 overflow-hidden relative">
            <Head title="Setup Your Profile - Herfati" />

            {/* Optimized Background - Static gradients are lighter on GPU */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-orange-200/20 rounded-full blur-3xl will-change-transform" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-100/30 rounded-full blur-3xl will-change-transform" />
            </div>

            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 relative z-10 flex flex-col max-h-[90vh]">

                {/* --- Header --- */}
                <div className="px-8 py-6 border-b border-slate-100 bg-white/50 rounded-t-3xl">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20">H</div>
                            <span className="font-bold text-slate-800 text-lg tracking-tight">Herfati</span>
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Step {currentStep} / {totalSteps}
                        </div>
                    </div>

                    {/* Simple, Performance-Friendly Progress Bar */}
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-orange-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                    </div>
                </div>

                {/* --- Content Area --- */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 sm:p-10 relative custom-scrollbar">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentStep}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.2, ease: "easeOut" }} // Faster transition for "snappy" feel
                            className="w-full"
                        >
                            {/* STEP 1: Personal */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Let's start with your name.</h2>
                                        <p className="text-slate-500">How should we address you?</p>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <InputField
                                            label="First Name" value={formData.firstName}
                                            onChange={(val) => updateForm('firstName', val)}
                                            placeholder="e.g. Ahmed" error={errors.firstName} autoFocus
                                        />
                                        <InputField
                                            label="Last Name" value={formData.lastName}
                                            onChange={(val) => updateForm('lastName', val)}
                                            placeholder="e.g. Ali" error={errors.lastName}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: Location */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Where are you located?</h2>
                                        <p className="text-slate-500">To find services nearby.</p>
                                    </div>
                                    <SelectField
                                        label="City" value={formData.city}
                                        onChange={(val) => updateForm('city', val)}
                                        options={CITIES} icon={<Building2 className="w-5 h-5" />}
                                        placeholder="Select city..." error={errors.city}
                                    />
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Address Details <span className="font-normal text-slate-400">(Optional)</span></label>
                                        <textarea
                                            value={formData.address}
                                            onChange={(e) => updateForm('address', e.target.value)}
                                            className="w-full h-28 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                                            placeholder="Neighborhood, street..."
                                        />
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Role */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div className="mb-6">
                                        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">What brings you here?</h2>
                                        <p className="text-slate-500">I want to...</p>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <RoleCard
                                            selected={formData.role === 'client'}
                                            onClick={() => updateForm('role', 'client')}
                                            title="Hire a Pro" subtitle="Find trusted experts"
                                            icon={<UserCircle2 className="w-6 h-6" />}
                                        />
                                        <RoleCard
                                            selected={formData.role === 'professional'}
                                            onClick={() => updateForm('role', 'professional')}
                                            title="Offer Services" subtitle="Find new customers"
                                            icon={<Briefcase className="w-6 h-6" />}
                                        />
                                    </div>
                                    {errors.role && <p className="text-sm text-red-500 font-bold text-center mt-2">{errors.role}</p>}

                                    <AnimatePresence mode="wait">
                                        {formData.role === 'client' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                                className="space-y-4 pt-4 border-t border-slate-100 mt-4"
                                            >
                                                <SelectField
                                                    label="Service Category" value={formData.category}
                                                    onChange={(val) => updateForm('category', val)}
                                                    options={CATEGORIES} placeholder="Select..." error={errors.category}
                                                />
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700 ml-1">Request Details</label>
                                                    <textarea
                                                        value={formData.requestDetails}
                                                        onChange={(e) => updateForm('requestDetails', e.target.value)}
                                                        className={`w-full h-24 px-4 py-3 bg-slate-50 border rounded-xl focus:ring-1 focus:ring-orange-500 outline-none resize-none transition-all font-medium text-slate-900 ${errors.requestDetails ? 'border-red-300' : 'border-slate-200 focus:border-orange-500'}`}
                                                        placeholder="What do you need done?"
                                                    />
                                                    {errors.requestDetails && <p className="text-xs text-red-500 font-bold ml-1">{errors.requestDetails}</p>}
                                                </div>
                                            </motion.div>
                                        )}
                                        {formData.role === 'professional' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                                className="space-y-4 pt-4 border-t border-slate-100 mt-4"
                                            >
                                                <div className="grid grid-cols-2 gap-4">
                                                    <SelectField
                                                        label="Profession" value={formData.profession}
                                                        onChange={(val) => updateForm('profession', val)}
                                                        options={PROFESSIONS} placeholder="Select..." error={errors.profession}
                                                    />
                                                    <InputField
                                                        label="Yrs Exp." type="number" value={formData.yearsOfExperience}
                                                        onChange={(val) => updateForm('yearsOfExperience', val)}
                                                        placeholder="5" error={errors.yearsOfExperience}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700 ml-1">Bio</label>
                                                    <textarea
                                                        value={formData.bio}
                                                        onChange={(e) => updateForm('bio', e.target.value)}
                                                        className={`w-full h-24 px-4 py-3 bg-slate-50 border rounded-xl focus:ring-1 focus:ring-orange-500 outline-none resize-none transition-all font-medium text-slate-900 ${errors.bio ? 'border-red-300' : 'border-slate-200 focus:border-orange-500'}`}
                                                        placeholder="Describe your skills..."
                                                    />
                                                    {errors.bio && <p className="text-xs text-red-500 font-bold ml-1">{errors.bio}</p>}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* STEP 4: Referral */}
                            {currentStep === 4 && (
                                <div className="space-y-6">
                                    <div className="mb-8 text-center">
                                        <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Award className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900">How did you hear about us?</h2>
                                    </div>
                                    <div className="space-y-2">
                                        {REFERRAL_SOURCES.map((source) => (
                                            <button
                                                key={source}
                                                onClick={() => updateForm('referralSource', source)}
                                                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group ${formData.referralSource === source
                                                    ? 'border-orange-500 bg-orange-50 text-orange-900 font-bold'
                                                    : 'border-slate-200 bg-white hover:border-orange-300 hover:bg-slate-50 text-slate-600 font-medium'
                                                    }`}
                                            >
                                                <span>{source}</span>
                                                {formData.referralSource === source && <Check className="w-5 h-5 text-orange-600" />}
                                            </button>
                                        ))}
                                        {errors.referralSource && <p className="text-sm text-center text-red-500 font-bold mt-2">{errors.referralSource}</p>}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* --- Footer --- */}
                <div className="p-6 border-t border-slate-100 bg-white rounded-b-3xl flex justify-between items-center">
                    <button
                        onClick={handleBack} disabled={currentStep === 1}
                        className={`text-sm font-bold flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${currentStep === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                    >
                        <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-slate-900 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
                    >
                        {currentStep === totalSteps ? (
                            <>Finish <Check className="w-4 h-4" /></>
                        ) : (
                            <>Continue <ArrowRight className="w-4 h-4" /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Simplified Components (No motion heavy logic) ---
const InputField = ({ label, value, onChange, placeholder, type = "text", error, autoFocus = false }: any) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>
        <input
            type={type} value={value} onChange={(e) => onChange(e.target.value)}
            className={`w-full h-12 px-4 bg-slate-50 border rounded-xl focus:ring-1 outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium ${error ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-orange-500 focus:ring-orange-500'}`}
            placeholder={placeholder} autoFocus={autoFocus}
        />
        {error && <p className="text-xs text-red-500 font-bold ml-1">{error}</p>}
    </div>
);

const SelectField = ({ label, value, onChange, options, icon, placeholder, error }: any) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>
        <div className="relative">
            {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
            <select
                value={value} onChange={(e) => onChange(e.target.value)}
                className={`w-full h-12 ${icon ? 'pl-12' : 'pl-4'} pr-8 bg-slate-50 border rounded-xl focus:ring-1 outline-none appearance-none transition-all text-slate-900 font-medium cursor-pointer ${error ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-orange-500 focus:ring-orange-500'}`}
            >
                <option value="">{placeholder}</option>
                {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▼</div>
        </div>
        {error && <p className="text-xs text-red-500 font-bold ml-1">{error}</p>}
    </div>
);

const RoleCard = ({ selected, onClick, title, subtitle, icon }: any) => (
    <button
        onClick={onClick}
        className={`p-4 rounded-xl border-2 text-left transition-all ${selected
            ? 'border-orange-500 bg-orange-50 shadow-md'
            : 'border-slate-200 bg-white hover:border-orange-200 hover:bg-slate-50'
            }`}
    >
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${selected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
            {icon}
        </div>
        <h3 className="font-bold text-slate-900 mb-0.5">{title}</h3>
        <p className="text-xs text-slate-500">{subtitle}</p>
    </button>
);
