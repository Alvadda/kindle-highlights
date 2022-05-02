import { parseHighlightInfos } from './highlightParser'
import { getBooks, getHighlights, getHighlightsHashs, saveHighlightsToBook } from './db'
import { enrichHash, filterExistingHighlights } from './comparer'

main()

async function main() {
  const highlightsHashs = await getHighlightsHashs()
  const parsedHighlights = parseHighlightInfos()

  for (let i = 0; i < parsedHighlights.length; i++) {
    const { bookTitle, highlights } = parsedHighlights[i]
    const newHighlights = filterExistingHighlights(highlights, highlightsHashs)

    if (newHighlights && newHighlights.length > 0) {
      console.log(`Add ${newHighlights.length} new Highlights for book ${bookTitle} to DB`)
      await saveHighlightsToBook(newHighlights, bookTitle)
    }
  }
}
