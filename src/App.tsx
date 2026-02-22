import { Sidebar } from '@components'
import { ItemsMatcher, PriceMatcher } from '@features'
import { globalStyles, styles } from './App.styles'
import { PAGES, STORAGE_KEYS } from '@constants'
import { useLocalStorage } from '@hooks'
import { Global } from '@emotion/react'

export const App = () => {
  const [currentPage, setCurrentPage] = useLocalStorage(STORAGE_KEYS.CURRENT_PAGE, PAGES.ITEMS)

  return (
    <div css={styles.root}>
      <Global styles={globalStyles} />
      <Sidebar
        activeItem={currentPage}
        onNavigate={setCurrentPage}
      />
      <main css={styles.main}>
        {currentPage === PAGES.ITEMS && <ItemsMatcher />}
        {currentPage === PAGES.PRICE && <PriceMatcher />}
      </main>
    </div>
  )
}

