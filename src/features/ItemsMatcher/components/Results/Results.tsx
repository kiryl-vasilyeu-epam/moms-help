import { ResultButtons } from '../ResultButtons';
import { Stats } from '../Stats';
import { Filters } from '../Filters';
import { ItemsTable } from '../ItemsTable';
import { styles } from './Results.styles';
import { ResultsProps } from './Results.types';

export const Results = ({
  showResults,
  handleDownload,
  handleTransfer,
  stats,
  statsConfig,
  currentFilter,
  setCurrentFilter,
  filtersConfig,
  filteredItems,
  filterApplied,
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
        <Stats 
          stats={stats}
          statsConfig={statsConfig}
        />

        <Filters 
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          filtersConfig={filtersConfig}
        />

        <ItemsTable
          items={filteredItems}
          filterApplied={filterApplied}
        />
      </div>
    </>
  );
};
