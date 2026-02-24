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
  currentFilter,
  setCurrentFilter,
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
        <Stats stats={stats} />

        <Filters 
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />

        <ItemsTable
          items={filteredItems}
          filterApplied={filterApplied}
        />
      </div>
    </>
  );
};
