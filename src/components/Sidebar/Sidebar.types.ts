import type { PAGES } from '@constants'

export interface SidebarMenuItem {
  id: PAGES;
  label: string;
  icon: string;
}
export interface SidebarProps {
  onNavigate: (page: PAGES) => void
  activeItem: PAGES
}
