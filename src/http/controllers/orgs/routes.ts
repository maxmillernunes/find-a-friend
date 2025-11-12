import type { FastifyInstance } from 'fastify'

import { create } from './create'
import { authenticate } from './authenticate'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.post('/orgs/authenticate', authenticate)
}
