import { Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Sidebar } from '@components'
import { ItemsMatcher, PriceMatcher } from '@features'
import { styles } from './App.styles'
import { PAGES, STORAGE_KEYS } from '@constants'
import { useLocalStorage } from '@hooks'
import { useState } from 'react'

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useLocalStorage(STORAGE_KEYS.CURRENT_PAGE, PAGES.ITEMS)

  const handleCloseSidebar = () => setSidebarOpen(false)
  const handleOpenSidebar = () => setSidebarOpen(true)

  return (
    <Box sx={styles.root}>
      <Sidebar activeItem={currentPage} onNavigate={setCurrentPage} isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      <Box component="main" sx={styles.main}>
        {!sidebarOpen && (
          <IconButton onClick={handleOpenSidebar} sx={styles.hamburgerButton}>
            <MenuIcon />
          </IconButton>
        )}
        {currentPage === PAGES.ITEMS && <ItemsMatcher />}
        {currentPage === PAGES.PRICE && <PriceMatcher />}
      </Box>
    </Box>
  )
}

export default App
