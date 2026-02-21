import { useCallback } from 'react'

export const useCalculationSection = ({
  onCalculate,
}: {
  onCalculate: (sums: string) => void
}) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.ctrlKey && e.key === 'Enter') {
        const input = e.currentTarget
        onCalculate(input.value)
        input.value = ''
      }
    },
    [onCalculate]
  )

  const handleCalculateClick = useCallback(() => {
    const input = document.getElementById('sumsInput') as HTMLTextAreaElement
    if (input) {
      onCalculate(input.value)
      input.value = ''
    }
  }, [onCalculate])

  return { handleKeyDown, handleCalculateClick }
}
