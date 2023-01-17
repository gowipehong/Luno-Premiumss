import { forexCurrency } from '../lib/forex.js'

test('Return Correct USDMYR rates if success', async () =>{
  const MOCK_RATES = 3.12389080543
  
  global.fetch = jest.fn(() => Promise.resolve({
  status: 200,
    json: () => Promise.resolve({
      rates: {
        MYR: MOCK_RATES
      }
    }) 
  }))
  expect(await forexCurrency()).toBe(MOCK_RATES)
})
