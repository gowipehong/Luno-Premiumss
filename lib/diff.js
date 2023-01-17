import { lunoPrice } from "./luno.js"
import { forexCurrency } from "./forex.js"
import { binanceCoin } from "./binance.js"

export  async function conversion() {
  return await lunoPrice() / await forexCurrency()
}

export  async function priceDiff() {
  return await conversion() - await binanceCoin()
}

export  async function premiumRate() {
  return (await priceDiff() / await conversion()) * 100
}

export  async function listOfAllPrice() {
  const btcLunoPrice = await lunoPrice()
  const exchangeRate = await forexCurrency()
  const btcBinancePrice = await binanceCoin()
  const usdToMyr = await conversion()
  const priceDiffBtc = await priceDiff()
  const premiumDiff = await premiumRate()
  console.log("BTCMYR price on LUNO:".padEnd(30, ' ') + `MYR ${btcLunoPrice}`)
  console.log("USDMYR:".padEnd(30, ' ') + `${exchangeRate}`)
  console.log("BTCBUSD price on Binance:".padEnd(30, ' ') + `USD ${btcBinancePrice}`)
  console.log("BTCUSD price on LUNO:".padEnd(30, ' ') + `USD ${usdToMyr}`)
  console.log("Price Difference".padEnd(30, ' ') + `USD${priceDiffBtc}`)
  console.log("LUNO Premium:".padEnd(30, ' ') + `${Math.round(premiumDiff * 10000) / 10000}%`)
}

