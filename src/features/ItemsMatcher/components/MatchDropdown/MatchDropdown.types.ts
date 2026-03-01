import { ItemsMatcherData } from '@features/ItemsMatcher/ItemsMatcher.types';

export interface MatchDropdownProps extends Pick<
  ItemsMatcherData,
  | 'fileFusionItems'
  | 'handleSelectMatch'
  | 'dropdownAnchor'
  | 'handleCloseDropdown'
> {}
