import { useCallback } from 'react'

export const useFileUploadSection = ({
  onFileChange,
}: {
  onFileChange: (file: File) => void
}) => {
  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0]
      if (file) {
        onFileChange(file)
      }
    },
    [onFileChange]
  )

  return { handleFileInput }
}
