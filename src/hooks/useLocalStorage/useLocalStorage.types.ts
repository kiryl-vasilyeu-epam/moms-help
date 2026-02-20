export interface UseLocalStorageOptions {
  serializer?: (value: unknown) => string
  deserializer?: (value: string) => unknown
}
