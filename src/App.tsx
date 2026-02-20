import { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Sidebar } from '@components'
import { styles } from './App.styles'
import { PAGES } from '@constants'
import { ItemsMatcher, PriceMatcher } from '@features'

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState<PAGES>(PAGES.ITEMS)
  const openSidebar = () => setSidebarOpen(true)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <Box sx={styles.root}>
      <Sidebar onNavigate={setCurrentPage} isOpen={sidebarOpen} onClose={closeSidebar} />
      <Box component="main" sx={styles.main}>
        {!sidebarOpen && (
          <IconButton onClick={openSidebar} sx={styles.hamburgerButton}>
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
