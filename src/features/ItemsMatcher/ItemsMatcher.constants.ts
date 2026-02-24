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

export const CONFIRMATION_MESSAGES = {
  clear: 'Вы уверены, что хотите очистить все сохраненные данные?',
  noData: 'Нет данных для экспорта',
  noDataTransfer: 'Нет данных для передачи'
};

export const EXPORT_HEADERS = [
  'Наименование',
  'Цена розничная',
  'Цена со скидкой',
  'Кол-во',
  'Себестоимость',
  'Штрихкод'
];

export const EXPORT_SHEET_NAME = 'Список';
