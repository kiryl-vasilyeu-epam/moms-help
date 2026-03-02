import { stylesheet } from './StatsBox.styles';
import type { StatsBoxProps } from './StatsBox.types';
import { Typography } from '../Typography';
import { useStyles } from '@hooks';

export const StatsBox = ({ label, amount }: StatsBoxProps) => {
  const styles = useStyles(stylesheet);
  return (
    <div css={styles.statBox}>
      <Typography variant="h4" color="alwaysWhite" style={styles.statBoxLabel}>
        {label}
      </Typography>
      <Typography
        variant="body"
        color="alwaysWhite"
        style={styles.statBoxAmount}
      >
        {amount}
      </Typography>
    </div>
  );
};
