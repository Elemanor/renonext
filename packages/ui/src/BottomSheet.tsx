import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  PanResponder,
  type LayoutChangeEvent,
} from 'react-native';

export interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  snapPoints?: number[];
  className?: string;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const DEFAULT_SNAP_POINTS = [0.5];
const DRAG_THRESHOLD = 100;

export function BottomSheet({
  isVisible,
  onClose,
  title,
  children,
  snapPoints = DEFAULT_SNAP_POINTS,
  className = '',
}: BottomSheetProps): React.JSX.Element {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetHeight = useRef(SCREEN_HEIGHT * snapPoints[0]);
  const currentTranslateY = useRef(SCREEN_HEIGHT);

  useEffect(() => {
    if (isVisible) {
      const targetHeight = SCREEN_HEIGHT * snapPoints[0];
      sheetHeight.current = targetHeight;
      const targetY = SCREEN_HEIGHT - targetHeight;

      Animated.parallel([
        Animated.spring(translateY, {
          toValue: targetY,
          useNativeDriver: true,
          damping: 20,
          stiffness: 150,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
      currentTranslateY.current = targetY;
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      currentTranslateY.current = SCREEN_HEIGHT;
    }
  }, [isVisible, snapPoints, translateY, backdropOpacity]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        const newTranslateY = currentTranslateY.current + gestureState.dy;
        const minY = SCREEN_HEIGHT - sheetHeight.current;
        if (newTranslateY >= minY) {
          translateY.setValue(newTranslateY);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > DRAG_THRESHOLD) {
          onClose();
        } else {
          const targetY = SCREEN_HEIGHT - sheetHeight.current;
          Animated.spring(translateY, {
            toValue: targetY,
            useNativeDriver: true,
            damping: 20,
            stiffness: 150,
          }).start();
          currentTranslateY.current = targetY;
        }
      },
    }),
  ).current;

  const onSheetLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0) {
      sheetHeight.current = height;
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1">
        {/* Backdrop */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            className="absolute inset-0 bg-black"
            style={{ opacity: backdropOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
            })}}
          />
        </TouchableWithoutFeedback>

        {/* Sheet */}
        <Animated.View
          style={{
            transform: [{ translateY }],
            height: SCREEN_HEIGHT * snapPoints[0],
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
          }}
          onLayout={onSheetLayout}
          className={`bg-white rounded-t-2xl ${className}`.trim()}
        >
          {/* Drag Handle */}
          <View
            className="items-center pt-3 pb-2"
            {...panResponder.panHandlers}
          >
            <View className="w-10 h-1 rounded-full bg-gray-300" />
          </View>

          {/* Title */}
          {title ? (
            <View className="px-4 pb-3 border-b border-gray-100">
              <Text className="text-lg font-semibold text-gray-900 text-center">
                {title}
              </Text>
            </View>
          ) : null}

          {/* Content */}
          <View className="flex-1 px-4 pt-2">
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
