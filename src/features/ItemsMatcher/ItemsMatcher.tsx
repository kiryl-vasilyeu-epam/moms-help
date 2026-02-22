import { useTranslation } from 'react-i18next'
import { styles } from "./ItemsMatcher.styles"
import { FileUploadButton, Button, StatsBox, FilterButton } from '@components'
import { FILTERS, STATS } from './ItemsMatcher.constants'
import { ItemsMatherTable } from './components'

const clearLocalStorage = () => {
  // TODO: Implement clear localStorage functionality
  console.log("Clear localStorage")
}

const downloadXLS = () => {
  // TODO: Implement download XLS functionality
  console.log("Download XLS")
}

const transferToPriceMatcher = () => {
  // TODO: Implement transfer to PriceMatcher functionality
  console.log("Transfer to PriceMatcher")
}

const setFilter = (filter: string) => {
  // TODO: Implement filter functionality
  console.log("Set filter:", filter)
}

const processFiles = () => {
  // TODO: Implement file processing functionality
  console.log("Process files")
}

export const ItemsMatcher = () => {
  const { t } = useTranslation()
  const isProcessDisabled = true;
  const statsResult = {
    total: 0,
    exact: 0,
    fuzzy: 0,
    manual: 0,
    unmatched: 0
  }
  const activeFilter = 'all';

  return (
    
    <div css={styles.container}>
      <h1>{t("itemMatcher.title")}</h1>
      
      <div css={styles.uploadSection}>
        <FileUploadButton
          label={t("itemMatcher.file1Label")}
          fileName=""
        />
        
        <FileUploadButton
          label={t("itemMatcher.file2Label")}
          fileName=""
        />
      </div>
      
      <div css={styles.buttonRow}>
        <Button
          variant="primary"
          disabled={isProcessDisabled}
          onClick={processFiles}
          style={styles.processButton}
        >
          {t("itemMatcher.processBtn")}
        </Button>
        <Button
          variant="danger"
          onClick={clearLocalStorage}
          title={t("itemMatcher.clearBtn")}
        >
              ✕
        </Button>
      </div>
    
      <div css={styles.buttonRow}>
        <Button
          variant="success"
          onClick={downloadXLS}
        >
          {t("itemMatcher.downloadBtn")}
        </Button>
    
        <Button
          variant="info"
          onClick={transferToPriceMatcher}
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
              amount={statsResult[stat.id]}
            />
          ))}
        </div>
        
        <div css={styles.filterButtons}>
          {FILTERS.map(filter => (
            <FilterButton
              key={filter.id}
              label={t(filter.label)}
              value={filter.id}
              isActive={activeFilter === filter.id}
              onClick={() => setFilter(filter.id)}
            />))}
        </div>
        
        <ItemsMatherTable />

      </div>
    </div>
  )
}