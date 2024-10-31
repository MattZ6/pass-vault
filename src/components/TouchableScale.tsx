import React, { forwardRef, ReactNode, useCallback, useRef } from 'react'
import { Animated, Pressable, PressableProps, View } from 'react-native'

type Props = Omit<PressableProps, 'style' | 'onPressIn' | 'onPressOut'> & {
  children: ReactNode
}

export const TouchableScale = forwardRef<View, Props>(
  ({ children, ...props }, ref) => {
    const scale = useRef(new Animated.Value(1)).current
    const opacity = scale.interpolate({
      inputRange: [0.96, 1],
      outputRange: [0.4, 1],
    })

    const handlePressIn = useCallback(() => {
      Animated.spring(scale, {
        toValue: 0.96,
        friction: 4,
        useNativeDriver: true,
      }).start()
    }, [scale])

    const handlePressOut = useCallback(() => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start()
    }, [scale])

    return (
      <Pressable
        ref={ref}
        {...props}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={{ opacity, transform: [{ scale }] }}>
          {children}
        </Animated.View>
      </Pressable>
    )
  },
)

TouchableScale.displayName = 'TouchableScale'
