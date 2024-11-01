import { forwardRef } from 'react'
import { View } from 'react-native'

import { useTheme } from '@/hooks/useTheme'

import {
  TouchableScale,
  TouchableScaleProps,
} from '@/components/TouchableScale'

import { View as PerformantView } from '@/lib/View'

import { stylesheet } from './styles'

type Props = TouchableScaleProps

export const IconButton = forwardRef<View, Props>(
  ({ children, ...props }, ref) => {
    const { theme } = useTheme()
    const styles = stylesheet(theme)

    return (
      <PerformantView style={styles.wrapper}>
        <TouchableScale ref={ref} {...props}>
          <PerformantView style={styles.content}>{children}</PerformantView>
        </TouchableScale>
      </PerformantView>
    )
  },
)

IconButton.displayName = 'IconButton'
