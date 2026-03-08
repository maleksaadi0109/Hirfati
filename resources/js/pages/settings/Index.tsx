import { useState } from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
    User,
    Lock,
    Bell,
    CreditCard,
    Globe,
    Shield,
    Mail,
    Smartphone,
    Save,
    CheckCircle
} from 'lucide-react';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('account');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock form handlers
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 800);
    };

    const tabs = [
        { id: 'account', label: 'Account', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
    ];

    return (
        <DashboardLayout title="Settings">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
                    <p className="text-slate-500 mt-2">Manage your account preferences and configurations.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Settings Sidebar */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <nav className="space-y-2 lg:sticky lg:top-32">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm ${activeTab === tab.id
                                            ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                >
                                    <tab.icon size={18} />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 min-h-[600px] relative">

                        {/* Success Notification */}
                        {showSuccess && (
                            <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2 fade-in">
                                <CheckCircle size={18} /> Saved Successfully
                            </div>
                        )}

                        {/* ACCOUNT SETTINGS */}
                        {activeTab === 'account' && (
                            <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <User className="text-orange-500" /> Public Profile
                                </h2>

                                <form onSubmit={handleSave} className="space-y-6">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="relative group cursor-pointer">
                                            <img
                                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                                alt="Avatar"
                                                className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 shadow-sm group-hover:brightness-75 transition-all"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 font-bold text-xs pointer-events-none">Change</div>
                                        </div>
                                        <div>
                                            <button type="button" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors mb-2">
                                                Upload New
                                            </button>
                                            <p className="text-xs text-slate-400">JPG, GIF or PNG. 1MB max.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                                            <input type="text" defaultValue="Ali" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                                            <input type="text" defaultValue="Ahmed" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Headline</label>
                                        <input type="text" defaultValue="Client at Hirfati" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Bio</label>
                                        <textarea rows={4} defaultValue="Looking for professional services for my home renovation projects." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium resize-none"></textarea>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100">
                                        <button
                                            disabled={isLoading}
                                            className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <Save size={18} />}
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* SECURITY SETTINGS */}
                        {activeTab === 'security' && (
                            <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Lock className="text-orange-500" /> Security
                                </h2>

                                <div className="space-y-8">
                                    <form onSubmit={handleSave} className="space-y-6">
                                        <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Change Password</h3>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                                            <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                                                <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
                                                <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all" />
                                            </div>
                                        </div>
                                        <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
                                            Update Password
                                        </button>
                                    </form>

                                    <div className="pt-6 border-t border-slate-100">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-slate-800">Two-Factor Authentication</h3>
                                                <p className="text-sm text-slate-500 mt-1">Add an extra layer of security to your account.</p>
                                            </div>
                                            <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all">
                                                Enable 2FA
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* NOTIFICATIONS SETTINGS */}
                        {activeTab === 'notifications' && (
                            <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Bell className="text-orange-500" /> Notifications
                                </h2>

                                <div className="space-y-6">
                                    {[
                                        { title: "New Job Recommendations", desc: "Get notified when new jobs match your skills.", icon: BriefcaseIcon },
                                        { title: "Messages", desc: "Receive emails when you get a new message.", icon: Mail },
                                        { title: "Platform Updates", desc: "News about features and updates.", icon: Globe },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-white rounded-lg shadow-sm text-slate-500">
                                                    <item.icon size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                                                    <p className="text-xs text-slate-500">{item.desc}</p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* BILLING SETTINGS */}
                        {activeTab === 'billing' && (
                            <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <CreditCard className="text-orange-500" /> Billing & Plans
                                </h2>

                                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white mb-8 shadow-xl shadow-slate-900/10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Current Plan</p>
                                            <h3 className="text-2xl font-bold">Free Plan</h3>
                                        </div>
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/20">Active</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-orange-500/20">
                                            Upgrade to Pro
                                        </button>
                                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors">
                                            Manage Billing
                                        </button>
                                    </div>
                                </div>

                                <h3 className="font-bold text-slate-800 mb-4">Payment Methods</h3>
                                <div className="border border-slate-200 rounded-2xl p-4 flex items-center gap-4 bg-slate-50/50">
                                    <div className="w-12 h-8 bg-white rounded border border-slate-200 flex items-center justify-center">
                                        <CreditCard size={18} className="text-slate-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800 text-sm">•••• •••• •••• 4242</p>
                                        <p className="text-xs text-slate-500">Expires 12/25</p>
                                    </div>
                                    <button className="text-red-500 text-xs font-bold hover:underline">Remove</button>
                                </div>
                                <button className="mt-4 text-orange-600 text-sm font-bold hover:underline flex items-center gap-1">
                                    + Add Payment Method
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

// Helper icon import to avoid complexity in array
import { Briefcase as BriefcaseIcon } from 'lucide-react';
