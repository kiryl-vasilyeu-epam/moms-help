export const ITEMS_MATCHER_RESULTS_KEY = 'itemsMatcherResults';
export const ITEMS_MATCHER_FILE2ITEMS_KEY = 'itemsMatcherFile2Items';
export const STORAGE_KEY = 'parserData';
export const TRANSFER_STORAGE_KEY = 'priceMatcherTransferData';

export const FILTER_LABELS = {
  all: 'Все',
  exact: 'Точные',
  fuzzy: 'Нечеткие',
  manual: 'Ручные',
  unmatched: 'Не найдены'
};

export const CONFIRMATION_MESSAGES = {
  clear: 'Вы уверены, что хотите очистить все сохраненные данные?',
  noData: 'Нет данных для экспорта',
  noDataTransfer: 'Нет данных для передачи'
};

export const BUTTON_LABELS = {
  process: 'Обработать файлы',
  download: '📥 Скачать список с совпадениями (.xlsx)',
  transfer: '💰 Передать в Поиск цен',
  selectFile1: 'Выбрать файл',
  selectFile2: 'Выбрать файл'
};

export const SECTION_TITLES = {
  main: '📊 Сравнение выписок 1C и Fusion',
  file1: 'Файл 1: 1C выписка',
  file2: 'Файл 2: Fusion выписка'
};

export const STAT_LABELS = {
  total: 'Всего товаров (1C)',
  exact: 'Точные совпадения',
  fuzzy: 'Нечеткие совпадения',
  manual: 'Ручные совпадения',
  unmatched: 'Не найдены'
};

export const TABLE_HEADERS = [
  '#',
  'Артикул (1C)',
  'Название',
  'Общее количество',
  'Последняя цена',
  'Артикул (Fusion)',
  'Статус совпадения'
];

export const PRICE_CALCULATION = {
  multiplier1: 1.2,
  multiplier2: 1.35,
  subtractValue: 0.01
};

export const FUZZY_MATCH_CONFIG = {
  allowedDiffPattern: /^[A-Z0]*$/
};

export const DROPDOWN_CONFIG = {
  maxHeight: 400,
  itemMaxHeight: 350,
  width: 400
};

export const FILE_ACCEPT_TYPES = '.xls,.xlsx';

export const EXPORT_HEADERS = [
  'Наименование',
  'Цена розничная',
  'Цена со скидкой',
  'Кол-во',
  'Штрихкод'
];

export const EXPORT_SHEET_NAME = 'Список';
