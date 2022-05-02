import { Prisma, PrismaClient } from '@prisma/client'
import { Highlight } from './types'

const prisma = new PrismaClient()

const createBook = async (title: string) => {
  try {
    const book = await prisma.book.findFirst({ where: { title } })
    if (book) return book

    const newBook = await prisma.book.create({ data: { title } })
    return newBook
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Error creating book: ${error.message}`)
    }
    throw error
  }
}

export const getHighlights = async () => {
  return await prisma.highlight.findMany()
}

export const getHighlightsHashs = async () => {
  return await (await prisma.highlight.findMany({ select: { hash: true } })).map((h) => h.hash)
}
export const getBooks = async () => {
  return await prisma.book.findMany()
}

export const saveHighlightsToBook = async (highlight: Highlight[], bookTitle: string) => {
  const book = await createBook(bookTitle)

  for (const key in highlight) {
    if (Object.prototype.hasOwnProperty.call(highlight, key)) {
      const highlightObj = highlight[key]

      await prisma.highlight.create({
        data: {
          page: highlightObj.page,
          text: highlightObj.highlight,
          bookId: book.id,
          hash: highlightObj.hash,
        },
      })
    }
  }
}
