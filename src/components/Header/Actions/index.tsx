import { ReactNode } from 'react'

import { useTheme } from '@/hooks/useTheme'

import { View } from '@/lib/View'

import { stylesheet } from './styles'

export type HeaderActionsProps = {
  children: ReactNode
}

export function HeaderActions(props: HeaderActionsProps) {
  const { theme } = useTheme()
  const styles = stylesheet(theme)

  return <View {...props} style={styles.actions} />
}
