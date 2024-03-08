import { useMMKVObject } from 'react-native-mmkv'

import { globalInstance } from '@/lib/mmkv'

type Provider = {
  id: string
  name: string
  account: string
  password: string
}

export function useProviders() {
  return useMMKVObject<Provider[]>('providers', globalInstance)
}
