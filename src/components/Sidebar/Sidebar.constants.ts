import { PAGES } from '@constants';
import { SidebarMenuItem } from './Sidebar.types';

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  { id: PAGES.ITEMS, labelKey: 'sidebar.items', icon: '📦' },
  { id: PAGES.PRICE, labelKey: 'sidebar.price', icon: '💰' },
];
