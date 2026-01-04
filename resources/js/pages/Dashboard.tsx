import React, { useEffect, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, MessageSquare, Settings,
    ShoppingBag, Search, Bell, LogOut,
    Briefcase, Calendar, Star, User, Menu, X,
    DollarSign
} from 'lucide-react';

import ClientDashboard from './dashboard/ClientDashboard';
import WorkerDashboard from './dashboard/WorkerDashboard';
import { NavItem } from './dashboard/components/DashboardComponents';

export default function Dashboard() {
    // --- State ---
    const [userData, setUserData] = useState<any>(null);
    const [role, setRole] = useState<string>('client');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);

    // --- Effects ---
    useEffect(() => {
        const storedData = localStorage.getItem('herfati_user_data');
        const storedRole = localStorage.getItem('herfati_user_role');

        try {
            if (storedData) {
                setUserData(JSON.parse(storedData));
            } else {
                setUserData({
                    firstName: "Guest",
                    lastName: "User",
                    city: "Tripoli",
                    role: storedRole || "client"
                });
            }
        } catch (e) {
            console.error("Error parsing user data:", e);
            setUserData({ firstName: "Guest", role: "client" });
        }

        setRole(storedRole || 'client');
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('herfati_user_data');
        localStorage.removeItem('herfati_user_role');
        router.visit('/login');
    };

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium animate-pulse">Loading Context...</p>
                </div>
            </div>
        );
    }

    const initials = userData.firstName ? (userData.firstName[0] + (userData.lastName ? userData.lastName[0] : '')).toUpperCase() : 'HE';

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 font-sans flex text-slate-900 selection:bg-orange-100 selection:text-orange-900">
            <Head title="Dashboard - Herfati" />

            {/* --- Mobile Overlay --- */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* --- Sidebar --- */}
            <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/30">
                            <span className="text-xl">H</span>
                        </div>
                        <span className="font-bold text-slate-800 text-xl tracking-tight">Herfati</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto py-4 custom-scrollbar">
                    <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Main Menu</div>
                    <NavItem icon={<LayoutDashboard />} label="Dashboard" active />
                    <NavItem icon={<MessageSquare />} label="Messages" badge={2} />

                    <div className="my-4 border-t border-slate-100 mx-4"></div>
                    <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Workspace</div>

                    {role === 'client' ? (
                        <>
                            <NavItem icon={<ShoppingBag />} label="My Orders" />
                            <NavItem icon={<Search />} label="Find Pros" />
                            <NavItem icon={<User />} label="My Profile" />
                        </>
                    ) : (
                        <>
                            <NavItem icon={<Briefcase />} label="Job Requests" badge={3} />
                            <NavItem icon={<DollarSign />} label="Earnings" />
                            <NavItem icon={<Star />} label="My Reviews" />
                            <NavItem icon={<Calendar />} label="Schedule" />
                        </>
                    )}

                    <div className="my-4 border-t border-slate-100 mx-4"></div>
                    <NavItem icon={<Settings />} label="Settings" />
                </nav>

                <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 rounded-xl transition-all font-medium group">
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden relative">

                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between border-b border-slate-200/60 transition-all">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold text-slate-800">
                                {role === 'professional' ? 'Pro Workspace' : 'Dashboard'}
                            </h1>
                            <p className="text-sm text-slate-500 hidden sm:block">
                                {role === 'professional' ? "Let's get to work!" : "Find services or track orders."}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center bg-slate-100/80 rounded-full px-5 py-2.5 border border-transparent focus-within:border-orange-500/30 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/10 transition-all w-64">
                            <Search className="w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm ml-3 w-full placeholder:text-slate-400 text-slate-700" />
                        </div>

                        <button className="relative p-2.5 text-slate-500 hover:bg-orange-50 hover:text-orange-600 rounded-full transition-colors active:scale-95">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-700 leading-none">{userData.firstName} {userData.lastName}</p>
                                <p className="text-xs text-slate-500 capitalize">{role}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:shadow-lg transition-shadow border-2 border-white">
                                {initials}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-auto p-4 sm:p-8 custom-scrollbar">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-7xl mx-auto space-y-8"
                    >
                        {role === 'client' ? (
                            <ClientDashboard />
                        ) : (
                            <WorkerDashboard isAvailable={isAvailable} setIsAvailable={setIsAvailable} />
                        )}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
