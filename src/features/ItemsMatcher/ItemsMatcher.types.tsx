import { FileUploadState } from "@hooks";
import { Dispatch, SetStateAction } from "react";

export type MatchType = 'exact' | 'fuzzy' | 'manual' | 'none'
export type FilterType = 'all' | MatchType

export interface File1C {
  invNo: string
  name: string
  totalAmount: number
  latestPrice: number
  hasFewPrices?: boolean
  rawInvNoName?: string
}

export interface FileFusion{
  barcode: string
  invNo: string
  name: string
  price: number
  rawData: string
}

export interface MatchedItem extends File1C {
  matchType: MatchType
  matchedInvNo: string | null
  matchedItem: FileFusion | null
  rawInvNoName?: string
}

export interface ParsedData {
  results: MatchedItem[]
  FileFusions: FileFusion[]
  timestamp: string
}

export interface Stats {
  total: number
  exact: number
  fuzzy: number
  manual: number
  none: number
}

export interface NewMatchData {
  anchor: HTMLElement
  itemIndex: number
}

export interface ItemsMatcherData  {
  fileUpload1C: FileUploadState<File1C[]>
  fileUploadFusion: FileUploadState<FileFusion[]>
  isProcessDisabled: boolean
  allResults: MatchedItem[]
  filteredItems: MatchedItem[]
  filterApplied: boolean
  fileFusionItems: FileFusion[]
  currentFilter: FilterType
  setCurrentFilter: (filter: FilterType) => void
  showResults: boolean
  setShowResults: Dispatch<SetStateAction<boolean>>
  handleProcess: () => void
  handleClear: () => void
  handleSelectMatchItem: (data: NewMatchData) => void
  handleSelectMatch: (itemIndex: number) => void
  handleRemoveMatch: (itemIndex: number) => void
  handleCloseDropdown: () => void
  stats: Stats
  handleDownload: () => void
  handleTransfer: () => void
  isFiltering: boolean
  dropdownAnchor: HTMLElement | null
}
