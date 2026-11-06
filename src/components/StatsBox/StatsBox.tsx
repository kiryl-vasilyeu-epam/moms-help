import { stylesheet } from './StatsBox.styles';
import type { StatsBoxProps } from './StatsBox.types';
import { Typography } from '../Typography';
import { useStyles } from '@hooks';

export const StatsBox = ({
  label,
  amount,
  flat = false,
  tone = 'neutral',
}: StatsBoxProps) => {
  const styles = useStyles(stylesheet);

  if (flat) {
    return (
      <div css={[styles.statBox, styles.flatBox, styles[tone]]}>
        <Typography
          variant="h4"
          style={[styles.statBoxLabel, styles.flatLabel]}
        >
          {label}
        </Typography>
        <Typography
          variant="body"
          style={[styles.statBoxAmount, styles.flatAmount, styles[tone]]}
        >
          {amount}
        </Typography>
      </div>
    );
  }

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
