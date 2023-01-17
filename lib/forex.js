import dotenv from "dotenv"
dotenv.config()

export  async function forexCurrency() {
  const res = await fetch("https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD", {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'apiKey': process.env.API_KEY
    }
  })

  if (+res.status < 200 || +res.status >= 300) {
    return NaN
  }

  const data = await res.json()
  return data.rates.MYR
}