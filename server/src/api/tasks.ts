import { zValidator } from '@hono/zod-validator'
import { taskTable } from '@server/db/schema'
import type { HonoTypeWithEnv } from '@server/types'
import { successResponse } from '@server/utils/response'
import { asc, eq } from 'drizzle-orm'
import { Hono } from 'hono'
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
      sort: z.number().default(0),
    }),
  ),
  async (c) => {
    const { title, content, priority, startDate, endDate, sort } =
      c.req.valid('json')
    const db = c.env.DB
    const now = new Date()
    const insertTask: typeof taskTable.$inferInsert = {
      title,
      content,
      priority,
      startDate,
      endDate,
      sort,
      createdAt: now,
      updatedAt: now,
    }
    const tasks = await db.insert(taskTable).values(insertTask).returning()

    return successResponse(c, tasks?.[0])
  },
)

app.get('/get_tasks', async (c) => {
  const db = c.env.DB
  const tasks = await db.select().from(taskTable).orderBy(asc(taskTable.sort))
  return successResponse(c, tasks)
})

app.post(
  '/update_task',
  zValidator(
    'json',
    z.object({
      id: z.number(),
      title: z.string().optional(),
      content: z.string().optional(),
      status: z.number().min(0).max(2).optional(),
      priority: z.number().optional(),
      startDate: z
        .string()
        .optional()
        .nullable()
        .transform((val) => (val ? new Date(val) : undefined)),
      endDate: z
        .string()
        .optional()
        .nullable()
        .transform((val) => (val ? new Date(val) : undefined)),
      sort: z.number().optional(),
    }),
  ),
  async (c) => {
    const { id, title, content, status, priority, startDate, endDate, sort } =
      c.req.valid('json')

    const db = c.env.DB
    await db
      .update(taskTable)
      .set({
        title,
        content,
        status,
        priority,
        startDate,
        endDate,
        sort,
        updatedAt: new Date(),
      })
      .where(eq(taskTable.id, id))
    return successResponse(c)
  },
)

app.post(
  '/delete_task',
  zValidator(
    'json',
    z.object({
      id: z.number(),
    }),
  ),
  async (c) => {
    const { id } = c.req.valid('json')
    const db = c.env.DB
    await db.delete(taskTable).where(eq(taskTable.id, id))
    return successResponse(c)
  },
)

export default app
