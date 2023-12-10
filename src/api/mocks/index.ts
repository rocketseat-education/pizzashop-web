import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
