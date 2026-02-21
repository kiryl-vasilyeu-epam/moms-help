import { useCallback } from 'react'
import type { FileUploadSectionProps } from './FileUploadSection.types'

export const useFileUploadSection = ({ onFile1Change, onFile2Change }: Pick<FileUploadSectionProps, 'onFile1Change' | 'onFile2Change'>) => {
  const handleFile1Input = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFile1Change(file)
  }, [onFile1Change])

  const handleFile2Input = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFile2Change(file)
  }, [onFile2Change])

  return {
    handleFile1Input,
    handleFile2Input,
  }
}
