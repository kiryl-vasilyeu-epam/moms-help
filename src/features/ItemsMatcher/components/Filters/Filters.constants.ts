import { FilterType } from "@features/ItemsMatcher/ItemsMatcher.types";

export const FILTERS: { id: FilterType, label: string }[] = [
  {id: 'all', label: 'itemsMatcher.filters.all'},
  {id: 'exact', label: 'itemsMatcher.filters.exact'},
  {id: 'fuzzy', label: 'itemsMatcher.filters.fuzzy'},
  {id: 'manual', label: 'itemsMatcher.filters.manual'},
  {id: 'none', label: 'itemsMatcher.filters.unmatched'}
];
