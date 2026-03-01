let file1Data = null;
let file2Data = null;

document.getElementById('file1').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const uploadBox = document.querySelector('.upload-box:nth-child(1)');
  if (file) {
    document.getElementById('file1-name').textContent = file.name;
    uploadBox.classList.add('file-loaded');
    readFile(file, 1);
  }
});

document.getElementById('file2').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const uploadBox = document.querySelector('.upload-box:nth-child(2)');
  if (file) {
    document.getElementById('file2-name').textContent = file.name;
    uploadBox.classList.add('file-loaded');
    readFile(file, 2);
  }
});

function readFile(file, fileNumber) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet, {
      header: 1,
      defval: '',
    });

    if (fileNumber === 1) {
      file1Data = jsonData;
    } else {
      file2Data = jsonData;
    }

    if (file1Data && file2Data) {
      document.getElementById('processBtn').disabled = false;
    }
  };
  reader.readAsArrayBuffer(file);
}

document.getElementById('processBtn').addEventListener('click', processFiles);

function processFiles() {
  console.log('=== Processing Files ===');

  const items1 = parseFile1(file1Data);
  const items2 = parseFile2(file2Data);
  file2Items = items2; // Store for dropdown

  const items2Map = new Map();
  items2.forEach((item) => {
    items2Map.set(item.invNo, item);
  });

  // Helper function to remove special symbols and normalize case
  const normalizeInvNo = (invNo) =>
    invNo.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

  // Process matches
  const results = items1.map((item) => {
    // Try exact match first
    if (items2Map.has(item.invNo)) {
      return {
        ...item,
        matchType: 'exact',
        matchedInvNo: item.invNo,
        matchedItem: items2Map.get(item.invNo),
        rawInvNoName: item.rawInvNoName,
      };
    }

    // Try fuzzy matching
    const normalized1 = normalizeInvNo(item.invNo);

    for (const [invNo2, item2] of items2Map) {
      const normalized2 = normalizeInvNo(invNo2);

      // Check if normalized versions match
      if (normalized1 === normalized2) {
        console.log(`🟡 Fuzzy match (symbols): "${item.invNo}" ≈ "${invNo2}"`);
        return {
          ...item,
          matchType: 'fuzzy',
          matchedInvNo: invNo2,
          matchedItem: item2,
          rawInvNoName: item.rawInvNoName,
        };
      }

      // Check if one contains the other, but only if difference is letters or zeros
      if (
        normalized1.includes(normalized2) ||
        normalized2.includes(normalized1)
      ) {
        const longer =
          normalized1.length > normalized2.length ? normalized1 : normalized2;
        const shorter =
          normalized1.length > normalized2.length ? normalized2 : normalized1;

        // Get the difference
        let diff = '';
        if (longer.startsWith(shorter)) {
          diff = longer.substring(shorter.length);
        } else if (longer.endsWith(shorter)) {
          diff = longer.substring(0, longer.length - shorter.length);
        }

        // Don't match if difference equals the entire invNo of either item
        if (diff === normalized1 || diff === normalized2) {
          continue;
        }

        // Check if difference contains only letters or zeros
        if (diff && /^[A-Z0]*$/.test(diff)) {
          console.log(
            `🟡 Fuzzy match (substring): "${item.invNo}" ≈ "${invNo2}" (diff: "${diff}")`,
          );
          return {
            ...item,
            matchType: 'fuzzy',
            matchedInvNo: invNo2,
            matchedItem: item2,
            rawInvNoName: item.rawInvNoName,
          };
        }
      }
    }

    // No match found
    console.log(`❌ No match: invNo="${item.invNo}", name="${item.name}"`);
    return {
      ...item,
      matchType: 'none',
      matchedInvNo: null,
      matchedItem: null,
      rawInvNoName: item.rawInvNoName,
    };
  });

  displayResults(results);
  saveToLocalStorage();
}

function parseFile1(data) {
  const items = [];
  let currentItem = null;

  // Skip first empty row, start from row index 1
  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    // Column 0 (1st): invNo+name or ТТН info
    // Column 1 (2nd): irrelevant
    // Column 2 (3rd): price (for ТТН rows)
    // Column 3 (4th): amount (for ТТН rows)

    const col0 = String(row[0] || '').trim(); // 1st column: invNo+name or ТТН

    if (!col0) continue;

    if (
      col0.startsWith('ТТН') ||
      col0.startsWith('ТН') ||
      col0.startsWith('Счет-фактура')
    ) {
      if (currentItem) {
        const price = parseFloat(row[2]) || 0; // 3rd column: price
        const amount = parseFloat(row[3]) || 0; // 4th column: amount

        currentItem.totalAmount += amount;
        if (price > 0) {
          currentItem.latestPrice = price;
        }
      }
    } else {
      if (currentItem) {
        items.push(currentItem);
      }

      const parts = col0.split(/\s+/);
      const invNo = parts[0];
      const name = parts.slice(1).join(' ');

      currentItem = {
        invNo: invNo,
        name: name,
        totalAmount: 0,
        latestPrice: 0,
      };
    }
  }

  if (currentItem) {
    items.push(currentItem);
  }

  console.log('Parsed File 1:', items);
  return items;
}

function parseFile2(data) {
  const items = [];

  // Skip first row (header), start from row index 1
  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    // Column 0 (1st): barcode
    // Column 1 (2nd): invNo+name
    // Column 2 (3rd): price

    const barcode = String(row[0] || '').trim(); // 1st column: barcode
    const invNoName = String(row[1] || '').trim(); // 2nd column: invNo+name
    const price = parseFloat(row[2]) || 0; // 3rd column: price

    if (!invNoName) continue;

    const parts = invNoName.split(/\s+/);
    const invNo = parts[0];
    const name = parts.slice(1).join(' ');

    items.push({
      barcode: barcode,
      invNo: invNo,
      name: name,
      price: price,
      rawData: `${barcode} | ${invNoName} | ${price}`, // Store raw cell data
    });
  }

  console.log('Parsed File 2:', items);
  return items;
}

let allResults = [];
let currentFilter = 'all';
let file2Items = [];

// Load from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem('parserData');
  if (savedData) {
    try {
      const data = JSON.parse(savedData);
      allResults = data.results || [];
      file2Items = data.file2Items || [];

      if (allResults.length > 0) {
        document.getElementById('results').style.display = 'block';
        displayResults(allResults);
        console.log('📦 Loaded data from localStorage');
      }
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
    }
  }
});

function saveToLocalStorage() {
  const data = {
    results: allResults,
    file2Items: file2Items,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem('parserData', JSON.stringify(data));
  console.log('💾 Saved to localStorage');
}

function clearLocalStorage() {
  if (confirm('Вы уверены, что хотите очистить все сохраненные данные?')) {
    localStorage.removeItem('parserData');
    allResults = [];
    file2Items = [];
    currentFilter = 'all';
    document.getElementById('results').style.display = 'none';
    document.getElementById('downloadBtn').style.display = 'none';
    document.getElementById('transferBtn').style.display = 'none';
    document.getElementById('file1-name').textContent = 'Файл не выбран';
    document.getElementById('file2-name').textContent = 'Файл не выбран';
    document
      .querySelector('.upload-box:nth-child(1)')
      .classList.remove('file-loaded');
    document
      .querySelector('.upload-box:nth-child(2)')
      .classList.remove('file-loaded');
    document.getElementById('processBtn').disabled = true;
    console.log('🗑️ Cleared localStorage');
  }
}

function displayResults(results) {
  allResults = results;

  const exactMatches = results.filter((r) => r.matchType === 'exact').length;
  const fuzzyMatches = results.filter((r) => r.matchType === 'fuzzy').length;
  const manualMatches = results.filter((r) => r.matchType === 'manual').length;
  const unmatched = results.filter((r) => r.matchType === 'none').length;

  document.getElementById('results').style.display = 'block';
  document.getElementById('downloadBtn').style.display = 'block';
  document.getElementById('transferBtn').style.display = 'block';
  document.getElementById('totalItems').textContent = results.length;
  document.getElementById('matchedItems').textContent = exactMatches;
  document.getElementById('unmatchedItems').textContent = unmatched;

  // Update fuzzy matches stat
  const fuzzyStatBox = document.getElementById('fuzzyItems');
  if (fuzzyStatBox) {
    fuzzyStatBox.textContent = fuzzyMatches;
  }

  // Update manual matches stat
  const manualStatBox = document.getElementById('manualItems');
  if (manualStatBox) {
    manualStatBox.textContent = manualMatches;
  }

  console.log(`\n=== Summary ===`);
  console.log(`Total items: ${results.length}`);
  console.log(`Exact matches: ${exactMatches}`);
  console.log(`Fuzzy matches: ${fuzzyMatches}`);
  console.log(`Manual matches: ${manualMatches}`);
  console.log(`Unmatched: ${unmatched}`);

  renderTable();
}

function renderTable() {
  const filteredResults = allResults.filter((item) => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'exact') return item.matchType === 'exact';
    if (currentFilter === 'fuzzy') return item.matchType === 'fuzzy';
    if (currentFilter === 'manual') return item.matchType === 'manual';
    if (currentFilter === 'unmatched') return item.matchType === 'none';
    return true;
  });

  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';

  filteredResults.forEach((item, index) => {
    const row = document.createElement('tr');

    // Add row class for border styling when showing all
    if (currentFilter === 'all') {
      if (item.matchType === 'fuzzy') {
        row.classList.add('row-fuzzy');
      } else if (item.matchType === 'manual') {
        row.classList.add('row-manual');
      } else if (item.matchType === 'none') {
        row.classList.add('row-unmatched');
      }
    }

    let matchClass = '';
    let matchText = '';
    if (item.matchType === 'exact') {
      matchClass = 'match';
      matchText = '✓';
    } else if (item.matchType === 'fuzzy') {
      matchClass = 'fuzzy-match';
      matchText = '≈';
    } else if (item.matchType === 'manual') {
      matchClass = 'manual-match';
      matchText = '👤';
    } else {
      matchClass = 'no-match';
      matchText = '✗';
    }

    let matchedInvNoDisplay = '';
    let tooltipHtml = '';
    let cellClasses = 'matched-invno';
    let cellClick = '';

    if (item.matchedInvNo && item.matchedInvNo !== item.invNo) {
      // Show matched invNo from file 2 (different from file 1)
      matchedInvNoDisplay = item.matchedInvNo;

      const unmatchBtn =
        item.matchType === 'fuzzy' || item.matchType === 'manual'
          ? `<button class="unmatch-btn-cell" onclick="event.stopPropagation(); unmatchItem(${allResults.indexOf(item)})" title="Удалить совпадение">✕</button>`
          : '';

      if (
        item.matchedItem &&
        item.matchedItem.rawData &&
        (item.matchType === 'fuzzy' || item.matchType === 'manual')
      ) {
        tooltipHtml = `<span class="tooltip-trigger">${matchedInvNoDisplay}<span class="custom-tooltip">${item.matchedItem.rawData}</span></span>${unmatchBtn}`;
        cellClasses += ' has-tooltip-pink clickable-cell';
        cellClick = `onclick="showDropdown(event, ${allResults.indexOf(item)})"`;
      } else {
        tooltipHtml = matchedInvNoDisplay + unmatchBtn;
      }
    } else if (
      item.matchType === 'fuzzy' ||
      item.matchType === 'manual' ||
      item.matchType === 'none'
    ) {
      // Make cell clickable for fuzzy/manual/unmatched without matches
      tooltipHtml = `<span class="select-match-text">Нажмите для выбора</span>`;
      cellClasses += ' clickable-cell';
      cellClick = `onclick="showDropdown(event, ${allResults.indexOf(item)})"`;
    }
    // For exact matches, leave empty

    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.invNo}</td>
            <td>${item.name}</td>
            <td>${Math.round(item.totalAmount)}</td>
            <td>${item.latestPrice.toFixed(2)}</td>
            <td class="${cellClasses}" ${cellClick}>${tooltipHtml}</td>
            <td class="${matchClass}">
                ${matchText}
            </td>
        `;
    tbody.appendChild(row);
  });
}

function showDropdown(event, itemIndex) {
  event.stopPropagation();

  // Remove any existing dropdown
  const existingDropdown = document.querySelector('.match-dropdown');
  if (existingDropdown) {
    existingDropdown.remove();
  }

  const dropdown = document.createElement('div');
  dropdown.className = 'match-dropdown';

  dropdown.innerHTML = `
        <div class="dropdown-header">
            <input type="text" class="dropdown-search" placeholder="Поиск..." onkeyup="filterDropdown(event)">
            <button class="dropdown-close" onclick="closeDropdown()" title="Закрыть">✕</button>
        </div>
        <div class="dropdown-list"></div>
    `;

  const list = dropdown.querySelector('.dropdown-list');

  file2Items.forEach((item2, idx) => {
    const listItem = document.createElement('div');
    listItem.className = 'dropdown-item';
    listItem.textContent = `${item2.invNo} ${item2.name}`;
    listItem.onclick = () => selectManualMatch(itemIndex, idx);
    list.appendChild(listItem);
  });

  document.body.appendChild(dropdown);

  // Get the cell that was clicked
  const cell = event.target.closest('td');
  const rect = cell.getBoundingClientRect();

  // Position dropdown below the row, aligned to the right edge of the cell
  dropdown.style.top = `${rect.bottom + window.scrollY + 5}px`;

  // Align right edge of dropdown with right edge of cell
  const dropdownWidth = dropdown.offsetWidth;
  dropdown.style.left = `${rect.right + window.scrollX - dropdownWidth}px`;

  dropdown.querySelector('.dropdown-search').focus();
}

function filterDropdown(event) {
  const searchText = event.target.value.toLowerCase();
  const items = document.querySelectorAll('.dropdown-item');

  items.forEach((item) => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(searchText) ? 'block' : 'none';
  });
}

function selectManualMatch(itemIndex, file2Index) {
  const item2 = file2Items[file2Index];

  console.log(
    `👤 Manual match: "${allResults[itemIndex].invNo}" → "${item2.invNo}"`,
  );

  allResults[itemIndex].matchType = 'manual';
  allResults[itemIndex].matchedInvNo = item2.invNo;
  allResults[itemIndex].matchedItem = item2;

  // Remove dropdown with fade animation
  const dropdown = document.querySelector('.match-dropdown');
  if (dropdown) {
    dropdown.style.animation = 'fadeOut 0.2s ease';
    setTimeout(() => {
      dropdown.remove();
    }, 200);
  }

  displayResults(allResults);
  saveToLocalStorage();
}

function unmatchItem(itemIndex) {
  if (
    allResults[itemIndex].matchType === 'fuzzy' ||
    allResults[itemIndex].matchType === 'manual'
  ) {
    console.log(
      `🔓 Unmatched: "${allResults[itemIndex].invNo}" from "${allResults[itemIndex].matchedInvNo}"`,
    );
    allResults[itemIndex].matchType = 'none';
    allResults[itemIndex].matchedInvNo = null;
    allResults[itemIndex].matchedItem = null;

    displayResults(allResults);
    saveToLocalStorage();
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (
    !e.target.closest('.match-dropdown') &&
    !e.target.closest('.dropdown-btn')
  ) {
    const dropdown = document.querySelector('.match-dropdown');
    if (dropdown) {
      dropdown.remove();
    }
  }
});

function setFilter(filter) {
  currentFilter = filter;

  // Update button states
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

  // Render immediately without animation
  renderTable();
}

function downloadXLS() {
  if (!allResults || allResults.length === 0) {
    alert('Нет данных для экспорта');
    return;
  }

  // Separate matched and unmatched items
  const matchedItems = allResults.filter((item) => item.matchType !== 'none');
  const unmatchedItems = allResults.filter((item) => item.matchType === 'none');

  // Combine: matched first, then unmatched
  const sortedItems = [...matchedItems, ...unmatchedItems];

  // Create data array with headers
  const data = [
    ['Наименование', 'Цена розничная', 'Цена со скидкой', 'Кол-во', 'Штрихкод'],
  ];

  sortedItems.forEach((item) => {
    const name = item.rawInvNoName || `${item.invNo} ${item.name}`;
    const amount = Math.round(item.totalAmount);

    let retailPrice = '';
    let discountPrice = '';
    let barcode = '';

    if (item.matchType !== 'none' && item.matchedItem) {
      // Has match - use price from file 2
      if (item.matchedItem.price) {
        const price = `${item.matchedItem.price.toFixed(2)}`.replace('.', ',');
        retailPrice = price;
        discountPrice = price;
      }
      barcode = item.matchedItem.barcode || '';
    } else {
      // No match - leave 2, 3, 5 empty
      retailPrice = '';
      discountPrice = '';
      barcode = '';
    }

    // If no price from file 2, calculate: price * 1.2 * 1.35 - 0.01
    if (!retailPrice && item.latestPrice > 0) {
      const calculatedPrice = item.latestPrice * 1.2 * 1.35 - 0.01;
      const price = `${calculatedPrice.toFixed(2)}`.replace('.', ',');
      retailPrice = price;
      discountPrice = price;
    }

    data.push([name, retailPrice, discountPrice, amount, barcode]);
  });

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Список');

  // Generate filename with current date
  const now = new Date();
  const dateStr = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`;
  const filename = `список с совпадениями (${dateStr}).xlsx`;

  // Download file
  XLSX.writeFile(wb, filename);

  console.log(`📥 Downloaded: ${filename}`);
}

// Position tooltips dynamically
document.addEventListener('mouseover', function (e) {
  const trigger = e.target.closest('.tooltip-trigger');
  if (trigger) {
    const tooltip = trigger.querySelector('.custom-tooltip');
    if (tooltip) {
      // Force a reflow to get accurate dimensions
      tooltip.style.visibility = 'hidden';
      tooltip.style.display = 'block';

      const rect = trigger.getBoundingClientRect();
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;

      // Position above the cell, align right corner to right corner
      const top = rect.top - tooltipHeight - 10;
      const left = rect.right - tooltipWidth;

      tooltip.style.top = top + 'px';
      tooltip.style.left = left + 'px';
      tooltip.style.display = '';
      tooltip.style.visibility = '';
    }
  }
});

function closeDropdown() {
  const dropdown = document.querySelector('.match-dropdown');
  if (dropdown) {
    dropdown.style.animation = 'fadeOut 0.2s ease';
    setTimeout(() => {
      dropdown.remove();
    }, 200);
  }
}

function transferToPriceMatcher() {
  if (!allResults || allResults.length === 0) {
    alert('Нет данных для передачи');
    return;
  }

  // Prepare data for price matcher in the format it expects
  const priceMatcherData = {
    items: allResults.map((item) => ({
      name: item.rawInvNoName || `${item.invNo} ${item.name}`,
      amount: Math.round(item.totalAmount),
      price: item.latestPrice,
      matched: item.matchType !== 'none',
    })),
    timestamp: new Date().toISOString(),
  };

  // Save to localStorage with special key for price matcher
  localStorage.setItem(
    'priceMatcherTransferData',
    JSON.stringify(priceMatcherData),
  );

  console.log('📤 Data transferred to Price Matcher');
  alert('✓ Данные переданы в "Поиск цен"');
}
