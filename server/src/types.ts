import type { LibSQLDatabase } from 'drizzle-orm/libsql'

export interface Env {
  DB: LibSQLDatabase
}

export interface HonoTypeWithEnv {
  Bindings: Env
}
