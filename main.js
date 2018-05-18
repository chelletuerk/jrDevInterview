const markets = []

$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=80301',
    success: function(res) {
      markets.push(...res.results)
      console.log(markets)
      markets.forEach(function(market) {
        renderMarketName(market)
      })
      onClick()
    }
  })
})

const renderMarketName = (market) => {
  const arr = market.marketname.split(' ')
  market.distance = arr[0]
  market.name = arr.slice(1).join(' ')
  $('.display').append(`<li id=${market.id} class="market">${market.name}</li>`)
}

const onClick = () => {
  $('.market').on('click', (e) => {
    const marketId = e.target.id
  })
}
