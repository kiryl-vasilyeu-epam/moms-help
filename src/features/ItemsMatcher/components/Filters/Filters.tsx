import { FilterButton } from '@components';
import { styles } from './Filters.styles';
import { FiltersProps } from './Filters.types';
import { FILTERS } from './Filters.constants';
import { useTranslation } from 'react-i18next';

export const Filters = ({
  currentFilter,
  setCurrentFilter,
  isFiltering = false,
}: FiltersProps) => {
  const { t } = useTranslation();
  
  return (
    <div css={styles.filterButtons}>
      {FILTERS.map(filter => (
        <FilterButton
          key={filter.id}
          label={t(filter.label)}
          value={filter.id}
          isActive={currentFilter === filter.id}
          handleClick={setCurrentFilter}
          disabled={isFiltering}
        />
      ))}
      {isFiltering && (
        <div css={styles.loadingIndicator}>
          <div css={styles.spinner} />
          {t('itemsMatcher.filters.filtering') || 'Filtering...'}
        </div>
      )}
    </div>
  );
};
