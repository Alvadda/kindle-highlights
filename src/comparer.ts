import hash from 'object-hash'
import { Highlight } from './types'

export const enrichHash = (highlights: Highlight[]): Highlight[] => {
  return highlights.map((highlight) => ({
    ...highlight,
    hash: hash(highlight),
  }))
}

export const filterExistingHighlights = (highlights: Highlight[], existingHashes: (string | null)[]) =>
  enrichHash(highlights).filter((highlight) => !existingHashes.includes(highlight.hash ?? null))
