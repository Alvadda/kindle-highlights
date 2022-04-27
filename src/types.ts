export interface Highlight {
  page: number
  highlight: string
}

export interface HighlightToBook {
  bookTitle: string
  highlights: Highlight[]
}

export interface HighlightInfo {
  book: string
  page: number
  highlight: string
}
