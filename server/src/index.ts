import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { ApiResponse } from 'shared/dist'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import type { Env } from './types'

const app = new Hono<{ Bindings: Env }>()

app.use('*', async (c, next) => {
  // biome-ignore lint/style/noNonNullAssertion: config in .env
  const db = drizzle(process.env.DB_FILE_NAME!)
  c.env.DB = db
  console.log('DB set')
  await next()
})

app.use(cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/hello', async (c) => {
  const data: ApiResponse = {
    message: 'Hello BHVR!',
    success: true,
  }

  return c.json(data, { status: 200 })
})

export default app
