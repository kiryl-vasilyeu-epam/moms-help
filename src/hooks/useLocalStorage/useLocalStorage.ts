import { useState } from 'react'
import type { UseLocalStorageOptions } from './useLocalStorage.types'

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageOptions,
): [T, (value: T) => void] => {
  const serializer = options?.serializer ?? JSON.stringify
  const deserializer = options?.deserializer ?? JSON.parse

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
      return item ? (deserializer(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serializer(value))
      }
    } catch (error) {
      console.warn(`Failed to store value in localStorage for key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
