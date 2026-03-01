import { ItemsMatcherData } from '../../ItemsMatcher.types';

export type ResultsProps = Pick<
  ItemsMatcherData,
  | 'showResults'
  | 'handleDownload'
  | 'handleTransfer'
  | 'stats'
  | 'currentFilter'
  | 'setCurrentFilter'
  | 'filteredItems'
  | 'filterApplied'
  | 'isFiltering'
  | 'fileFusionItems'
  | 'handleSelectMatchItem'
  | 'handleSelectMatch'
  | 'handleRemoveMatch'
  | 'dropdownAnchor'
  | 'handleCloseDropdown'
>;
