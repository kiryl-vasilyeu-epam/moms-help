import { useState } from 'react';
import { Calculations } from '../Calculations';
import { Controls } from '../Controls';
import { UsedItems, useUsedItems } from '../UsedItems';
import { styles } from './ResultsSection.styles';
import type { ResultsSectionProps } from './ResultsSection.types';

const ResultsSection = ({
  usageHistory,
  items,
  onRemoveCalculation,
  onExportRemainingItems,
  onExportCalculations,
}: ResultsSectionProps) => {
  const allUsedItems = useUsedItems(usageHistory, items);

  const [calculationsOpen, setCalculationsOpen] = useState(false);
  const handleCalculationsOpen = () => setCalculationsOpen(true);
  const handleCalculationClose = () => setCalculationsOpen(false);

  const [resultsOpen, setResultsOpen] = useState(false);
  const handleOpenResults = () => setResultsOpen(true);
  const handleCloseResults = () => setResultsOpen(false);

  return (
    <div css={styles.container}>
      <Controls
        onExportRemainingItems={onExportRemainingItems}
        onExportCalculations={onExportCalculations}
        handleOpenResults={handleOpenResults}
        handleCalculationOpen={handleCalculationsOpen}
      />
      <Calculations
        usageHistory={usageHistory}
        items={items}
        onRemoveCalculation={onRemoveCalculation}
        calculationsOpen={calculationsOpen}
        handleCalculationClose={handleCalculationClose}
      />
      <UsedItems
        allUsedItems={allUsedItems}
        resultsOpen={resultsOpen}
        handleCloseResults={handleCloseResults}
      />
    </div>
  );
};

export default ResultsSection;
