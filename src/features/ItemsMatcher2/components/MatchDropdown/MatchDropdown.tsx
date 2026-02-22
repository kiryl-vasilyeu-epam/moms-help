import { Dialog, DialogTitle, DialogContent, TextField, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import type { FC } from 'react'
import { styles } from './MatchDropdown.styles'
import type { MatchDropdownProps } from './MatchDropdown.types'
import { useMatchDropdown } from './useMatchDropdown'

export const MatchDropdown: FC<MatchDropdownProps> = ({ open, items, onSelect, onClose }) => {
  const { searchText, filteredItems, updateSearch } = useMatchDropdown(items)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Выберите совпадение</DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <TextField
          fullWidth
          placeholder="Поиск..."
          value={searchText}
          onChange={(e) => updateSearch(e.target.value)}
          size="small"
          sx={styles.searchField}
          autoFocus
        />
        <List sx={styles.list}>
          {filteredItems.map((item) => {
            const actualIndex = items.indexOf(item)
            return (
              <ListItem key={actualIndex} disablePadding>
                <ListItemButton
                  onClick={() => {
                    onSelect(actualIndex)
                    onClose()
                  }}
                >
                  <ListItemText primary={`${item.invNo} ${item.name}`} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </DialogContent>
    </Dialog>
  )
}
