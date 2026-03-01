let items = [];
let originalItems = [];
let usageHistory = [];

function parseMoneyToCents(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number' && Number.isFinite(value))
    return Math.round(value * 100);

  let s = String(value).trim();
  if (!s) return null;

  // Normalize common RU/EN formats:
  // - "1234,56" -> "1234.56"
  // - "1 234,56" -> "1234.56"
  // - "1.234,56" -> "1234.56" (dot thousands, comma decimals)
  s = s.replace(/\s+/g, '');
  if (s.includes(',') && s.includes('.')) {
    s = s.replace(/\./g, '').replace(',', '.');
  } else {
    s = s.replace(',', '.');
  }

  const n = Number.parseFloat(s);
  if (!Number.isFinite(n)) return null;
  return Math.round(n * 100);
}

function centsToStr(cents) {
  const v = (cents || 0) / 100;
  return v.toFixed(2);
}

// Load from localStorage on page load
window.addEventListener('DOMContentLoaded', function () {
  loadFromStorage();
  setupModalListeners();
  checkForTransferredData(); // Check if data was transferred from items matcher
});

document
  .getElementById('fileInput')
  .addEventListener('change', handleFileUpload);
document
  .getElementById('calculateBtn')
  .addEventListener('click', calculateResults);

function checkForTransferredData() {
  const transferredData = localStorage.getItem('priceMatcherTransferData');
  if (transferredData) {
    try {
      const data = JSON.parse(transferredData);

      // Convert transferred data to items format
      items = data.items.map((item, index) => ({
        rowNumber: index + 1,
        name: item.name,
        priceCents: Math.round(item.price * 100),
        salePriceCents: Math.round(item.price * 100),
        amount: item.amount,
        originalAmount: item.amount,
        remainingAmount: item.amount,
        usedAmount: 0,
      }));

      originalItems = items.map((item) => ({ ...item }));
      usageHistory = [];

      saveToStorage();
      displayItems();
      displayAllResults();
      document.getElementById('fileInfo').textContent =
        `✓ Данные переданы из "Совпадение артикулов" (${items.length} товаров)`;
      document.getElementById('dataSection').style.display = 'block';
      document.getElementById('calculationSection').style.display = 'block';

      // Clear the transferred data
      localStorage.removeItem('priceMatcherTransferData');

      console.log('📥 Loaded transferred data from items matcher');
    } catch (error) {
      console.error('Error loading transferred data:', error);
    }
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);

      // Parse the data - expecting columns: name, price, sale price, amount
      items = jsonData
        .map((row, index) => {
          // Try to find columns by common variations
          const name =
            row['Наименование'] ||
            row['Name'] ||
            row['NAME'] ||
            row['Item'] ||
            row['item'] ||
            '';
          const priceCents =
            parseMoneyToCents(
              row['Цена розничная'] ||
                row['Price'] ||
                row['PRICE'] ||
                row['Regular Price'] ||
                0,
            ) ?? 0;
          const salePriceCents =
            parseMoneyToCents(
              row['Цена со скидкой'] ||
                row['Sale Price'] ||
                row['SALE PRICE'] ||
                row['sale_price'] ||
                row['SalePrice'],
            ) ?? priceCents;
          const amount = parseInt(
            row['Кол-во'] ||
              row['Amount'] ||
              row['AMOUNT'] ||
              row['Quantity'] ||
              row['quantity'] ||
              0,
          );

          return {
            rowNumber: index + 2, // +2 because Excel rows start at 1 and first row is header
            name: String(name),
            priceCents,
            salePriceCents,
            amount: amount,
          };
        })
        .filter((item) => item.name && item.amount > 0);

      if (items.length === 0) {
        alert(
          'В файле не найдено валидных товаров. Проверьте названия колонок.',
        );
        return;
      }

      // Store original items and reset usage
      originalItems = items.map((item) => ({ ...item }));
      usageHistory = [];

      // Initialize remaining amounts
      items.forEach((item) => {
        item.originalAmount = item.amount;
        item.remainingAmount = item.amount;
        item.usedAmount = 0;
      });

      saveToStorage();
      displayItems();
      displayAllResults();
      document.getElementById('fileInfo').textContent =
        `✓ Загружено ${items.length} товаров из ${file.name}`;
      document.getElementById('dataSection').style.display = 'block';
      document.getElementById('calculationSection').style.display = 'block';
    } catch (error) {
      alert('Ошибка чтения файла: ' + error.message);
      console.error(error);
    }
  };
  reader.readAsArrayBuffer(file);
}

function displayItems() {
  const table = document.getElementById('itemsTable');
  let html = `
        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Наименование</th>
                    <th>Цена</th>
                    <th>Цена со скидкой</th>
                    <th>Изначально</th>
                    <th>Использовано</th>
                    <th>Осталось</th>
                </tr>
            </thead>
            <tbody>
    `;

  items.forEach((item) => {
    const originalAmount = item.originalAmount || item.amount;
    const usedAmount = item.usedAmount || 0;
    // Use remainingAmount if defined, otherwise calculate it
    const remainingAmount =
      item.remainingAmount !== undefined
        ? item.remainingAmount
        : (item.originalAmount || item.amount) - usedAmount;

    // Determine row class based on usage status
    let rowClass = '';
    if (remainingAmount === 0 && usedAmount > 0) {
      // Fully used - red
      rowClass = 'row-depleted';
    } else if (usedAmount > 0 && remainingAmount > 0) {
      // Partially used - yellow
      rowClass = 'row-partial';
    }

    html += `
            <tr class="${rowClass}">
                <td class="row-number">${item.rowNumber || '-'}</td>
                <td>${item.name}</td>
                <td>${centsToStr(item.priceCents)}</td>
                <td>${centsToStr(item.salePriceCents)}</td>
                <td>${originalAmount}</td>
                <td class="used-amount">${usedAmount}</td>
                <td class="remaining-amount">${remainingAmount}</td>
            </tr>
        `;
  });

  html += `
            </tbody>
        </table>
    `;

  table.innerHTML = html;
}

function parseSums(input) {
  // Extract numbers robustly (supports "77.38", "77,38", newline-separated, etc.)
  const matches = String(input).match(/-?\d+(?:[.,]\d+)?/g) || [];
  return matches
    .map((m) => parseMoneyToCents(m))
    .filter((c) => Number.isInteger(c) && c > 0);
}

// Helper function to yield control back to browser
function yieldToBrowser() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

// Optimized DP-based solution for subset sum with bounded quantities
async function findExactCombination(
  targetCents,
  availableItems,
  onProgress = null,
) {
  // Safety check: ensure inputs are valid
  if (!Array.isArray(availableItems) || availableItems.length === 0) {
    return null;
  }

  if (!Number.isInteger(targetCents) || targetCents <= 0) {
    return null;
  }

  // Safeguards
  const MAX_TIME_MS = 60000; // 60 seconds timeout
  const YIELD_INTERVAL = 100; // Yield every 100 items processed
  const startTime = Date.now();

  // Preprocess: filter and sort items by price descending (greedy optimization)
  const validItems = availableItems
    .map((item, idx) => {
      if (!item || typeof item !== 'object') return null;
      const remainingQty = Math.max(
        0,
        item.remainingAmount || item.amount || 0,
      );
      const unitCents = item.salePriceCents || 0;
      if (unitCents <= 0 || remainingQty <= 0) return null;
      return { item, remainingQty, unitCents, originalIndex: idx };
    })
    .filter((x) => x !== null)
    .sort((a, b) => b.unitCents - a.unitCents); // Sort descending by price

  if (validItems.length === 0) {
    return null;
  }

  // Quick feasibility check: can we even reach the target?
  const minPrice = validItems[validItems.length - 1].unitCents;
  const maxPossible = validItems.reduce(
    (sum, v) => sum + v.unitCents * v.remainingQty,
    0,
  );
  if (targetCents > maxPossible || targetCents < minPrice) {
    return null;
  }

  // Use DP: dp[sum] = best way to achieve that sum (as array of {item, quantity})
  // We use a Map for better performance with sparse sums
  // For memory efficiency, we only keep sums that could lead to the target
  const dp = new Map();
  dp.set(0, []); // Base case: sum 0 requires no items

  let processedItems = 0;
  const totalItems = validItems.length;

  // Calculate remaining value for each position (for pruning)
  const remainingValue = new Array(validItems.length + 1).fill(0);
  for (let i = validItems.length - 1; i >= 0; i--) {
    remainingValue[i] =
      remainingValue[i + 1] +
      validItems[i].unitCents * validItems[i].remainingQty;
  }

  // Process each item
  for (let itemIdx = 0; itemIdx < validItems.length; itemIdx++) {
    const { item, remainingQty, unitCents } = validItems[itemIdx];
    processedItems++;

    // Yield periodically
    if (processedItems % YIELD_INTERVAL === 0) {
      await yieldToBrowser();
      if (onProgress) {
        onProgress({
          processedItems,
          totalItems,
          dpSize: dp.size,
          elapsed: Date.now() - startTime,
        });
      }

      // Check timeout
      if (Date.now() - startTime > MAX_TIME_MS) {
        console.warn('Calculation timeout reached');
        return null;
      }
    }

    // Create new DP state by processing current item
    const newDp = new Map();

    // Iterate through all achievable sums so far
    for (const [currentSum, combination] of dp.entries()) {
      // Pruning: skip if we can't reach target even with all remaining items
      if (currentSum + remainingValue[itemIdx] < targetCents) {
        continue; // Can't reach target
      }

      if (currentSum > targetCents) {
        continue; // Already exceeded
      }

      // Try all possible quantities of current item
      const maxQty = Math.min(
        remainingQty,
        Math.floor((targetCents - currentSum) / unitCents),
      );

      for (let qty = 0; qty <= maxQty; qty++) {
        const newSum = currentSum + unitCents * qty;

        if (newSum > targetCents) break;

        // Only keep if we haven't seen this sum yet, or if this is a better path
        // (fewer items is better for performance)
        if (
          !newDp.has(newSum) ||
          newDp.get(newSum).length > combination.length + (qty > 0 ? 1 : 0)
        ) {
          const newCombination =
            qty > 0
              ? [...combination, { ...item, quantity: qty }]
              : combination;
          newDp.set(newSum, newCombination);
        }
      }
    }

    // Merge: keep all sums from old dp that are still valid, plus new ones
    // Only keep sums that could potentially lead to target
    for (const [sum, combination] of dp.entries()) {
      if (
        sum <= targetCents &&
        sum + remainingValue[itemIdx + 1] >= targetCents
      ) {
        if (!newDp.has(sum) || newDp.get(sum).length > combination.length) {
          newDp.set(sum, combination);
        }
      }
    }

    // Update dp to new state
    dp.clear();
    for (const [sum, combination] of newDp.entries()) {
      dp.set(sum, combination);
    }

    // Early exit if we found the target
    if (dp.has(targetCents)) {
      return dp.get(targetCents);
    }
  }

  // Check if we found the target
  return dp.get(targetCents) || null;
}

// Loading overlay functions
function showLoadingOverlay(text = 'Вычисление...') {
  const overlay = document.getElementById('loadingOverlay');
  const loadingText = document.getElementById('loadingText');
  const loadingProgress = document.getElementById('loadingProgress');
  loadingText.textContent = text;
  loadingProgress.textContent = '';
  overlay.style.display = 'flex';
}

function hideLoadingOverlay() {
  const overlay = document.getElementById('loadingOverlay');
  overlay.style.display = 'none';
}

function updateLoadingProgress(text) {
  const loadingProgress = document.getElementById('loadingProgress');
  loadingProgress.textContent = text;
}

async function calculateResults() {
  const sumsInput = document.getElementById('sumsInput').value;
  const targetCentsList = parseSums(sumsInput);

  if (targetCentsList.length === 0) {
    alert('Пожалуйста, введите хотя бы одну валидную сумму.');
    return;
  }

  // Check if items are loaded
  if (!Array.isArray(items) || items.length === 0) {
    alert('Пожалуйста, сначала загрузите файл с товарами.');
    return;
  }

  // Show loading overlay
  showLoadingOverlay('Подготовка к вычислению...');

  // Allow UI to update
  await yieldToBrowser();

  try {
    let calculationNumber = usageHistory.length + 1;
    const failedCalculations = [];
    const totalCalculations = targetCentsList.length;

    for (let i = 0; i < targetCentsList.length; i++) {
      const targetCents = targetCentsList[i];

      // Update progress
      updateLoadingProgress(
        `Обработка ${i + 1} из ${totalCalculations} сумм...`,
      );
      await yieldToBrowser();

      // Filter out items with no remaining quantity and invalid prices
      const availableItems = items
        .filter((item) => {
          if (!item || typeof item !== 'object') return false;
          const remaining =
            item.remainingAmount !== undefined
              ? item.remainingAmount
              : (item.originalAmount || item.amount || 0) -
                (item.usedAmount || 0);
          const priceCents = item.salePriceCents || 0;
          return remaining > 0 && priceCents > 0;
        })
        .map((item) => ({
          ...item,
          remainingAmount:
            item.remainingAmount !== undefined
              ? item.remainingAmount
              : Math.max(
                  0,
                  (item.originalAmount || item.amount || 0) -
                    (item.usedAmount || 0),
                ),
          amount:
            item.remainingAmount !== undefined
              ? item.remainingAmount
              : Math.max(
                  0,
                  (item.originalAmount || item.amount || 0) -
                    (item.usedAmount || 0),
                ),
        }));

      if (availableItems.length === 0) {
        // No items available
        failedCalculations.push({
          targetCents,
          reason: 'no_items',
        });
        usageHistory.push({
          calculationNumber: calculationNumber++,
          targetCents,
          calculatedCents: null,
          solution: null,
          timestamp: new Date().toISOString(),
        });
        continue;
      }

      // Update progress for this calculation
      updateLoadingProgress(
        `Поиск комбинации для ${centsToStr(targetCents)} (${i + 1}/${totalCalculations})...`,
      );

      // Progress callback for findExactCombination
      let lastProgressUpdate = Date.now();
      const progressCallback = (progress) => {
        const now = Date.now();
        // Update progress text every 500ms to avoid too frequent updates
        if (now - lastProgressUpdate > 500) {
          const percent = Math.round(
            (progress.processedItems / progress.totalItems) * 100,
          );
          updateLoadingProgress(
            `Поиск комбинации для ${centsToStr(targetCents)}... ` +
              `(${progress.processedItems}/${progress.totalItems} товаров, ${percent}%)`,
          );
          lastProgressUpdate = now;
        }
      };

      const solution = await findExactCombination(
        targetCents,
        availableItems,
        progressCallback,
      );

      if (solution && solution.length > 0) {
        // Calculate actual total
        let calculatedCents = 0;
        solution.forEach((item) => {
          calculatedCents += (item.salePriceCents || 0) * item.quantity;
        });

        // Update item quantities (consume items)
        solution.forEach((solutionItem) => {
          if (!solutionItem || !solutionItem.name) return;
          const item = items.find((i) => i && i.name === solutionItem.name);
          if (item && solutionItem.quantity > 0) {
            // Update used amount
            item.usedAmount = (item.usedAmount || 0) + solutionItem.quantity;
            // Update remaining amount - calculate from original amount minus used amount
            const originalAmount = item.originalAmount || item.amount || 0;
            item.remainingAmount = Math.max(
              0,
              originalAmount - item.usedAmount,
            );
          }
        });

        // Save to usage history
        usageHistory.push({
          calculationNumber: calculationNumber++,
          targetCents,
          calculatedCents,
          solution: solution,
          timestamp: new Date().toISOString(),
        });
      } else {
        // Save failed calculation too
        failedCalculations.push({
          targetCents,
          reason: 'no_combination',
        });
        usageHistory.push({
          calculationNumber: calculationNumber++,
          targetCents,
          calculatedCents: null,
          solution: null,
          timestamp: new Date().toISOString(),
        });
      }
    }

    // Renumber all calculations to be sequential
    usageHistory.forEach((calc, idx) => {
      if (calc) {
        calc.calculationNumber = idx + 1;
      }
    });

    // Clear input after calculation
    document.getElementById('sumsInput').value = '';

    // Update display and save
    displayItems();
    displayAllResults();
    saveToStorage();

    // Hide loading overlay
    hideLoadingOverlay();

    // Show modal if there were failed calculations
    if (failedCalculations.length > 0) {
      showNoSolutionModal(failedCalculations);
    }
  } catch (error) {
    console.error('Error during calculation:', error);
    hideLoadingOverlay();
    alert('Произошла ошибка при вычислении. Проверьте консоль для деталей.');
    // Still try to display what we have
    displayItems();
    displayAllResults();
  }
}

function displayAllResults() {
  const resultsDiv = document.getElementById('results');

  if (usageHistory.length === 0) {
    resultsDiv.innerHTML = '';
    document.getElementById('resultsSection').style.display = 'none';
    return;
  }

  document.getElementById('resultsSection').style.display = 'block';

  let html = '';
  const allUsedItems = {};

  // Display all calculations
  usageHistory.forEach((historyItem, index) => {
    // Ensure we have cents for older saved data
    const targetCents = Number.isInteger(historyItem.targetCents)
      ? historyItem.targetCents
      : historyItem.targetSum !== undefined
        ? Math.round(Number(historyItem.targetSum) * 100)
        : 0;

    // Recalculate total from solution items in cents
    let calculatedCents = 0;
    if (historyItem.solution && historyItem.solution.length > 0) {
      historyItem.solution.forEach((item) => {
        if (!item || typeof item !== 'object') return;
        const unitCents = Number.isInteger(item.salePriceCents)
          ? item.salePriceCents
          : item.salePrice !== undefined
            ? Math.round(Number(item.salePrice) * 100)
            : 0;
        const qty = item.quantity || 0;
        calculatedCents += unitCents * qty;
      });
      // Update stored cents for consistency
      historyItem.targetCents = targetCents;
      historyItem.calculatedCents = calculatedCents;
    } else if (
      historyItem.calculatedCents !== undefined &&
      historyItem.calculatedCents !== null
    ) {
      calculatedCents = historyItem.calculatedCents;
    }

    const differenceCents = Math.abs(calculatedCents - targetCents);
    const isOff = calculatedCents > 0 && differenceCents !== 0;
    const cardClass = isOff ? 'result-card off-target' : 'result-card';

    html += `<div class="${cardClass}" onclick="copyCalculationData(${index})" title="Нажмите, чтобы скопировать данные">`;
    html += `<div class="result-header">`;
    html += `<span>Расчет #${historyItem.calculationNumber || index + 1}: ${centsToStr(targetCents)}`;
    if (isOff) {
      const diffText = `(получено: ${centsToStr(calculatedCents)}, разница: ${centsToStr(differenceCents)})`;
      html += ` <span class="off-indicator">${diffText}</span>`;
    }
    html += `</span>`;
    html += `<button class="delete-btn" onclick="event.stopPropagation(); removeCalculation(${index})" title="Удалить расчет">×</button>`;
    html += `</div>`;

    if (historyItem.solution && historyItem.solution.length > 0) {
      html += `<div class="solution-section">`;
      html += `<h3 class="solution-title">Товары для выбора:</h3>`;
      html += `<ul class="result-items">`;

      historyItem.solution.forEach((item) => {
        if (!item || typeof item !== 'object' || !item.name) return;
        const unitCents = Number.isInteger(item.salePriceCents)
          ? item.salePriceCents
          : item.salePrice !== undefined
            ? Math.round(Number(item.salePrice) * 100)
            : 0;
        const qty = item.quantity || 0;
        if (qty <= 0) return;

        const itemTotalCents = unitCents * qty;
        const rowNum =
          item.rowNumber ||
          (Array.isArray(items)
            ? items.find((i) => i && i.name === item.name)?.rowNumber
            : null) ||
          '-';
        html += `<li>${qty} шт. (строка ${rowNum}) ${item.name} @ ${centsToStr(unitCents)} = ${centsToStr(itemTotalCents)}</li>`;

        // Track used items for summary
        if (!allUsedItems[item.name]) {
          const foundItem = Array.isArray(items)
            ? items.find((i) => i && i.name === item.name)
            : null;
          allUsedItems[item.name] = {
            name: item.name,
            rowNumber: foundItem?.rowNumber || '-',
            quantity: 0,
            salePriceCents: unitCents,
          };
        }
        allUsedItems[item.name].quantity += qty;
      });

      html += `</ul>`;
      html += `<div class="result-total">Итого: ${centsToStr(calculatedCents)}`;
      if (isOff) {
        html += ` <span class="off-indicator">(цель: ${centsToStr(targetCents)})</span>`;
      }
      html += `</div>`;
      html += `</div>`;
    } else {
      html += `<div class="no-solution">Точная комбинация не найдена для ${centsToStr(targetCents)}</div>`;
    }

    html += `</div>`;
  });

  // Add summary section
  if (Object.keys(allUsedItems).length > 0) {
    html += `<div class="result-card summary-card">`;
    html += `<div class="result-header">📋 Сводка - Товары к удалению</div>`;
    html += `<ul class="result-items">`;
    Object.values(allUsedItems).forEach((item) => {
      html += `<li><strong>${item.quantity} шт.</strong> (строка ${item.rowNumber}) ${item.name}</li>`;
    });
    html += `</ul>`;
    html += `<div style="margin-top: 15px; text-align: center;">`;
    html += `<button class="export-btn" onclick="exportRemainingItemsXLSX()">📥 Скачать остатки (XLSX)</button>`;
    html += `</div>`;
    html += `</div>`;
  }

  // Add DOC export button below all results
  if (usageHistory.length > 0) {
    html += `<div style="margin-top: 20px; text-align: center; padding: 20px;">`;
    html += `<button class="export-btn" onclick="exportCalculationsDOC()">📄 Скачать отчет по расчетам (DOC)</button>`;
    html += `</div>`;
  }

  resultsDiv.innerHTML = html;
}

function saveToStorage() {
  try {
    localStorage.setItem('excelCalculator_items', JSON.stringify(items));
    localStorage.setItem(
      'excelCalculator_originalItems',
      JSON.stringify(originalItems),
    );
    localStorage.setItem(
      'excelCalculator_usageHistory',
      JSON.stringify(usageHistory),
    );
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

function loadFromStorage() {
  try {
    const savedItems = localStorage.getItem('excelCalculator_items');
    const savedOriginal = localStorage.getItem('excelCalculator_originalItems');
    const savedHistory = localStorage.getItem('excelCalculator_usageHistory');

    if (savedItems && savedOriginal) {
      items = JSON.parse(savedItems);
      originalItems = JSON.parse(savedOriginal);
      usageHistory = savedHistory ? JSON.parse(savedHistory) : [];

      // Ensure all properties are initialized
      items.forEach((item) => {
        // Migrate old price fields if present
        if (!Number.isInteger(item.priceCents) && item.price !== undefined) {
          item.priceCents = Math.round(Number(item.price) * 100);
        }
        if (
          !Number.isInteger(item.salePriceCents) &&
          item.salePrice !== undefined
        ) {
          item.salePriceCents = Math.round(Number(item.salePrice) * 100);
        }
        if (!item.originalAmount) {
          item.originalAmount = item.amount;
        }
        if (item.remainingAmount === undefined) {
          item.remainingAmount = item.amount - (item.usedAmount || 0);
        }
        if (!item.usedAmount) {
          item.usedAmount = 0;
        }
      });

      // Migrate old history format (floats) to cents
      usageHistory.forEach((h) => {
        if (!Number.isInteger(h.targetCents) && h.targetSum !== undefined) {
          h.targetCents = Math.round(Number(h.targetSum) * 100);
        }
        if (
          !Number.isInteger(h.calculatedCents) &&
          h.calculatedTotal !== undefined &&
          h.calculatedTotal !== null
        ) {
          h.calculatedCents = Math.round(Number(h.calculatedTotal) * 100);
        }
        if (h.solution && Array.isArray(h.solution)) {
          h.solution.forEach((si) => {
            if (
              !Number.isInteger(si.salePriceCents) &&
              si.salePrice !== undefined
            ) {
              si.salePriceCents = Math.round(Number(si.salePrice) * 100);
            }
            if (!Number.isInteger(si.priceCents) && si.price !== undefined) {
              si.priceCents = Math.round(Number(si.price) * 100);
            }
          });
        }
      });

      if (items.length > 0) {
        displayItems();
        displayAllResults();
        document.getElementById('fileInfo').textContent =
          `✓ Загружено ${items.length} товаров из хранилища`;
        document.getElementById('dataSection').style.display = 'block';
        document.getElementById('calculationSection').style.display = 'block';
      }
    }
  } catch (e) {
    console.error('Error loading from localStorage:', e);
  }
}

function copyCalculationData(index) {
  if (index < 0 || index >= usageHistory.length) return;

  const calculation = usageHistory[index];
  let textToCopy = `Расчет #${calculation.calculationNumber || index + 1}\n`;
  const targetCents = Number.isInteger(calculation.targetCents)
    ? calculation.targetCents
    : calculation.targetSum !== undefined
      ? Math.round(Number(calculation.targetSum) * 100)
      : 0;
  textToCopy += `Целевая сумма: ${centsToStr(targetCents)}\n\n`;

  if (calculation.solution && calculation.solution.length > 0) {
    textToCopy += `Товары:\n`;
    calculation.solution.forEach((item) => {
      const rowNum =
        item.rowNumber ||
        items.find((i) => i.name === item.name)?.rowNumber ||
        '-';
      const unitCents = Number.isInteger(item.salePriceCents)
        ? item.salePriceCents
        : item.salePrice !== undefined
          ? Math.round(Number(item.salePrice) * 100)
          : 0;
      const itemTotalCents = unitCents * item.quantity;
      textToCopy += `${item.quantity} шт. (строка ${rowNum}) ${item.name} @ ${centsToStr(unitCents)} = ${centsToStr(itemTotalCents)}\n`;
    });
    const totalCents = Number.isInteger(calculation.calculatedCents)
      ? calculation.calculatedCents
      : calculation.solution.reduce((sum, item) => {
          const unitCents = Number.isInteger(item.salePriceCents)
            ? item.salePriceCents
            : item.salePrice !== undefined
              ? Math.round(Number(item.salePrice) * 100)
              : 0;
          return sum + unitCents * item.quantity;
        }, 0);
    textToCopy += `\nИтого: ${centsToStr(totalCents)}\n`;
  } else {
    textToCopy += `Точная комбинация не найдена\n`;
  }

  // Copy to clipboard
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      // Show temporary feedback
      const card = document.querySelectorAll('.result-card')[index];
      if (card) {
        const originalBg = card.style.backgroundColor;
        card.style.backgroundColor = '#d4edda';
        setTimeout(() => {
          card.style.backgroundColor = originalBg;
        }, 500);
      }
    })
    .catch((err) => {
      console.error('Failed to copy:', err);
      // Fallback: select text
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    });
}

function removeCalculation(index) {
  if (index < 0 || index >= usageHistory.length) return;

  const calculation = usageHistory[index];

  const targetCents = Number.isInteger(calculation.targetCents)
    ? calculation.targetCents
    : calculation.targetSum !== undefined
      ? Math.round(Number(calculation.targetSum) * 100)
      : 0;
  if (
    confirm(
      `Удалить расчет #${calculation.calculationNumber || index + 1} на сумму ${centsToStr(targetCents)}?`,
    )
  ) {
    // Restore item quantities that were used in this calculation
    if (calculation.solution && calculation.solution.length > 0) {
      calculation.solution.forEach((solutionItem) => {
        const item = items.find((i) => i.name === solutionItem.name);
        if (item) {
          // Restore the used quantity
          item.usedAmount = Math.max(
            0,
            (item.usedAmount || 0) - solutionItem.quantity,
          );
          item.remainingAmount =
            (item.remainingAmount || 0) + solutionItem.quantity;
          // Don't exceed original amount
          const maxAmount = item.originalAmount || item.amount;
          if (item.remainingAmount > maxAmount) {
            item.remainingAmount = maxAmount;
          }
        }
      });
    }

    // Remove from history
    usageHistory.splice(index, 1);

    // Renumber remaining calculations
    usageHistory.forEach((calc, idx) => {
      if (!calc.calculationNumber) {
        calc.calculationNumber = idx + 1;
      }
    });

    // Update display and save
    displayItems();
    displayAllResults();
    saveToStorage();
  }
}

function resetData() {
  if (
    confirm(
      'Вы уверены, что хотите сбросить все данные? Это очистит все товары и историю расчетов.',
    )
  ) {
    items = [];
    originalItems = [];
    usageHistory = [];

    // Only clear price-matcher specific keys, not other app's data
    localStorage.removeItem('excelCalculator_items');
    localStorage.removeItem('excelCalculator_originalItems');
    localStorage.removeItem('excelCalculator_usageHistory');

    document.getElementById('fileInfo').textContent = '';
    document.getElementById('dataSection').style.display = 'none';
    document.getElementById('calculationSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('sumsInput').value = '';
    document.getElementById('itemsTable').innerHTML = '';
    document.getElementById('results').innerHTML = '';
  }
}

function setupModalListeners() {
  const modal = document.getElementById('noSolutionModal');

  // Close modal when clicking outside
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeNoSolutionModal();
    }
  });

  // Close modal on ESC key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
      closeNoSolutionModal();
    }
  });
}

function showNoSolutionModal(failedCalculations) {
  const modal = document.getElementById('noSolutionModal');
  const messageEl = document.getElementById('noSolutionMessage');

  let message = '';
  if (failedCalculations.length === 1) {
    const failed = failedCalculations[0];
    if (failed.reason === 'no_items') {
      message = `Не удалось найти комбинацию для суммы <strong>${centsToStr(failed.targetCents)}</strong>.<br><br>Нет доступных товаров для расчета.`;
    } else {
      message = `Не удалось найти точную комбинацию для суммы <strong>${centsToStr(failed.targetCents)}</strong>.<br><br>Попробуйте изменить сумму или проверьте доступные товары.`;
    }
  } else {
    const amounts = failedCalculations
      .map((f) => centsToStr(f.targetCents))
      .join(', ');
    const noItemsCount = failedCalculations.filter(
      (f) => f.reason === 'no_items',
    ).length;
    const noCombinationCount = failedCalculations.filter(
      (f) => f.reason === 'no_combination',
    ).length;

    message = `Не удалось найти комбинации для следующих сумм:<br><strong>${amounts}</strong><br><br>`;
    if (noItemsCount > 0) {
      message += `• ${noItemsCount} расчет${noItemsCount > 1 ? 'ов' : ''} не выполнен${noItemsCount > 1 ? 'ы' : ''} - нет доступных товаров<br>`;
    }
    if (noCombinationCount > 0) {
      message += `• ${noCombinationCount} расчет${noCombinationCount > 1 ? 'ов' : ''} не выполнен${noCombinationCount > 1 ? 'ы' : ''} - точная комбинация не найдена`;
    }
  }

  messageEl.innerHTML = message;
  modal.classList.add('show');
}

function closeNoSolutionModal() {
  const modal = document.getElementById('noSolutionModal');
  modal.classList.remove('show');
}

function exportRemainingItemsXLSX() {
  if (!items || items.length === 0) {
    alert('Нет данных для экспорта');
    return;
  }

  // Filter items with remaining amount > 0
  const remainingItems = items.filter((item) => {
    const remaining =
      item.remainingAmount !== undefined
        ? item.remainingAmount
        : (item.originalAmount || item.amount || 0) - (item.usedAmount || 0);
    return remaining > 0;
  });

  if (remainingItems.length === 0) {
    alert('Нет остатков для экспорта');
    return;
  }

  // Prepare data for export
  const exportData = remainingItems.map((item) => {
    const remaining =
      item.remainingAmount !== undefined
        ? item.remainingAmount
        : (item.originalAmount || item.amount || 0) - (item.usedAmount || 0);

    return {
      Наименование: item.name,
      'Цена розничная': centsToStr(item.priceCents).replace('.', ','),
      'Цена со скидкой': centsToStr(item.salePriceCents).replace('.', ','),
      'Кол-во': remaining,
    };
  });

  // Create workbook
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(exportData);
  XLSX.utils.book_append_sheet(wb, ws, 'Остатки');

  // Generate filename with current date
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
  const filename = `остатки_${dateStr}.xlsx`;

  // Save file
  XLSX.writeFile(wb, filename);
}

function exportCalculationsDOC() {
  if (!usageHistory || usageHistory.length === 0) {
    alert('Нет расчетов для экспорта');
    return;
  }

  // Filter out calculations without solutions
  const successfulCalculations = usageHistory.filter(
    (historyItem) =>
      historyItem.solution &&
      Array.isArray(historyItem.solution) &&
      historyItem.solution.length > 0,
  );

  if (successfulCalculations.length === 0) {
    alert('Нет успешных расчетов для экспорта');
    return;
  }

  // Generate HTML content for Word document
  let htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        @page {
            size: A4;
            margin: 1.5cm 1cm;
        }
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 15px;
            line-height: 1.4;
            font-size: 10pt;
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #667eea;
            padding-bottom: 8px;
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 16pt;
        }
        .calculation {
            margin: 20px 0;
            padding: 12px;
            border: 1px solid #ddd;
            page-break-inside: avoid;
        }
        .calculation-header {
            font-size: 12pt;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
        }
        .calculation-total {
            font-weight: bold;
            margin-top: 8px;
            color: #333;
            font-size: 11pt;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
            table-layout: fixed;
            font-size: 9pt;
        }
        th, td {
            border: 1px solid #333;
            padding: 6px 4px;
            text-align: left;
            word-wrap: break-word;
        }
        th {
            background-color: #667eea;
            color: white;
            font-weight: bold;
            font-size: 9pt;
        }
        td {
            background-color: white;
        }
        tr:nth-child(even) td {
            background-color: #f2f2f2;
        }
        .col-name {
            width: 35%;
        }
        .col-price {
            width: 15%;
        }
        .col-sale-price {
            width: 15%;
        }
        .col-quantity {
            width: 12%;
            text-align: center;
        }
        .col-total {
            width: 23%;
            text-align: right;
        }
        .no-solution {
            color: #dc3545;
            font-style: italic;
        }
        @media print {
            body {
                margin: 0;
                padding: 10px;
            }
            .calculation {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <h1>Отчет по расчетам</h1>
    <p style="margin-bottom: 20px; font-size: 10pt;">Дата создания: ${new Date().toLocaleString('ru-RU')}</p>
`;

  successfulCalculations.forEach((historyItem, index) => {
    const targetCents = Number.isInteger(historyItem.targetCents)
      ? historyItem.targetCents
      : historyItem.targetSum !== undefined
        ? Math.round(Number(historyItem.targetSum) * 100)
        : 0;

    htmlContent += `<div class="calculation">`;
    htmlContent += `<div class="calculation-header">Расчет #${historyItem.calculationNumber || index + 1}: Целевая сумма ${centsToStr(targetCents)}</div>`;

    // Recalculate total
    let calculatedCents = 0;
    historyItem.solution.forEach((item) => {
      if (!item || typeof item !== 'object') return;
      const unitCents = Number.isInteger(item.salePriceCents)
        ? item.salePriceCents
        : item.salePrice !== undefined
          ? Math.round(Number(item.salePrice) * 100)
          : 0;
      const qty = item.quantity || 0;
      calculatedCents += unitCents * qty;
    });

    htmlContent += `<table>`;
    htmlContent += `<thead><tr><th class="col-name">Наименование</th><th class="col-price">Цена</th><th class="col-sale-price">Цена со скидкой</th><th class="col-quantity">Кол-во</th><th class="col-total">Сумма</th></tr></thead>`;
    htmlContent += `<tbody>`;

    historyItem.solution.forEach((item) => {
      if (!item || typeof item !== 'object' || !item.name) return;
      const unitCents = Number.isInteger(item.salePriceCents)
        ? item.salePriceCents
        : item.salePrice !== undefined
          ? Math.round(Number(item.salePrice) * 100)
          : 0;
      const qty = item.quantity || 0;
      if (qty <= 0) return;

      // Find original item to get regular price
      const originalItem = items.find((i) => i && i.name === item.name);
      const regularPriceCents = originalItem?.priceCents || unitCents;
      const itemTotalCents = unitCents * qty;

      htmlContent += `<tr>`;
      htmlContent += `<td class="col-name">${item.name}</td>`;
      htmlContent += `<td class="col-price">${centsToStr(regularPriceCents)}</td>`;
      htmlContent += `<td class="col-sale-price">${centsToStr(unitCents)}</td>`;
      htmlContent += `<td class="col-quantity">${qty}</td>`;
      htmlContent += `<td class="col-total">${centsToStr(itemTotalCents)}</td>`;
      htmlContent += `</tr>`;
    });

    htmlContent += `</tbody>`;
    htmlContent += `</table>`;
    htmlContent += `<div class="calculation-total">Итого: ${centsToStr(calculatedCents)}</div>`;
    htmlContent += `</div>`;
  });

  htmlContent += `</body></html>`;

  // Create blob and download
  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8;',
  });
  const link = document.createElement('a');
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
  const filename = `отчет_по_расчетам_${dateStr}.doc`;

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
