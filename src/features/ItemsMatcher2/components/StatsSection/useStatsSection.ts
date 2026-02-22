import { useMemo } from 'react'
import { STAT_LABELS } from '../../ItemsMatcher.constants'
import type { Stats } from '../../ItemsMatcher.types'

export const useStatsSection = (stats: Stats) => {
  const statItems = useMemo(
    () => [
      { label: STAT_LABELS.total, value: stats.total },
      { label: STAT_LABELS.exact, value: stats.exact },
      { label: STAT_LABELS.fuzzy, value: stats.fuzzy },
      { label: STAT_LABELS.manual, value: stats.manual },
      { label: STAT_LABELS.unmatched, value: stats.unmatched }
    ],
    [stats]
  )

  return { statItems }
}
