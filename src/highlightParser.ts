import fs from 'fs'
import path from 'path'
import { HighlightInfo, HighlightsToBook } from './types'

const HIGHLIGHTS_PATH = path.join(__dirname, '../resources/highlights.txt')
const PAGE_NUMBER_REG = /(?<=(page\s))([0-9]+)/g
const HIGHLIGHT_SEPARATOR = '=========='

const parseHighlightInfo = (highlightInfo: string): HighlightInfo => {
  const cleanParts = highlightInfo.replaceAll('\r', '')
  const parts = cleanParts.split('\n')
  const book = (parts[0] || parts[1]).trim()
  const highlight = parts[parts.length - 2]
  let page = 0

  const found = parts[2]?.match(PAGE_NUMBER_REG)
  if (found && found.length > 0) {
    page = Number(found[0])
  }

  return {
    book,
    page,
    highlight,
  }
}

const OrderByBook = (highlights: HighlightInfo[]) => {
  const bookIndexs = new Map<string, number>()

  return highlights.reduce((prev, curr) => {
    if (!curr.book) return prev

    let bookIndex = bookIndexs.get(curr.book)

    if (typeof bookIndex === 'undefined') {
      bookIndex = prev.findIndex((e) => e.bookTitle === curr.book)
      if (bookIndex !== -1) {
        bookIndexs.set(curr.book, bookIndex)
      }
    }

    if (bookIndex === -1) {
      prev.push({
        bookTitle: curr.book,
        highlights: [
          {
            highlight: curr.highlight,
            page: curr.page,
          },
        ],
      })
      const newIndex = prev.findIndex((e) => e.bookTitle === curr.book)

      if (newIndex !== -1) {
        bookIndexs.set(curr.book, newIndex)
      }
      return prev
    }

    prev[bookIndex].highlights.push({
      highlight: curr.highlight,
      page: curr.page,
    })

    return prev
  }, [] as HighlightsToBook[])
}

export const parseHighlightInfos = (): HighlightsToBook[] => {
  const file = fs.readFileSync(HIGHLIGHTS_PATH, { encoding: 'utf-8' })

  if (!file) throw new Error(`could not read flile: ${HIGHLIGHTS_PATH}`)

  const highlightParts = file.split(HIGHLIGHT_SEPARATOR)
  return OrderByBook(highlightParts.map((part) => parseHighlightInfo(part)))
}
