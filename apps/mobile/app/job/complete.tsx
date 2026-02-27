import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { completeJob } from '@renonext/shared/api/jobs';
import { supabase } from '@renonext/shared/api/supabase';
import { Rating } from '@renonext/ui/Rating';
import { Button } from '@renonext/ui/Button';
import { Input } from '@renonext/ui/Input';

const MAX_REVIEW_LENGTH = 500;
const TIP_PRESETS = ['5', '10', '20', '50'];

export default function CompleteJobScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const router = useRouter();
  const [overallRating, setOverallRating] = useState(5);
  const [qualityRating, setQualityRating] = useState(5);
  const [punctualityRating, setPunctualityRating] = useState(5);
  const [communicationRating, setCommunicationRating] = useState(5);
  const [valueRating, setValueRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [tipAmount, setTipAmount] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickPhotos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 5 - photos.length,
    });
    if (!result.canceled) {
      setPhotos((prev) => [...prev, ...result.assets.map((a) => a.uri)]);
    }
  };

  const handleSubmit = async () => {
    if (!jobId) return;
    setIsSubmitting(true);
    try {
      await completeJob(jobId);

      const { data: { user } } = await supabase.auth.getUser();
      if (user && reviewText.trim()) {
        await supabase.from('reviews').insert({
          job_id: jobId,
          reviewer_id: user.id,
          reviewee_id: '',
          rating: overallRating,
          comment: reviewText,
          photos,
          is_from_client: true,
        });
      }

      Alert.alert(
        'Job Completed!',
        'Thank you for your review. Payment will be processed shortly.',
        [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
      );
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to complete job';
      Alert.alert('Error', msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingLabel = (rating: number) => {
    if (rating >= 5) return 'Excellent';
    if (rating >= 4) return 'Great';
    if (rating >= 3) return 'Good';
    if (rating >= 2) return 'Fair';
    return 'Poor';
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingVertical: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Celebration Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-secondary-50 rounded-full items-center justify-center mb-4">
              <Ionicons name="checkmark-circle" size={48} color="#059669" />
            </View>
            <Text className="text-2xl font-bold text-gray-900">Job Complete!</Text>
            <Text className="text-base text-gray-500 mt-1 text-center">
              How was your experience with this pro?
            </Text>
          </View>

          {/* Overall Rating */}
          <View
            className="bg-white rounded-2xl p-6 mb-4 items-center"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Overall Rating
            </Text>
            <Rating
              rating={overallRating}
              size="lg"
              interactive
              onRatingChange={setOverallRating}
            />
            <Text className="text-base font-semibold text-primary-600 mt-2">
              {ratingLabel(overallRating)}
            </Text>
          </View>

          {/* Category Ratings */}
          <View
            className="bg-white rounded-2xl p-5 mb-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 3,
              elevation: 1,
            }}
          >
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Rate by Category
            </Text>

            <View className="gap-4">
              {[
                { label: 'Quality of Work', icon: 'star-outline', rating: qualityRating, setter: setQualityRating },
                { label: 'Punctuality', icon: 'time-outline', rating: punctualityRating, setter: setPunctualityRating },
                { label: 'Communication', icon: 'chatbubble-outline', rating: communicationRating, setter: setCommunicationRating },
                { label: 'Value for Money', icon: 'cash-outline', rating: valueRating, setter: setValueRating },
              ].map((cat) => (
                <View key={cat.label} className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center mr-2.5">
                      <Ionicons name={cat.icon as any} size={16} color="#6B7280" />
                    </View>
                    <Text className="text-sm font-medium text-gray-700">{cat.label}</Text>
                  </View>
                  <Rating
                    rating={cat.rating}
                    size="sm"
                    interactive
                    onRatingChange={cat.setter}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Written Review */}
          <View
            className="bg-white rounded-2xl p-5 mb-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 3,
              elevation: 1,
            }}
          >
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Write a Review
            </Text>
            <TextInput
              className="bg-gray-50 rounded-xl p-4 text-base text-gray-900 min-h-[120px]"
              placeholder="Share your experience with this pro..."
              placeholderTextColor="#9CA3AF"
              multiline
              value={reviewText}
              onChangeText={(text) => setReviewText(text.slice(0, MAX_REVIEW_LENGTH))}
              textAlignVertical="top"
            />
            <Text className="text-xs text-gray-400 text-right mt-1.5">
              {reviewText.length}/{MAX_REVIEW_LENGTH}
            </Text>
          </View>

          {/* Review Photos */}
          <View
            className="bg-white rounded-2xl p-5 mb-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 3,
              elevation: 1,
            }}
          >
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Add Photos (optional)
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {photos.map((uri, i) => (
                <View key={uri} className="w-20 h-20 rounded-xl overflow-hidden relative">
                  <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
                  <TouchableOpacity
                    onPress={() => setPhotos((prev) => prev.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 bg-black/60 rounded-full w-6 h-6 items-center justify-center"
                  >
                    <Ionicons name="close" size={14} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
              {photos.length < 5 && (
                <TouchableOpacity
                  onPress={pickPhotos}
                  className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 items-center justify-center bg-gray-50"
                >
                  <Ionicons name="camera-outline" size={24} color="#9CA3AF" />
                  <Text className="text-xs text-gray-400 mt-0.5">{photos.length}/5</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Tip Option */}
          <View
            className="bg-white rounded-2xl p-5 mb-6"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 3,
              elevation: 1,
            }}
          >
            <View className="flex-row items-center mb-1">
              <View className="w-8 h-8 bg-amber-50 rounded-lg items-center justify-center mr-2.5">
                <Ionicons name="heart-outline" size={16} color="#D97706" />
              </View>
              <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Add a Tip
              </Text>
            </View>
            <Text className="text-sm text-gray-500 mb-4 ml-10">
              Show your appreciation for great work
            </Text>
            <View className="flex-row gap-2 mb-3">
              {TIP_PRESETS.map((amount) => (
                <TouchableOpacity
                  key={amount}
                  onPress={() => setTipAmount(tipAmount === amount ? '' : amount)}
                  className={`flex-1 py-3 rounded-xl border-2 items-center ${
                    tipAmount === amount
                      ? 'bg-primary-600 border-primary-600'
                      : 'bg-white border-gray-200'
                  }`}
                  activeOpacity={0.7}
                >
                  <Text
                    className={`text-base font-bold ${
                      tipAmount === amount ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    ${amount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Input
              placeholder="Or enter custom amount"
              keyboardType="numeric"
              value={TIP_PRESETS.includes(tipAmount) ? '' : tipAmount}
              onChangeText={(val) => setTipAmount(val)}
              leftIcon={<Text className="text-gray-400 font-bold">$</Text>}
            />
          </View>

          <Button
            variant="primary"
            size="lg"
            loading={isSubmitting}
            onPress={handleSubmit}
            leftIcon={<Ionicons name="send-outline" size={18} color="#ffffff" />}
          >
            Submit Review & Complete
          </Button>

          <View className="h-8" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
