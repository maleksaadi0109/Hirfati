import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Send, MoreVertical, Phone, Video, Paperclip,
    Smile, CheckCheck, Clock, FileText, Image, Mic, X,
    ChevronLeft, ShieldCheck, Zap
} from 'lucide-react';

// --- Shared Mock Data ---
export const MOCK_CONTACTS = [
    { id: 1, name: "Ahmed Ben Ali", role: "Plumber", avatar: "AB", online: true, lastMsg: "I'll be there in 30 mins", time: "10:30 AM", unread: 2, verified: true },
    { id: 2, name: "Sara Khaled", role: "Interior Designer", avatar: "SK", online: false, lastMsg: "Can you send the dimensions?", time: "Yesterday", unread: 0, verified: true },
    { id: 3, name: "Mahmoud Fathi", role: "Electrician", avatar: "MF", online: true, lastMsg: "Job completed. Thanks!", time: "Oct 25", unread: 0, verified: false },
    { id: 4, name: "Layla Omari", role: "Client", avatar: "LO", online: true, lastMsg: "Is 400 LYD okay?", time: "Oct 24", unread: 1, verified: false },
];

export const MOCK_MESSAGES = [
    { id: 1, senderId: 2, text: "Hello! I saw your request for the living room redesign.", time: "09:00 AM" },
    { id: 2, senderId: 'me', text: "Hi Sara, yes! I'm looking for a modern minimalist style.", time: "09:05 AM" },
    { id: 3, senderId: 2, text: "Great choice. Do you have any reference photos?", time: "09:10 AM" },
    { id: 4, senderId: 'me', text: "I have a few saved from Pinterest. Let me gather them.", time: "09:12 AM" },
    { id: 5, senderId: 2, text: "Perfect. Also, can you send me the dimensions of the room?", time: "Yesterday" },
];

export default function ChatInterface({ role = "client" }: { role?: "client" | "worker" }) {
    const [selectedContact, setSelectedContact] = useState<any>(MOCK_CONTACTS[0]);
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [newMessage, setNewMessage] = useState("");
    const [isDetailsOpen, setIsDetailsOpen] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            id: Date.now(),
            senderId: 'me',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, msg]);
        setNewMessage("");
    };

    return (
        <div className="h-[calc(100vh-8rem)] bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-2xl shadow-slate-200/50 overflow-hidden flex custom-scrollbar relative">

            {/* Background Gradients for internal depth */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-50/50 to-pink-50/50 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-50/50 to-purple-50/50 rounded-full blur-3xl opacity-50" />
            </div>

            {/* --- Left Sidebar: Contacts --- */}
            <div className="w-80 border-r border-slate-100/60 flex flex-col bg-slate-50/30 backdrop-blur-sm">
                <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Messages</h2>
                        <div className="px-2.5 py-1 bg-white rounded-full text-[10px] font-bold text-orange-600 shadow-sm border border-orange-100 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                            Live
                        </div>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            className="w-full bg-white/80 border-none rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-orange-500/10 shadow-sm transition-all placeholder:text-slate-400 text-slate-700"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                    {MOCK_CONTACTS.map((contact) => (
                        <motion.button
                            key={contact.id}
                            onClick={() => setSelectedContact(contact)}
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full p-4 rounded-[1.25rem] flex items-center gap-4 transition-all relative group overflow-hidden border border-transparent ${selectedContact?.id === contact.id
                                    ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-orange-100/50'
                                    : 'hover:bg-white/60'
                                }`}
                        >
                            {selectedContact?.id === contact.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-orange-400 to-pink-500 rounded-r-full"
                                />
                            )}

                            <div className="relative flex-shrink-0">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-extrabold shadow-sm transition-all duration-300 ${selectedContact?.id === contact.id
                                        ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-orange-200'
                                        : 'bg-white text-slate-600 border border-slate-100'
                                    }`}>
                                    {contact.avatar}
                                </div>
                                {contact.online && (
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white "></div>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className={`font-bold text-sm truncate flex items-center gap-1 ${selectedContact?.id === contact.id ? 'text-slate-900' : 'text-slate-700'}`}>
                                        {contact.name}
                                        {contact.verified && <ShieldCheck className="w-3 h-3 text-blue-500" />}
                                    </h4>
                                    <span className={`text-[10px] font-bold ${selectedContact?.id === contact.id ? 'text-orange-600' : 'text-slate-400'}`}>{contact.time}</span>
                                </div>
                                <p className={`text-xs truncate font-medium ${contact.unread > 0 ? 'text-slate-900' : 'text-slate-500'}`}>{contact.lastMsg}</p>
                            </div>
                            {contact.unread > 0 && (
                                <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-orange-500/30">
                                    {contact.unread}
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* --- Middle: Chat Area --- */}
            {selectedContact ? (
                <div className="flex-1 flex flex-col bg-white/40 relative z-10">
                    {/* Chat Header */}
                    <div className="h-24 px-8 flex items-center justify-between border-b border-white/60 bg-white/60 backdrop-blur-md sticky top-0 z-20">
                        <div className="flex items-center gap-5 cursor-pointer group" onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
                            <div className="relative">
                                <motion.div
                                    whileHover={{ rotate: 5, scale: 1.05 }}
                                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-slate-50 text-slate-700 flex items-center justify-center font-extrabold text-sm shadow-md border border-white"
                                >
                                    {selectedContact.avatar}
                                </motion.div>
                                {/* Status Indicator Ring */}
                                {selectedContact.online && (
                                    <span className="absolute -inset-1 rounded-3xl border-2 border-green-500/20 pointer-events-none"></span>
                                )}
                            </div>
                            <div>
                                <h3 className="font-extrabold text-slate-900 text-lg leading-tight group-hover:text-orange-600 transition-colors flex items-center gap-2">
                                    {selectedContact.name}
                                    {selectedContact.verified && (
                                        <span className="bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded-md border border-blue-100 font-bold flex items-center gap-1">
                                            <ShieldCheck className="w-3 h-3" /> Verified
                                        </span>
                                    )}
                                </h3>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                                    {selectedContact.role}
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    {selectedContact.online ? <span className="text-green-600">Online</span> : <span className="text-slate-400">Offline</span>}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-all border border-transparent hover:border-orange-100"
                            >
                                <Phone className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-pink-600 hover:bg-pink-50 transition-all border border-transparent hover:border-pink-100"
                            >
                                <Video className="w-5 h-5" />
                            </motion.button>
                            <div className="w-px h-8 bg-slate-200/60 mx-2" />
                            <motion.button
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all border ${isDetailsOpen ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-white hover:shadow-sm'}`}
                            >
                                <MoreVertical className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Messages List */}
                    <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 bg-gradient-to-b from-transparent to-white/30 custom-scrollbar">
                        <div className="flex justify-center mb-8">
                            <div className="bg-slate-100/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-white">
                                Today, {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                        </div>

                        {messages.map((msg, idx) => {
                            const isMe = msg.senderId === 'me';
                            return (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[70%]`}>
                                        <div
                                            className={`p-5 rounded-[1.5rem] text-[15px] leading-relaxed shadow-sm relative group transition-all hover:translate-y-[-2px] hover:shadow-lg ${isMe
                                                    ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-tr-none shadow-slate-900/10'
                                                    : 'bg-white text-slate-700 border border-white/50 shadow-[0_2px_15px_rgba(0,0,0,0.03)] rounded-tl-none'
                                                }`}
                                        >
                                            {msg.text}
                                            <div className={`absolute bottom-0 flex items-center gap-1 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 ${isMe ? 'text-slate-400 -left-12' : 'text-slate-400 -right-12'}`}>
                                                {msg.time}
                                            </div>
                                        </div>
                                        {isMe && (
                                            <div className="mt-1.5 mr-1 flex items-center gap-1">
                                                <CheckCheck className="w-3.5 h-3.5 text-orange-500" />
                                                <span className="text-[10px] font-bold text-orange-500/80">Read</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-white/80 backdrop-blur-xl border-t border-white/60 relative z-20">
                        <form onSubmit={handleSendMessage} className="flex items-end gap-3 bg-white p-2 rounded-[1.75rem] border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] focus-within:border-orange-200 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
                            <div className="flex items-center gap-1 pl-2">
                                <button type="button" className="p-3 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-2xl transition-all">
                                    <Mic className="w-5 h-5" />
                                </button>
                                <button type="button" className="p-3 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-2xl transition-all">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                            </div>

                            <textarea
                                rows={1}
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-medium resize-none py-3.5 max-h-32 focus:ring-0 text-sm leading-relaxed"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage(e);
                                    }
                                }}
                            />

                            <motion.button
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="p-3.5 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-2xl hover:shadow-lg hover:shadow-orange-500/40 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all"
                            >
                                <Send className="w-5 h-5 stroke-[2.5]" />
                            </motion.button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400 bg-white/30 backdrop-blur-sm">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-slate-200/50 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-50 to-pink-50 rounded-full opacity-50 blur-xl"></div>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/man-chatting-online-4438812-3718488.png" className="w-24 opacity-80 relative z-10 scale-90" alt="Chat" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-800 mb-3 tracking-tight">Hirfati Messenger</h3>
                    <p className="text-slate-500 max-w-xs mx-auto text-base font-medium">Select a conversation to start chatting with verified professionals.</p>
                </div>
            )}

            {/* --- Right Details Sidebar (Collapsible) --- */}
            <AnimatePresence>
                {selectedContact && isDetailsOpen && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 340, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="border-l border-white/60 bg-white/70 backdrop-blur-xl z-20 overflow-hidden shadow-[-10px_0_30px_rgba(0,0,0,0.02)]"
                    >
                        <div className="p-8 flex flex-col items-center bg-gradient-to-b from-white to-transparent">
                            <div className="relative mb-5 group cursor-pointer">
                                <motion.div whileHover={{ scale: 1.05 }} className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-slate-100 to-white flex items-center justify-center text-4xl font-extrabold text-slate-800 shadow-xl border-4 border-white">
                                    {selectedContact.avatar}
                                </motion.div>
                                {selectedContact.online && <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>}
                            </div>
                            <h3 className="text-2xl font-extrabold text-slate-900 text-center tracking-tight">{selectedContact.name}</h3>
                            <p className="text-orange-600 font-bold text-xs uppercase tracking-widest mt-1 bg-orange-50 px-3 py-1 rounded-full">{selectedContact.role}</p>

                            <div className="flex gap-3 mt-8 w-full">
                                <motion.button whileHover={{ y: -2 }} className="flex-1 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-700 hover:border-orange-200 hover:text-orange-600 hover:shadow-lg hover:shadow-orange-500/10 transition-all flex items-center justify-center gap-2 shadow-sm">
                                    <FileText className="w-4 h-4" /> Profile
                                </motion.button>
                                <motion.button whileHover={{ y: -2 }} className="flex-1 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-700 hover:border-pink-200 hover:text-pink-600 hover:shadow-lg hover:shadow-pink-500/10 transition-all flex items-center justify-center gap-2 shadow-sm">
                                    <Zap className="w-4 h-4" /> Hire
                                </motion.button>
                            </div>
                        </div>

                        <div className="p-6 overflow-y-auto h-full pb-20 custom-scrollbar">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">Shared Media</h4>
                                <button className="text-orange-600 text-xs font-bold hover:underline">View All</button>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mb-8">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <motion.div whileHover={{ scale: 1.05 }} key={i} className="aspect-square bg-slate-100 rounded-2xl border border-slate-200 hover:border-orange-200 cursor-pointer transition-all flex items-center justify-center group overflow-hidden relative">
                                        <Image className="w-6 h-6 text-slate-300 group-hover:text-orange-500 transition-colors" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">Recent Files</h4>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { name: "Kitchen_Plan_v2.pdf", size: "2.4 MB", type: "pdf", color: "text-red-500 bg-red-50" },
                                    { name: "Contract_Draft.docx", size: "850 KB", type: "doc", color: "text-blue-500 bg-blue-50" },
                                ].map((file, idx) => (
                                    <motion.div whileHover={{ x: 5 }} key={idx} className="p-4 rounded-2xl bg-white border border-slate-100 flex items-center gap-4 hover:shadow-md hover:border-orange-100 cursor-pointer transition-all group">
                                        <div className={`p-3 ${file.color} rounded-xl group-hover:scale-110 transition-transform`}>
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-800 truncate group-hover:text-orange-700 transition-colors">{file.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold mt-0.5">{file.size}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
