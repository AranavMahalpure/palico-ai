import { type ErrorRequestHandler } from 'express'
import { APIError } from '../../errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const defaultErrorMiddleware: ErrorRequestHandler = (err, _, res, __) => {
  console.error('Error in request', err)
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ error: err.message })
  } else if (err instanceof Error) {
    console.error(err.message)
    return res.status(500).json({ error: err.message })
  } else {
    return res.status(500).json({ error: 'An unknown error occurred' })
  }
}
