import type { SidebarProps } from './Sidebar.types';
import { styles } from './Sidebar.styles';
import { useTranslation } from 'react-i18next';
import { SIDEBAR_MENU_ITEMS } from './Sidebar.constants';
import { useState } from 'react';
import { HamburgerButton } from '../HamburgerButton';
import { SidebarItem } from './SidebarItem';
import { Typography } from '../Typography';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const Sidebar = ({ onNavigate, activeItem }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    void i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    // Theme toggle functionality to be implemented
  };

  return (
    <aside css={[styles.sidebar, !isOpen && styles.collapsedSidebar]}>
      <div css={styles.header}>
        <Typography
          variant="h1"
          color="white"
          style={[styles.headerTitle, !isOpen && styles.collapsedText]}
        >
          {t('sidebar.headerTitle')}
        </Typography>
        <HamburgerButton handleToggle={toggleSidebar} isOpen={isOpen} />
      </div>
      <div css={styles.content}>
        <nav css={styles.menu}>
          {SIDEBAR_MENU_ITEMS.map((item) => (
            <SidebarItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              labelKey={item.labelKey}
              active={item.id === activeItem}
              isSidebarOpen={isOpen}
              onNavigate={onNavigate}
            />
          ))}
        </nav>
        <footer css={[styles.footer, !isOpen && styles.collapsedFooter]}>
          <button
            css={styles.switcherButton}
            onClick={toggleLanguage}
            title={t('sidebar.switchLanguage')}
          >
            <LanguageIcon />
          </button>
          <button
            css={styles.switcherButton}
            onClick={toggleTheme}
            title={t('sidebar.switchTheme')}
          >
            <DarkModeIcon />
          </button>
        </footer>
      </div>
    </aside>
  );
};
