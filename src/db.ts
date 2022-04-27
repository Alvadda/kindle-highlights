import { Prisma, PrismaClient } from '@prisma/client'
import { HighlightInfo } from './types'

const prisma = new PrismaClient()

const createBook = async (title: string) => {
  try {
    const book = await prisma.book.findUnique({ where: { title } })

    if (book) return book

    prisma.book.create({ data: { title } })
    const newBook = await prisma.book.findUnique({ where: { title } })

    if (newBook) return newBook

    throw new Error('No user found after creation')
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Error creating user: ${error.message}`)
    }
    throw error
  }
}

export const getHighlights = async () => {
  return await prisma.highlight.findMany()
}

export const saveHighlightsToBook = async (highlightInfos: HighlightInfo[], bookTitle: string) => {
  const book = await createBook(bookTitle)

  for (const key in highlightInfos) {
    if (Object.prototype.hasOwnProperty.call(highlightInfos, key)) {
      const highlightInfo = highlightInfos[key]

      await prisma.highlight.create({
        data: {
          page: highlightInfo.page,
          text: highlightInfo.highlight,
          bookId: book.id,
        },
      })
    }
  }
}
