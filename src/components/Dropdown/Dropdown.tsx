import { Popover } from '@mui/material';
import { stylesheet } from './Dropdown.styles';
import type { DropdownProps } from './Dropdown.types';
import { useStyles } from '@hooks';

export const Dropdown = ({
  children,
  open,
  onClose,
  anchorEl,
  style,
}: DropdownProps) => {
  const styles = useStyles(stylesheet);
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
