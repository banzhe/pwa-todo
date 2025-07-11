import { zValidator } from '@hono/zod-validator'
import { taskTable } from '@server/db/schema'
import type { HonoTypeWithEnv } from '@server/types'
import { successResponse } from '@server/utils/response'
import { Hono } from 'hono'
import type { ApiResponse } from 'shared/dist'
import { z } from 'zod'

const app = new Hono<HonoTypeWithEnv>()

app.post(
  '/create_task',
  zValidator(
    'json',
    z.object({
      title: z.string().min(1),
      content: z.string().default(''),
      priority: z.number().min(0).max(2).default(1),
      startDate: z
        .string()
        .optional()
        .transform((val) => (val ? new Date(val) : undefined)),
      endDate: z
        .string()
        .optional()
        .transform((val) => (val ? new Date(val) : undefined)),
    }),
  ),
  async (c) => {
    const { title, content, priority, startDate, endDate } = c.req.valid('json')
    const db = c.env.DB
    const insertTask: typeof taskTable.$inferInsert = {
      title,
      content,
      priority,
      startDate,
      endDate,
    }
    const tasks = await db.insert(taskTable).values(insertTask).returning()

    const response: ApiResponse = {
      message: 'Task created successfully',
      data: tasks?.[0],
      success: true,
    }
    return successResponse(c, response)
  },
)

export default app
