import dotenv from "dotenv"
dotenv.config()

export  async function forexCurrency() {
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