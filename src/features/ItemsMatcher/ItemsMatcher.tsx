import { Box, Typography, Button, IconButton, CircularProgress } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { FileUploadSection, StatsSection, FilterButtons, ResultsTable, MatchDropdown, ActionButtons } from './components'
import { getStats } from './ItemsMatcher.helpers'
import { SECTION_TITLES, BUTTON_LABELS } from './ItemsMatcher.constants'
import { styles } from './ItemsMatcher.styles'
import { useItemsMatcher } from './ItemsMatcher.hooks'

const ItemsMatcher = () => {
  const {
    fileUpload,
    allResults,
    file2Items,
    currentFilter,
    setCurrentFilter,
    showResults,
    handleProcess,
    handleClear,
    handleSelectMatch,
    handleSelectMatchItem,
    handleUnmatchItem,
    dropdownOpen,
    setDropdownOpen,
    setSelectedItemIndex,
  } = useItemsMatcher()

  const stats = getStats(allResults)

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        {SECTION_TITLES.main}
      </Typography>

      <FileUploadSection
        file1Name={fileUpload.file1Name}
        file2Name={fileUpload.file2Name}
        onFile1Change={fileUpload.handleFile1Change}
        onFile2Change={fileUpload.handleFile2Change}
      />

      <Box sx={styles.buttonRow}>
        <Button
          fullWidth
          variant="contained"
          disabled={!fileUpload.isReady || fileUpload.loading}
          onClick={handleProcess}
          startIcon={fileUpload.loading ? <CircularProgress size={20} /> : <PlayArrowIcon />}
          sx={styles.processButton}
        >
          {BUTTON_LABELS.process}
        </Button>
        <IconButton
          color="error"
          onClick={handleClear}
          sx={styles.clearButton}
        >
          <ClearIcon />
        </IconButton>
      </Box>
      {showResults && (
        <ActionButtons results={allResults} show={true} />
      )}

      <Box sx={styles.resultsSection}>
        {showResults && (
          <Box>
            <StatsSection stats={stats} />
            <FilterButtons currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
            <ResultsTable
              items={allResults}
              filter={currentFilter}
              onUnmatchItem={handleUnmatchItem}
              onSelectMatch={handleSelectMatch}
            />
          </Box>
        )}
      </Box>

      <MatchDropdown
        open={dropdownOpen}
        items={file2Items}
        onSelect={handleSelectMatchItem}
        onClose={() => {
          setDropdownOpen(false)
          setSelectedItemIndex(null)
        }}
      />
    </Box>
  )
}

export default ItemsMatcher
