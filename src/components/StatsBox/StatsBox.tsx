import { styles } from './StatsBox.styles';
import type { StatsBoxProps } from './StatsBox.types';
import { Typography } from '../Typography';

export const StatsBox = ({ label, amount }: StatsBoxProps) => {
  return (
    <div css={styles.statBox}>
      <Typography variant="h4" color="white" style={styles.statBoxLabel}>
        {label}
      </Typography>
      <Typography variant="body" color="white" style={styles.statBoxAmount}>
        {amount}
      </Typography>
    </div>
  );
};
