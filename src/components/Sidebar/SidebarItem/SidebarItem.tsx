import type { SidebarItemProps } from './SidebarItem.types'
import { styles } from './SidebarItem.styles'

export const SidebarItem = ({ active, id, icon, label, isSidebarOpen, onNavigate }: SidebarItemProps) => {
  const handleItemClick = () => {
    onNavigate(id)
  }

  return (
    <button
      css={[styles.menuItem, active && styles.menuItemActive]}
      onClick={handleItemClick}
    >
      <span css={styles.menuIcon}>{icon}</span>
      <span css={[styles.menuText, !isSidebarOpen && styles.collapsedText]}>
        {label}
      </span>
    </button>
  )
}
