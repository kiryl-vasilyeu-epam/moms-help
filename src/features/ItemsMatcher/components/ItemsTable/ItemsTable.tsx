import { useTranslation } from 'react-i18next';
import { ListTable } from '@components';
import { memo } from 'react';
import { ItemsMatcherTableProps } from './ItemsTable.types';
import { COLUMNS_IDS, COLUMNS_WEIGHT, TABLE_HEADER } from './ItemsTable.constants';
import { getRowStyles } from './ItemsTable.helpers';
import { TableCell } from '../TableCell';

export const ItemsTable = memo(({ items, filterApplied }: ItemsMatcherTableProps) => {
  const { t } = useTranslation();
  return (
    <ListTable
      itemHeight={80}
      headerLabels={TABLE_HEADER.map(label => t(label))}
      columnIds={COLUMNS_IDS}
      columnsWeight={COLUMNS_WEIGHT}
      items={items}
      CellComponent={TableCell}
      getRowStyles={filterApplied ? undefined : getRowStyles}
    />
  );
});

ItemsTable.displayName = 'ItemsTable';