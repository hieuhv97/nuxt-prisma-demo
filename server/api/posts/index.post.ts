import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.title?.trim()) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Title is required'
    })
  }

  return await prisma.post.create({
    data: {
      title: body.title,
      content: body.content || null
    }
  })
})
