import React, { useState, useEffect, useRef } from 'react';
import { SendIcon } from './icons';

interface ChatPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ChatMessage {
    id: number;
    sender: 'admin' | 'user';
    text: string;
}

const initialMessages: ChatMessage[] = [
    { id: 1, sender: 'admin', text: 'Halo! 👋 Ada yang bisa Gurimin bantu?' }
];

const CHAT_STORAGE_KEY = 'guritap-chat-history';

const ChatPopup: React.FC<ChatPopupProps> = ({ isOpen, onClose }) => {
    const [message, setMessage] = useState('');
    
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
        try {
            if (typeof window !== 'undefined') {
                const savedMessages = window.localStorage.getItem(CHAT_STORAGE_KEY);
                return savedMessages ? JSON.parse(savedMessages) : initialMessages;
            }
            return initialMessages;
        } catch (error) {
            console.error("Failed to parse chat history", error);
            return initialMessages;
        }
    });

    const [status, setStatus] = useState<'connecting' | 'online' | 'offline'>('offline');
    
    const socketRef = useRef<WebSocket | null>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);
    const reconnectTimer = useRef<number | null>(null);

    useEffect(() => {
        if (!isOpen) {
            if (reconnectTimer.current) {
                clearTimeout(reconnectTimer.current);
            }
            if (socketRef.current) {
                socketRef.current.onclose = null; // Prevent reconnect
                socketRef.current.close();
                socketRef.current = null;
            }
            setStatus('offline');
            return;
        }

        const connect = () => {
            if (socketRef.current && socketRef.current.readyState < 2) {
                return;
            }

            setStatus('connecting');
            // Pastikan pakai wss:// (Secure) dan /chat
            const ws = new WebSocket('wss://guritap.work/chat');
            socketRef.current = ws;

            ws.onopen = () => {
                console.log('✅ WebSocket connected');
                setStatus('online');
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log("📩 Pesan masuk:", data);

                    if ((data.type === 'admin_reply' || data.sender === 'admin') && data.text) {
                        const adminMessage: ChatMessage = {
                            id: Date.now(),
                            sender: 'admin',
                            text: data.text,
                        };
                        
                        setChatMessages(prev => {
                            const newHistory = [...prev, adminMessage];
                            window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(newHistory));
                            return newHistory;
                        });
                    }
                } catch (error) {
                    console.error("Gagal memproses pesan:", event.data);
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                ws.close();
            };

            ws.onclose = () => {
                console.log('WebSocket disconnected. Reconnecting in 3s...');
                setStatus('offline');
                if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
                reconnectTimer.current = window.setTimeout(connect, 3000);
            };
        };

        connect();

        return () => {
            if (reconnectTimer.current) {
                clearTimeout(reconnectTimer.current);
            }
            if (socketRef.current) {
                socketRef.current.onclose = null; // IMPORTANT: prevent reconnect on unmount
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [isOpen]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedMessage = message.trim();
        if (trimmedMessage === '' || status !== 'online' || !socketRef.current) return;

        const userMessage: ChatMessage = {
            id: Date.now(),
            sender: 'user',
            text: trimmedMessage,
        };
        
        const updatedMessages = [...chatMessages, userMessage];
        setChatMessages(updatedMessages);
        window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedMessages));
        
        const payload = JSON.stringify({ text: trimmedMessage });
        socketRef.current.send(payload);
        
        setMessage('');
        const textarea = e.currentTarget.querySelector('textarea');
        if (textarea) textarea.style.height = '40px';
    };
    
    const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target;
        setMessage(target.value);
        target.style.height = 'auto';
        target.style.height = `${Math.min(target.scrollHeight, 120)}px`; 
    };

    const getStatusInfo = () => {
        switch (status) {
            case 'connecting': return { text: 'Menyambungkan...', color: 'text-yellow-400' };
            case 'online': return { text: 'Online', color: 'text-green-400' };
            case 'offline': return { text: 'Offline', color: 'text-red-400' };
            default: return { text: 'Offline', color: 'text-red-400' };
        }
    };
    const { text: statusText, color: statusColor } = getStatusInfo();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-end p-4 sm:p-8" onClick={onClose}>
            <div 
                className="w-full max-w-sm bg-slate-800/90 border border-cyan-400/50 rounded-2xl shadow-2xl shadow-cyan-500/20 flex flex-col h-[70vh] max-h-[500px]"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-cyan-400/30">
                    <div className="flex items-center gap-3">
                        <img 
                            src="https://ik.imagekit.io/hrctvvb3m/Guritap%20logo.png" 
                            alt="Guritap Logo" 
                            className="w-8 h-8" 
                        />
                        <div>
                            <h2 className="font-orbitron text-lg font-bold text-cyan-300">Chat Admin</h2>
                            <p className={`text-xs font-bold ${statusColor}`}>{statusText}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-3xl leading-none font-bold text-cyan-300 hover:text-white">&times;</button>
                </header>

                <div ref={chatBodyRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
                    {chatMessages.map((chat) => (
                         <div key={chat.id} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-lg max-w-xs ${chat.sender === 'user' ? 'bg-cyan-600 rounded-br-none' : 'bg-slate-700 rounded-bl-none'}`}>
                                <p className="text-white text-sm whitespace-pre-wrap">{chat.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <footer className="p-3 border-t border-cyan-400/30">
                    <form onSubmit={handleSend} className="flex items-center gap-2">
                        <textarea
                            value={message}
                            onChange={handleTextareaInput}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend(e);
                                }
                            }}
                            placeholder={status === 'online' ? "Ketik pesanmu di sini..." : "Menunggu koneksi..."}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 resize-none disabled:bg-slate-800"
                            rows={1}
                            style={{ height: '40px', overflowY: 'auto' }}
                            aria-label="Ketik pesan"
                            disabled={status !== 'online'}
                        />
                        <button
                            type="submit"
                            className="w-10 h-10 bg-cyan-500 text-slate-900 font-bold rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transform hover:scale-110 transition-all duration-300 flex items-center justify-center flex-shrink-0 disabled:bg-slate-600 disabled:cursor-not-allowed"
                            aria-label="Kirim pesan"
                            disabled={status !== 'online' || !message.trim()}
                        >
                           <SendIcon className="w-5 h-5" />
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default ChatPopup;