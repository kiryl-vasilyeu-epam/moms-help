import { useTranslation } from 'react-i18next';
import { ListTable } from '@components';
import { memo, useMemo } from 'react';
import { ItemsMatcherTableProps } from './ItemsTable.types';
import {
  COLUMNS_IDS,
  COLUMNS_WEIGHT,
  TABLE_HEADER,
} from './ItemsTable.constants';
import { createGetRowStyles } from './ItemsTable.helpers';
import { TableCell } from '../TableCell';
import { stylesheet } from './ItemsTable.styles';
import { useStyles } from '@hooks';

export const ItemsTable = memo(
  ({
    filteredItems,
    filterApplied,
    handleRemoveMatch,
    handleSelectMatchItem,
  }: ItemsMatcherTableProps) => {
    const { t } = useTranslation();
    const styles = useStyles(stylesheet);
    const headers = useMemo(() => TABLE_HEADER.map((label) => t(label)), [t]);
    const getRowStyles = useMemo(() => createGetRowStyles(styles), [styles]);

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
