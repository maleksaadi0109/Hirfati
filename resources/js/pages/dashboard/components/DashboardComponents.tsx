import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Link } from 'lucide-react';

export const NavItem = ({ icon, label, active, badge, href = "#" }: any) => (
    <a href={href} className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group duration-300 ${active ? 'bg-orange-50 text-orange-600 shadow-sm border border-orange-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}>
        <div className="flex items-center gap-3.5">
            {React.cloneElement(icon, { className: `w-5 h-5 transition-colors duration-300 ${active ? 'text-orange-600' : 'text-slate-400 group-hover:text-slate-600'}` })}
            <span className={`font-semibold text-sm tracking-wide ${active ? 'font-bold' : ''}`}>{label}</span>
        </div>
        {badge && <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-orange-500/30">{badge}</span>}
    </a>
);

export const StatCard = ({ title, value, icon, color, trend, trendUp, delay = 0 }: any) => {
    const colors: any = {
        blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100", hover: "hover:border-blue-200" },
        green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-100", hover: "hover:border-green-200" },
        orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100", hover: "hover:border-orange-200" },
        purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100", hover: "hover:border-purple-200" }
    };

    const theme = colors[color] || colors.blue;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className={`bg-white p-6 rounded-3xl border ${theme.border} ${theme.hover} shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group cursor-pointer`}
        >
            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{title}</p>
                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
                    {trend && (
                        <p className={`text-xs font-bold mt-3 flex items-center gap-1.5 ${trendUp === false ? 'text-red-500 bg-red-50' : 'text-green-600 bg-green-50'} inline-flex px-2 py-1 rounded-lg`}>
                            {trendUp !== undefined && (trendUp === false ? <TrendingUp className="w-3 h-3 rotate-180" /> : <TrendingUp className="w-3 h-3" />)}
                            {trend}
                        </p>
                    )}
                </div>
                <div className={`p-4 rounded-2xl ${theme.bg} ${theme.text} group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                    {React.cloneElement(icon, { className: "w-6 h-6" })}
                </div>
            </div>
            {/* Background decoration */}
            <div className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full ${theme.bg} opacity-50 blur-3xl group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`}></div>
        </motion.div>
    );
};

export const StatusBadge = ({ status }: { status: string }) => {
    const styles: any = {
        "In Progress": "bg-blue-50 text-blue-600 border-blue-100",
        "Completed": "bg-green-50 text-green-600 border-green-100",
        "Pending": "bg-orange-50 text-orange-600 border-orange-100"
    };
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${styles[status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
            {status}
        </span>
    );
};
