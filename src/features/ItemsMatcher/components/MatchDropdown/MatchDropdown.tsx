import { useTranslation } from 'react-i18next';
import { styles } from './MatchDropdown.styles';
import { MatchDropdownProps } from './MatchDropdown.types';
import { Button, Dropdown } from '@components';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export const MatchDropdown = ({
  dropdownAnchor,
  handleCloseDropdown,
  fileFusionItems,
  handleSelectMatch,
}: MatchDropdownProps) => {
  const { t } = useTranslation();
  const [itemsToShow, setItemsToShow] = useState(fileFusionItems);
  const [filter, setFilter] = useState('');
  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemsToShow(
      fileFusionItems.filter(
        (item) =>
          item.invNo.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.name.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
    setFilter(e.target.value);
  };

  useEffect(() => {
    setItemsToShow(fileFusionItems);
    setFilter('');
  }, [dropdownAnchor, fileFusionItems]);

  return (
    <Dropdown
      anchorEl={dropdownAnchor}
      open={!!dropdownAnchor}
      onClose={handleCloseDropdown}
    >
      <div css={styles.container}>
        <div style={styles.header}>
          <span style={styles.headerTitle}>
            {t('itemsMatcher.dropdown.matchDropdownTitle')}
          </span>
          <Button isSmall variant="close" onClick={handleCloseDropdown} />
        </div>
        <TextField
          type="search"
          label={t('itemsMatcher.dropdown.searchPlaceholder')}
          variant="outlined"
          css={styles.searchField}
          onChange={onFilterChange}
          value={filter}
        />

        <div css={styles.list}>
          {itemsToShow.map((item, index) => (
            <div
              css={[styles.listItem, index % 2 && styles.listItemEven]}
              key={item.rawData}
              onClick={() => handleSelectMatch(fileFusionItems.indexOf(item))}
            >
              {item.invNo} - {item.name}
            </div>
          ))}
        </div>
      </div>
    </Dropdown>
  );
};
