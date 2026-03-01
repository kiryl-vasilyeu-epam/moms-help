import { useTranslation } from 'react-i18next';
import { ListTable } from '@components';
import { memo, useMemo } from 'react';
import { ItemsMatcherTableProps } from './ItemsTable.types';
import {
  COLUMNS_IDS,
  COLUMNS_WEIGHT,
  TABLE_HEADER,
} from './ItemsTable.constants';
import { getRowStyles } from './ItemsTable.helpers';
import { TableCell } from '../TableCell';

export const ItemsTable = memo(
  ({
    filteredItems,
    filterApplied,
    handleRemoveMatch,
    handleSelectMatchItem,
  }: ItemsMatcherTableProps) => {
    const { t } = useTranslation();
    const headers = useMemo(() => TABLE_HEADER.map((label) => t(label)), [t]);
    return (
      <ListTable
        itemHeight={80}
        headerLabels={headers}
        columnIds={COLUMNS_IDS}
        columnsWeight={COLUMNS_WEIGHT}
        items={filteredItems}
        CellComponent={TableCell}
        getRowStyles={filterApplied ? undefined : getRowStyles}
        cellCommonProps={{ handleRemoveMatch, handleSelectMatchItem }}
      />
    );
  },
);

ItemsTable.displayName = 'ItemsTable';
