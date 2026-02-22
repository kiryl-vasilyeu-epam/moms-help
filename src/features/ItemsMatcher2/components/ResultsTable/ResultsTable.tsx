import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import type { FC } from 'react'
import { styles } from './ResultsTable.styles'
import type { ResultsTableProps } from './ResultsTable.types'
import { COLUMN_WIDTHS, COLUMNS_DETAILS, useResultsTable } from './useResultsTable'
import { getIconByMatchType, getStatusColor } from './ResultTable.helpers'
import { MatchedItem } from '@features/ItemsMatcher/ItemsMatcher.types'


export const ResultsTable: FC<ResultsTableProps> = ({ items, filter, onUnmatchItem, onSelectMatch }) => {
  const { filteredItems } = useResultsTable(items, filter)

  const onMatchCellClick = (item: MatchedItem) => () => {
    const { matchType } = item
    if (matchType === 'none') {
      return onSelectMatch(items.indexOf(item))
    }
    if (matchType === 'fuzzy' || matchType === 'manual') {
      return onSelectMatch(items.indexOf(item))
    }
  }

  return (
    <TableContainer component={Paper} sx={styles.tableContainer}>
      <Table size="small" sx={{ padding: 0, }}>
        <TableHead sx={styles.tableHead}>
          <TableRow>
            {COLUMNS_DETAILS.map(({id, width, label}) => (
              <TableCell key={id} sx={{ ...styles.tableCellHead, width }}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.map((item, index) => (
            <TableRow
              key={index}
              sx={styles.tableRow(item.matchType)}
            >
              <TableCell sx={{ ...styles.tableCell, width: COLUMN_WIDTHS.index }}>
                {index + 1}
              </TableCell>
              <TableCell sx={{ ...styles.tableCell, width: COLUMN_WIDTHS.invNo }}>
                {item.invNo}
              </TableCell>
              <TableCell sx={{ ...styles.tableCell, width: COLUMN_WIDTHS.name }}>
                {item.name}
              </TableCell>
              <TableCell sx={{ ...styles.tableCell, width: COLUMN_WIDTHS.amount }}>
                {Math.round(item.totalAmount)}
              </TableCell>
              <TableCell sx={{ ...styles.tableCell, width: COLUMN_WIDTHS.price }}>
                {item.latestPrice.toFixed(2)}
              </TableCell>
              <TableCell onClick={onMatchCellClick(item)} sx={{ ...styles.matchCell(item.matchType), width: COLUMN_WIDTHS.matched }}>
                {
                !item.matchedInvNo
                ? (
                  <Box sx={styles.unmatchButton}>
                    <span>Выбрать</span>
                  </Box>
                )
                : item.matchType === 'exact'
                ? item.matchedInvNo : (
                  <Tooltip title={item.matchedItem?.rawData || ''}>
                      <Box sx={styles.matchDropdownButton}>
                        <span>{item.matchedInvNo}</span>
                        <Button
                          size="small"
                          variant="text"
                          onClick={(e) => {
                            e.stopPropagation()
                            onUnmatchItem(items.indexOf(item))
                          }}
                          sx={{ minWidth: 'auto', p: 0, color: '#e74c3c' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </Box>
                    </Tooltip>
                  )}
                
              </TableCell>
              <TableCell sx={{ ...styles.statusCell, width: COLUMN_WIDTHS.status, color: getStatusColor(item.matchType) }}>
                {getIconByMatchType(item.matchType)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
