import React from 'react';
import { Link, router } from '@inertiajs/react';
import {
 LayoutGrid,
 PlusCircle,
 ShoppingBag,
 Search,
 MessageSquare,
 CreditCard,
 Heart,
 User,
 Sparkles,
 LogOut,
 X
} from 'lucide-react';
import { NavItem } from '@/pages/dashboard/components/DashboardComponents';

interface ClientSidebarProps {
 isOpen: boolean;
 setIsOpen: (open: boolean) => void;
 activePath: string;
}

export default function ClientSidebar({ isOpen, setIsOpen, activePath }: ClientSidebarProps) {
 const handleLogout = () => {
 localStorage.removeItem('herfati_user_data');
 localStorage.removeItem('herfati_user_role');
 router.post('/logout');
 };

 return (
 <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white/90 backdrop-blur-xl border-r border-slate-100 shadow-xl lg:shadow-none flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
 {/* Logo Section */}
 <div className="p-8 flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="relative">
 <div className="absolute inset-0 bg-orange-500 blur-sm opacity-50 rounded-xl"></div>
 <img src="/images/hirfati-logo.jpg" alt="Hirfati" className="relative w-10 h-10 rounded-xl object-cover shadow-lg border-2 border-white " />
 </div>
 <div>
 <span className="font-extrabold text-slate-800 text-xl tracking-tight block leading-none">Hirfati</span>
 <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">Client</span>
 </div>
 </div>
 <button onClick={() => setIsOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
 <X className="w-6 h-6" />
 </button>
 </div>

 {/* Navigation */}
 <nav className="flex-1 px-4 space-y-2 overflow-y-auto py-2 custom-scrollbar">
 <div className="px-4 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Menu</div>

 <NavItem
 icon={<LayoutGrid />}
 label="Dashboard"
 href="/client/dashboard"
 active={activePath.includes('/client/dashboard')}
 />

 {/* Post a Job - Standout Item */}
 <NavItem
 icon={<PlusCircle />}
 label="Post a Job"
 href="/jobs/create"
 active={activePath.includes('/jobs/create')}
 />

 <NavItem
 icon={<ShoppingBag />}
 label="My Orders"
 href="/my-orders"
 active={activePath.includes('/my-orders')}
 />

 <NavItem
 icon={<Search />}
 label="Find Pros"
 href="/pros"
 active={activePath.includes('/pros')}
 />

 <NavItem
 icon={<MessageSquare />}
 label="Messages"
 badge={2}
 href="/client/messages"
 active={activePath.includes('/messages')}
 />

 <div className="my-6 border-t border-slate-100 mx-4"></div>
 <div className="px-4 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Account</div>

 <NavItem
 icon={<CreditCard />}
 label="Billing & Payments"
 href="/billing"
 active={activePath.includes('/billing')}
 />

 <NavItem
 icon={<Heart />}
 label="Favorites"
 href="/favorites"
 active={activePath.includes('/favorites')}
 />

 <NavItem
 icon={<User />}
 label="My Profile"
 href="/profile"
 active={activePath.includes('/profile')}
 />
 </nav>

 {/* Bottom Section */}
 <div className="p-4 space-y-4">
 {/* Premium Card */}
 <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden group">
 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-white/20 transition-colors"></div>

 <div className="relative z-10">
 <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm mb-3">
 <Sparkles className="w-5 h-5 text-white" />
 </div>
 <h4 className="font-bold text-lg mb-1">Premium Plan</h4>
 <p className="text-orange-50 text-xs mb-3 font-medium">Get priority support & 0% fees.</p>
 <button className="w-full py-2.5 bg-white text-orange-600 rounded-xl text-xs font-bold hover:bg-orange-50 transition-colors shadow-sm">
 Upgrade Now
 </button>
 </div>
 </div>

 {/* Logout */}
 <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-semibold group border border-transparent hover:border-red-100 ">
 <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
 <span>Sign Out</span>
 </button>
 </div>
 </aside>
 );
}
