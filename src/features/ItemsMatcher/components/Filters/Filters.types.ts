import { FilterType } from '../../ItemsMatcher.types';

export interface Filter {
  id: FilterType;
  label: string;
}

export interface FiltersProps {
  currentFilter: FilterType;
  setCurrentFilter: (filter: FilterType) => void;
}
