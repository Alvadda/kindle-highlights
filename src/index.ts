import hash from 'object-hash'
import { parseHighlightInfos } from './highlightParser'
import { getBooks, getHighlights, saveHighlightsToBook } from './db'

// hash(parseHighlightInfos()[0])

const parsedHighlights = parseHighlightInfos()
// console.log(parsedHighlights[1])

main()

async function main() {
  for (let i = 0; i < parsedHighlights.length; i++) {
    const item = parsedHighlights[i]
    await saveHighlightsToBook(item.highlights, item.bookTitle)
  }

  const highlights = await getHighlights()
  const books = await getBooks()
  console.log(books)
  console.log(highlights)
}
