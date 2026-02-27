'use client';

import { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Phone, Video, MessageSquare, Smile } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatarUrl: string;
  isOnline: boolean;
}

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Marcus Johnson',
    lastMessage: 'I can start the work on Thursday morning. Does that work for you?',
    time: '2 min ago',
    unread: 2,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    lastMessage: 'The painting is complete! Please check the photos I uploaded.',
    time: '1 hour ago',
    unread: 0,
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    isOnline: false,
  },
  {
    id: '3',
    name: 'David Park',
    lastMessage: 'I will send a detailed quote by end of day.',
    time: '3 hours ago',
    unread: 1,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    isOnline: true,
  },
];

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: 'pro',
    content: 'Hi! I saw your job posting for the electrical panel upgrade. I have extensive experience with this type of work.',
    timestamp: '10:30 AM',
    isMe: false,
  },
  {
    id: '2',
    senderId: 'me',
    content: 'Thanks for reaching out, Marcus! Can you tell me more about your experience with panel upgrades?',
    timestamp: '10:35 AM',
    isMe: true,
  },
  {
    id: '3',
    senderId: 'pro',
    content: 'Absolutely! I have upgraded over 200 panels in the Toronto area. I am fully licensed and insured. The job typically takes 4-6 hours.',
    timestamp: '10:38 AM',
    isMe: false,
  },
  {
    id: '4',
    senderId: 'me',
    content: 'That sounds great. When would you be available to start?',
    timestamp: '10:42 AM',
    isMe: true,
  },
  {
    id: '5',
    senderId: 'pro',
    content: 'I can start the work on Thursday morning. Does that work for you?',
    timestamp: '10:45 AM',
    isMe: false,
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const currentConversation = mockConversations.find(
    (c) => c.id === selectedConversation
  );

  const handleSend = () => {
    if (messageInput.trim()) {
      setMessageInput('');
    }
  };

  return (
    <Card className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Conversation List */}
      <div className="w-80 shrink-0 border-r border-gray-200">
        <div className="border-b border-gray-100 p-4">
          <h2 className="mb-3 text-lg font-bold text-gray-900">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:bg-white"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {mockConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`flex w-full items-start gap-3 border-b border-gray-100 px-4 py-3.5 text-left transition-all duration-200 ${
                selectedConversation === conv.id
                  ? 'bg-reno-green-light/70'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative shrink-0">
                <Avatar className={`h-10 w-10 ${
                  selectedConversation === conv.id
                    ? 'bg-reno-green-light'
                    : 'bg-reno-green-light'
                }`}>
                  <AvatarImage src={conv.avatarUrl} alt={conv.name} />
                  <AvatarFallback className={`text-sm font-bold ${
                    selectedConversation === conv.id
                      ? 'bg-reno-green-light text-reno-green-dark'
                      : 'bg-reno-green-light text-reno-green-dark'
                  }`}>
                    {conv.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {conv.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">
                    {conv.name}
                  </span>
                  <span className="text-[10px] text-gray-400">{conv.time}</span>
                </div>
                <p className="mt-0.5 truncate text-xs text-gray-500">
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unread > 0 && (
                <Badge className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-reno-green-dark p-0 text-[10px] font-bold text-white">
                  {conv.unread}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        {currentConversation ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-3.5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={currentConversation.avatarUrl} alt={currentConversation.name} />
                    <AvatarFallback className="bg-reno-green-light text-sm font-bold text-reno-green-dark">
                      {currentConversation.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {currentConversation.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {currentConversation.name}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-gray-500">
                      {currentConversation.isOnline ? (
                        <span className="text-green-600">Online</span>
                      ) : (
                        'Offline'
                      )}
                    </p>
                    {currentConversation.isOnline && (
                      <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
                        <span className="inline-block h-1 w-1 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} />
                        <span className="inline-block h-1 w-1 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} />
                        <span className="inline-block h-1 w-1 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} />
                        <span className="ml-1 text-gray-400">typing</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        msg.isMe
                          ? 'bg-reno-green-dark text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p
                        className={`mt-1.5 text-right text-[10px] ${
                          msg.isMe ? 'text-reno-green-light' : 'text-gray-400'
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Message Input */}
            <div className="p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600">
                  <Smile className="h-5 w-5" />
                </Button>
                <Input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:bg-white focus:ring-2 focus:ring-reno-green-light"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!messageInput.trim()}
                  className="rounded-full bg-reno-green-dark p-2.5 text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-gray-400">
            <MessageSquare className="h-10 w-10" />
            <p className="text-sm">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </Card>
  );
}
