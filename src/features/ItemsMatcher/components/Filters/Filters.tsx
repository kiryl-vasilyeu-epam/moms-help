import { FilterButton } from '@components';
import { styles } from './Filters.styles';
import { FiltersProps } from './Filters.types';

export const Filters = ({
  currentFilter,
  setCurrentFilter,
  filtersConfig,
}: FiltersProps) => {
  return (
    <div css={styles.filterButtons}>
      {filtersConfig.map(filter => (
        <FilterButton
          key={filter.id}
          label={filter.label}
          value={filter.id}
          isActive={currentFilter === filter.id}
          handleClick={setCurrentFilter}
        />
      ))}
    </div>
  );
};
