import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid id'
    })
  }

  const post = await prisma.post.findUnique({
    where: { id }
  })

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found'
    })
  }

  return post
})
