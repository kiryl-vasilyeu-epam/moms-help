import { useTranslation } from 'react-i18next'
import { styles } from "./ItemsMatcher.styles"
import { FileUploadButton, Button, StatsBox, FilterButton } from '@components'
import { FILTERS, STATS } from './ItemsMatcher.constants'
import { ItemsMatherTable } from './components'
import { useItemsMatcher } from './ItemsMatcher.hooks'

export const ItemsMatcher = () => {
  const { t } = useTranslation()

  const {
    fileUpload1C,
    fileUploadFusion,
    isProcessDisabled,
    currentFilter,
    setCurrentFilter,
    showResults,
    handleProcess,
    handleClear,
    stats,
    handleDownload,
    handleTransfer,
  } = useItemsMatcher()

  return (
    
    <div css={styles.container}>
      <h1>{t("itemMatcher.title")}</h1>
      
      <div css={styles.uploadSection}>
        <FileUploadButton
          label={t("itemMatcher.file1Label")}
          fileName={fileUpload1C.fileName}
          onFileSelect={fileUpload1C.handleFileChange}
          isFileReady={fileUpload1C.isReady}
        />
        
        <FileUploadButton
          label={t("itemMatcher.file2Label")}
          fileName={fileUploadFusion.fileName}
          onFileSelect={fileUploadFusion.handleFileChange}
          isFileReady={fileUploadFusion.isReady}
        />
      </div>
      
      <div css={styles.buttonRow}>
        <Button
          variant="primary"
          disabled={isProcessDisabled}
          onClick={handleProcess}
          style={styles.processButton}
        >
          {t("itemMatcher.processBtn")}
        </Button>
        <Button
          variant="danger"
          onClick={handleClear}
          title={t("itemMatcher.clearBtn")}
        >
              ✕
        </Button>
      </div>
    
      {showResults && (
        <>
          <div css={styles.buttonRow}>
            <Button
              variant="success"
              onClick={handleDownload}
            >
              {t("itemMatcher.downloadBtn")}
            </Button>
    
            <Button
              variant="info"
              onClick={handleTransfer}
            >
              {t("itemMatcher.transferBtn")}
            </Button>
          </div>

          <div css={styles.results}>
            <div css={styles.stats}>
              {STATS.map(stat => (
                <StatsBox
                  key={stat.id}
                  label={t(stat.label)}
                  amount={stats[stat.id]}
                />
              ))}
            </div>
        
            <div css={styles.filterButtons}>
              {FILTERS.map(filter => (
                <FilterButton
                  key={filter.id}
                  label={t(filter.label)}
                  value={filter.id}
                  isActive={currentFilter === filter.id}
                  handleClick={setCurrentFilter}
                />))}
            </div>
        
            <ItemsMatherTable />

          </div>
        </>
      )}

    </div>
  )
}