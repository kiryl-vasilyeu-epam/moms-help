import { createSxStyles } from '@utils'
import { MatchType } from '@features/ItemsMatcher/ItemsMatcher.types'
import { getStatusColor } from './ResultTable.helpers'
import { SxProps } from '@mui/material'

export const styles = createSxStyles({
  tableContainer: {
    mt: 2,
    overflowY: 'scroll',
    maxWidth: 1200,
    minWidth: 1200,
    mx: 'auto',
  },
  tableHead: {
    background: '#667eea',
    '& th': {
      borderRight: '1px solid #e0e0e0',
      '&:last-child': {
        borderRight: 'none',
      },
    },
  },
  tableCellHead: {
    color: 'white',
    fontWeight: 600,
    borderRight: '1px solid #e0e0e0',
    '&:last-child': {
      borderRight: 'none',
    },
  },
  tableRow: (matchedStatus: MatchType) => ({
    '&:hover': {
      background: '#f7f7f7'
    },
    height: '7rem',
    boxShadow: `inset 0 0 0 3px ${ matchedStatus === 'exact' ? 'transparent' :getStatusColor(matchedStatus)}`,
  }),
  tableCell: {
    fontSize: 16,
    borderRight: '1px solid #e0e0e0',
    verticalAlign: 'middle',
    '&:last-child': {
      borderRight: 'none',
    },
  },
  matchCell: (matchedStatus: MatchType): SxProps => {
    switch (matchedStatus) {
      case 'exact':
        return {
          fontSize: 16,
          borderRight: '1px solid #e0e0e0',
          verticalAlign: 'middle',
          '&:last-child': {
            borderRight: 'none',
          },
        }
      case 'fuzzy':
      case 'manual':
        return {
          cursor: 'pointer',
        }
      default:
        return {
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          textAlign: 'center',
          color: 'white',
          fontSize: 14,
          fontWeight: 600,
        }
    }
  },
  matchDropdownButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'linear-gradient(135deg, #f9da77 0%, #faab95 100%)',
    '&:hover': { background: 'linear-gradient(135deg, #f9da77 0%, #faab95 60%)'},
    height: 40,
    p: 2,
    borderRadius: 2,
  },
  unmatchButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    '&:hover': { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 60%)'},
    height: 40,
    p: 2,
    borderRadius: 2,
  },
  statusCell: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    borderRight: 'none',
  },
})
