export  async function lunoPrice() {
  const res = await fetch("https://api.luno.com/api/1/orderbook_top?pair=XBTMYR")
  
  if (+res.status < 200 || +res.status >= 300) {
    return NaN
  }
  
  const result = await res.json()
  return +result.asks[0].price
}
