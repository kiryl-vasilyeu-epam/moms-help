import { useTranslation } from 'react-i18next';
import { StatsBox } from '@components';
import { stylesheet } from './Stats.styles';
import { StatsProps } from './Stats.types';
import { STATS } from './Stats.constants';
import { useStyles } from '@hooks';

export const Stats = ({ stats }: StatsProps) => {
  const { t } = useTranslation();
  const styles = useStyles(stylesheet);

  return (
    <div css={styles.stats}>
      {STATS.map((stat) => (
        <StatsBox key={stat.id} label={t(stat.label)} amount={stats[stat.id]} />
      ))}
    </div>
  );
};
