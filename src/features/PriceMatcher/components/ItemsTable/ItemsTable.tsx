import { Box } from '@mui/material'
import { styles } from './ItemsTable.styles'
import type { ItemsTableProps } from './ItemsTable.types'

const ItemsTable = ({ items, centsToStr }: ItemsTableProps) => {
  const getRowClass = (item: {
    remainingAmount: number
    usedAmount: number
    amount: number
  }): string => {
    const remaining = item.remainingAmount
    const used = item.usedAmount || 0

    if (remaining === 0 && used > 0) {
      return 'row-depleted'
    }
    if (used > 0 && remaining > 0) {
      return 'row-partial'
    }
    return ''
  }

  return (
    <Box sx={styles.tableContainer}>
      <table style={styles.table as React.CSSProperties}>
        <thead style={styles.tableHead as React.CSSProperties}>
          <tr>
            <th style={styles.tableHeadCell as React.CSSProperties}>№</th>
            <th style={styles.tableHeadCell as React.CSSProperties}>Наименование</th>
            <th style={styles.tableHeadCell as React.CSSProperties}>Цена</th>
            <th style={styles.tableHeadCell as React.CSSProperties}>Цена со скидкой</th>
            <th style={styles.tableHeadCell as React.CSSProperties}>Изначально</th>
            <th style={styles.tableHeadCell as React.CSSProperties}>Использовано</th>
            <th style={styles.tableHeadCell as React.CSSProperties}>Осталось</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const rowClass = getRowClass(item)
            const rowStyle = rowClass === 'row-depleted' ? styles.trDepleted
              : rowClass === 'row-partial' ? styles.trPartial
              : {}

            return (
              <tr key={`${item.rowNumber}-${item.name}`} style={{
                ...styles.tableRow,
                ...rowStyle,
              } as React.CSSProperties}>
                <td style={styles.tableCell as React.CSSProperties}>{item.rowNumber || '-'}</td>
                <td style={styles.tableCell as React.CSSProperties}>{item.name}</td>
                <td style={styles.tableCell as React.CSSProperties}>{centsToStr(item.priceCents)}</td>
                <td style={styles.tableCell as React.CSSProperties}>{centsToStr(item.salePriceCents)}</td>
                <td style={styles.tableCell as React.CSSProperties}>{item.originalAmount}</td>
                <td style={styles.tableCell as React.CSSProperties}>{item.usedAmount || 0}</td>
                <td style={styles.tableCell as React.CSSProperties}>{item.remainingAmount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Box>
  )
}

export default ItemsTable
