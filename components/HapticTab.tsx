import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Pressable, PressableProps } from 'react-native';
import * as Haptics from 'expo-haptics';

export function HapticTab({ onPressIn, ...rest }: BottomTabBarButtonProps) {
  // Extract only the props that Pressable can handle
  const pressableProps: PressableProps = {
    onPress: rest.onPress,
    onPressIn: (ev) => {
      if (process.env.EXPO_OS === 'ios') {
        // Add a soft haptic feedback when pressing down on the tabs.
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      onPressIn?.(ev);
    },
    onPressOut: rest.onPressOut,
    onLongPress: rest.onLongPress,
    disabled: rest.disabled,
    style: rest.style,
    testID: rest.testID,
    accessibilityLabel: rest.accessibilityLabel,
    accessibilityRole: rest.accessibilityRole,
    accessibilityState: rest.accessibilityState,
    accessibilityHint: rest.accessibilityHint,
    accessibilityActions: rest.accessibilityActions,
    onAccessibilityAction: rest.onAccessibilityAction,
  };

  return <Pressable {...pressableProps} />;
}
