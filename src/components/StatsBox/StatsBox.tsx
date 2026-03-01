import { styles } from './StatsBox.styles';
import type { StatsBoxProps } from './StatsBox.types';

export const StatsBox = ({ label, amount }: StatsBoxProps) => {
  return (
    <div css={styles.statBox}>
      <h4 css={styles.statBoxLabel}>{label}</h4>
      <p css={styles.statBoxAmount}>{amount}</p>
    </div>
  );
};
