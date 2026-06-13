'use client';

import { useState, useEffect } from 'react';
import { Search, Send, User, Paperclip, Clock } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { onSnapshot, collection, query, where, orderBy, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { isFirebaseConfigured } from '@/lib/firebase';

// Mock messages fallback data
const MOCK_CONVERSATIONS = [
  {
    id: '1',
    clientName: 'Acme Corp',
    lastMessage: 'Can we schedule a call to discuss the latest drafts?',
    time: '10:30 AM',
    unread: true,
    messages: [
      { id: 'm1', sender: 'admin', text: 'Hello, we have uploaded the initial prior art search results to your document center. Let us know if you have any questions.', timestamp: new Date(Date.now() - 86400000).toISOString() },
      { id: 'm2', sender: 'client', text: 'Thanks, reviewing them now. Can we schedule a call to discuss the latest drafts?', timestamp: new Date().toISOString() }
    ]
  },
  {
    id: '2',
    clientName: 'Global Innovations',
    lastMessage: 'The new CAD files look great. Proceeding with phase 2.',
    time: 'Yesterday',
    unread: false,
    messages: [
      { id: 'm1', sender: 'client', text: 'The new CAD files look great. Proceeding with phase 2.', timestamp: new Date(Date.now() - 86400000).toISOString() }
    ]
  },
  {
    id: '3',
    clientName: 'Nexus Tech',
    lastMessage: 'Invoice paid.',
    time: 'Mon',
    unread: false,
    messages: [
      { id: 'm1', sender: 'admin', text: 'Your final patent application has been filed.', timestamp: 'Mon, 9:00 AM' },
      { id: 'm2', sender: 'client', text: 'Invoice paid.', timestamp: 'Mon, 11:30 AM' }
    ]
  }
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [clients, setClients] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Sync conversation sidebar list
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setClients(MOCK_CONVERSATIONS.map(c => ({
        id: c.id,
        name: c.clientName,
        projectName: 'Active Project',
        lastMessage: c.lastMessage,
        lastMessageTime: c.time,
        unread: c.unread
      })));
      setActiveChat('1');
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'client_projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projects = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name || 'Unnamed Client',
        projectName: doc.data().projectName || 'Active Project',
        lastMessage: doc.data().lastMessage || 'No messages yet.',
        lastMessageTime: doc.data().lastMessageTime || '',
        unread: doc.data().unread || false,
        ...doc.data()
      }));
      setClients(projects);
      if (projects.length > 0 && !activeChat) {
        setActiveChat(projects[0].id);
      }
      setLoading(false);
    }, (error) => {
      console.error('Firestore list sync error, falling back to mock:', error);
      const mockClients = MOCK_CONVERSATIONS.map(c => ({
        id: c.id,
        name: c.clientName,
        projectName: 'Active Project',
        lastMessage: c.lastMessage,
        lastMessageTime: c.time,
        unread: c.unread
      }));
      setClients(mockClients);
      if (mockClients.length > 0 && !activeChat) {
        setActiveChat(mockClients[0].id);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Sync active conversation messages in real time
  useEffect(() => {
    if (!activeChat) return;

    if (!isFirebaseConfigured()) {
      const mockChat = MOCK_CONVERSATIONS.find(c => c.id === activeChat);
      if (mockChat) {
        setMessages(mockChat.messages);
      }
      return;
    }

    const q = query(
      collection(db, 'messages'),
      where('clientId', '==', activeChat),
      orderBy('timestamp', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    }, (error) => {
      console.error('Firestore messages sync error, falling back to mock:', error);
      const mockChat = MOCK_CONVERSATIONS.find(c => c.id === activeChat);
      if (mockChat) {
        setMessages(mockChat.messages);
      }
    });

    return () => unsubscribe();
  }, [activeChat]);

  const activeConversation = clients.find(c => c.id === activeChat);

  const handleSend = async () => {
    if (!replyText.trim() || !activeChat) return;

    const currentMsg = replyText;
    setReplyText('');

    if (!isFirebaseConfigured()) {
      // Offline fallback: append to mock
      const newMockMessage = {
        id: Date.now().toString(),
        sender: 'admin',
        text: currentMsg,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, newMockMessage]);
      setClients(prev => prev.map(c => c.id === activeChat ? { ...c, lastMessage: currentMsg, lastMessageTime: 'Just now' } : c));
      return;
    }

    try {
      // 1. Add message record
      await addDoc(collection(db, 'messages'), {
        clientId: activeChat,
        sender: 'admin',
        text: currentMsg,
        timestamp: new Date().toISOString()
      });

      // 2. Update conversation thumbnail details in client_projects metadata
      const projectDocRef = doc(db, 'client_projects', activeChat);
      await updateDoc(projectDocRef, {
        lastMessage: currentMsg,
        lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const filteredConversations = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      
      {/* Sidebar (Conversations List) */}
      <div className="w-1/3 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-900/50">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Client Messages</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-xs text-slate-400 animate-pulse">
              Syncing client feeds...
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No clients found.
            </div>
          ) : (
            filteredConversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  setActiveChat(chat.id);
                  // Optional: mark as read logic here
                }}
                className={cn(
                  "w-full text-left p-4 border-b border-slate-100 dark:border-slate-800/50 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 flex items-start gap-3",
                  activeChat === chat.id ? "bg-slate-100 dark:bg-slate-800 border-l-4 border-l-accent" : "border-l-4 border-l-transparent"
                )}
              >
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0">
                  <User size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className={cn("text-sm truncate font-semibold", chat.unread ? "text-accent" : "text-slate-700 dark:text-slate-200")}>
                      {chat.name}
                    </h3>
                    <span className="text-[10px] text-slate-500 shrink-0">{chat.lastMessageTime}</span>
                  </div>
                  <p className="text-xs truncate text-slate-500 dark:text-slate-400">
                    {chat.lastMessage}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                <User size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">{activeConversation.name}</h2>
                <p className="text-xs text-slate-500">{activeConversation.projectName} - Active Milestone</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-accent transition-colors">
              <Clock size={18} />
            </button>
          </div>

          {/* Messages Timeline */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => {
              const isAdmin = msg.sender === 'admin';
              return (
                <div key={msg.id || index} className={cn("flex flex-col max-w-[80%]", isAdmin ? "ml-auto items-end" : "mr-auto items-start")}>
                  <div className={cn(
                    "px-4 py-2.5 rounded-2xl text-sm",
                    isAdmin 
                      ? "bg-accent text-white rounded-br-none" 
                      : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1 font-mono">
                    {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>
              );
            })}
            {messages.length === 0 && (
              <div className="text-center text-xs text-slate-400 py-12">No messages exchanged yet. Send a message to start.</div>
            )}
          </div>

          {/* Reply Area */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-end gap-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 focus-within:ring-2 focus-within:ring-accent focus-within:border-accent transition-shadow">
              <button className="p-2 text-slate-400 hover:text-accent rounded-lg transition-colors shrink-0">
                <Paperclip size={20} />
              </button>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply to the client..."
                className="w-full max-h-32 min-h-[40px] resize-none bg-transparent border-none focus:ring-0 p-2 text-sm text-slate-900 dark:text-white placeholder-slate-500"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button 
                onClick={handleSend}
                disabled={!replyText.trim()}
                className="p-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} className="translate-x-[1px]" />
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 text-center">
              Press Enter to send, Shift + Enter for new line. Clients will be notified via email when you reply.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-500 flex-col gap-2 bg-slate-50/50 dark:bg-slate-900/50">
          <Search size={32} className="opacity-20" />
          <p suppressHydrationWarning>Select a conversation to start messaging</p>
        </div>
      )}

    </div>
  );
}
