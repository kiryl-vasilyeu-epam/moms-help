import { FilterType, Stats } from "./ItemsMatcher.types"

export const STATS: { id: Stats, label: string }[] = [
  {id: 'total', label: 'itemMatcher.totalItems'},
  {id: 'exact', label: 'itemMatcher.matchedItems'},
  {id: 'fuzzy', label: 'itemMatcher.fuzzyItems'},
  {id: 'manual', label: 'itemMatcher.manualItems'},
  {id: 'unmatched', label: 'itemMatcher.unmatchedItems'}
];

export const FILTERS: { id: FilterType, label: string }[] = [
  {id: 'all', label: 'itemMatcher.filterAll'},
  {id: 'exact', label: 'itemMatcher.filterExact'},
  {id: 'fuzzy', label: 'itemMatcher.filterFuzzy'},
  {id: 'manual', label: 'itemMatcher.filterManual'},
  {id: 'unmatched', label: 'itemMatcher.filterUnmatched'}
];

export const ITEMS_MATCHER_RESULTS_KEY = 'itemsMatcherResults'
export const ITEMS_MATCHER_FILE2ITEMS_KEY = 'itemsMatcherFile2Items'
export const STORAGE_KEY = 'parserData'
export const TRANSFER_STORAGE_KEY = 'priceMatcherTransferData'

export const TABLE_HEADERS = [
  '#',
  'Артикул (1C)',
  'Название',
  'Общее количество',
  'Последняя цена',
  'Артикул (Fusion)',
  'Статус совпадения'
]

export const PRICE_CALCULATION = {
  multiplier1: 1.2,
  multiplier2: 1.35,
  subtractValue: 0.01
}

export const FUZZY_MATCH_CONFIG = {
  allowedDiffPattern: /^[A-Z0]*$/
}

export const DROPDOWN_CONFIG = {
  maxHeight: 400,
  itemMaxHeight: 350,
  width: 400
}

export const FILE_ACCEPT_TYPES = '.xls,.xlsx'

export const CONFIRMATION_MESSAGES = {
  clear: 'Вы уверены, что хотите очистить все сохраненные данные?',
  noData: 'Нет данных для экспорта',
  noDataTransfer: 'Нет данных для передачи'
}

export const EXPORT_HEADERS = [
  'Наименование',
  'Цена розничная',
  'Цена со скидкой',
  'Кол-во',
  'Себестоимость',
  'Штрихкод'
]

export const EXPORT_SHEET_NAME = 'Список'
