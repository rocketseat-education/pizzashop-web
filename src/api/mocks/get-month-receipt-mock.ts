import { http, HttpResponse } from 'msw'

import { GetMonthReceiptResponse } from '../get-month-receipt'

export const getMonthReceiptMock = http.get<
  never,
  never,
  GetMonthReceiptResponse
>('/metrics/month-receipt', async () => {
  return HttpResponse.json({
    receipt: 20000,
    diffFromLastMonth: 40,
  })
})
