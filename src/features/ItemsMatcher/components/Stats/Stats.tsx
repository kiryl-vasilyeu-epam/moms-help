import { useTranslation } from 'react-i18next';
import { StatsBox } from '@components';
import { styles } from './Stats.styles';
import { StatsProps } from './Stats.types';

export const Stats = ({
  stats,
  statsConfig,
}: StatsProps) => {
  const { t } = useTranslation();

  return (
    <div css={styles.stats}>
      {statsConfig.map(stat => (
        <StatsBox
          key={stat.id}
          label={t(stat.label)}
          amount={stats[stat.id]}
        />
      ))}
    </div>
  );
};
