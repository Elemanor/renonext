import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@renonext/shared/api/supabase';
import { getMessages, sendMessage, markAsRead } from '@renonext/shared/api/messages';
import type { Message } from '@renonext/shared';
import { Avatar } from '@renonext/ui/Avatar';
import * as ImagePicker from 'expo-image-picker';

export default function ChatScreen() {
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const fetchMessages = useCallback(async () => {
    try {
      if (!conversationId) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setCurrentUserId(user.id);

      const data = await getMessages(conversationId);
      setMessages(data);

      await markAsRead(conversationId, user.id);
    } catch {
      // Handle error
    }
  }, [conversationId]);

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          const newMsg = payload.new as Message;
          const { data: sender } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', newMsg.sender_id)
            .single();
          setMessages((prev) => [...prev, { ...newMsg, sender: sender ?? undefined }]);

          if (currentUserId && newMsg.sender_id !== currentUserId) {
            await markAsRead(conversationId!, currentUserId);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMessages, conversationId, currentUserId]);

  const handleSend = async () => {
    const text = inputText.trim();
    if (!text || !conversationId || !currentUserId) return;

    setIsSending(true);
    setInputText('');
    try {
      await sendMessage({
        conversation_id: conversationId,
        sender_id: currentUserId,
        content: text,
      });
    } catch {
      setInputText(text);
    } finally {
      setIsSending(false);
    }
  };

  const handleAttachment = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });
    if (!result.canceled && conversationId && currentUserId) {
      // Send as image message
      try {
        await sendMessage({
          conversation_id: conversationId,
          sender_id: currentUserId,
          content: '[Image]',
          image_url: result.assets[0].uri,
        });
      } catch {
        // Handle error
      }
    }
  };

  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const isMine = item.sender_id === currentUserId;
    const time = new Date(item.created_at).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Check if we should show date header
    const showDateHeader =
      index === 0 ||
      new Date(item.created_at).toDateString() !==
        new Date(messages[index - 1].created_at).toDateString();

    if (item.message_type === 'system') {
      return (
        <View className="items-center my-3 px-6">
          {showDateHeader && (
            <Text className="text-xs text-gray-400 mb-2">
              {formatDateHeader(item.created_at)}
            </Text>
          )}
          <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full">
            <Ionicons name="information-circle-outline" size={14} color="#9CA3AF" />
            <Text className="text-xs text-gray-500 ml-1.5 font-medium">{item.content}</Text>
          </View>
        </View>
      );
    }

    return (
      <View>
        {showDateHeader && (
          <View className="items-center my-3">
            <View className="bg-gray-100 px-4 py-1.5 rounded-full">
              <Text className="text-xs text-gray-500 font-medium">
                {formatDateHeader(item.created_at)}
              </Text>
            </View>
          </View>
        )}
        <View className={`flex-row mb-2 px-4 ${isMine ? 'justify-end' : 'justify-start'}`}>
          {!isMine && (
            <Avatar
              name={item.sender?.full_name ?? 'User'}
              imageUrl={item.sender?.avatar_url}
              size="sm"
              className="mr-2 mt-1"
            />
          )}
          <View className="max-w-[75%]">
            {/* Image message */}
            {item.image_url && (
              <View
                className={`rounded-2xl overflow-hidden mb-1 ${
                  isMine ? 'rounded-br-md' : 'rounded-bl-md'
                }`}
              >
                <Image
                  source={{ uri: item.image_url }}
                  className="w-48 h-48"
                  resizeMode="cover"
                />
              </View>
            )}

            {/* Text bubble */}
            {item.content && item.content !== '[Image]' && (
              <View
                className={`rounded-2xl px-4 py-3 ${
                  isMine
                    ? 'bg-primary-600 rounded-br-md'
                    : 'bg-white border border-gray-100 rounded-bl-md'
                }`}
                style={
                  !isMine
                    ? {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.03,
                        shadowRadius: 2,
                        elevation: 1,
                      }
                    : undefined
                }
              >
                <Text
                  className={`text-base leading-5 ${isMine ? 'text-white' : 'text-gray-900'}`}
                >
                  {item.content}
                </Text>
              </View>
            )}

            {/* Timestamp */}
            <View className={`flex-row mt-1 ${isMine ? 'justify-end' : 'justify-start'}`}>
              <Text className="text-xs text-gray-400">{time}</Text>
              {isMine && (
                <Ionicons
                  name={item.is_read ? 'checkmark-done' : 'checkmark'}
                  size={14}
                  color={item.is_read ? '#2563EB' : '#9CA3AF'}
                  style={{ marginLeft: 4 }}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={100}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{ paddingVertical: 8 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
          ListEmptyComponent={
            <View className="items-center py-16 px-8">
              <View className="w-20 h-20 bg-primary-50 rounded-full items-center justify-center mb-4">
                <Ionicons name="chatbubbles-outline" size={36} color="#2563EB" />
              </View>
              <Text className="text-lg font-bold text-gray-900">Start a Conversation</Text>
              <Text className="text-sm text-gray-500 mt-2 text-center">
                Send a message to get the conversation going!
              </Text>
            </View>
          }
        />

        {/* Typing Indicator */}
        {isTyping && (
          <View className="px-4 pb-1">
            <View className="flex-row items-center">
              <View className="flex-row gap-1 bg-white rounded-full px-3 py-2 border border-gray-100">
                <View className="w-2 h-2 bg-gray-400 rounded-full" />
                <View className="w-2 h-2 bg-gray-300 rounded-full" />
                <View className="w-2 h-2 bg-gray-200 rounded-full" />
              </View>
            </View>
          </View>
        )}

        {/* Input Bar */}
        <View
          className="flex-row items-end px-4 py-3 bg-white border-t border-gray-100"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -1 },
            shadowOpacity: 0.03,
            shadowRadius: 3,
            elevation: 3,
          }}
        >
          <TouchableOpacity
            onPress={handleAttachment}
            className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center mr-2"
          >
            <Ionicons name="add" size={22} color="#6B7280" />
          </TouchableOpacity>
          <View className="flex-1 bg-gray-100 rounded-2xl px-4 py-2.5 max-h-32">
            <TextInput
              className="text-base text-gray-900"
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={1000}
            />
          </View>
          <TouchableOpacity
            onPress={handleSend}
            disabled={!inputText.trim() || isSending}
            className={`w-10 h-10 rounded-xl items-center justify-center ml-2 ${
              inputText.trim() ? 'bg-primary-600' : 'bg-gray-200'
            }`}
            activeOpacity={0.7}
          >
            <Ionicons
              name="send"
              size={18}
              color={inputText.trim() ? '#ffffff' : '#9CA3AF'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
