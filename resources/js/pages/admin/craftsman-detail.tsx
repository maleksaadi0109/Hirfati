import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, CheckCircle, XCircle, FileText, Mail, Phone, MapPin,
    Briefcase, Clock, User, Calendar, Download, ZoomIn, ZoomOut,
    RotateCw, Maximize2, Minimize2, Loader2, Shield, AlertTriangle,
    ExternalLink, ChevronLeft, ChevronRight, Eye, LogOut, X
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

    // Some old records may store "start year" (e.g. 1987) instead of years count.
    if (value > 120 && value <= currentYear) {
        const years = Math.max(0, currentYear - value);
        return `${years} years`;
    }

    return `${value} years`;
}

const statusConfig: Record<string, { bg: string; text: string; border: string; dot: string; icon: any; label: string }> = {
    pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500', icon: Clock, label: 'Pending Review' },
    approved: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500', icon: CheckCircle, label: 'Approved' },
    rejected: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500', icon: XCircle, label: 'Rejected' },
};

export default function CraftsmanDetail() {
    const [craftsman, setCraftsman] = useState<Craftsman | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Document viewer state
    const [documentUrl, setDocumentUrl] = useState<string | null>(null);
    const [documentLoading, setDocumentLoading] = useState(false);
    const [documentType, setDocumentType] = useState<'image' | 'pdf' | 'unknown'>('unknown');
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [documentError, setDocumentError] = useState(false);

    const documentContainerRef = useRef<HTMLDivElement>(null);

    const token = localStorage.getItem('access_token') || localStorage.getItem('auth_token') || '';
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    // Extract provider ID from URL
    const getProviderId = () => {
        const parts = window.location.pathname.split('/');
        return parts[parts.length - 1];
    };

    const fetchCraftsman = async () => {
        setLoading(true);
        try {
            const id = getProviderId();
            const res = await fetch(`/api/admin/craftsmen/${id}`, { headers });
            const json = await res.json();
            if (json.data?.provider) {
                setCraftsman(json.data.provider);
            }
        } catch {
            setErrorMsg('Failed to load provider details.');
        } finally {
            setLoading(false);
        }
    };

    const fetchDocument = async () => {
        setDocumentLoading(true);
        setDocumentError(false);
        try {
            const id = getProviderId();
            const res = await fetch(`/api/admin/craftsmen/${id}/document`, {
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': '*/*' },
            });

            if (!res.ok) {
                setDocumentError(true);
                return;
            }

            const contentType = res.headers.get('content-type') || '';
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            setDocumentUrl(url);

            if (contentType.includes('pdf')) {
                setDocumentType('pdf');
            } else if (contentType.includes('image')) {
                setDocumentType('image');
            } else {
                // Try to detect from the blob
                const ext = craftsman?.documentUrl?.split('.').pop()?.toLowerCase();
                if (ext && ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext)) {
                    setDocumentType('image');
                } else if (ext === 'pdf') {
                    setDocumentType('pdf');
                } else {
                    setDocumentType('image'); // fallback to image
                }
            }
        } catch {
            setDocumentError(true);
        } finally {
            setDocumentLoading(false);
        }
    };

    useEffect(() => {
        fetchCraftsman();
    }, []);

    useEffect(() => {
        if (craftsman?.documentUrl) {
            fetchDocument();
        }
    }, [craftsman]);

    useEffect(() => {
        return () => {
            if (documentUrl) {
                URL.revokeObjectURL(documentUrl);
            }
        };
    }, [documentUrl]);

    const handleAction = async (action: 'approve' | 'reject') => {
        if (!craftsman) return;
        setActionLoading(action);
        try {
            const res = await fetch(`/api/admin/craftsmen/${craftsman.id}/${action}`, {
                method: 'PATCH',
                headers,
            });
            if (res.ok) {
                const newStatus = action === 'approve' ? 'approved' : 'rejected';
                setCraftsman({ ...craftsman, applicationStatus: newStatus });
                setSuccessMsg(`Provider has been ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
                setTimeout(() => setSuccessMsg(null), 4000);
            }
        } catch {
            setErrorMsg(`Failed to ${action} provider.`);
            setTimeout(() => setErrorMsg(null), 4000);
        } finally {
            setActionLoading(null);
        }
    };

    const handleDownload = async () => {
        if (!craftsman) return;
        try {
            const res = await fetch(`/api/admin/craftsmen/${craftsman.id}/document`, {
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': '*/*' },
            });
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `provider-${craftsman.id}-document`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch {
            setErrorMsg('Failed to download document.');
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/logout', { method: 'POST', headers });
        } catch { /* ignore */ }
        localStorage.clear();
        window.location.href = '/login';
    };

    const zoomIn = () => setZoom(prev => Math.min(prev + 0.25, 4));
    const zoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.25));
    const resetZoom = () => { setZoom(1); setRotation(0); };
    const rotate = () => setRotation(prev => (prev + 90) % 360);
    const toggleFullscreen = () => setIsFullscreen(prev => !prev);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 flex items-center justify-center">
                <Head title="Loading... | Hirfati Admin" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                    <p className="text-slate-500 font-medium">Loading provider details...</p>
                </motion.div>
            </div>
        );
    }

    if (!craftsman) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 flex items-center justify-center">
                <Head title="Provider Not Found | Hirfati Admin" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Provider Not Found</h2>
                    <p className="text-slate-500 mb-6">The provider you're looking for doesn't exist or has been removed.</p>
                    <a
                        href="/admin/craftsmen"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Providers
                    </a>
                </motion.div>
            </div>
        );
    }

    const status = statusConfig[craftsman.applicationStatus] || statusConfig.pending;
    const StatusIcon = status.icon;
    const experienceText = formatExperience(craftsman.yearsOfExperience);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 font-sans">
            <Head title={`${craftsman.user.firstName} ${craftsman.user.lastName} - Provider Details | Hirfati Admin`} />

            {/* Top Navigation */}
            <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/60 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <a
                                href="/admin/craftsmen"
                                className="flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors font-semibold text-sm px-3 py-2 rounded-xl hover:bg-orange-50"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to list
                            </a>
                            <div className="h-6 w-px bg-slate-200" />
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

            {/* Success / Error Messages */}
            <AnimatePresence>
                {successMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 text-sm font-medium text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-4 rounded-2xl border border-emerald-200 shadow-xl shadow-emerald-100/50"
                    >
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        {successMsg}
                    </motion.div>
                )}
                {errorMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 text-sm font-medium text-red-700 bg-gradient-to-r from-red-50 to-rose-50 px-6 py-4 rounded-2xl border border-red-200 shadow-xl shadow-red-100/50"
                    >
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <XCircle className="w-4 h-4 text-white" />
                        </div>
                        {errorMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* LEFT COLUMN - Provider Info (2/5) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Provider Card */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            {/* Header gradient */}
                            <div className="h-16 bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 relative">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
                            </div>

                            <div className="px-6 pb-6">
                                {/* Avatar */}
                                <div className="relative -mt-10 z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-2xl font-bold shadow-xl border-4 border-white mb-4 flex-shrink-0">
                                    {craftsman.user.firstName.charAt(0)}{craftsman.user.lastName.charAt(0)}
                                </div>

                                {/* Name & Status */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            {craftsman.user.firstName} {craftsman.user.lastName}
                                        </h2>
                                        <p className="text-slate-500 font-medium text-sm mt-0.5">{craftsman.profession}</p>
                                    </div>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${status.bg} ${status.text} ${status.border} border`}>
                                        <StatusIcon className="w-3.5 h-3.5" />
                                        {status.label}
                                    </span>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-slate-100 my-4" />

                                {/* Details grid */}
                                <div className="space-y-3">
                                    <DetailRow icon={Mail} label="Email" value={craftsman.user.email} />
                                    {craftsman.user.phoneNumber && (
                                        <DetailRow icon={Phone} label="Phone" value={craftsman.user.phoneNumber} />
                                    )}
                                    {craftsman.user.city && (
                                        <DetailRow icon={MapPin} label="City" value={craftsman.user.city} />
                                    )}
                                    <DetailRow icon={Briefcase} label="Profession" value={craftsman.profession} />
                                    {experienceText && (
                                        <DetailRow icon={Clock} label="Experience" value={experienceText} />
                                    )}
                                    <DetailRow
                                        icon={Calendar}
                                        label="Applied"
                                        value={new Date(craftsman.createdAt).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {craftsman.applicationStatus === 'pending' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6"
                            >
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-orange-500" />
                                    Review Decision
                                </h3>
                                <div className="space-y-3">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleAction('approve')}
                                        disabled={actionLoading !== null}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-60"
                                    >
                                        {actionLoading === 'approve' ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <CheckCircle className="w-5 h-5" />
                                        )}
                                        Approve Provider
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleAction('reject')}
                                        disabled={actionLoading !== null}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 transition-all disabled:opacity-60"
                                    >
                                        {actionLoading === 'reject' ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <XCircle className="w-5 h-5" />
                                        )}
                                        Reject Provider
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* Already decided */}
                        {craftsman.applicationStatus !== 'pending' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`rounded-3xl border p-6 ${craftsman.applicationStatus === 'approved'
                                    ? 'bg-emerald-50/50 border-emerald-200'
                                    : 'bg-red-50/50 border-red-200'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${craftsman.applicationStatus === 'approved'
                                        ? 'bg-emerald-500'
                                        : 'bg-red-500'
                                        }`}>
                                        {craftsman.applicationStatus === 'approved'
                                            ? <CheckCircle className="w-5 h-5 text-white" />
                                            : <XCircle className="w-5 h-5 text-white" />
                                        }
                                    </div>
                                    <div>
                                        <p className={`text-sm font-bold ${craftsman.applicationStatus === 'approved'
                                            ? 'text-emerald-700'
                                            : 'text-red-700'
                                            }`}>
                                            Application {craftsman.applicationStatus === 'approved' ? 'Approved' : 'Rejected'}
                                        </p>
                                        <p className={`text-xs ${craftsman.applicationStatus === 'approved'
                                            ? 'text-emerald-600'
                                            : 'text-red-600'
                                            }`}>
                                            This provider has already been {craftsman.applicationStatus}.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* RIGHT COLUMN - Document Viewer (3/5) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-3"
                    >
                        <div className={`bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden ${isFullscreen ? 'fixed inset-4 z-[60] shadow-2xl' : ''}`}>
                            {/* Document Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                                        <FileText className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900">Verification Document</h3>
                                        <p className="text-xs text-slate-500">
                                            {documentType === 'pdf' ? 'PDF Document' : documentType === 'image' ? 'Image File' : 'Document'}
                                        </p>
                                    </div>
                                </div>

                                {/* Toolbar */}
                                {documentUrl && !documentError && (
                                    <div className="flex items-center gap-1">
                                        {documentType === 'image' && (
                                            <>
                                                <ToolbarButton onClick={zoomOut} icon={ZoomOut} title="Zoom Out" />
                                                <span className="text-xs font-semibold text-slate-500 min-w-[3rem] text-center">
                                                    {Math.round(zoom * 100)}%
                                                </span>
                                                <ToolbarButton onClick={zoomIn} icon={ZoomIn} title="Zoom In" />
                                                <div className="w-px h-6 bg-slate-200 mx-1" />
                                                <ToolbarButton onClick={rotate} icon={RotateCw} title="Rotate" />
                                                <ToolbarButton onClick={resetZoom} icon={RefreshIcon} title="Reset" />
                                            </>
                                        )}
                                        <div className="w-px h-6 bg-slate-200 mx-1" />
                                        <ToolbarButton onClick={handleDownload} icon={Download} title="Download" />
                                        <ToolbarButton
                                            onClick={toggleFullscreen}
                                            icon={isFullscreen ? Minimize2 : Maximize2}
                                            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                                        />
                                        {isFullscreen && (
                                            <ToolbarButton onClick={toggleFullscreen} icon={X} title="Close" className="text-red-500 hover:bg-red-50" />
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Document Content */}
                            <div
                                ref={documentContainerRef}
                                className={`relative bg-slate-100/50 ${isFullscreen ? 'h-[calc(100%-4rem)]' : 'min-h-[500px] max-h-[700px]'} overflow-auto`}
                                style={{
                                    backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
                                    backgroundSize: '20px 20px',
                                }}
                            >
                                {documentLoading ? (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex flex-col items-center gap-4"
                                        >
                                            <div className="w-16 h-16 relative">
                                                <div className="absolute inset-0 rounded-2xl bg-orange-500/20 animate-ping" />
                                                <div className="relative w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
                                                    <FileText className="w-8 h-8 text-white" />
                                                </div>
                                            </div>
                                            <p className="text-slate-500 font-medium text-sm">Loading document...</p>
                                        </motion.div>
                                    </div>
                                ) : documentError || !craftsman.documentUrl ? (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center px-8"
                                        >
                                            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <FileText className="w-10 h-10 text-slate-400" />
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-700 mb-2">
                                                {!craftsman.documentUrl ? 'No Document Uploaded' : 'Document Unavailable'}
                                            </h3>
                                            <p className="text-slate-500 text-sm max-w-sm">
                                                {!craftsman.documentUrl
                                                    ? 'This provider has not uploaded a verification document yet.'
                                                    : 'The document could not be loaded. It may have been removed or there was a server error.'
                                                }
                                            </p>
                                            {documentError && (
                                                <button
                                                    onClick={fetchDocument}
                                                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-orange-600 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
                                                >
                                                    <RotateCw className="w-4 h-4" />
                                                    Retry
                                                </button>
                                            )}
                                        </motion.div>
                                    </div>
                                ) : documentType === 'pdf' ? (
                                    <iframe
                                        src={documentUrl!}
                                        className="w-full h-full absolute inset-0"
                                        style={{ minHeight: isFullscreen ? '100%' : '500px' }}
                                        title="Provider Verification Document"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center p-8 min-h-[500px]">
                                        <motion.img
                                            src={documentUrl!}
                                            alt="Verification Document"
                                            className="max-w-full shadow-2xl rounded-lg transition-transform duration-200 cursor-grab active:cursor-grabbing"
                                            style={{
                                                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                                                transformOrigin: 'center center',
                                            }}
                                            draggable={false}
                                            onError={() => setDocumentError(true)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Fullscreen Overlay */}
            {isFullscreen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55]" onClick={toggleFullscreen} />
            )}
        </div>
    );
}

/* ── Reusable Sub-Components ── */

function DetailRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
    return (
        <div className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-orange-100 flex items-center justify-center transition-colors flex-shrink-0">
                <Icon className="w-4 h-4 text-slate-500 group-hover:text-orange-600 transition-colors" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-400 font-medium">{label}</p>
                <p className="text-sm text-slate-900 font-semibold truncate">{value}</p>
            </div>
        </div>
    );
}

function ToolbarButton({
    onClick,
    icon: Icon,
    title,
    className = '',
}: {
    onClick: () => void;
    icon: any;
    title: string;
    className?: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all ${className}`}
            title={title}
        >
            <Icon className="w-4 h-4" />
        </button>
    );
}

function RefreshIcon(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M3 12a9 9 0 1 1 9 9" /><polyline points="3 12 3 3" /><polyline points="3 12 12 12" />
        </svg>
    );
}
