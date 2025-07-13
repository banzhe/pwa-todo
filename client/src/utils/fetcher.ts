import type { ApiResponse } from 'shared'

type Options =
  | {
      method: 'POST' | 'PUT'
      body?: Record<string, unknown> | string
      query?: Record<string, string>
    }
  | {
      method: 'GET'
      query?: Record<string, string>
    }

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'

async function fetcher<T>(
  url: string,
  options: Options,
): Promise<T | undefined> {
  const { method, query } = options
  url = processQueryString(url, query)

  const res = await fetch(`${SERVER_URL}${url}`, {
    ...(method === 'POST' || method === 'PUT'
      ? {
          body:
            typeof options.body === 'string'
              ? options.body
              : JSON.stringify(options.body),
        }
      : {}),
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.status === 401) {
    return Promise.reject(new Error('Unauthorized'))
  }

  return processResponse<T>(res)
}

function processQueryString(url: string, query?: Record<string, string>) {
  if (!query) return `/api${url}`

  const queryString = new URLSearchParams(query).toString()
  return `/api${url}?${queryString}`
}

async function processResponse<T>(res: Response) {
  if (!res.ok) {
    return Promise.reject(new Error('Network error'))
  }
  const content = <ApiResponse<T>>await res.json()
  if (!content.success) {
    throw new Error(content.message)
  }

  return content.data
}

export default fetcher
