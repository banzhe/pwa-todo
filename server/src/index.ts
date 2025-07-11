import { Hono } from 'hono'
import { cors } from 'hono/cors'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import tasks from './api/tasks'
import type { Env, HonoTypeWithEnv } from './types'

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

const api = new Hono<HonoTypeWithEnv>()

api.route('/tasks', tasks)
app.route('/api', api)

export default app
