import { PAGES } from '@constants';
import { SidebarMenuItem } from './Sidebar.types';

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  { id: PAGES.ITEMS, label: 'Совпадение артикулов', icon: '📦' },
  { id: PAGES.PRICE, label: 'Поиск цен', icon: '💰' },
];