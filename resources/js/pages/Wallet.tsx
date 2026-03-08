import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { DollarSign, ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon, Download, CreditCard, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Wallet() {
    const transactions = [
        { id: 1, type: 'deposit', title: 'Payment for "Fix Leaking Sink"', date: 'Today, 2:30 PM', amount: '+150.00', status: 'completed' },
        { id: 2, type: 'withdrawal', title: 'Withdrawal to Bank', date: 'Yesterday, 10:00 AM', amount: '-500.00', status: 'completed' },
        { id: 3, type: 'deposit', title: 'Payment for "Wiring"', date: 'Dec 28, 2025', amount: '+320.00', status: 'completed' },
        { id: 4, type: 'pending', title: 'Payment for "AC Repair"', date: 'Dec 25, 2025', amount: '+80.00', status: 'pending' },
    ];

    return (
        <DashboardLayout title="My Wallet">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Wallet & Earnings</h2>
                        <p className="text-slate-500 dark:text-slate-400">Track your income and withdraw funds.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 transition-colors text-sm font-semibold">
                            <Download size={16} />
                            Statement
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20 text-sm font-bold">
                            <ArrowUpRight size={16} />
                            Withdraw Funds
                        </button>
                    </div>
                </div>

                {/* Balance Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-slate-400 font-medium mb-1">Total Balance</p>
                                    <h3 className="text-4xl font-extrabold tracking-tight">1,250.50 <span className="text-lg font-bold text-slate-400">LYD</span></h3>
                                </div>
                                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                    <WalletIcon className="w-6 h-6 text-orange-400" />
                                </div>
                            </div>

                            <div className="mt-8 flex gap-8">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Available to Withdraw</p>
                                    <p className="text-xl font-bold">1,170.50 LYD</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Pending Clearance</p>
                                    <p className="text-xl font-bold text-orange-400">80.00 LYD</p>
                                </div>
                            </div>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3"></div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                                <span className="p-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg"><ArrowDownLeft size={16} /></span>
                                <span className="text-sm font-medium">Income this month</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">+ 2,450.00 LYD</p>
                        </div>
                        <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>
                        <div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                                <span className="p-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg"><ArrowUpRight size={16} /></span>
                                <span className="text-sm font-medium">Withdrawn</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">500.00 LYD</p>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Transactions</h3>
                        <button className="text-sm font-bold text-orange-600 hover:text-orange-700">View All</button>
                    </div>
                    <div>
                        {transactions.map((tx, idx) => (
                            <motion.div
                                key={tx.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between group border-b border-slate-50 last:border-none"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${tx.type === 'deposit' ? 'bg-green-50 text-green-600 dark:bg-green-900/20' :
                                            tx.type === 'withdrawal' ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' :
                                                'bg-orange-50 text-orange-600 dark:bg-orange-900/20'
                                        }`}>
                                        {tx.type === 'deposit' ? <ArrowDownLeft size={20} /> :
                                            tx.type === 'withdrawal' && <ArrowUpRight size={20} /> ||
                                            <CreditCard size={20} />
                                        }
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{tx.title}</p>
                                        <p className="text-xs text-slate-500">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold text-sm ${tx.type === 'withdrawal' ? 'text-slate-900 dark:text-white' : 'text-green-600'
                                        }`}>{tx.amount} LYD</p>
                                    <p className={`text-[10px] font-bold uppercase tracking-wider ${tx.status === 'completed' ? 'text-green-500' : 'text-orange-500'
                                        }`}>{tx.status}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
