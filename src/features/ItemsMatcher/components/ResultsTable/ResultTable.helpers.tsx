import { MatchType } from "@features/ItemsMatcher/ItemsMatcher.types"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import PanToolIcon from '@mui/icons-material/PanTool';
import CancelIcon from '@mui/icons-material/Cancel';

export const getStatusColor = (matchType: string): string => {
    switch (matchType) {
        case 'exact':
        return '#27ae60'
        case 'fuzzy':
        return '#f2d82c'
        case 'manual':
        return '#2196f3'
        default:
        return '#e74c3c'
    }
}

export const getIconByMatchType = (matchType: MatchType) => {
    switch (matchType) {
        case 'exact':
        return <CheckCircleIcon />
        case 'fuzzy':
        return <NewReleasesIcon />
        case 'manual':
        return <PanToolIcon />
        default:
        return <CancelIcon />
    }
}