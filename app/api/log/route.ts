import { logger } from '@/logger'
import { NextRequest } from 'next/server'

type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const level = data.level as LogLevel
  const messages = data.messages as [string, ...any[]]

  if (level in logger) {
    logger[level].apply(logger, messages)
  }

  return new Response('Message has been successfully logged on the server', {
    status: 200,
  })
}

