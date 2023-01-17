import dotenv from "dotenv"
dotenv.config()
import Binance from "node-binance-api"

async function lunoPrice() {
    const res = await fetch("https://api.luno.com/api/1/orderbook_top?pair=XBTMYR")
    const result = await res.json()
    return +result.asks[0].price
}

async function forexCurrency() {
    const res = await fetch("https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD", {
        method: 'GET',
        redirect: 'follow',
        headers:{
            'apiKey': process.env.API_KEY
        }
    })
    const data = await res.json()
    return data.rates['MYR']
    // const myHeaders = new Headers()
    // myHeaders.append("apikey", process.env.API_KEY)
    // return new Promise((resolve, reject) => {
    //     fetch("https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD", {
    //         method: 'GET',
    //         headers: myHeaders
    //     }).then(response => response.json())
    //         .then(data => resolve(data.rates['MYR']))
    // })
}

async function binanceCoin() {
    const binance = new Binance()
    let ticker = await binance.prices()
    let btc = ticker.BTCUSDT
    return btc
}

async function conversion() {
    return await lunoPrice() / await forexCurrency()
}

async function priceDiff() {
    return await conversion() - await binanceCoin()
}

async function premiumRate() {
    return (await priceDiff() / await conversion()) * 100
}

async function listOfAllPrice() {
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

listOfAllPrice()