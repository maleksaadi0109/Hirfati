import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Award,
    Check,
    ChevronRight,
    Droplets,
    Filter,
    Heart,
    Home,
    MapPin,
    MessageSquare,
    Search,
    Shield,
    Star,
    Wind,
    Zap,
    type LucideIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';

interface Pro {
    id: number;
    name: string;
    role: string;
    avatar: string;
    rating: number;
    reviews: number;
    hourly_rate: number;
    location: string;
    verified: boolean;
    skills: string[];
    completed_jobs: number;
}

interface Category {
    label: string;
    icon: LucideIcon;
    tone: string;
}

const CATEGORIES: Category[] = [
    { label: 'All', icon: Award, tone: 'text-slate-600 bg-slate-100' },
    { label: 'Electricity', icon: Zap, tone: 'text-amber-600 bg-amber-100' },
    { label: 'Plumbing', icon: Droplets, tone: 'text-sky-600 bg-sky-100' },
    { label: 'Cleaning', icon: Home, tone: 'text-emerald-600 bg-emerald-100' },
    { label: 'AC Repair', icon: Wind, tone: 'text-orange-600 bg-orange-100' },
];

const pros: Pro[] = [
    {
        id: 1,
        name: 'Ahmed Ben Ali',
        role: 'Electricity',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
        rating: 4.9,
        reviews: 124,
        hourly_rate: 45,
        location: 'Tripoli, Libya',
        verified: true,
        skills: ['Wiring', 'Smart Home', 'Lighting'],
        completed_jobs: 312,
    },
    {
        id: 2,
        name: 'Sarah Mahmoud',
        role: 'Cleaning',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        rating: 4.8,
        reviews: 89,
        hourly_rate: 60,
        location: 'Benghazi, Libya',
        verified: true,
        skills: ['Deep Cleaning', 'Eco-friendly', 'Organizing'],
        completed_jobs: 145,
    },
    {
        id: 3,
        name: 'Omar Khaled',
        role: 'Plumbing',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
        rating: 4.6,
        reviews: 56,
        hourly_rate: 35,
        location: 'Tripoli, Libya',
        verified: false,
        skills: ['Pipe Repair', 'Installation', 'Maintenance'],
        completed_jobs: 98,
    },
    {
        id: 4,
        name: 'Khaled Yousef',
        role: 'AC Repair',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled',
        rating: 5.0,
        reviews: 210,
        hourly_rate: 55,
        location: 'Misrata, Libya',
        verified: true,
        skills: ['Split AC', 'Central Cooling', 'Gas Refill'],
        completed_jobs: 500,
    },
];

export default function FindPros() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredPros = useMemo(() => {
        return pros.filter((pro) => {
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                pro.name.toLowerCase().includes(query) ||
                pro.role.toLowerCase().includes(query) ||
                pro.skills.some((skill) => skill.toLowerCase().includes(query));
            const matchesCategory =
                selectedCategory === 'All'
                    ? true
                    : pro.role === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const avgRating = useMemo(() => {
        if (!pros.length) return '0.0';
        const total = pros.reduce((sum, pro) => sum + pro.rating, 0);
        return (total / pros.length).toFixed(1);
    }, []);

    const verifiedCount = useMemo(
        () => pros.filter((pro) => pro.verified).length,
        [],
    );

    return (
        <DashboardLayout title="Find Professionals">
            <Head title="Find Professionals" />

            <div className="mx-auto max-w-7xl space-y-10">
                <section className="relative overflow-hidden rounded-[2.4rem] border border-orange-100/70 bg-gradient-to-br from-white via-orange-50/40 to-amber-50/55 p-5 shadow-[0_28px_70px_-45px_rgba(234,88,12,0.5)] sm:p-7 lg:p-10">
                    <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-orange-300/20 blur-3xl" />
                    <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />

                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: -14 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-black tracking-[0.14em] text-orange-600 uppercase shadow-sm"
                        >
                            <Zap className="h-4 w-4" />
                            Discover Verified Pros
                        </motion.div>

                        <div className="mt-5 grid items-end gap-8 lg:grid-cols-[1.18fr_0.82fr]">
                            <div>
                                <h1 className="text-3xl leading-tight font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                                    Find the perfect{' '}
                                    <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                                        Pro
                                    </span>{' '}
                                    for your home
                                </h1>
                                <p className="mt-4 max-w-2xl text-sm leading-7 font-medium text-slate-600 sm:text-base">
                                    Browse trusted local professionals, compare
                                    ratings, and book with confidence in
                                    minutes.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                <StatCard
                                    value={pros.length.toString()}
                                    label="Available"
                                />
                                <StatCard
                                    value={avgRating}
                                    label="Avg rating"
                                />
                                <StatCard
                                    value={verifiedCount.toString()}
                                    label="Verified"
                                />
                            </div>
                        </div>

                        <div className="mt-8 rounded-[2rem] border border-white/80 bg-white/90 p-2.5 shadow-[0_24px_55px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                <div className="flex flex-1 items-center gap-3 rounded-[1.2rem] px-3 py-2.5 sm:px-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                        <Search className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search by service, skill, or professional name"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="h-11 w-full border-none bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0 sm:text-base"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="inline-flex h-12 items-center justify-center rounded-[1rem] bg-slate-900 px-7 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-orange-600 sm:h-13 sm:px-9"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3 overflow-x-auto pb-1">
                            {CATEGORIES.map((category) => {
                                const Icon = category.icon;
                                const active =
                                    selectedCategory === category.label;

                                return (
                                    <button
                                        key={category.label}
                                        type="button"
                                        onClick={() =>
                                            setSelectedCategory(category.label)
                                        }
                                        className={`inline-flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-bold transition-all ${
                                            active
                                                ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                                : 'border-white/70 bg-white/90 text-slate-600 shadow-sm hover:border-orange-200 hover:bg-orange-50/70'
                                        }`}
                                    >
                                        <span
                                            className={`rounded-lg p-1.5 ${
                                                active
                                                    ? 'bg-white/10 text-white'
                                                    : category.tone
                                            }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        {category.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_-40px_rgba(15,23,42,0.5)] sm:p-7">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-black text-slate-900">
                                    Filters
                                </h3>
                                <Filter className="h-5 w-5 text-slate-400" />
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="text-xs font-black tracking-[0.18em] text-slate-400 uppercase">
                                        Budget Range
                                    </label>
                                    <div className="mt-3 space-y-2">
                                        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                                            <span>20 LYD</span>
                                            <span>200 LYD</span>
                                        </div>
                                        <input
                                            type="range"
                                            className="w-full accent-orange-500"
                                        />
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100" />

                                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3">
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                        <Shield className="h-4 w-4 text-orange-500" />
                                        Verified only
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="h-5 w-5 rounded accent-orange-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 p-6 text-white shadow-[0_24px_60px_-26px_rgba(234,88,12,0.75)] sm:p-7">
                            <div className="absolute -top-10 -right-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
                            <div className="relative z-10">
                                <h3 className="text-xl font-black">
                                    Hirfati Premium
                                </h3>
                                <p className="mt-3 text-sm leading-6 font-medium text-orange-50">
                                    Get priority access to top-rated
                                    professionals and faster response windows.
                                </p>
                                <button
                                    type="button"
                                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-black text-orange-600 shadow-lg shadow-orange-900/20 transition-transform hover:-translate-y-0.5"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </aside>

                    <div className="space-y-6 lg:col-span-3">
                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 shadow-sm sm:px-5">
                            <h2 className="text-base font-black text-slate-900 sm:text-lg">
                                {filteredPros.length} Professionals Found
                            </h2>
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 sm:text-sm">
                                Sort by
                                <span className="text-slate-900">
                                    Top Rated
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {filteredPros.length ? (
                                filteredPros.map((pro, idx) => (
                                    <motion.article
                                        key={pro.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.35,
                                            delay: idx * 0.06,
                                        }}
                                        className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_24px_55px_-40px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-200 hover:shadow-[0_28px_65px_-35px_rgba(234,88,12,0.3)] sm:p-6"
                                    >
                                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,146,60,0.16),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(253,186,116,0.14),_transparent_34%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                        {pro.verified && (
                                            <div className="absolute top-5 right-5 z-10 rounded-xl bg-sky-500 p-1.5 text-white shadow-lg shadow-sky-500/25">
                                                <Check
                                                    className="h-3.5 w-3.5"
                                                    strokeWidth={4}
                                                />
                                            </div>
                                        )}

                                        <div className="relative flex items-start gap-4">
                                            <div className="relative">
                                                <img
                                                    src={pro.avatar}
                                                    alt={pro.name}
                                                    className="h-20 w-20 rounded-[1.2rem] border border-slate-200 bg-slate-50 object-cover"
                                                />
                                                <div className="absolute -right-2 -bottom-2 inline-flex items-center gap-1 rounded-lg border border-slate-100 bg-white px-2 py-1 shadow-sm">
                                                    <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                                                    <span className="text-[10px] font-black text-slate-800">
                                                        {pro.rating}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate text-lg font-black text-slate-900 transition-colors group-hover:text-orange-600">
                                                    {pro.name}
                                                </h3>
                                                <div className="mt-1 inline-flex items-center rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-bold tracking-wide text-orange-600 uppercase">
                                                    {pro.role}
                                                </div>
                                                <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    {pro.location}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="relative mt-5 flex flex-wrap gap-1.5">
                                            {pro.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-500"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="relative mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
                                            <div className="text-center">
                                                <div className="text-lg font-black text-slate-900">
                                                    {pro.completed_jobs}
                                                </div>
                                                <div className="text-[10px] font-bold tracking-wide text-slate-400 uppercase">
                                                    Jobs done
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-lg font-black text-slate-900">
                                                    {pro.hourly_rate} LYD
                                                </div>
                                                <div className="text-[10px] font-bold tracking-wide text-slate-400 uppercase">
                                                    Rate / hr
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative mt-5 flex gap-2.5 sm:gap-3">
                                            <button
                                                type="button"
                                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition-all hover:bg-orange-600"
                                            >
                                                View Profile
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                                            >
                                                <MessageSquare className="h-4.5 w-4.5" />
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                                            >
                                                <Heart className="h-4.5 w-4.5" />
                                            </button>
                                        </div>

                                        <div className="relative mt-3 text-xs font-medium text-slate-400">
                                            {pro.reviews} reviews
                                        </div>
                                    </motion.article>
                                ))
                            ) : (
                                <div className="col-span-full rounded-[2rem] border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                        <Search className="h-8 w-8" />
                                    </div>
                                    <h3 className="mt-5 text-xl font-black text-slate-900">
                                        No pros found
                                    </h3>
                                    <p className="mt-2 text-sm font-medium text-slate-500">
                                        Try another keyword or change your
                                        category.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
}

function StatCard({ value, label }: { value: string; label: string }) {
    return (
        <div className="rounded-2xl border border-white/80 bg-white/85 p-3 text-center shadow-sm sm:p-4">
            <div className="text-xl font-black text-slate-900 sm:text-2xl">
                {value}
            </div>
            <div className="text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase">
                {label}
            </div>
        </div>
    );
}
