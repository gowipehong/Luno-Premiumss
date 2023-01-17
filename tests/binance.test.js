beforeEach(() => {
  jest.resetModules(); 
})

test("Returns price if Binance request succeeds", async () => {
  const getBinanceCoin = require('../lib/binance.js').binanceCoin 
  const MOCK_PRICE = 23898
  jest.mock('node-binance-api', () => {
      return class Binance {
        prices() {
          return new Promise(resolve => { resolve ({BTCUSDT: MOCK_PRICE})
          })
        }   
      }
  })

  expect(await getBinanceCoin()).toBe(MOCK_PRICE)
})