import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, Users, Clock, CheckCircle, XCircle, Eye, FileText,
    ChevronDown, Search, Filter, Mail, Phone, MapPin, Briefcase,
    ArrowLeft, LogOut, Sparkles, AlertTriangle, RefreshCw, Loader2
} from 'lucide-react';

declare function route(name: string, params?: any, absolute?: boolean): string;

interface UserInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
}

interface Craftsman {
    id: number;
    profession: string;
    yearsOfExperience: number | null;
    applicationStatus: string;
    documentUrl: string | null;
    createdAt: string;
    user: UserInfo;
}

function formatExperience(value: number | null): string | null {
    if (value == null) return null;

    const currentYear = new Date().getFullYear();
    if (value > 120 && value <= currentYear) {
        return `${Math.max(0, currentYear - value)} yrs exp.`;
    }

    return `${value} yrs exp.`;
}

const statusColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
    pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    approved: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
    rejected: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
};

export default function AdminCraftsmen() {
    const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending');
    const [search, setSearch] = useState('');
    const [selectedCraftsman, setSelectedCraftsman] = useState<Craftsman | null>(null);
    const [actionLoading, setActionLoading] = useState<number | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const token = localStorage.getItem('access_token') || localStorage.getItem('auth_token') || '';

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const fetchCraftsmen = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/craftsmen?status=${filter}`, { headers });
            const json = await res.json();
            setCraftsmen(json.data || []);
        } catch {
            setCraftsmen([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCraftsmen(); }, [filter]);

    const handleAction = async (id: number, action: 'approve' | 'reject') => {
        setActionLoading(id);
        try {
            const res = await fetch(`/api/admin/craftsmen/${id}/${action}`, {
                method: 'PATCH',
                headers,
            });
            if (res.ok) {
                setSuccessMsg(`Provider ${action}d successfully!`);
                setCraftsmen(prev => prev.filter(c => c.id !== id));
                setSelectedCraftsman(null);
                setTimeout(() => setSuccessMsg(null), 3000);
            }
        } catch {
            // handle error
        } finally {
            setActionLoading(null);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/logout', { method: 'POST', headers });
        } catch { /* ignore */ }
        localStorage.clear();
        window.location.href = '/login';
    };


    const filtered = craftsmen.filter(c => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
            c.user.firstName.toLowerCase().includes(q) ||
            c.user.lastName.toLowerCase().includes(q) ||
            c.user.email.toLowerCase().includes(q) ||
            c.profession.toLowerCase().includes(q)
        );
    });

    const stats = [
        { label: 'Pending', value: filter === 'pending' ? filtered.length : '—', icon: Clock, color: 'from-amber-500 to-amber-600' },
        { label: 'Approved', value: filter === 'approved' ? filtered.length : '—', icon: CheckCircle, color: 'from-green-500 to-green-600' },
        { label: 'Rejected', value: filter === 'rejected' ? filtered.length : '—', icon: XCircle, color: 'from-red-500 to-red-600' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 font-sans">
            <Head title="Admin - Provider Approvals | Hirfati" />

            {/* Top Navigation */}
            <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/60 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-lg ring-2 ring-orange-200">
                                    <img src="/images/hirfati-logo.jpg" alt="Hirfati" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-orange-900 bg-clip-text text-transparent">Hirfati</span>
                                    <span className="text-xs text-orange-600 font-semibold ml-2 bg-orange-50 px-2 py-0.5 rounded-full">Admin</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors text-sm font-semibold px-4 py-2 rounded-xl hover:bg-red-50"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Provider <span className="bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-transparent">Approvals</span>
                    </h1>
                    <p className="text-slate-600 font-medium">Review and manage provider applications</p>
                </motion.div>

                {/* Success Message */}
                <AnimatePresence>
                    {successMsg && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="mb-6 flex items-center gap-3 text-sm font-medium text-green-700 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200 shadow-lg shadow-green-100"
                        >
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            {successMsg}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -3, scale: 1.02 }}
                            className="relative group"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity`} />
                            <div className="relative bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                                        <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                                    </div>
                                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or profession..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl bg-white transition-all text-slate-900 placeholder:text-slate-400 font-medium shadow-sm outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        {['pending', 'approved', 'rejected', 'all'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${filter === status
                                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/30'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                        <button
                            onClick={fetchCraftsmen}
                            className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-orange-600 hover:border-orange-300 transition-all"
                            title="Refresh"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Table / Cards */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                        <span className="ml-3 text-slate-500 font-medium">Loading providers...</span>
                    </div>
                ) : filtered.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm"
                    >
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No providers found</h3>
                        <p className="text-slate-500">No {filter !== 'all' ? filter : ''} provider applications to review.</p>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        {filtered.map((craftsman, idx) => {
                            const colors = statusColors[craftsman.applicationStatus] || statusColors.pending;
                            return (
                                <motion.div
                                    key={craftsman.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            {/* Provider Info */}
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0">
                                                    {craftsman.user.firstName.charAt(0)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="text-lg font-bold text-slate-900 truncate">
                                                            {craftsman.user.firstName} {craftsman.user.lastName}
                                                        </h3>
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} ${colors.border} border`}>
                                                            <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                                                            {craftsman.applicationStatus}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                                        <span className="flex items-center gap-1">
                                                            <Briefcase className="w-4 h-4" />
                                                            {craftsman.profession}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Mail className="w-4 h-4" />
                                                            {craftsman.user.email}
                                                        </span>
                                                        {craftsman.user.city && (
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="w-4 h-4" />
                                                                {craftsman.user.city}
                                                            </span>
                                                        )}
                                                        {formatExperience(craftsman.yearsOfExperience) && (
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="w-4 h-4" />
                                                                {formatExperience(craftsman.yearsOfExperience)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                {craftsman.documentUrl && (
                                                    <a
                                                        href={`/admin/craftsmen/${craftsman.id}`}
                                                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-orange-100 hover:text-orange-700 transition-colors"
                                                        title="View Document"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        View Details
                                                    </a>
                                                )}
                                                {!craftsman.documentUrl && (
                                                    <a
                                                        href={`/admin/craftsmen/${craftsman.id}`}
                                                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-orange-100 hover:text-orange-700 transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        View Details
                                                    </a>
                                                )}

                                                {craftsman.applicationStatus === 'pending' && (
                                                    <>
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleAction(craftsman.id, 'approve')}
                                                            disabled={actionLoading === craftsman.id}
                                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30 transition-all disabled:opacity-60"
                                                        >
                                                            {actionLoading === craftsman.id ? (
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                            ) : (
                                                                <CheckCircle className="w-4 h-4" />
                                                            )}
                                                            Approve
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleAction(craftsman.id, 'reject')}
                                                            disabled={actionLoading === craftsman.id}
                                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30 transition-all disabled:opacity-60"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                            Reject
                                                        </motion.button>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Extra details row */}
                                        <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                                            <span>Applied: {new Date(craftsman.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            {craftsman.user.phoneNumber && (
                                                <span className="flex items-center gap-1">
                                                    <Phone className="w-3 h-3" />
                                                    {craftsman.user.phoneNumber}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
