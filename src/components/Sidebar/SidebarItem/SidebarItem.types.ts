import { SidebarMenuItem, SidebarProps } from '../Sidebar.types';

export interface SidebarItemProps extends Pick<SidebarProps, 'onNavigate'>, SidebarMenuItem {
  active: boolean;
  isSidebarOpen: boolean;
}
