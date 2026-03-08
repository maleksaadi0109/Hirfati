import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { CreditCard as CardIcon, Download, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Billing() {
    const [paymentMethods] = useState([
        { id: 1, type: 'visa', last4: '4242', expiry: '12/26', default: true },
        { id: 2, type: 'mastercard', last4: '8899', expiry: '08/25', default: false },
    ]);

    const [invoices] = useState([
        { id: 'INV-001', date: 'Jan 01, 2026', amount: '150.00 LYD', status: 'Paid', service: 'Plumbing Repair' },
        { id: 'INV-002', date: 'Dec 15, 2025', amount: '80.00 LYD', status: 'Paid', service: 'AC Maintenance' },
        { id: 'INV-003', date: 'Nov 20, 2025', amount: '450.00 LYD', status: 'Pending', service: 'Home Painting' },
    ]);

    return (
        <DashboardLayout title="Billing & Payments">
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Billing & Payments</h2>
                        <p className="text-slate-500 dark:text-slate-400">Manage your payment methods and view invoice history.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Payment Methods */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Payment Methods</h3>
                                <button className="flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-lg transition-colors">
                                    <Plus size={16} /> Add New
                                </button>
                            </div>

                            <div className="space-y-4">
                                {paymentMethods.map(method => (
                                    <div key={method.id} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-orange-200 dark:hover:border-orange-900 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-8 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center text-slate-600 font-bold text-xs uppercase overflow-hidden">
                                                {method.type === 'visa' && (
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="w-full h-full object-contain p-1" />
                                                )}
                                                {method.type === 'mastercard' && (
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="w-full h-full object-contain p-1" />
                                                )}
                                                {method.type !== 'visa' && method.type !== 'mastercard' && method.type}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                                                    •••• •••• •••• {method.last4}
                                                    {method.default && (
                                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase">Default</span>
                                                    )}
                                                </p>
                                                <p className="text-xs text-slate-500">Expires {method.expiry}</p>
                                            </div>
                                        </div>
                                        <button className="text-slate-400 hover:text-red-600 transition-colors">remove</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Invoices */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Invoice History</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 font-medium">
                                            <th className="pb-3 pl-2">Invoice ID</th>
                                            <th className="pb-3">Service</th>
                                            <th className="pb-3">Date</th>
                                            <th className="pb-3">Amount</th>
                                            <th className="pb-3">Status</th>
                                            <th className="pb-3 text-right pr-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                        {invoices.map((invoice) => (
                                            <tr key={invoice.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="py-4 pl-2 font-medium text-slate-900 dark:text-white">{invoice.id}</td>
                                                <td className="py-4 text-slate-600 dark:text-slate-300">{invoice.service}</td>
                                                <td className="py-4 text-slate-500">{invoice.date}</td>
                                                <td className="py-4 font-bold text-slate-900 dark:text-white">{invoice.amount}</td>
                                                <td className="py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${invoice.status === 'Paid'
                                                        ? 'bg-green-50 text-green-600 dark:bg-green-900/20'
                                                        : 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20'
                                                        }`}>
                                                        {invoice.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right pr-2">
                                                    <button className="text-slate-400 hover:text-orange-600 transition-colors">
                                                        <Download size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Summary Card */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white text-center relative overflow-hidden shadow-lg">
                            <div className="relative z-10">
                                <p className="text-slate-400 font-medium text-sm mb-1">Total Spent (This Year)</p>
                                <h3 className="text-3xl font-extrabold mb-4">680.00 <span className="text-sm font-medium text-slate-400">LYD</span></h3>
                                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-orange-500 w-3/4 rounded-full"></div>
                                </div>
                                <p className="text-xs text-slate-400">You're a Valued Client!</p>
                            </div>
                        </div>

                        <div className="bg-orange-50 dark:bg-orange-900/10 rounded-3xl p-6 border border-orange-100 dark:border-orange-900/30">
                            <div className="flex gap-3 items-start">
                                <AlertCircle className="shrink-0 text-orange-600 mt-0.5" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Payment Security</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                        All transactions are secured and encrypted. We never store your full credit card details.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
