import { useState } from 'react'
import { Drawer, Box, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { SidebarProps } from './Sidebar.types'
import { styles } from './Sidebar.styles'
import { PAGES } from '@constants'
import { SIDEBAR_MENU_ITEMS } from './Sidebar.constants'

export const Sidebar = ({ onNavigate, isOpen, onClose }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState<PAGES>(PAGES.ITEMS)

  const handleMenuClick = (id: PAGES) => {
    setActiveItem(id)
    onNavigate(id)
  }

  return (
    <Drawer variant="persistent" anchor="left" open={isOpen} sx={styles.drawer}>
      <Box sx={styles.header}>
        <Typography variant="h6" sx={styles.title}>
          📊 Помощник
        </Typography>
        <IconButton onClick={onClose} sx={styles.closeButton} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ p: 2 }}>
        {SIDEBAR_MENU_ITEMS.map((item) => (
          <ListItemButton
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            sx={styles.menuItemButton(activeItem === item.id)}
          >
            <ListItemIcon sx={styles.menuIcon}>
              <span>{item.icon}</span>
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
