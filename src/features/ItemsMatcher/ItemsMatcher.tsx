import { useTranslation } from 'react-i18next'
import { styles } from "./ItemsMatcher.styles"
import { FileUploadButton, Button } from '@components'

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
      <div
        css={styles.results}
        id="results"
        style={{ display: 'none' }}
      >
        <div css={styles.stats}>
          <div css={styles.statBox}>
            <h4 css={styles.statBoxH4}>{t("itemMatcher.totalItems")}</h4>
            <p
              css={styles.statBoxP}
              id="totalItems"
            >0</p>
          </div>
          <div css={styles.statBox}>
            <h4 css={styles.statBoxH4}>{t("itemMatcher.matchedItems")}</h4>
            <p
              css={styles.statBoxP}
              id="matchedItems"
            >0</p>
          </div>
          <div css={styles.statBox}>
            <h4 css={styles.statBoxH4}>{t("itemMatcher.fuzzyItems")}</h4>
            <p
              css={styles.statBoxP}
              id="fuzzyItems"
            >0</p>
          </div>
          <div css={styles.statBox}>
            <h4 css={styles.statBoxH4}>{t("itemMatcher.manualItems")}</h4>
            <p
              css={styles.statBoxP}
              id="manualItems"
            >0</p>
          </div>
          <div css={styles.statBox}>
            <h4 css={styles.statBoxH4}>{t("itemMatcher.unmatchedItems")}</h4>
            <p
              css={styles.statBoxP}
              id="unmatchedItems"
            >0</p>
          </div>
        </div>
        
        <div css={styles.filterButtons}>
          <button
            css={styles.filterBtn}
            data-filter="all"
            onClick={() => setFilter('all')}
          >{t("itemMatcher.filterAll")}</button>
          <button
            css={styles.filterBtn}
            data-filter="exact"
            onClick={() => setFilter('exact')}
          >{t("itemMatcher.filterExact")}</button>
          <button
            css={styles.filterBtn}
            data-filter="fuzzy"
            onClick={() => setFilter('fuzzy')}
          >{t("itemMatcher.filterFuzzy")}</button>
          <button
            css={styles.filterBtn}
            data-filter="manual"
            onClick={() => setFilter('manual')}
          >{t("itemMatcher.filterManual")}</button>
          <button
            css={styles.filterBtn}
            data-filter="unmatched"
            onClick={() => setFilter('unmatched')}
          >{t("itemMatcher.filterUnmatched")}</button>
        </div>
        
        <table css={styles.table}>
          <thead>
            <tr>
              <th css={styles.tableHeader}>{t("itemMatcher.tableHeaders.number")}</th>
              <th css={styles.tableHeader}>{t("itemMatcher.tableHeaders.article1c")}</th>
              <th css={styles.tableHeader}>{t("itemMatcher.tableHeaders.name")}</th>
              <th css={styles.tableHeader}>{t("itemMatcher.tableHeaders.quantity")}</th>
              <th css={styles.tableHeader}>{t("itemMatcher.tableHeaders.price")}</th>
              <th css={styles.tableHeader}>{t("itemMatcher.tableHeaders.articleFusion")}</th>
              <th css={styles.tableHeader}>{t("itemMatcher.tableHeaders.status")}</th>
            </tr>
          </thead>
          <tbody id="tableBody"></tbody>
        </table>
      </div>
    </div>
  )
}