import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/orgs/routes'
import z, { ZodError } from 'zod'
import { env } from './env'
import { AppException } from './shared/errors/app-exception'
import { ErrorsCode } from './shared/errors/errors-code'

export const app = fastify()

app.register(orgsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      error: z.treeifyError(error),
    })
  }

  if (error instanceof AppException) {
    console.log(error)
    return reply.status(error.statusCode).send({
      message: error.message,
      code: error.errorCode,
    })
  }

  if (env.NODE_ENV === 'dev') {
    console.log(error)
  } else {
    // Mandaria para open telemetry da vida
  }

  return reply.status(500).send({
    message: 'Internal server error',
    code: ErrorsCode.INTERNAL_SERVER_ERROR,
  })
})
