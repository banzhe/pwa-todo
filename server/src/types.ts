import type { LibSQLDatabase } from 'drizzle-orm/libsql'

export interface Env {
  DB: LibSQLDatabase
}
