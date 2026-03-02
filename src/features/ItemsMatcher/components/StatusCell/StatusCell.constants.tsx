import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ErrorIcon from '@mui/icons-material/Error';
import type { StrictCssObjectWithSelectors } from '@utils';
import type { MatchType } from '../../ItemsMatcher.types';

export const MATCH_STATUS_ICON_MAP = {
  exact: <CheckCircleIcon fontSize="large" />,
  fuzzy: <ReportProblemIcon fontSize="large" />,
  manual: <TouchAppIcon fontSize="large" />,
  none: <ErrorIcon fontSize="large" />,
};

interface StatusCellStyles {
  match: StrictCssObjectWithSelectors;
  fuzzyMatch: StrictCssObjectWithSelectors;
  manualMatch: StrictCssObjectWithSelectors;
  noMatch: StrictCssObjectWithSelectors;
}

export const getMatchSpecificStyles = (
  styles: StatusCellStyles,
): Record<MatchType, StrictCssObjectWithSelectors> => ({
  exact: styles.match,
  fuzzy: styles.fuzzyMatch,
  manual: styles.manualMatch,
  none: styles.noMatch,
});
