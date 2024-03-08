// import React, { useMemo } from 'react'
// import type { ViewProps } from 'react-native'
// import {
//   TapGestureHandler,
//   TapGestureHandlerGestureEvent,
// } from 'react-native-gesture-handler'
// import Reanimated, {
//   cancelAnimation,
//   runOnJS,
//   withDelay,
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
//   WithSpringConfig,
// } from 'react-native-reanimated'

// export const PRESSABLE_IN_LIST_DELAY = 50 // react-native uses 130ms for this

// export interface NativePressableScaleProps
//   extends ViewProps,
//     Partial<Omit<WithSpringConfig, 'mass'>> {}

// /**
//  * A Pressable that scales down when pressed. Uses the native responder system from react-native-gesture-handler instead of the JS Pressability API.
//  */
// export function NativePressableScale(
//   props: NativePressableScaleProps,
// ): React.ReactElement {
//   const {
//     activeScale = 0.95,
//     isInList,
//     damping = 15,
//     weight = 'heavy',
//     stiffness = 150,
//     overshootClamping = true,
//     restSpeedThreshold = 0.001,
//     restDisplacementThreshold = 0.001,
//     disabled = false,
//     ref,
//     style,
//     onPress,
//     ...passThroughProps
//   } = props

//   const mass = useMemo(() => {
//     switch (weight) {
//       case 'light':
//         return 0.15
//       case 'medium':
//         return 0.2
//       case 'heavy':
//       default:
//         return 0.3
//     }
//   }, [weight])

//   const scale = useSharedValue(1)
//   const springConfig = useMemo<WithSpringConfig>(
//     () => ({
//       damping,
//       mass,
//       stiffness,
//       overshootClamping,
//       restSpeedThreshold,
//       restDisplacementThreshold,
//     }),
//     [
//       damping,
//       mass,
//       overshootClamping,
//       restDisplacementThreshold,
//       restSpeedThreshold,
//       stiffness,
//     ],
//   )
//   const animatedStyle = useAnimatedStyle(
//     () => ({ transform: [{ scale: scale.value }] }),
//     [scale],
//   )

//   const onGestureEvent =
//     useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
//       {
//         onStart: () => {
//           cancelAnimation(scale)
//           scale.value = isInList
//             ? withDelay(
//                 PRESSABLE_IN_LIST_DELAY,
//                 withSpring(activeScale, springConfig),
//               )
//             : withSpring(activeScale, springConfig)
//         },
//         onEnd: () => {
//           runOnJS(onPress)()
//         },
//         onFinish: () => {
//           cancelAnimation(scale)
//           scale.value = withSpring(1, springConfig)
//         },
//       },
//       [scale, isInList, activeScale, springConfig, onPress],
//     )

//   return (
//     <TapGestureHandler
//       ref={ref}
//       onGestureEvent={onGestureEvent}
//       enabled={!disabled}
//       shouldCancelWhenOutside={true}
//     >
//       <Reanimated.View style={[style, animatedStyle]} {...passThroughProps} />
//     </TapGestureHandler>
//   )
// }
