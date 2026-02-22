import { useTranslation } from "react-i18next"
import { styles } from "./ItemsMatherTable.styles"

export const ItemsMatherTable = () => {
  const { t } = useTranslation()

  return (
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
  )
}