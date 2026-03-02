import type { SidebarProps } from './Sidebar.types';
import { stylesheet } from './Sidebar.styles';
import { useTranslation } from 'react-i18next';
import { SIDEBAR_MENU_ITEMS } from './Sidebar.constants';
import { useEffect, useState } from 'react';
import { HamburgerButton } from '../HamburgerButton';
import { SidebarItem } from './SidebarItem';
import { Typography } from '../Typography';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useLocalStorage, useTheme, useStyles } from '@hooks';
import { STORAGE_KEYS } from '@constants';

export const Sidebar = ({ onNavigate, activeItem }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { toggleTheme, themeMode } = useTheme();
  const styles = useStyles(stylesheet);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const [currentLocale, setCurrentLocale] = useLocalStorage<'en' | 'ru'>(
    STORAGE_KEYS.CURRENT_LOCALE,
    'ru',
  );

  useEffect(() => {
    if (i18n.language !== currentLocale) {
      void i18n.changeLanguage(currentLocale);
    }
  }, [currentLocale, i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    setCurrentLocale(newLang);
  };

  return (
    <aside css={[styles.sidebar, !isOpen && styles.collapsedSidebar]}>
      <div css={styles.header}>
        <Typography
          variant="h1"
          color="alwaysWhite"
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
            {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
        </footer>
      </div>
    </aside>
  );
};
