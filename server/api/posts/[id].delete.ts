import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid id'
    })
  }

  return await prisma.post.delete({
    where: { id }
  })
})
