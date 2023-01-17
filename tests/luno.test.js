import { lunoPrice } from '../lib/luno.js'

test("Returns the BTC Price if successful", async () => {

    const MOCK_PRICE = 99

    global.fetch = jest.fn(() => Promise.resolve({
    status: 200,
        json: () => Promise.resolve({
            asks: [{
                price: MOCK_PRICE
            }]
        })
    }))
 
    expect(await lunoPrice()).toBe(MOCK_PRICE)

})