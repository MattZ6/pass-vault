import { MMKV } from 'react-native-mmkv'

export const globalInstance = new MMKV({
  id: 'com.passvault.global',
  encryptionKey: 'pass.vault.key#!',
})
