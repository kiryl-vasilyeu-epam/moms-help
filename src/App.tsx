import { Sidebar } from '@components'
import { ItemsMatcher, PriceMatcher } from '@features'
import { styles } from './App.styles'
import { PAGES, STORAGE_KEYS } from '@constants'
import { useLocalStorage } from '@hooks'

export const App = () => {
  const [currentPage, setCurrentPage] = useLocalStorage(STORAGE_KEYS.CURRENT_PAGE, PAGES.ITEMS)

  return (
    <div css={styles.root}>
      <Sidebar activeItem={currentPage} onNavigate={setCurrentPage} />
      <main css={styles.main}>
        {currentPage === PAGES.ITEMS && <ItemsMatcher />}
        {currentPage === PAGES.PRICE && <PriceMatcher />}
      </main>
    </div>
  )
}

