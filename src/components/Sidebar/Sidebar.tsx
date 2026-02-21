import { Drawer, Box, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { SidebarProps } from './Sidebar.types'
import { styles, stylesSx } from './Sidebar.styles'
import { cn } from '@utils'
import { PAGES } from '@constants'
import { SIDEBAR_MENU_ITEMS } from './Sidebar.constants'

export const Sidebar = ({ onNavigate, isOpen, onClose, activeItem }: SidebarProps) => {

  const isNew = true;
  const handleMenuClick = (id: PAGES) => {
    onNavigate(id)
  }

  if (isNew) {
    return (
      <aside className={styles.sidebar} id="sidebar">
        {/* <div className={styles.header}>
          <h1 className={styles.headerTitle}>📊 Помощник</h1>
          <button className={styles.toggle} onClick={() => "toggleSidebar()"} title="Скрыть/показать меню">
            <span className={styles.toggleSpan}></span>
            <span className={styles.toggleSpan}></span>
            <span className={styles.toggleSpan}></span>
          </button>
        </div>
        <nav className={styles.menu}>
          <button className={cn(styles.menuItem, styles.menuItemActive)} data-app="items-matcher" onClick={() => "switchApp('items-matcher')"}>
            <span className={styles.menuIcon}>📦</span>
            <span className={styles.menuText}>Совпадение артикулов</span>
          </button>
          <button className={styles.menuItem} data-app="price-matcher" onClick={() =>"switchApp('price-matcher')"}>
            <span className={styles.menuIcon}>💰</span>
            <span className={styles.menuText}>Поиск цен</span>
          </button>
        </nav> */}
      </aside>
    )
  }

  return (
    <Drawer variant="temporary" anchor="left" open={isOpen} onClose={onClose} sx={stylesSx.drawer}>
      <Box sx={stylesSx.header}>
        <Typography variant="h6" sx={stylesSx.title}>
          📊 Помощник
        </Typography>
        <IconButton onClick={onClose} sx={stylesSx.closeButton} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ p: 2 }}>
        {SIDEBAR_MENU_ITEMS.map((item) => (
          <ListItemButton
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            sx={stylesSx.menuItemButton(activeItem === item.id)}
          >
            <ListItemIcon sx={stylesSx.menuIcon}>
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
