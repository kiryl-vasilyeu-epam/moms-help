import { MatchedItem, Stats1, FilterType } from '../../ItemsMatcher.types';
import { Stat } from '../Stats/Stats.types';
import { Filter } from '../Filters/Filters.types';

export interface ResultsProps {
  showResults: boolean;
  handleDownload: () => void;
  handleTransfer: () => void;
  stats: Stats1;
  statsConfig: Stat[];
  currentFilter: FilterType;
  setCurrentFilter: (filter: FilterType) => void;
  filtersConfig: Filter[];
  filteredItems: MatchedItem[];
  filterApplied: boolean;
}
