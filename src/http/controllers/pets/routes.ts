import type { FastifyInstance } from 'fastify'
import { create } from './cerate'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', create)
}
