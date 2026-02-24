import { useTranslation } from 'react-i18next';
import { StatsBox } from '@components';
import { styles } from './Stats.styles';
import { StatsProps } from './Stats.types';
import { STATS } from './Stats.constants';

export const Stats = ({
  stats,
}: StatsProps) => {
  const { t } = useTranslation();

  return (
    <div css={styles.stats}>
      {STATS.map(stat => (
        <StatsBox
          key={stat.id}
          label={t(stat.label)}
          amount={stats[stat.id]}
        />
      ))}
    </div>
  );
};
