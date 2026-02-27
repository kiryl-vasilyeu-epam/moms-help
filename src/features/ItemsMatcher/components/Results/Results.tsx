import { ResultButtons } from '../ResultButtons';
import { Stats } from '../Stats';
import { Filters } from '../Filters';
import { ItemsTable } from '../ItemsTable';
import { styles } from './Results.styles';
import { ResultsProps } from './Results.types';
import { memo } from 'react';
import { MatchDropdown } from '../MatchDropdown';

export const Results = memo(({
  showResults,
  handleDownload,
  handleTransfer,
  stats,
  currentFilter,
  setCurrentFilter,
  filteredItems,
  filterApplied,
  isFiltering = false,
  dropdownAnchor,
  handleRemoveMatch,
  handleSelectMatchItem,
  handleCloseDropdown,
  fileFusionItems,
  handleSelectMatch,
}: ResultsProps) => {
  if (!showResults) {
    return null;
  }

  return (
    <>
      <ResultButtons 
        handleDownload={handleDownload}
        handleTransfer={handleTransfer}
      />

      <div css={styles.results}>
        <Stats stats={stats} />

        <Filters 
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          isFiltering={isFiltering}
        />

        <ItemsTable
          filteredItems={filteredItems}
          filterApplied={filterApplied}
          handleSelectMatchItem={handleSelectMatchItem}
          handleRemoveMatch={handleRemoveMatch}
        />

        <MatchDropdown
          dropdownAnchor={dropdownAnchor}
          handleCloseDropdown={handleCloseDropdown}
          fileFusionItems={fileFusionItems}
          handleSelectMatch={handleSelectMatch}
        />
      </div>
    </>
  );
});

Results.displayName = 'Results';
