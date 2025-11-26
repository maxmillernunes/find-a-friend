import { makeUploadPetImagesUseCase } from '@/use-case/factories/make-upload-pet-images-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function upload(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    petId: z.uuid(),
  })

  const { petId } = querySchema.parse(request.params)

  const partsFile = request.parts()

  if (!partsFile) {
    return reply.status(400).send({ message: 'Invalid file provided.' })
  }

  const uploadPetImage = makeUploadPetImagesUseCase()

  await uploadPetImage.execute({
    petId,
    content: partsFile,
  })

  return reply.status(201).send()
}
