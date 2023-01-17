import { lunoPrice } from '../lib/luno.js'

test("Returns NaN if fetch fails", async () => {
  
  global.fetch = jest.fn(() => Promise.resolve({
      status: 500,
      json: () => Promise.resolve({ })
  }))

  expect(await lunoPrice()).toBe(NaN);
});


