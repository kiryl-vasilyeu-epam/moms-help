import type { SidebarItemProps } from './SidebarItem.types';
import { styles } from './SidebarItem.styles';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../Typography';

export const SidebarItem = ({
  active,
  id,
  icon,
  labelKey,
  isSidebarOpen,
  onNavigate,
}: SidebarItemProps) => {
  const { t } = useTranslation();
  const handleItemClick = () => {
    onNavigate(id);
  };

  return (
    <button
      css={[styles.menuItem, active && styles.menuItemActive]}
      onClick={handleItemClick}
    >
      <span css={styles.menuIcon}>{icon}</span>
      <Typography
        variant="label"
        color="white"
        style={[styles.menuText, !isSidebarOpen && styles.collapsedText]}
      >
        {t(labelKey)}
      </Typography>
    </button>
  );
};
