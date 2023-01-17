import { forexCurrency } from '../lib/forex.js'

test("Returns NaN if fetch fails", async () => {

    global.fetch = jest.fn(() => Promise.resolve({
        status: 500,
        json: () => Promise.resolve({})
    }))

    expect(await forexCurrency()).toBe(NaN);
});
