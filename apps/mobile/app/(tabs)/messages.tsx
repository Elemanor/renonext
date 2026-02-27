import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@renonext/shared/api/supabase';
import { getConversations } from '@renonext/shared/api/messages';
import type { Conversation } from '@renonext/shared';
import { Avatar } from '@renonext/ui/Avatar';
import EmptyState from '../../components/EmptyState';

export default function MessagesScreen() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchConversations = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setCurrentUserId(user.id);
      const data = await getConversations(user.id);
      setConversations(data);
    } catch {
      // Handle error silently
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchConversations();
    setRefreshing(false);
  }, [fetchConversations]);

  const getOtherParticipant = (conversation: Conversation) => {
    const other = conversation.participants?.find(
      (p) => p.user_id !== currentUserId
    );
    return other?.profile;
  };

  const filteredConversations = searchQuery.trim()
    ? conversations.filter((c) => {
        const other = getOtherParticipant(c);
        return other?.full_name?.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : conversations;

  const renderConversation = ({ item }: { item: Conversation }) => {
    const otherUser = getOtherParticipant(item);
    const unread = item.unread_count ?? 0;
    const hasUnread = unread > 0;

    return (
      <TouchableOpacity
        onPress={() => router.push(`/chat/${item.id}`)}
        className={`flex-row items-center px-6 py-4 ${
          hasUnread ? 'bg-primary-50/50' : 'bg-white'
        }`}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
        }}
      >
        {/* Avatar with online indicator */}
        <View className="relative">
          <Avatar
            name={otherUser?.full_name ?? 'User'}
            imageUrl={otherUser?.avatar_url}
            size="md"
          />
          {/* Online/offline status dot */}
          <View
            className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white bg-secondary-500"
          />
        </View>

        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-center">
            <Text
              className={`text-base ${
                hasUnread ? 'font-bold text-gray-900' : 'font-semibold text-gray-900'
              }`}
              numberOfLines={1}
            >
              {otherUser?.full_name ?? 'Unknown User'}
            </Text>
            {item.last_message && (
              <Text className={`text-xs ${hasUnread ? 'text-primary-600 font-semibold' : 'text-gray-400'}`}>
                {formatDistanceToNow(new Date(item.last_message.created_at), {
                  addSuffix: false,
                })}
              </Text>
            )}
          </View>
          <View className="flex-row items-center mt-1">
            <Text
              className={`flex-1 text-sm ${
                hasUnread ? 'text-gray-900 font-medium' : 'text-gray-500'
              }`}
              numberOfLines={1}
            >
              {item.last_message?.content ?? 'No messages yet'}
            </Text>
            {hasUnread && (
              <View className="bg-primary-600 rounded-full min-w-[22px] h-[22px] items-center justify-center ml-2 px-1.5">
                <Text className="text-white text-xs font-bold">{unread}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-4 pb-3">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-2xl font-bold text-gray-900">Messages</Text>
          <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
            <Ionicons name="create-outline" size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Search Messages */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-3.5 py-2.5">
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-sm text-gray-900"
            placeholder="Search conversations..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={
          filteredConversations.length === 0 ? { flex: 1 } : undefined
        }
        ListEmptyComponent={
          isLoading ? (
            <View className="items-center justify-center py-16">
              <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mb-3">
                <Ionicons name="chatbubble-outline" size={24} color="#D1D5DB" />
              </View>
              <Text className="text-gray-400 text-sm">Loading conversations...</Text>
            </View>
          ) : (
            <EmptyState
              icon="chatbubble-outline"
              title="No Messages Yet"
              description="Start a conversation by hiring a pro or responding to a job posting."
              actionLabel="Find a Pro"
              onAction={() => router.push('/(tabs)/search')}
            />
          )
        }
      />
    </SafeAreaView>
  );
}
