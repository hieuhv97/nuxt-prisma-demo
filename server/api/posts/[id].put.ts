import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  const body = await readBody(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid id'
    })
  }

  if (!body.title?.trim()) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Title is required'
    })
  }

  return await prisma.post.update({
    where: { id },
    data: {
      title: body.title,
      content: body.content || null
    }
  })
})
