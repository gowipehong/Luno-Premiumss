require("dotenv").config()
async function lunoPrice() {
    const res = await fetch("https://api.luno.com/api/1/tickers")
    const ok = await res.json()
    const lunoData = ok.tickers

    for (let i = 0; i < lunoData.length; i++) {
        if (lunoData[i].pair === 'XBTMYR') {
            return Math.round(lunoData[i].last_trade * 100) / 100
        } else {
            continue
        }
    }
}

async function forexCurrency() {
    const myHeaders = new Headers()
    myHeaders.append("apikey", process.env.API_KEY)
    return new Promise((resolve, reject) => {
        fetch("https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD", {
            method: 'GET',
            headers: myHeaders
        }).then(response => response.json())
            .then(data => resolve(data.rates['MYR']))
    })
}

