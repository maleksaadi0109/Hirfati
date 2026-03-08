import { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
    Search,
    Filter,
    MoreVertical,
    Calendar,
    MapPin,
    DollarSign,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    ChevronRight,
    MessageSquare,
    Eye,
    Briefcase,
    TrendingUp,
    Activity,
    Archive
} from 'lucide-react';

interface Order {
    id: number;
    title: string;
    description: string;
    location: string;
    posted_date: string;
    budget: string;
    status: 'active' | 'in_progress' | 'completed' | 'cancelled';
    proposals_count: number;
    image?: string;
}

export default function MyOrders() {
    const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const mockOrders: Order[] = [
        {
            id: 1,
            title: "Fix leaking kitchen sink",
            description: "Water is dripping constantly from the faucet and the pipe underneath seems loose.",
            location: "Tripoli, Libya",
            posted_date: "2 hours ago",
            budget: "50-100 LYD",
            status: 'active',
            proposals_count: 5,
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Paint User Living Room",
            description: "Need to paint walls and ceiling of a 5x4m room. White color. Paint provided.",
            location: "Benghazi, Libya",
            posted_date: "2 days ago",
            budget: "300 LYD",
            status: 'in_progress',
            proposals_count: 12,
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Electrical Outlet Installation",
            description: "Install 2 new power outlets in the master bedroom.",
            location: "Tripoli, Libya",
            posted_date: "1 month ago",
            budget: "80 LYD",
            status: 'completed',
            proposals_count: 3
        },
        {
            id: 4,
            title: "Garden Cleaning",
            description: "Remove weeds and trim hedges.",
            location: "Tripoli, Libya",
            posted_date: "3 months ago",
            budget: "150 LYD",
            status: 'cancelled',
            proposals_count: 0
        }
    ];

    const filteredOrders = useMemo(() => {
        return mockOrders.filter(order => {
            const matchesSearch = order.title.toLowerCase().includes(searchQuery.toLowerCase());
            if (activeTab === 'all') return matchesSearch;
            if (activeTab === 'active') return matchesSearch && (order.status === 'active' || order.status === 'in_progress');
            if (activeTab === 'completed') return matchesSearch && (order.status === 'completed' || order.status === 'cancelled');
            return matchesSearch;
        });
    }, [activeTab, searchQuery]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'in_progress': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'completed': return 'bg-slate-100 text-slate-700 border-slate-200';
            case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    const getStatusLabel = (status: string) => {
        return status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1);
    };

    // Stats calculation
    const activeCount = useMemo(() => mockOrders.filter(o => o.status === 'active' || o.status === 'in_progress').length, []);
    const completedCount = useMemo(() => mockOrders.filter(o => o.status === 'completed').length, []);
    const totalSpent = "380 LYD"; // Mock total

    return (
        <DashboardLayout title="My Orders">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* 1. Hero / Header Section */}
                <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-xl p-8 md:p-12">
                    {/* Background decoration - Reduced blur for performance */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-orange-500 rounded-full blur-[60px] opacity-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-500 rounded-full blur-[60px] opacity-5 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-orange-400 text-xs font-bold mb-4 uppercase tracking-wider">
                                <Activity size={12} />
                                Manage Requests
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                                My Orders
                            </h1>
                            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                                Track your service requests, manage proposals from workers, and view your history all in one place.
                            </p>
                        </div>
                        <Link
                            href="/orders/create"
                            className="group flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95"
                        >
                            <span className="bg-white/20 p-1 rounded-lg"><TrendingUp size={18} /></span>
                            <span>Post New Request</span>
                        </Link>
                    </div>
                </div>

                {/* 2. Quick Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 relative overflow-hidden group">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 relative z-10 text-2xl">
                            <Activity size={32} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-slate-500 font-medium text-sm">Active Requests</p>
                            <h3 className="text-3xl font-extrabold text-slate-900">{activeCount}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 relative overflow-hidden group">
                        <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 relative z-10 text-2xl">
                            <CheckCircle size={32} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-slate-500 font-medium text-sm">Completed Jobs</p>
                            <h3 className="text-3xl font-extrabold text-slate-900">{completedCount}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 relative overflow-hidden group">
                        <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 relative z-10 text-2xl">
                            <DollarSign size={32} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-slate-500 font-medium text-sm">Total Spent</p>
                            <h3 className="text-3xl font-extrabold text-slate-900">{totalSpent}</h3>
                        </div>
                    </div>
                </div>

                {/* 3. Main Content Area */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden">

                    {/* Toolbar */}
                    <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 justify-between items-center bg-white sticky top-0 z-20">
                        {/* Custom Tab Switcher */}
                        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto">
                            {[
                                { id: 'all', label: 'All Orders' },
                                { id: 'active', label: 'Active' },
                                { id: 'completed', label: 'History' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-200 flex-1 md:flex-none ${activeTab === tab.id
                                            ? 'bg-white text-slate-900 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-96 group">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by title, listing ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="p-6 md:p-8 space-y-6 bg-slate-50/30 min-h-[500px]">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map(order => (
                                <div key={order.id} className="bg-white rounded-3xl border border-slate-100 p-2 shadow-sm hover:shadow-md transition-shadow duration-200 group">
                                    <div className="flex flex-col md:flex-row gap-2">

                                        {/* Image Section */}
                                        <div className="w-full md:w-64 h-48 md:h-auto rounded-[1.25rem] overflow-hidden shrink-0 relative bg-slate-200">
                                            {order.image ? (
                                                <img src={order.image} alt={order.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                                                    <Briefcase size={40} className="opacity-50" />
                                                </div>
                                            )}
                                            {/* Status Badge overlay - Removed backdrop-blur */}
                                            <div className="absolute top-3 left-3 flex gap-2">
                                                <div className={`px-4 py-1.5 rounded-full text-xs font-bold border shadow-sm flex items-center gap-1.5 ${getStatusColor(order.status)} bg-white`}>
                                                    <div className={`w-2 h-2 rounded-full ${order.status === 'active' ? 'bg-emerald-500' : 'bg-current'}`}></div>
                                                    {getStatusLabel(order.status)}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <span className="text-slate-400 text-xs font-bold tracking-wider uppercase mb-1 block">#{order.id.toString().padStart(6, '0')}</span>
                                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors cursor-pointer line-clamp-1">
                                                            {order.title}
                                                        </h3>
                                                    </div>
                                                    <button className="text-slate-300 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-full">
                                                        <MoreVertical size={20} />
                                                    </button>
                                                </div>

                                                <p className="text-slate-500 leading-relaxed mb-6 line-clamp-2">
                                                    {order.description}
                                                </p>

                                                <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
                                                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                        <Calendar size={16} className="text-slate-400" />
                                                        <span>{order.posted_date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                        <MapPin size={16} className="text-slate-400" />
                                                        <span>{order.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                        <DollarSign size={16} className="text-slate-400" />
                                                        <span>Budget: <span className="text-slate-900 font-bold">{order.budget}</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Section */}
                                        <div className="p-4 md:p-6 md:border-l border-slate-100 flex md:flex-col justify-center gap-3 md:w-48 bg-slate-50 rounded-b-[1.25rem] md:rounded-r-[1.25rem] md:rounded-bl-none">
                                            {order.status === 'active' || order.status === 'in_progress' ? (
                                                <button className="flex-1 p-4 bg-orange-500 text-white rounded-2xl font-bold shadow-md hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5 transition-all text-center flex flex-col items-center justify-center gap-1">
                                                    <span className="text-2xl">{order.proposals_count}</span>
                                                    <span className="text-xs opacity-90 font-medium uppercase tracking-wide">Proposals</span>
                                                </button>
                                            ) : (
                                                <div className="flex-1 p-4 bg-slate-200 text-slate-500 rounded-2xl font-bold text-center flex flex-col items-center justify-center gap-1 cursor-default">
                                                    <span className="text-2xl">-</span>
                                                    <span className="text-xs opacity-90 font-medium uppercase tracking-wide">Closed</span>
                                                </div>
                                            )}

                                            <button className="flex-1 md:flex-none p-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                                                <span>Details</span>
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                    <Archive size={40} className="text-slate-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">No orders found</h3>
                                <p className="text-slate-500 max-w-sm mx-auto mb-8">We couldn't find any orders matching your criteria. Try adjusting your filters or post a new request.</p>
                                <button onClick={() => { setSearchQuery(''); setActiveTab('all') }} className="text-orange-600 font-bold hover:underline">
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
