import type { PageId } from '@constants'

export interface SidebarProps {
  onNavigate: (page: PageId) => void
  isOpen: boolean
  onClose: () => void
}
