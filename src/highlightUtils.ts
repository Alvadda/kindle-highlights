import { HighlightInfo, HighlightToBook } from './types'
export default {
  OrderByBook(highlights: HighlightInfo[]) {
    const bookIndexs = new Map<string, number>()

    return highlights.reduce((prev, curr) => {
      let bookIndex = bookIndexs.get(curr.book)

      if (!bookIndex) {
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
        if (bookIndex !== -1) {
          bookIndexs.set(curr.book, bookIndex)
        }
        return prev
      }

      prev[bookIndex].highlights.push({
        highlight: curr.highlight,
        page: curr.page,
      })

      return prev
    }, [] as HighlightToBook[])
  },
}
