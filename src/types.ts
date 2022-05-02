export interface Highlight {
  page: number
  highlight: string
  hash?: string
}

export interface HighlightsToBook {
  bookTitle: string
  highlights: Highlight[]
}

export interface HighlightInfo extends Highlight {
  book: string
}
