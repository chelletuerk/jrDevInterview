const markets = []

$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=80301',
    success: function(res) {
      markets.push(...res.results)
      res.results.forEach(function(market) {
        renderMarketName(market)
      })
      onClick()
    }
  })
})

const renderMarketName = (market) => {
  const marketName = market.marketname
    .split(' ')
    .splice(1, market.marketname.length)
    .join(' ')
  $('.display').append('<li class="market">' + marketName + '</li>')
}

const onClick = () => {
  $('.market').on('click', (e) => {
    // marketId = res.id
    // marketMiles = res.marketname.split(' ').shift()

      //$('.popup').append('<div>' + marketMiles + marketName + '</div>')
      // console.log(e.target)
  })
}
