import hash from 'object-hash'
import { parseHighlightInfos } from './highlightParser'
import { getHighlights } from './db'
import highlightUtils from './highlightUtils'

// hash(parseHighlightInfos()[0])

const parsedHighlights = parseHighlightInfos()
// console.log(parsedHighlights)
console.log(highlightUtils.OrderByBook(parsedHighlights))

main()

async function main() {
  const highlights = await getHighlights()
  console.log(highlights)
}
