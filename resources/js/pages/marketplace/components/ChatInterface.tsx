import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Paperclip, MoreVertical, Search, Phone, Video, Image as ImageIcon } from 'lucide-react';

interface ChatInterfaceProps {
  providerId: string;
  onBack: () => void;
}

interface Message {
  id: number;
  senderId: string;
  text: string;
  timestamp: string;
  type: 'text' | 'image';
  imageUrl?: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'John Martinez',
    avatar: 'https://images.unsplash.com/photo-1683815251677-8df20f826622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjcwNDY4Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    lastMessage: 'I can come by tomorrow at 2 PM',
    timestamp: '10:30 AM',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2NzEwNTIzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    lastMessage: 'Sounds great! See you then',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Mike Davis',
    avatar: 'https://images.unsplash.com/photo-1646227655718-dd721b681d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjcwNzYyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    lastMessage: 'Let me check my schedule',
    timestamp: 'Dec 28',
    unread: 0,
    online: true,
  },
];

const initialMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 1,
      senderId: 'user',
      text: 'Hi John! I need help with a leaking kitchen faucet. Are you available this week?',
      timestamp: '10:15 AM',
      type: 'text',
    },
    {
      id: 2,
      senderId: '1',
      text: 'Hello! Yes, I can definitely help you with that. Could you send me a photo of the issue?',
      timestamp: '10:18 AM',
      type: 'text',
    },
    {
      id: 3,
      senderId: 'user',
      text: 'Sure, here it is',
      timestamp: '10:20 AM',
      type: 'text',
    },
    {
      id: 4,
      senderId: 'user',
      text: '',
      timestamp: '10:20 AM',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1578611709914-0dda0b55f9b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHJlcGFpciUyMHdvcmt8ZW58MXx8fHwxNzY3MTAwNDAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 5,
      senderId: '1',
      text: 'Thanks for the photo. That looks like a worn-out cartridge. It\'s a common issue and should take about an hour to fix. My rate is $80/hr plus parts.',
      timestamp: '10:25 AM',
      type: 'text',
    },
    {
      id: 6,
      senderId: 'user',
      text: 'That sounds reasonable. When can you come?',
      timestamp: '10:27 AM',
      type: 'text',
    },
    {
      id: 7,
      senderId: '1',
      text: 'I can come by tomorrow at 2 PM. Does that work for you?',
      timestamp: '10:30 AM',
      type: 'text',
    },
  ],
  '2': [
    {
      id: 1,
      senderId: 'user',
      text: 'Hi Sarah, I\'m looking for a math tutor for my daughter.',
      timestamp: 'Yesterday',
      type: 'text',
    },
    {
      id: 2,
      senderId: '2',
      text: 'Hello! I\'d be happy to help. What grade is she in and what areas does she need help with?',
      timestamp: 'Yesterday',
      type: 'text',
    },
  ],
};

export function ChatInterface({ providerId, onBack }: ChatInterfaceProps) {
  const [selectedChat, setSelectedChat] = useState(providerId);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentConversation = conversations.find((c) => c.id === selectedChat);
  const currentMessages = messages[selectedChat] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      senderId: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }));

    setInputMessage('');

    // Simulate provider response
    setTimeout(() => {
      const responseMessage: Message = {
        id: Date.now() + 1,
        senderId: selectedChat,
        text: 'Thanks for your message! I\'ll get back to you shortly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
      };

      setMessages((prev) => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), responseMessage],
      }));
    }, 1000);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-50 flex flex-col" style={{ flex: '1 0 auto', height: '100%' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl text-gray-900">Messages</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex overflow-hidden">
        {/* Conversations Sidebar */}
        <div
          className={`${showSidebar ? 'flex' : 'hidden'
            } md:flex flex-col w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex-shrink-0`}
        >
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => {
                  setSelectedChat(conversation.id);
                  setShowSidebar(false);
                }}
                className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${selectedChat === conversation.id ? 'bg-blue-50' : ''
                  }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                {/* Conversation Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-gray-900 truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <div className="ml-2 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className={`${showSidebar ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-gray-50`}>
          {currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowSidebar(true)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ArrowLeft className="w-6 h-6 text-gray-700" />
                  </button>
                  <div className="relative">
                    <img
                      src={currentConversation.avatar}
                      alt={currentConversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {currentConversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg text-gray-900">{currentConversation.name}</h2>
                    <p className="text-sm text-gray-600">
                      {currentConversation.online ? 'Active now' : 'Offline'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Phone className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Video className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="space-y-4">
                  {currentMessages.map((message) => {
                    const isUser = message.senderId === 'user';
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex gap-2 max-w-md ${isUser ? 'flex-row-reverse' : ''}`}>
                          {!isUser && (
                            <img
                              src={currentConversation.avatar}
                              alt=""
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            />
                          )}
                          <div>
                            {message.type === 'text' && message.text && (
                              <div
                                className={`px-4 py-3 rounded-2xl ${isUser
                                    ? 'bg-blue-600 text-white rounded-tr-sm'
                                    : 'bg-white text-gray-900 rounded-tl-sm shadow-sm'
                                  }`}
                              >
                                <p>{message.text}</p>
                              </div>
                            )}
                            {message.type === 'image' && message.imageUrl && (
                              <div className="rounded-lg overflow-hidden shadow-md">
                                <img
                                  src={message.imageUrl}
                                  alt="Attachment"
                                  className="max-w-xs w-full h-auto"
                                />
                              </div>
                            )}
                            <p
                              className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'
                                }`}
                            >
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="bg-white border-t border-gray-200 px-6 py-4 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-end gap-3">
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Paperclip className="w-6 h-6 text-gray-600" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                  />
                  <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-3">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full bg-transparent focus:outline-none text-gray-900"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
