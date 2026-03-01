import { Popover } from '@mui/material';
import { styles } from './Dropdown.styles';
import type { DropdownProps } from './Dropdown.types';

export const Dropdown = ({
  children,
  open,
  onClose,
  anchorEl,
  style,
}: DropdownProps) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div css={[styles.dropdown, style]}>
        <div css={styles.content}>{children}</div>
      </div>
    </Popover>
  );
};
