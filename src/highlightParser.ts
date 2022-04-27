import fs from 'fs'
import path from 'path'
import { HighlightInfo } from './types'

const HIGHLIGHTS_PATH = path.join(__dirname, '../resources/highlights.txt')
const PAGE_NUMBER_REG = /(page )([0-9]+)/g
const HIGHLIGHT_SEPARATOR = '=========='

const parseHighlightInfo = (highlightInfo: string): HighlightInfo => {
  const cleanParts = highlightInfo.replaceAll('\r', '')
  const parts = cleanParts.split('\n')
  const book = parts[0] || parts[1]
  const highlight = parts[parts.length - 2]
  let page = 0

  const found = parts[2]?.match(PAGE_NUMBER_REG)
  if (found && found.length > 0) {
    page = Number(found[0].replace('page ', ''))
  }

  return {
    book,
    page,
    highlight,
  }
}

export const parseHighlightInfos = (): HighlightInfo[] => {
  const file = fs.readFileSync(HIGHLIGHTS_PATH, { encoding: 'utf-8' })

  if (!file) throw new Error(`could not read flile: ${HIGHLIGHTS_PATH}`)

  const highlightParts = file.split(HIGHLIGHT_SEPARATOR)
  return highlightParts.map((part) => parseHighlightInfo(part))
}
