import type { PAGES } from '@constants'

export interface SidebarProps {
  onNavigate: (page: PAGES) => void
  isOpen: boolean
  onClose: () => void
  activeItem: PAGES
}
