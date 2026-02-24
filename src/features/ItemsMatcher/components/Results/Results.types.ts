import { MatchedItem, Stats, FilterType } from '../../ItemsMatcher.types';

export interface ResultsProps {
  showResults: boolean;
  handleDownload: () => void;
  handleTransfer: () => void;
  stats: Stats;
  currentFilter: FilterType;
  setCurrentFilter: (filter: FilterType) => void;
  filteredItems: MatchedItem[];
  filterApplied: boolean;
}
