import { styles } from "./StatusCell.styles";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ErrorIcon from '@mui/icons-material/Error';


export const MATCH_STATUS_ICON_MAP = {
  exact: <CheckCircleIcon fontSize='large' />,
  fuzzy: <ReportProblemIcon fontSize='large' />,
  manual: <TouchAppIcon fontSize='large' />,
  none: <ErrorIcon fontSize='large' />
};

export const MATCH_SPECIFIC_STYLES = {
  exact: styles.match,
  fuzzy: styles.fuzzyMatch,
  manual: styles.manualMatch,
  none: styles.noMatch,
};
