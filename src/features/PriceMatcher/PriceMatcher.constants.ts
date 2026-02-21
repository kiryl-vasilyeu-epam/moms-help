export const PRICE_MATCHER_ITEMS_KEY = 'priceMatcherItems'
export const PRICE_MATCHER_ORIGINAL_ITEMS_KEY = 'priceMatcherOriginalItems'
export const PRICE_MATCHER_USAGE_HISTORY_KEY = 'priceMatcherUsageHistory'
export const PRICE_MATCHER_TRANSFER_DATA_KEY = 'priceMatcherTransferData'

export const PRICE_MATCHER_LABELS = {
  title: 'Калькулятор цен',
  fileInfo: 'Информация о файле',
  uploadFile: 'Загрузить файл',
  noFile: 'Выберите файл с товарами',
  sumsInput: 'Введите суммы для расчета',
  calculateButton: 'Вычислить',
  resetButton: 'Очистить данные',
  exportRemaining: '📥 Скачать остатки (XLSX)',
  exportReport: '📄 Скачать отчет (DOC)',
  calculation: 'Расчет',
  targetAmount: 'Целевая сумма',
  items: 'Товары для выбора',
  total: 'Итого',
  summary: '📋 Сводка - Товары к удалению',
  noSolution: 'Точная комбинация не найдена',
  removeCalculation: 'Удалить расчет',
  copyCalculation: 'Нажмите, чтобы скопировать данные',
}

export const TABLE_HEADERS = {
  rowNumber: '№',
  name: 'Наименование',
  price: 'Цена',
  salePrice: 'Цена со скидкой',
  original: 'Изначально',
  used: 'Использовано',
  remaining: 'Осталось',
}

export const ROW_CLASSES = {
  depleted: 'row-depleted',
  partial: 'row-partial',
  normal: '',
}
