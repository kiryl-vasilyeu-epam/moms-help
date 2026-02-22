import type { SidebarProps } from './Sidebar.types'
import { styles } from './Sidebar.styles'
import { useTranslation } from 'react-i18next'
import { SIDEBAR_MENU_ITEMS } from './Sidebar.constants'
import { useState } from 'react'
import { HamburgerButton } from '../HamburgerButton'
import { SidebarItem } from './SidebarItem'

export const Sidebar = ({ onNavigate, activeItem }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation()
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside css={[styles.sidebar, !isOpen && styles.collapsedSidebar]}>
      <div css={styles.header}>
        <h1 css={[styles.headerTitle, !isOpen && styles.collapsedText]}>{t('sidebar.headerTitle')}</h1>
        <HamburgerButton
          handleToggle={toggleSidebar}
          isOpen={isOpen}
        />
      </div>
      <nav css={styles.menu}>
        {SIDEBAR_MENU_ITEMS.map((item) => (
          <SidebarItem
            key={item.id}
            id={item.id}
            icon={item.icon}
            label={item.label}
            active={item.id === activeItem}
            isSidebarOpen={isOpen}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </aside>
  )
}
