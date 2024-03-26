import { useTheme } from '@/hooks/useTheme'

import { View } from '@/lib/View'

import { stylesheet } from './styles'

export type SectionDividerProps = {
  //
}

export function SectionDivider(props: SectionDividerProps) {
  const { theme } = useTheme()
  const styles = stylesheet(theme)

  return <View {...props} style={styles.divider} />
}
