import { Box, Typography } from '@mui/material'
import { usePriceMatcher } from './PriceMatcher.hooks'
import { styles } from './PriceMatcher.styles'
import { FileUploadSection } from './components/FileUploadSection'
import { CalculationSection } from './components/CalculationSection'
import ItemsTable from './components/ItemsTable/ItemsTable'
import ResultsSection from './components/ResultsSection/ResultsSection'
import NoSolutionModal from './components/NoSolutionModal/NoSolutionModal'
import { LoadingOverlay } from './components/LoadingOverlay'

const PriceMatcher = () => {
  const {
    items,
    usageHistory,
    loading,
    loadingText,
    failedCalculations,
    showNoSolutionModal,
    setShowNoSolutionModal,
    handleFileUpload,
    handleCalculate,
    handleRemoveCalculation,
    handleReset,
    handleExportRemainingItems,
    handleExportCalculations,
    centsToStr,
  } = usePriceMatcher()

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        💰 Калькулятор цен
      </Typography>

      <FileUploadSection
        fileName={items.length > 0 ? '✓ Файл загружен' : ''}
        onFileChange={handleFileUpload}
        onReset={handleReset}
        isDisabled={loading}
      />

      {items.length > 0 && (
        <>
          <ItemsTable items={items} centsToStr={centsToStr} />
          <CalculationSection
            itemsCount={items.length}
            isLoading={loading}
            onCalculate={handleCalculate}
          />

          {usageHistory.length > 0 && (
            <ResultsSection
              usageHistory={usageHistory}
              items={items}
              onRemoveCalculation={handleRemoveCalculation}
              centsToStr={centsToStr}
              onExportRemainingItems={handleExportRemainingItems}
              onExportCalculations={handleExportCalculations}
            />
          )}
        </>
      )}

      {loading && <LoadingOverlay loadingText={loadingText} />}

      <NoSolutionModal
        open={showNoSolutionModal}
        onClose={() => setShowNoSolutionModal(false)}
        failedCalculations={failedCalculations}
        centsToStr={centsToStr}
      />
    </Box>
  )
}

export default PriceMatcher
