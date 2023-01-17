import Binance from "node-binance-api"

export async function binanceCoin() {
  const binance = new Binance()
  let ticker = await binance.prices()
  let btc = ticker.BTCUSDT
  return btc
}