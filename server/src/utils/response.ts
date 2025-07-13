import type { Context } from 'hono'

export function successResponse<T = unknown>(c: Context, data?: T): Response {
  return c.json({
    message: 'Success',
    success: true,
    data,
  })
}

export function errorResponse(c: Context, message: string): Response {
  return c.json(
    {
      message,
      success: false,
    },
    500,
  )
}
